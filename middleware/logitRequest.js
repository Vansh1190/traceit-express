const saveLog = require("../services/logitSave");
const createRequestId = require("../utils/requestId");
const mongoStorage = require("../storage/mongoStorage");


module.exports = (opts = {}) => {
    const config = {
        product_id: opts.product_id || "logit-express",
        slowThreshold: opts.slowThreshold || 10000,
        ignoreRoutes: opts.ignoreRoutes || [],
        ignoreStatusCodes: opts.ignoreStatusCodes || [],
        maskFields: opts.maskFields || ["password", "token", "authorization"],
        logRequestBody: opts.logRequestBody || false,
        storage: opts.storage || null, // optional custom storage adapter
        enableConsole: !!opts.enableConsole,
        ...opts
    };

    const storage = opts.storage || mongoStorage(opts.mongoose);

    return (req, res, next) => {
        // ignore route quick check
        if (config.ignoreRoutes.includes(req.path)) return next();

        // assign request id (expose for user)
        req.id = req.id || createRequestId();

        const start = Date.now();

        res.on("finish", () => {
            const duration = Date.now() - start;

            // ignore status codes if configured
            if (config.ignoreStatusCodes.includes(res.statusCode)) return;

            const payload = {
                product_id: config.product_id,
                requestId: req.id,
                method: req.method,
                route: req.originalUrl,
                status: res.statusCode,
                duration,
                ip: req.ip,
                ua: req.headers["user-agent"],
                body: config.logRequestBody ? req.body : undefined,
                query: req.query,
                params: req.params,
                user: req.user || null,
                createdAt: new Date()
            };

            // console friendly output (dev)
            if (config.enableConsole) {
                const sl = duration > config.slowThreshold ? "SLOW" : "OK";
                console.log(`${req.method} ${req.originalUrl} → ${res.statusCode} (${duration}ms) ${sl}`);
            }

            // delegate to storage/service
            saveLog({ payload, storage });

        });

        next();
    };
};
