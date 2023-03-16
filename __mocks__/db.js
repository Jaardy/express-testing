// Package imports
const { connect, disconnect, modelNames, model } = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

// Global variable for in memory MongoDB server
let mongoServer;

// Function to be called in the beforeAll set up Jest function
exports.before = async function () {
  mongoServer = await MongoMemoryServer.create(); // Create mocked DB
  await connect(mongoServer.getUri()); // Connect to mocked DB
};

// Function to be called in the afterEach set up Jest function
exports.during = async function () {
  const models = modelNames();
  for (const modelName of models) {
    model(modelName).deleteMany({});
  }
};

// Function to be called in the afterAll tear down Jest function
exports.after = async function () {
  await disconnect(); // Disconnect from mocked DB
  await mongoServer.stop(); // Destroy mocked DB
};
