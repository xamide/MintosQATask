const { baseUrl } = require("../../../../configProvider");
const { spec, request } = require("pactum");
const { faker } = require("@faker-js/faker");
const {
  createUserBody,
  fakeName,
} = require("../../../data/request-body/createUser");
const { USERNAME, PASSWORD } = require("../../../../configProvider");

describe("Update a user tests", () => {
  request.setBaseUrl(baseUrl);

  const fakeNamePut = faker.person.firstName();

  test("UU-001 - Update a user successfully", async () => {
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
      .put(`/users/${postId.length}`)
      .withAuth(USERNAME, PASSWORD)
      .withBody({
        firstName: fakeNamePut,
      })
      .expectStatus(200);

    await spec()
      .get(`/users/${postId.length}`)
      .withAuth(USERNAME, PASSWORD)
      .expectBodyContains(fakeNamePut)
      .expectStatus(200);

    await spec()
      .delete(`/users/${postId.length}`)
      .withAuth(USERNAME, PASSWORD)
      .expectStatus(204);
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
