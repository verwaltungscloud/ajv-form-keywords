import { expect } from "chai";
import { JSONSchemaTypeWithFormKeywords } from "../src/types/display/JSONSchemaTypeWithFormKeywords.types";
import { addFormKeywords } from "../index";
import Ajv from "ajv";

describe("Test of fileUpload option keywords", () => {
	it("should return valid (fileUpload)", () => {
		const ajv = new Ajv();
		addFormKeywords(ajv);

		const isValid = ajv.validate(
			{
				type: "object",
				required: ["socialBenefits"],
				properties: {
					socialBenefits: {
						type: "array",
						items: {
							type: "object",
							properties: {
								filename: {
									type: "string",
								},
								base64Uri: {
									type: "string",
									nullable: true,
								},
							},
							required: ["filename"],
						},
						fileUpload: {
							allowedFileExtensions: ".pdf, .jpg, .jpeg, .tif",
							maxFileSize: 1000000,
						},
					},
				},
			} as JSONSchemaTypeWithFormKeywords<{
				socialBenefits: { filename: string; base64Uri?: string }[];
			}>,
			{
				socialBenefits: [
					{
						filename: "test.pdf",
						base64Uri: "data:application/pdf;base64,",
					},
				],
			}
		);
		expect(isValid).to.equal(true);
	});

	it("should fail because of unallowed fileextension (fileUpload)", () => {
		const ajv = new Ajv();
		addFormKeywords(ajv);
		const validate = ajv.compile({
			type: "object",
			required: ["socialBenefits"],
			properties: {
				socialBenefits: {
					type: "array",
					items: {
						type: "object",
						properties: {
							filename: {
								type: "string",
							},
							base64Uri: {
								type: "string",
								nullable: true,
							},
						},
						required: ["filename"],
					},
					fileUpload: {
						allowedFileExtensions: ".pdf, .jpg, .jpeg, .tif",
						maxFileSize: 1000000,
					},
				},
			},
		} as JSONSchemaTypeWithFormKeywords<{
			socialBenefits: { filename: string; base64Uri?: string }[];
		}>);
		const isValid = validate({
			socialBenefits: [
				{
					filename: "test.jp",
					base64Uri: "data:image/jp;base64,",
				},
			],
		});
		expect(isValid).to.equal(false);
	});
});
