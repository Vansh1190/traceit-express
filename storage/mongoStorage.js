const createModel = require("../models/LogitRecord");

module.exports = (mongoose) => {
  const LogitRecord = createModel(mongoose);

  return {
    save: async (logObj) => {
      try {
        await LogitRecord.create(logObj);
      } catch (err) {
        // swallow silently
      }
    }
  };
};
