import { maxFileSizeDefinition } from "./src/keywords/fileupload/maxFileSize.keyword";
import { allowedFileExtensionsDefinition } from "./src/keywords/fileupload/allowedFileExtensions.keyword";
import { displayOptionsDefinition } from "./src/keywords/display/displayOptions.keyword";

export { TDisplayOptions } from "./src/types/display/displayOptions.types";

export const fileUpload = {
	maxFileSizeDefinition,
	allowedFileExtensionsDefinition,
};

export const display = {
	displayOptionsDefinition,
};
