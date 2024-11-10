const express = require("express");
const basicAuth = require("basic-auth");
const { USERNAME, PASSWORD } = require("../configProvider");
const { createUserSchema } = require("./validation/createUserValidation");
const { editUserSchema } = require("./validation/editUserValidation");
const port = 8080;
const app = express();
app.use(express.json());

const apiRouter = express.Router();

let users = [
  {
    id: "1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    dateOfBirth: "1985-10-01",
    personalIdDocument: {
      documentId: "AB123456",
      countryOfIssue: "US",
      validUntil: "2030-12-31",
    },
  },
];

function createProblemDetails(title, status, detail, instance) {
  return {
    title,
    status,
    detail,
    instance,
  };
}

const authMiddleware = (req, res, next) => {
  const user = basicAuth(req);

  if (!user || user.name !== USERNAME || user.pass !== PASSWORD) {
    res.setHeader("WWW-Authenticate", 'Basic realm="401"');
    const unauthorizedResponse = createProblemDetails(
      "Unauthorized",
      401,
      "Authentication failed. Please provide valid credentials",
      req.url
    );
    return res.status(401).json(unauthorizedResponse);
  }
  next();
};

app.use(authMiddleware);

// Get all users
apiRouter.get("/users", (req, res) => {
  res.json(users);
});

// Get a user by ID
apiRouter.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  const notFoundResponse = createProblemDetails(
    "User not found",
    404,
    `User with ID '${req.params.id}' was not found`,
    req.url
  );

  if (!user) return res.status(404).json(notFoundResponse);

  res.json(user);
});

// Update a user by ID
apiRouter.put("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === req.params.id);
  const userIndex = users.findIndex((user) => user.id === userId);
  const { error } = editUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => err.message);
    const problemDetails = createProblemDetails(
      "Invalid input",
      400,
      errors,
      req.url
    );

    return res.status(400).json({ problemDetails });
  }

  const notFoundResponse = createProblemDetails(
    "User not found",
    404,
    `User with ID '${req.params.id}' was not found`,
    req.url
  );

  if (!user) return res.status(404).json(notFoundResponse);

  users[userIndex] = { ...users[userIndex], ...req.body };
  res.status(200).send();
});

// Create a new user
apiRouter.post("/users", (req, res) => {
  const { error } = createUserSchema.validate(req.body, { abortEarly: false });

  if (error) {
    const errors = error.details.map((err) => err.message);
    const problemDetails = createProblemDetails(
      "Invalid input",
      400,
      errors,
      req.url
    );

    return res.status(400).json({ problemDetails });
  }

  const newUser = { id: (users.length + 1).toString(), ...req.body };
  users.push(newUser);
  res.status(201).json({ description: "User created successfully" });
});

// Delete a user by ID
apiRouter.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const user = users.find((u) => u.id === req.params.id);

  const notFoundResponse = createProblemDetails(
    "User not found",
    404,
    `User with ID '${req.params.id}' was not found`,
    req.url
  );

  if (!user) return res.status(404).json(notFoundResponse);

  users = users.filter((user) => user.id !== userId);
  res.status(204).send();
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});

module.exports = {
  USERNAME,
  PASSWORD,
};
