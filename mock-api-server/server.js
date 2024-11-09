const express = require("express");
const app = express();
const createUserSchema = require("../validation/createUserValidation");
const editUserSchema = require("../validation/editUserValidation");
const port = 8080;

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

  {
    id: "2",
    firstName: "Mary",
    lastName: "Jane",
    email: "mary.jane@example.com",
    dateOfBirth: "1968-11-03",
    personalIdDocument: {
      documentId: "AB123456",
      countryOfIssue: "US",
      validUntil: "2027-12-01",
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

// Get all users
apiRouter.get("/users", (req, res) => {
  res.json(users);
});

// Get a user by ID
apiRouter.get("/users/:id", (req, res) => {
  const user = users.find((u) => u.id === req.params.id);
  const errorResponse = createProblemDetails(
    "User not found",
    404,
    `User with ID '${req.params.id}' was not found`,
    req.url
  );
  if (!user) return res.status(404).json(errorResponse);
  res.json(user);
});

// Update a user by ID
apiRouter.put("/users/:id", (req, res) => {
  const userId = req.params.id;
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

  users[userIndex] = { ...users[userIndex], ...req.body };
  res.json(users[userIndex]);
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
  const errorResponse = createProblemDetails(
    "User not found",
    404,
    `User with ID '${req.params.id}' was not found`,
    req.url
  );

  if (!user) return res.status(404).json(errorResponse);

  users = users.filter((user) => user.id !== userId);
  res.status(204).send();
});

app.use("/api", apiRouter);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
