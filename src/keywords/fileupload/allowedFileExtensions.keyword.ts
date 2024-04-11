import { KeywordDefinition } from "ajv";

const allowedFileExtensionsCompileFunction = function (
	allowedFileExtensions: string,
	_parentSchema: unknown
) {
	return function (data: Array<{ filename: string }>) {
		const fileExtensions = data.map((file) =>
			file.filename.split(".").pop()
		);
		const isAllowed = fileExtensions.every((fileExtension) =>
			allowedFileExtensions.includes(fileExtension || "")
		);
		if (!isAllowed) {
			return false;
		}
		return true;
	};
};

/**
 * applicable to arrays of objects with a property "filename" that contains the file extension
 */
export const allowedFileExtensionsDefinition: KeywordDefinition = {
	keyword: "allowedFileExtensions",
	type: "array",
	compile: allowedFileExtensionsCompileFunction,
};
