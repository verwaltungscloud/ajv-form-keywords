/**
 * @description File upload options. Used to define the allowed file extensions and maximum file size for a file upload field
 */
export type TFileUploadOptions = {
	/**
	 * @description Maximum file size in bytes
	 * @example 1000000
	 */
	maxFileSize?: number;
	/**
	 * @description Allowed file extensions
	 * @example ".jpg, .png"
	 */
	allowedFileExtensions?: string;
};
