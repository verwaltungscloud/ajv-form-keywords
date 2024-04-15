import Ajv from "ajv";
import { addFormKeywords } from "../index";
import { expect } from "chai";

describe("Tests for display option keywords", () => {
	it("should return valid (display)", () => {
		const ajv = new Ajv();
		addFormKeywords(ajv);

		const isValid = ajv.validate(
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
		expect(isValid).to.equal(true);
	});
});
