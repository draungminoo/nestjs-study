export const ajvCreateWardPayloadSchema = {
  type: 'object',
  required: ['wardName'],
  additionalProperties: false,
  properties: {
    wardName: {
      type: 'string',
      minLength: 3,
      maxLength: 24,
    },
  },

  // for ajv errors
  errorMessage: {
    required: {
      wardName: `"wardName" is required`,
    },
    additionalProperties: `Accept only "wardName"`,
    properties: {
      wardName: `"wardName" must be a string with min length 3 and max length 24`,
    },
  },
};
