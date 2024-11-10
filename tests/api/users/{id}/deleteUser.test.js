const { baseUrl } = require("../../../../configProvider");
const { spec, request } = require("pactum");
const {
  createUserBody,
  fakeName,
} = require("../../../data/request-body/createUser");
const { USERNAME, PASSWORD } = require("../../../../configProvider");

describe("Delete a user tests", () => {
  request.setBaseUrl(baseUrl);

  test("DU-001 - Delete a user", async () => {
    await spec()
      .post("/users")
      .withAuth(USERNAME, PASSWORD)
      .withBody(createUserBody)
      .expectStatus(201)
      .expectJson({
        description: "User created successfully",
      });

    const postId = await spec()
      .get("/users")
      .withAuth(USERNAME, PASSWORD)
      .expectBodyContains(fakeName)
      .returns("res.body.id");

    await spec()
      .delete(`/users/${postId.length}`)
      .withAuth(USERNAME, PASSWORD)
      .expectStatus(204);

    await spec()
      .get(`/users/${postId.length}`)
      .withAuth(USERNAME, PASSWORD)
      .expectStatus(404);
  });

  test("DU-002 - Unauthorized request to delete a user returns an error", async () => {
    await spec().delete("/users/1").expectStatus(401);
  });
});
