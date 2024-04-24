export type TDisplayOptions = {
	name: string;
	index: number;
	isUnprocessed?: boolean;
	description?: string;
	grid?: {
		size?: {
			xs?: number;
			sm?: number;
			md?: number;
			lg?: number;
			xl?: number;
		};
		width?: string;
	};
	typeSpecificOptions?: {
		//booleans
		as?: "radiobutton" | "select" | "checkbox";
		//string
		multiline?: boolean;
		//string with enum
		enumWithDisplaynames?: {
			name: string;
			value: string;
		}[];
		//boolean in terms_and_conditions step
		checkboxText?: string;
		//boolean in terms_and_conditions step
		links?: {
			linkText: string;
			html: string;
		}[];
		//numbers
		/**
		 * @deprecated
		 * use unitOfMeasure instead
		 */
		currency?: { position: "before" | "after"; currencySign: "€" };
		unitOfMeasure?: { position: "before" | "after"; unitSymbol: string };
		intervalConverter?: boolean;
		//arrays
		numberOfItemsControls?: {
			inputField?: true;
			addAndSubtractButtons?: true;
			addAndRemoveButtons?: true;
		};
		//dates
		minDate?: string;
		maxDate?: string;
		monthPicker?: boolean;
		hiddenSuffix?: string;
		//notype (info text)
		asInfo?: boolean;
	};
};
