const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "root",
  password: "",
  database: "alwadiflafel",
});
module.exports = pool.promise();
