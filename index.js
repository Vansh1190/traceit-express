const createRequestLogger = require("./middleware/logitRequest");
const createErrorLogger = require("./middleware/logitError");
const mongoStorage = require("./storage/mongoStorage");
const sqlStorage = require("./storage/sqlStorage");



module.exports = {
  requestLogger: createRequestLogger,
  errorLogger: createErrorLogger,
  mongoStorage,
  sqlStorage,
};
