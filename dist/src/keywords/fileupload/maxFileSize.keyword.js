"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.maxFileSizeDefinition = void 0;
function getBase64FileSize(base64Uri) {
    //https://en.wikipedia.org/wiki/Base64#MIME
    return (base64Uri.length - 814) / 1.37;
}
function maxFileSizeCompileFunction(maxFileSize, _parentSchema) {
    return function (data) {
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
exports.maxFileSizeDefinition = {
    keyword: "maxFileSize",
    type: "array",
    compile: maxFileSizeCompileFunction,
    error: { message: "File size too large" },
};
