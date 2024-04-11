"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.allowedFileExtensionsDefinition = void 0;
const allowedFileExtensionsCompileFunction = function (allowedFileExtensions, _parentSchema) {
    return function (data) {
        const fileExtensions = data.map((file) => file.filename.split(".").pop());
        const isAllowed = fileExtensions.every((fileExtension) => allowedFileExtensions.includes(fileExtension || ""));
        if (!isAllowed) {
            return false;
        }
        return true;
    };
};
/**
 * applicable to arrays of objects with a property "filename" that contains the file extension
 */
exports.allowedFileExtensionsDefinition = {
    keyword: "allowedFileExtensions",
    type: "array",
    compile: allowedFileExtensionsCompileFunction,
};
