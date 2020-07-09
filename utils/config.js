// require("dotenv/config");

const DB_LINK = process.env;
const PORT = process.env.PORT || 3002;

// if (process.env.NODE_ENV === "test") {
//   DB_LINK = process.env.TEST_DB_LINK;
// }

module.exports = {
  DB_LINK,
  PORT,
};
