module.exports = (db, opts = {}) => {
  const table = opts.table || "traceit_logs";

  return {
    save: async (log) => {
      try {
        const sql = `
          INSERT INTO ${table} (
            product_id,
            request_id,
            method,
            route,
            status,
            duration,
            ip,
            ua,
            body,
            query,
            params,
            user,
            error,
            created_at
          )
          VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        `;

        const values = [
          log.product_id,
          log.requestId,
          log.method,
          log.route,
          log.status,
          log.duration,
          log.ip,
          log.ua,
          JSON.stringify(log.body || null),
          JSON.stringify(log.query || null),
          JSON.stringify(log.params || null),
          JSON.stringify(log.user || null),
          JSON.stringify(log.error || null),
          log.createdAt || new Date()
        ];

        await db.execute(sql, values);
      } catch (err) {
        // swallow errors, never crash app
      }
    }
  };
};
