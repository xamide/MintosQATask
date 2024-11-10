const { baseUrl } = require("../../../configProvider");
const { spec, request } = require("pactum");
const schema = require("../../data/schemas/getAllUsers.schema");
const { USERNAME, PASSWORD } = require("../../../configProvider");

describe("GET all users tests", () => {
  request.setBaseUrl(baseUrl);

  test("GAU-001 - Get all users", async () => {
    await spec()
      .get("/users")
      .withAuth(USERNAME, PASSWORD)
      .expectStatus(200)
      .expectJsonSchema(schema);
  });

  test("GAU-002 - Unauthorized request to get all users returns an error", async () => {
    await spec().get("/users").expectStatus(401);
  });
});
