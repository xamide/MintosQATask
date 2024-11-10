module.exports = {
  type: "array",
  items: {
    type: "object",
    properties: {
      id: {
        type: "string",
      },
      firstName: {
        type: "string",
      },
      lastName: {
        type: "string",
      },
      email: {
        type: "string",
        format: "email",
      },
      dateOfBirth: {
        type: "string",
        format: "date",
      },
      personalIdDocument: {
        type: "object",
        properties: {
          documentId: {
            type: "string",
          },
          countryOfIssue: {
            type: "string",
            pattern: "^[A-Z]{2}$",
          },
          validUntil: {
            type: "string",
            format: "date",
          },
        },
        required: ["documentId", "countryOfIssue", "validUntil"],
      },
    },
    required: [
      "id",
      "firstName",
      "lastName",
      "dateOfBirth",
      "personalIdDocument",
    ],
  },
};
