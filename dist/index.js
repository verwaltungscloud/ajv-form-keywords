"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addFormKeywords = exports.keywords = void 0;
const displayOptions_keyword_1 = require("./src/keywords/display/displayOptions.keyword");
const fileUploadOptions_keyword_1 = require("./src/keywords/fileupload/fileUploadOptions.keyword");
exports.keywords = {
    displayOptionsDefinition: displayOptions_keyword_1.displayOptionsDefinition,
    fileUploadOptionsDefinition: fileUploadOptions_keyword_1.fileUploadOptionsDefinition,
};
const formKeywordsPlugin = (ajv) => {
    ajv.addKeyword("display", displayOptions_keyword_1.displayOptionsDefinition);
    ajv.addKeyword("fileUpload", fileUploadOptions_keyword_1.fileUploadOptionsDefinition);
    return ajv;
};
function addFormKeywords(ajv) {
    ajv.addKeyword("display", displayOptions_keyword_1.displayOptionsDefinition);
    ajv.addKeyword("fileUpload", fileUploadOptions_keyword_1.fileUploadOptionsDefinition);
    return ajv;
}
exports.addFormKeywords = addFormKeywords;
exports.default = formKeywordsPlugin;
