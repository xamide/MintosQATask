const { faker } = require("@faker-js/faker");

const fakeName = faker.person.firstName();
const createUserBody = {
  firstName: fakeName,
  lastName: faker.person.lastName(),
  email: faker.internet.email(),
  dateOfBirth: faker.date.birthdate().toISOString().split("T")[0],
  personalIdDocument: {
    documentId: faker.string
      .alphanumeric({
        length: { min: 5, max: 20 },
      })
      .toUpperCase(),
    countryOfIssue: faker.location.countryCode(),
    validUntil: faker.date
      .between({
        from: "2020-01-01T00:00:00.000Z",
        to: "2030-01-01T00:00:00.000Z",
      })
      .toISOString()
      .split("T")[0],
  },
};

const invalidCreateUserBody = {
  firstName: "A",
  lastName: "B",
  email: "C",
  dateOfBirth: "D",
  personalIdDocument: {
    documentId: "E",
    countryOfIssue: "F",
    validUntil: "G",
  },
};

module.exports = {
  createUserBody,
  invalidCreateUserBody,
  fakeName,
};
