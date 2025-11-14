const saveLog = require("../services/logitSave");
const mongoStorage = require("../storage/mongoStorage");

module.exports = (opts = {}) => {
  const config = {
    product_id: opts.product_id || "logit-express",
    enableConsole: !!opts.enableConsole,
    ...opts
  };

  // 🔥 prepare storage ONCE (same pattern as requestLogger)
  const storage = opts.storage || mongoStorage(opts.mongoose);

  return (err, req, res, next) => {
    try {
      const payload = {
        product_id: config.product_id,
        requestId: req.id || null,

        method: req.method,
        route: req.originalUrl,
        status: err.status || 500,
        duration: null,

        ip: req.ip,
        ua: req.headers["user-agent"],

        body: req.body || null,
        query: req.query,
        params: req.params,
        user: req.user || null,

        error: {
          message: err.message,
          stack: err.stack
        },

        createdAt: new Date()
      };

      // optional console output
      if (config.enableConsole) {
        console.log(
          `ERROR → ${req.method} ${req.originalUrl} (${err.message})`
        );
      }

      // 🔥 unified signature
      saveLog({ payload, storage });

    } catch (e) {
      // swallow
    } finally {
      next(err);
    }
  };
};
