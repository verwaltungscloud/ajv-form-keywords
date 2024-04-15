import Ajv from "ajv";
import { addFormKeywords } from "./../index";

describe("Test of exported methods", () => {
	it("should add keywords to ajv without error", () => {
		const ajv = new Ajv();
		addFormKeywords(ajv);
	});
});
