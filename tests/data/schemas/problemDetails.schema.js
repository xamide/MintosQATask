const invalidCreateUserSchema = {
  $schema: "http://json-schema.org/draft-07/schema#",
  title: "Generated schema for Root",
  type: "object",
  properties: {
    problemDetails: {
      type: "object",
      properties: {
        title: {
          type: "string",
        },
        status: {
          type: "number",
        },
        detail: {
          type: "array",
          items: {
            type: "string",
          },
        },
        instance: {
          type: "string",
        },
      },
      required: ["title", "status", "detail", "instance"],
    },
  },
  required: ["problemDetails"],
};

module.exports = {
  invalidCreateUserSchema,
};
