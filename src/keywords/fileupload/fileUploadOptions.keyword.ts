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
	): boolean {
		if (fileUploadOptions.allowedFileExtensions) {
			const allowedFileExtensions =
				fileUploadOptions.allowedFileExtensions as string;
			const fileExtensions = data.map((file) =>
				file.filename.split(".").pop()
			);
			for (const fileExtension of fileExtensions) {
				const isAllowed = allowedFileExtensions.includes(
					fileExtension || ""
				);
				if (!isAllowed) {
					//@ts-expect-error this untyped
					this.errors = new ValidationError([
						{
							keyword: "fileUpload.allowedFileExtensions",
							message: `File extension not allowed: ${fileExtension}`,
							params: {},
						},
					]);
					return false;
				}
			}
		}

		if (fileUploadOptions.maxFileSize) {
			const maxFileSize = fileUploadOptions.maxFileSize as number;
			for (const file of data) {
				const fileSize = getBase64FileSize(file.base64Uri);
				if (fileSize > maxFileSize) {
					//@ts-expect-error this untyped
					this.errors = new ValidationError([
						{
							keyword: "fileUpload.maxFileSize",
							message: `File size for file ${file.filename} too large: ${fileSize} Bytes, max allowed: ${maxFileSize} Bytes`,
							params: {},
						},
					]);
					return false;
				}
			}
		}
		return true;
	};
}

export const fileUploadOptionsDefinition: KeywordDefinition = {
	keyword: "fileUpload",
	metaSchema: ajvMetaSchemaFileUploadOptions,
	compile: fileUploadOptionsCompileFunction,
};
