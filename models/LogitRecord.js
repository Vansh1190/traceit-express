module.exports = (mongoose) => {
  const RequestLogSchema = new mongoose.Schema({
    product_id: { type: String, default: "logit-express" },
    requestId: String,
    method: String,
    route: String,
    status: Number,
    duration: Number,
    ip: String,
    ua: String,
    body: Object,
    query: Object,
    params: Object,
    user: Object,
    error: Object,
    createdAt: { type: Date, default: Date.now }
  });

  return mongoose.models.LogitRecord || mongoose.model("logit_log", RequestLogSchema);
};
