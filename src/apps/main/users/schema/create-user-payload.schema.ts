export const ajvCreateUserPayloadSchema = {
  type: 'object',
  required: ['username', 'password'], // Both fields are required
  additionalProperties: false, // No extra properties allowed
  properties: {
    username: {
      type: 'string', // bedNo should be a string
    },
    password: {
      type: 'string', // wardId should be a number
    },
  },

  // Custom error messages
  errorMessage: {
    required: {
      username: `"username" is required`,
      password: `"password" is required`,
    },
    additionalProperties: `"No additional properties allowed. Only 'username' and 'password' are valid.`,
    properties: {
      username: `"username" must be a string`,
      password: `"password" must be a string`,
    },
  },
};
