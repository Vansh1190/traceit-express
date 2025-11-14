module.exports = async ({ payload, storage }) => {
  try {
    await storage.save(payload);
  } catch (e) {
    // ignore
  }
};
