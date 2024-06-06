/**
 * @description Display Options for an AJV property / field. Used to define how a property should be displayed in the UI
 */
export type TDisplayOptions = {
	/**
	 * @description Display Name of the property / field
	 * @example "First Name"
	 */
	name: string;
	/**
	 * @description Display Index of the property / field. Because property order in objects cannot be ensured, the index is used to define the property order in the UI
	 * @example 0
	 */
	index: number;
	/**
	 * @description (Antragsplatform specific) Whether the contents of the field are being automatically processed.
	 *
	 * Applicable for fields like "Are you paying rent?", where additional infomation is required to process the field as the computedfield rent.
	 * @example true
	 */
	isUnprocessed?: boolean;
	/**
	 * @description Description of the field / Additional Information needed to fill out the field
	 * @example "Please enter your first name"
	 */
	description?: string;
	/**
	 * @description Grid settings for the field
	 * @example { size: { xs: 12, sm: 6, md: 4, lg: 3, xl: 3 }, width: "100%" }
	 */
	grid?: {
		/**
		 * @description Size of the field in the grid for different screen sizes
		 */
		size?: {
			/**
			 * @description Size of the field in the grid for extra small screens
			 */
			xs?: number;
			/**
			 * @description Size of the field in the grid for small screens
			 */
			sm?: number;
			/**
			 * @description Size of the field in the grid for medium screens
			 */
			md?: number;
			/**
			 * @description Size of the field in the grid for large screens
			 */
			lg?: number;
			/**
			 * @description Size of the field in the grid for extra large screens
			 */
			xl?: number;
		};
		/**
		 * @description Width of the field
		 */
		width?: string;
	};
	/**
	 * @description Options that are specific to the type of the field
	 *
	 */
	typeSpecificOptions?: {
		//booleans
		/**
		 * @description For property types: boolean
		 *
		 * Defines how a boolean field should be displayed
		 * @example "radiobutton"
		 */
		as?: "radiobutton" | "select" | "checkbox";
		//string
		/**
		 * @description For property types: string
		 *
		 * Defines whether a string field should be displayed as a multiline field
		 * @example true
		 */
		multiline?: boolean;
		//string with enum
		/**
		 * @description For property types: string with enum
		 *
		 * Defines the display names for the values of an enum field. The "value" property must correspond to a value of the AJV native property "enum"
		 * @example [{ name: "Option 1", value: "option1" }, { name: "Option 2", value: "option2" }]
		 */
		enumWithDisplaynames?: {
			name: string;
			value: string;
		}[];
		//boolean in terms_and_conditions step
		/**
		 * @description For property types: boolean (terms_and_conditions step only)
		 *
		 * Text for the checkbox in the terms_and_conditions step
		 * @example "I agree to the terms and conditions"
		 */
		checkboxText?: string;
		//boolean in terms_and_conditions step
		/**
		 * @description For property types: boolean (terms_and_conditions step only)
		 *
		 * In combination with "checkboxText". Defines the text samples of the checkboxText, that the Frontend should render as a link.
		 *
		 * Either with an URL to open on click or an HTML snippet to display in a popup.
		 * @example [{ linkText: "Terms and Conditions", html: "<p>Terms and Conditions: ...<p/>" }]
		 * @example [{ linkText: "Terms and Conditions", url: "https://www.example.com/terms-and-conditions" }]
		 */
		links?: {
			linkText: string;
			html?: string;
			url?: string;
		}[];
		//numbers
		/**
		 * @deprecated
		 * use unitOfMeasure instead
		 */
		currency?: { position: "before" | "after"; currencySign: "€" };
		/**
		 * @description For property types: number
		 *
		 * Defines the position and symbol of the unit of measure for a number field
		 * @example { position: "after", unitSymbol: "€" }
		 * @example { position: "before", unitSymbol: "$" }
		 */
		unitOfMeasure?: { position: "before" | "after"; unitSymbol: string };
		/**
		 * @description For property types: number
		 *
		 * Defines whether an intervalConverter should be displayed besides the field.
		 *
		 * An intervalConverter allows the user to select the interval of a number field (e.g. "per month", "per year") and automatically converts the value to monthly.
		 */
		intervalConverter?: boolean;
		//arrays
		/**
		 * @description For property types: array
		 *
		 * Defines the available controls the user can use to set the numberOfItems for an array field
		 */
		numberOfItemsControls?: {
			/**
			 * @description Defines whether to display an input field for the numberOfItems, where the user can enter the number directly
			 */
			inputField?: true;
			/**
			 * @description Defines whether to display "add" and "subtract" buttons for the numberOfItems, where the user can increase or decrease the number by one
			 */
			addAndSubtractButtons?: true;
			/**
			 * @description Defines whether to display an "add" button at the end of the item list and a "remove" button for every item for the user to add and remove items
			 */
			addAndRemoveButtons?: true;
		};
		//dates
		/**
		 * @description For property types: string in date format
		 *
		 * Defines the minimum date for a date field
		 * @example "2020-01-01"
		 */
		minDate?: string;
		/**
		 * @description For property types: string in date format
		 *
		 * Defines the maximum date for a date field
		 * @example "2023-01-01"
		 */
		maxDate?: string;
		/**
		 * @description For property types: string in date format
		 *
		 * Defines whether to display a monthPicker instead of a datepicker for a date field.
		 *
		 * MonthPicker only allows picking the Month and Year, but not the day. Should be used with hiddenSuffix
		 */
		monthPicker?: boolean;
		/**
		 * @description For property types: string
		 *
		 * Defines a suffix that is added to a field, but not displayed. Can be used to add a specific day to the monthPicker.
		 * @example
		 * //when the user picks the month "January 2023" in the monthPicker, the value of the field will be "2023-01-15", so it's always the 15th of the month
		 * {
		 *    monthPicker: true,
		 *    hiddenSuffix: "-15"
		 * }
		 * @example
		 * //when the user picks the month "January 2023" in the monthPicker, the value of the field will be "2023-01-01", so it's always the 1st of the month
		 * {
		 *    monthPicker: true,
		 *    hiddenSuffix: "-01"
		 * }
		 */
		hiddenSuffix?: string;
		//notype (info text)
		/**
		 * @description For property types: undefined
		 *
		 * Defines whether the field should be displayed as an info text.
		 *
		 * Info texts are displayed in blue info bubbles and are not editable by the user. Should be used with a property that has no type defined, so that the validation doesn't fail because of missing data.
		 */
		asInfo?: boolean;
		/**
		 * @description For property types: undefined
		 *
		 * Defines whether the field should be displayed as a heading text.
		 *
		 * Headings are not editable by the user and can be used to visually separate sections of the same step. Should be used with a property that has no type defined, so that the validation doesn't fail because of missing data.
		 */
		asHeading?: boolean;
	};
};
