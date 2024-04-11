import { KeywordDefinition } from "ajv";

function getBase64FileSize(base64Uri: string) {
	//https://en.wikipedia.org/wiki/Base64#MIME
	return (base64Uri.length - 814) / 1.37;
}

function maxFileSizeCompileFunction(
	maxFileSize: number,
	_parentSchema: unknown
) {
	return function (data: Array<{ base64Uri: string }>) {
		for (const file of data) {
			const fileSize = getBase64FileSize(file.base64Uri);
			if (fileSize > maxFileSize) {
				return false;
			}
		}
		return true;
	};
}

/**
 * applicable to arrays of objects with a property "base64Uri" that contains the base64 encoded file
 */
export const maxFileSizeDefinition: KeywordDefinition = {
	keyword: "maxFileSize",
	type: "array",
	compile: maxFileSizeCompileFunction,
	error: { message: "File size too large" },
};
