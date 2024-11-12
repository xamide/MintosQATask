const { baseUrl, USERNAME, PASSWORD } = require("../../../configProvider");
const { spec, request } = require("pactum");
const {
  createUserBody,
  invalidCreateUserBody,
  fakeEmail,
} = require("../../data/request-body/createUser");
const {
  invalidCreateUserSchema,
} = require("../../data/schemas/problemDetails.schema");

describe("Create a new users tests", () => {
  request.setBaseUrl(baseUrl);

  test("CU-001 - Successfully create a new user with valid data", async () => {
    await spec()
      .post("/users")
      .withAuth(USERNAME, PASSWORD)
      .withJson(createUserBody)
      .expectStatus(201)
      .expectJson({
        description: "User created successfully",
      });

    const postId = await spec()
      .get("/users")
      .withAuth(USERNAME, PASSWORD)
      .expectBodyContains(fakeEmail)
      .returns("res.body.id");

    await spec()
      .delete(`/users/${postId.length}`)
      .withAuth(USERNAME, PASSWORD)
      .expectStatus(204);
  });

  test("CU-002 - Fail to create a new user with invalid data", async () => {
    await spec()
      .post("/users")
      .withAuth(USERNAME, PASSWORD)
      .withJson(invalidCreateUserBody)
      .expectStatus(400)
      .expectJsonSchema(invalidCreateUserSchema)
      .expectBodyContains([
        "firstName must be at least 2 characters long.",
        "lastName must be at least 2 characters long.",
        "A valid email address is required.",
        "dateoOfBirth must be in YYYY-MM-DD format.",
        "documentId must be at least 5 characters long.",
        "Country of issue must be a valid ISO 3166-1 alpha-2 code.",
        "Valid until date must be in YYYY-MM-DD format.",
      ]);
  });

  test("CU-003 - Fail to create a new user with missing fields", async () => {
    await spec()
      .post("/users")
      .withAuth(USERNAME, PASSWORD)
      .withJson({
        email: "C",
      })
      .expectStatus(400)
      .expectJsonSchema(invalidCreateUserSchema)
      .expectBodyContains([
        "firstName is required.",
        "lastName is required.",
        "A valid email address is required.",
        "dateOfBirth is required.",
        "personalIdDocument is required.",
      ]);
  });

  test("CU-004 - Unauthorized request to create a new user returns an error", async () => {
    await spec().post("/users").expectStatus(401);
  });
});
