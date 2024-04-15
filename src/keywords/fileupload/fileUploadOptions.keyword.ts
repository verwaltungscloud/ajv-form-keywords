import { JSONSchemaType, KeywordDefinition, ValidationError } from "ajv";
import { TFileUploadOptions } from "../../types/display/fileuploadOptions.types";

const ajvMetaSchemaFileUploadOptions: JSONSchemaType<TFileUploadOptions> = {
	type: "object",
	additionalProperties: false,
	properties: {
		allowedFileExtensions: { type: "string", nullable: true },
		maxFileSize: { type: "number", nullable: true },
	},
} as JSONSchemaType<TFileUploadOptions>;

function getBase64FileSize(base64Uri: string) {
	//https://en.wikipedia.org/wiki/Base64#MIME
	return (base64Uri.length - 814) / 1.37;
}

function fileUploadOptionsCompileFunction(
	fileUploadOptions: TFileUploadOptions,
	_parentSchema: unknown
) {
	return function (
		data: Array<{ filename: string; base64Uri: string }>
	): Promise<boolean> {
		return new Promise((resolve, reject) => {
			if (fileUploadOptions.allowedFileExtensions) {
				const allowedFileExtensions =
					fileUploadOptions.allowedFileExtensions as string[];
				const fileExtensions = data.map((file) =>
					file.filename.split(".").pop()
				);
				fileExtensions.map((fileExtension) => {
					const isAllowed = allowedFileExtensions.includes(
						fileExtension || ""
					);
					if (!isAllowed) {
						reject(
							new ValidationError([
								{
									keyword: "fileUpload.allowedFileExtensions",
									message: `File extension not allowed: ${fileExtension}`,
								},
							])
						);
					}
				});
			}

			if (fileUploadOptions.maxFileSize) {
				const maxFileSize = fileUploadOptions.maxFileSize as number;
				for (const file of data) {
					const fileSize = getBase64FileSize(file.base64Uri);
					if (fileSize > maxFileSize) {
						reject(
							new ValidationError([
								{
									keyword: "fileUpload.maxFileSize",
									message: `File size for file ${file.filename} too large: ${fileSize} Bytes, max allowed: ${maxFileSize} Bytes`,
								},
							])
						);
					}
				}
			}
			resolve(true);
		});
	};
}

export const fileUploadOptionsDefinition: KeywordDefinition = {
	keyword: "fileUpload",
	metaSchema: ajvMetaSchemaFileUploadOptions,
	compile: fileUploadOptionsCompileFunction,
};
