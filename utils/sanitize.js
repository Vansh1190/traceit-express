const shallowCopy = (obj) => {
  if (!obj || typeof obj !== "object") return obj;
  return Array.isArray(obj) ? obj.map(v => v) : { ...obj };
};

module.exports = (payload, opts = {}) => {
  const maskFields = opts.maskFields || ["password", "token", "authorization"];
  const out = { ...payload };

  const mask = (obj) => {
    if (!obj || typeof obj !== "object") return obj;
    const c = shallowCopy(obj);
    for (const k of Object.keys(c)) {
      try {
        if (maskFields.includes(k.toLowerCase())) {
          c[k] = "[REDACTED]";
        } else if (typeof c[k] === "object") {
          c[k] = mask(c[k]);
        }
      } catch (e) {}
    }
    return c;
  };

  if (out.body) out.body = mask(out.body);
  if (out.query) out.query = mask(out.query);
  if (out.params) out.params = mask(out.params);
  if (out.user) out.user = mask(out.user);

  return out;
};
