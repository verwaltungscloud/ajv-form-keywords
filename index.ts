import { displayOptionsDefinition } from "./src/keywords/display/displayOptions.keyword";
import Ajv, { Plugin } from "ajv";
import {
	fileUploadOptionsDefinitionWithCompile,
	fileUploadOptionsDefinitionWithoutCompile,
} from "./src/keywords/fileupload/fileUploadOptions.keyword";

export { TDisplayOptions } from "./src/types/display/displayOptions.types";
export { TFileUploadOptions } from "./src/types/display/fileuploadOptions.types";
export { JSONSchemaTypeWithFormKeywords } from "./src/types/display/JSONSchemaTypeWithFormKeywords.types";

export const keywords = {
	displayOptionsDefinition,
	fileUploadOptionsDefinition: fileUploadOptionsDefinitionWithCompile,
};

const formKeywordsPlugin: Plugin<{}> = (ajv: Ajv): Ajv => {
	ajv.addKeyword(displayOptionsDefinition);
	ajv.addKeyword(fileUploadOptionsDefinitionWithCompile);
	return ajv;
};

export function addFormKeywords(
	ajv: Ajv,
	options?: { includeFileUploadValidationFunctions?: boolean }
): Ajv {
	if (options?.includeFileUploadValidationFunctions) {
		ajv.addKeyword(fileUploadOptionsDefinitionWithCompile);
	} else {
		ajv.addKeyword(fileUploadOptionsDefinitionWithoutCompile);
	}
	ajv.addKeyword(displayOptionsDefinition);
	return ajv;
}

export default formKeywordsPlugin;
