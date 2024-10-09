import { JSONSchemaType, KeywordDefinition } from "ajv";
import { TDisplayOptions } from "../../types/display/displayOptions.types";

const ajvMetaSchemaDisplayOptions: JSONSchemaType<TDisplayOptions> = {
	type: "object",
	additionalProperties: false,
	required: ["name", "index"],
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
						required: ["linkText"],
						properties: {
							linkText: { type: "string" },
							html: { type: "string", nullable: true },
							url: { type: "string", nullable: true },
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
				monthPicker: { type: "boolean", nullable: true },
				hiddenSuffix: { type: "string", nullable: true },
				asInfo: { type: "boolean", nullable: true },
				asHeading: { type: "boolean", nullable: true },
				step: { type: "string", nullable: true },
				asStepReference: { type: "boolean", nullable: true },
				variant: { type: "string", nullable: true },
			},
		},
	},
} as JSONSchemaType<TDisplayOptions>;

export const displayOptionsDefinition: KeywordDefinition = {
	keyword: "display",
	metaSchema: ajvMetaSchemaDisplayOptions,
};
