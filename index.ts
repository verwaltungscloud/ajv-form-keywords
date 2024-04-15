import { displayOptionsDefinition } from "./src/keywords/display/displayOptions.keyword";
import Ajv, { Plugin } from "ajv";
import { fileUploadOptionsDefinition } from "./src/keywords/fileupload/fileUploadOptions.keyword";

export { TDisplayOptions } from "./src/types/display/displayOptions.types";
export { TFileUploadOptions } from "./src/types/display/fileuploadOptions.types";
export { JSONSchemaTypeWithFormKeywords } from "./src/types/display/JSONSchemaTypeWithFormKeywords.types";

export const keywords = {
	displayOptionsDefinition,
	fileUploadOptionsDefinition,
};

const formKeywordsPlugin: Plugin<{}> = (ajv: Ajv): Ajv => {
	ajv.addKeyword(displayOptionsDefinition);
	ajv.addKeyword(fileUploadOptionsDefinition);
	return ajv;
};

export function addFormKeywords(ajv: Ajv): Ajv {
	ajv.addKeyword(displayOptionsDefinition);
	ajv.addKeyword(fileUploadOptionsDefinition);
	return ajv;
}

export default formKeywordsPlugin;
