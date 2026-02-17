const oracledb = require("oracledb");

async function getConnection() {
  return await oracledb.getConnection({
    user: "TIENDA",
    password: "tienda",
    connectString: "localhost:1521/XEPDB1",
  });
}

module.exports = { getConnection };
