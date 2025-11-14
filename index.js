const createRequestLogger = require("./middleware/logitRequest");
const createErrorLogger = require("./middleware/logitError");
const mongoStorage = require("./storage/mongoStorage");



module.exports = {
  requestLogger: createRequestLogger,
  errorLogger: createErrorLogger,
  mongoStorage
};
