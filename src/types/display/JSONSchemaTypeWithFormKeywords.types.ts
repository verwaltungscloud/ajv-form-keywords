import { TDisplayOptions } from "./displayOptions.types";
import { TFileUploadOptions } from "./fileuploadOptions.types";

type StrictNullChecksWrapper<Name extends string, Type> = undefined extends null
	? `strictNullChecks must be true in tsconfig to use ${Name}`
	: Type;
type UnionToIntersection<U> = (U extends any ? (_: U) => void : never) extends (
	_: infer I
) => void
	? I
	: never;
export type SomeJSONSchema = UncheckedJSONSchemaTypeWithFormKeywords<
	Known,
	true
>;
type UncheckedPartialSchema<T> = Partial<
	UncheckedJSONSchemaTypeWithFormKeywords<T, true>
>;
export type PartialSchema<T> = StrictNullChecksWrapper<
	"PartialSchema",
	UncheckedPartialSchema<T>
>;
type JSONType<
	T extends string,
	IsPartial extends boolean
> = IsPartial extends true ? T | undefined : T;
interface NumberKeywords {
	minimum?: number;
	maximum?: number;
	exclusiveMinimum?: number;
	exclusiveMaximum?: number;
	multipleOf?: number;
	format?: string;
}
interface StringKeywords {
	minLength?: number;
	maxLength?: number;
	pattern?: string;
	format?: string;
}
type UncheckedJSONSchemaTypeWithFormKeywords<T, IsPartial extends boolean> = ( // these two unions allow arbitrary unions of types
	| {
			anyOf: readonly UncheckedJSONSchemaTypeWithFormKeywords<
				T,
				IsPartial
			>[];
	  }
	| {
			oneOf: readonly UncheckedJSONSchemaTypeWithFormKeywords<
				T,
				IsPartial
			>[];
	  }
	| ({
			type: readonly (T extends number
				? JSONType<"number" | "integer", IsPartial>
				: T extends string
				? JSONType<"string", IsPartial>
				: T extends boolean
				? JSONType<"boolean", IsPartial>
				: never)[];
	  } & UnionToIntersection<
			T extends number
				? NumberKeywords
				: T extends string
				? StringKeywords
				: T extends boolean
				? {}
				: never
	  >)
	| ((T extends number
			? {
					type: JSONType<"number" | "integer", IsPartial>;
			  } & NumberKeywords
			: T extends string
			? {
					type: JSONType<"string", IsPartial>;
			  } & StringKeywords
			: T extends boolean
			? {
					type: JSONType<"boolean", IsPartial>;
			  }
			: T extends readonly [any, ...any[]]
			? {
					type: JSONType<"array", IsPartial>;
					items: {
						readonly [K in keyof T]-?: UncheckedJSONSchemaTypeWithFormKeywords<
							T[K],
							false
						> &
							Nullable<T[K]>;
					} & {
						length: T["length"];
					};
					minItems: T["length"];
			  } & (
					| {
							maxItems: T["length"];
					  }
					| {
							additionalItems: false;
					  }
			  )
			: T extends readonly any[]
			? {
					type: JSONType<"array", IsPartial>;
					items: UncheckedJSONSchemaTypeWithFormKeywords<T[0], false>;
					contains?: UncheckedPartialSchema<T[0]>;
					minItems?: number;
					maxItems?: number;
					minContains?: number;
					maxContains?: number;
					uniqueItems?: true;
					additionalItems?: never;
			  }
			: T extends Record<string, any>
			? {
					type: JSONType<"object", IsPartial>;
					additionalProperties?:
						| boolean
						| UncheckedJSONSchemaTypeWithFormKeywords<
								T[string],
								false
						  >;
					unevaluatedProperties?:
						| boolean
						| UncheckedJSONSchemaTypeWithFormKeywords<
								T[string],
								false
						  >;
					properties?: IsPartial extends true
						? Partial<UncheckedPropertiesSchema<T>>
						: UncheckedPropertiesSchema<T>;
					patternProperties?: Record<
						string,
						UncheckedJSONSchemaTypeWithFormKeywords<
							T[string],
							false
						>
					>;
					propertyNames?: Omit<
						UncheckedJSONSchemaTypeWithFormKeywords<string, false>,
						"type"
					> & {
						type?: "string";
					};
					dependencies?: {
						[K in keyof T]?:
							| Readonly<(keyof T)[]>
							| UncheckedPartialSchema<T>;
					};
					dependentRequired?: {
						[K in keyof T]?: Readonly<(keyof T)[]>;
					};
					dependentSchemas?: {
						[K in keyof T]?: UncheckedPartialSchema<T>;
					};
					minProperties?: number;
					maxProperties?: number;
			  } & (IsPartial extends true
					? {
							required: Readonly<(keyof T)[]>;
					  }
					: [UncheckedRequiredMembers<T>] extends [never]
					? {
							required?: Readonly<UncheckedRequiredMembers<T>[]>;
					  }
					: {
							required: Readonly<UncheckedRequiredMembers<T>[]>;
					  })
			: T extends null
			? {
					type: JSONType<"null", IsPartial>;
					nullable: true;
			  }
			: never) & {
			allOf?: Readonly<UncheckedPartialSchema<T>[]>;
			anyOf?: Readonly<UncheckedPartialSchema<T>[]>;
			oneOf?: Readonly<UncheckedPartialSchema<T>[]>;
			if?: UncheckedPartialSchema<T>;
			then?: UncheckedPartialSchema<T>;
			else?: UncheckedPartialSchema<T>;
			not?: UncheckedPartialSchema<T>;
	  })
) & {
	[keyword: string]: any;
	$id?: string;
	$ref?: string;
	$defs?: Record<
		string,
		UncheckedJSONSchemaTypeWithFormKeywords<Known, true>
	>;
	definitions?: Record<
		string,
		UncheckedJSONSchemaTypeWithFormKeywords<Known, true>
	>;
	display?: TDisplayOptions;
	fileUpload?: TFileUploadOptions;
};
export type JSONSchemaTypeWithFormKeywords<T> = StrictNullChecksWrapper<
	"JSONSchemaType",
	UncheckedJSONSchemaTypeWithFormKeywords<T, false>
>;
type Known =
	| {
			[key: string]: Known;
	  }
	| [Known, ...Known[]]
	| Known[]
	| number
	| string
	| boolean
	| null;
type UncheckedPropertiesSchema<T> = {
	[K in keyof T]-?:
		| (UncheckedJSONSchemaTypeWithFormKeywords<T[K], false> &
				Nullable<T[K]>)
		| {
				$ref: string;
		  };
};
export type PropertiesSchema<T> = StrictNullChecksWrapper<
	"PropertiesSchema",
	UncheckedPropertiesSchema<T>
>;
type UncheckedRequiredMembers<T> = {
	[K in keyof T]-?: undefined extends T[K] ? never : K;
}[keyof T];
export type RequiredMembers<T> = StrictNullChecksWrapper<
	"RequiredMembers",
	UncheckedRequiredMembers<T>
>;
type Nullable<T> = undefined extends T
	? {
			nullable: true;
			const?: null;
			enum?: Readonly<(T | null)[]>;
			default?: T | null;
	  }
	: {
			nullable?: false;
			const?: T;
			enum?: Readonly<T[]>;
			default?: T;
	  };
export {};
