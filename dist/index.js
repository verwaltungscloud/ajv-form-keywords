"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.display = exports.fileUpload = void 0;
const maxFileSize_keyword_1 = require("./src/keywords/fileupload/maxFileSize.keyword");
const allowedFileExtensions_keyword_1 = require("./src/keywords/fileupload/allowedFileExtensions.keyword");
const displayOptions_keyword_1 = require("./src/keywords/display/displayOptions.keyword");
exports.fileUpload = {
    maxFileSizeDefinition: maxFileSize_keyword_1.maxFileSizeDefinition,
    allowedFileExtensionsDefinition: allowedFileExtensions_keyword_1.allowedFileExtensionsDefinition,
};
exports.display = {
    displayOptionsDefinition: displayOptions_keyword_1.displayOptionsDefinition,
};
