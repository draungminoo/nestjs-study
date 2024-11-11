export const ajvBedPayloadSchema = {
  type: 'object',
  required: ['bedNo', 'wardId'], // Both fields are required
  additionalProperties: false, // No extra properties allowed
  properties: {
    bedNo: {
      type: 'string', // bedNo should be a string
      minLength: 3, // Minimum length of 3 characters
      maxLength: 6, // Maximum length of 6 characters
    },
    wardId: {
      type: 'number', // wardId should be a number
    },
  },

  // Custom error messages
  errorMessage: {
    required: {
      bedNo: `"bedNo" is required`,
      wardId: `"wardId" is required`,
    },
    additionalProperties: `"No additional properties allowed. Only 'bedNo' and 'wardId' are valid.`,
    properties: {
      bedNo: `"bedNo" must be a string with a minimum length of 3 and maximum length of 6`,
      wardId: `"wardId" must be a number`,
    },
  },
};
