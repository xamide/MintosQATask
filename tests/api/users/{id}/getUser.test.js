const { baseUrl } = require("../../../../configProvider");
const { spec, request } = require("pactum");
const schema = require("../../../data/schemas/{id}/getUserId.schema");
const { USERNAME, PASSWORD } = require("../../../../configProvider");

describe("GET a User by ID tests", () => {
  request.setBaseUrl(baseUrl);
  request.setBasicAuth(USERNAME, PASSWORD);

  test("GU-001 - Retrieve a user by ID", async () => {
    await spec().get("/users/1").expectStatus(200).expectJsonSchema(schema);
  });

  test("GU-002 - Unauthorized request to get user by ID returns an error", async () => {
    await spec().get("/users").expectStatus(401);
  });
});
