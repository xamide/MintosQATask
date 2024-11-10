const { baseUrl } = require("../../../../configProvider");
const { spec, request } = require("pactum");
const { faker } = require("@faker-js/faker");
const schema = require("../../../data/schemas/{id}/getUserId.schema");
const { USERNAME, PASSWORD } = require("../../../../configProvider");

describe("Update a user tests", () => {
  request.setBaseUrl(baseUrl);

  const fakeName = faker.person.firstName();

  test("UU-001 - Update a user successfully", async () => {
    await spec()
      .put("/users/1")
      .withAuth(USERNAME, PASSWORD)
      .withBody({
        firstName: fakeName,
      })
      .expectStatus(200);

    await spec()
      .get("/users/1")
      .withAuth(USERNAME, PASSWORD)
      .expectBodyContains(fakeName)
      .expectStatus(200);
  });

  test("UU-002 - Updating a non-existing user fails", async () => {
    await spec()
      .put("/users/aaa")
      .withAuth(USERNAME, PASSWORD)
      .withBody({
        firstName: fakeName,
      })
      .expectStatus(404);
  });

  test("UU-003 - Unauthorized request to update a user returns an error", async () => {
    await spec().get("/users").expectStatus(401);
  });
});
