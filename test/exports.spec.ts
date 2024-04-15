import { expect } from "chai";
import Ajv from "ajv";
import { JSONSchemaTypeWithFormKeywords, addFormKeywords } from "./../index";

describe("Test", () => {
	it("should return true", () => {
		expect(true).to.equal(true);
	});

	it("should add keywords to ajv", () => {
		const ajv = new Ajv();
		addFormKeywords(ajv);
	});

	it("should return valid (display)", () => {
		const ajv = new Ajv();
		addFormKeywords(ajv);

		ajv.validate(
			{
				type: "object",
				properties: {
					test: {
						type: "string",
						display: {
							name: "mem",

							index: 1,
						},
					},
				},
				required: ["test"],
			},
			{
				test: "test",
			}
		);
	});

	it("should return valid (fileUpload)", () => {
		const ajv = new Ajv();
		addFormKeywords(ajv);

		ajv.validate(
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
	});
});
