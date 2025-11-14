const { customAlphabet } = require("nanoid");
const nano = customAlphabet("0123456789abcdef", 12);
module.exports = () => `req_${nano()}`;
