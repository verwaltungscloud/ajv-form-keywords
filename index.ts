import { maxFileSizeDefinition } from "./src/keywords/fileupload/maxFileSize.keyword";
import { allowedFileExtensionsDefinition } from "./src/keywords/fileupload/allowedFileExtensions.keyword";
import { displayOptionsDefinition } from "./src/keywords/display/displayOptions.keyword";
import Ajv, { Plugin } from "ajv";

export { TDisplayOptions } from "./src/types/display/displayOptions.types";
export { JSONSchemaTypeWithDisplayOptions } from "./src/types/display/JSONSchemaTypeWithDisplayOptions.types";

export const fileUpload = {
	maxFileSizeDefinition,
	allowedFileExtensionsDefinition,
};

export const display = {
	displayOptionsDefinition,
};

const formKeywordsPlugin: Plugin<{}> = (ajv: Ajv): Ajv => {
	ajv.addKeyword("displayOptions", displayOptionsDefinition);
	ajv.addKeyword("maxFileSize", maxFileSizeDefinition);
	ajv.addKeyword("allowedFileExtensions", allowedFileExtensionsDefinition);
	return ajv;
};

export function addFormKeywords(ajv: Ajv): Ajv {
	ajv.addKeyword("displayOptions", displayOptionsDefinition);
	ajv.addKeyword("maxFileSize", maxFileSizeDefinition);
	ajv.addKeyword("allowedFileExtensions", allowedFileExtensionsDefinition);
	return ajv;
}

export default formKeywordsPlugin;
