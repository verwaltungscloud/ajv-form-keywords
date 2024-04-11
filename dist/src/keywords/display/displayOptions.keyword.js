"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayOptionsDefinition = void 0;
const ajvMetaSchemaDisplayOptions = {
    type: "object",
    additionalProperties: false,
    required: ["index", "name"],
    properties: {
        name: { type: "string" },
        index: { type: "number" },
        description: { type: "string", nullable: true },
        isUnprocessed: { type: "boolean", nullable: true },
        grid: {
            type: "object",
            additionalProperties: false,
            nullable: true,
            properties: {
                size: {
                    type: "object",
                    additionalProperties: false,
                    nullable: true,
                    properties: {
                        xs: { type: "number", nullable: true },
                        sm: { type: "number", nullable: true },
                        md: { type: "number", nullable: true },
                        lg: { type: "number", nullable: true },
                        xl: { type: "number", nullable: true },
                    },
                },
                width: { type: "string", nullable: true },
            },
        },
        typeSpecificOptions: {
            type: "object",
            additionalProperties: false,
            nullable: true,
            properties: {
                as: {
                    type: "string",
                    nullable: true,
                },
                multiline: { type: "boolean", nullable: true },
                enumWithDisplaynames: {
                    type: "array",
                    nullable: true,
                    items: {
                        type: "object",
                        additionalProperties: false,
                        required: ["name", "value"],
                        properties: {
                            name: { type: "string" },
                            value: { type: "string" },
                        },
                    },
                },
                checkboxText: { type: "string", nullable: true },
                links: {
                    type: "array",
                    nullable: true,
                    items: {
                        type: "object",
                        additionalProperties: false,
                        required: ["linkText", "html"],
                        properties: {
                            linkText: { type: "string" },
                            html: { type: "string" },
                        },
                    },
                },
                currency: {
                    type: "object",
                    nullable: true,
                    required: ["position", "currencySign"],
                    properties: {
                        position: { type: "string", enum: ["before", "after"] },
                        currencySign: { type: "string" },
                    },
                },
                unitOfMeasure: {
                    type: "object",
                    nullable: true,
                    required: ["position", "unitSymbol"],
                    properties: {
                        position: { type: "string", enum: ["before", "after"] },
                        unitSymbol: { type: "string" },
                    },
                },
                intervalConverter: { type: "boolean", nullable: true },
                numberOfItemsControls: {
                    type: "object",
                    additionalProperties: false,
                    nullable: true,
                    properties: {
                        inputField: { type: "boolean", nullable: true },
                        addAndSubtractButtons: {
                            type: "boolean",
                            nullable: true,
                        },
                        addAndRemoveButtons: {
                            type: "boolean",
                            nullable: true,
                        },
                    },
                },
                minDate: { type: "string", nullable: true },
                maxDate: { type: "string", nullable: true },
                asInfo: { type: "boolean", nullable: true },
            },
        },
    },
};
exports.displayOptionsDefinition = {
    keyword: "display",
    metaSchema: ajvMetaSchemaDisplayOptions,
};
