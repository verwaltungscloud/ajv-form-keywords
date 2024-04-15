"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileUploadOptionsDefinition = void 0;
const ajv_1 = require("ajv");
const ajvMetaSchemaFileUploadOptions = {
    type: "object",
    additionalProperties: false,
    properties: {
        allowedFileExtensions: { type: "string", nullable: true },
        maxFileSize: { type: "number", nullable: true },
    },
};
function getBase64FileSize(base64Uri) {
    //https://en.wikipedia.org/wiki/Base64#MIME
    return (base64Uri.length - 814) / 1.37;
}
function fileUploadOptionsCompileFunction(fileUploadOptions, _parentSchema) {
    return function (data) {
        return new Promise((resolve, reject) => {
            if (fileUploadOptions.allowedFileExtensions) {
                const allowedFileExtensions = fileUploadOptions.allowedFileExtensions;
                const fileExtensions = data.map((file) => file.filename.split(".").pop());
                fileExtensions.map((fileExtension) => {
                    const isAllowed = allowedFileExtensions.includes(fileExtension || "");
                    if (!isAllowed) {
                        reject(new ajv_1.ValidationError([
                            {
                                keyword: "fileUpload.allowedFileExtensions",
                                message: `File extension not allowed: ${fileExtension}`,
                            },
                        ]));
                    }
                });
            }
            if (fileUploadOptions.maxFileSize) {
                const maxFileSize = fileUploadOptions.maxFileSize;
                for (const file of data) {
                    const fileSize = getBase64FileSize(file.base64Uri);
                    if (fileSize > maxFileSize) {
                        reject(new ajv_1.ValidationError([
                            {
                                keyword: "fileUpload.maxFileSize",
                                message: `File size for file ${file.filename} too large: ${fileSize} Bytes, max allowed: ${maxFileSize} Bytes`,
                            },
                        ]));
                    }
                }
            }
            resolve(true);
        });
    };
}
exports.fileUploadOptionsDefinition = {
    keyword: "fileUpload",
    metaSchema: ajvMetaSchemaFileUploadOptions,
    compile: fileUploadOptionsCompileFunction,
};
