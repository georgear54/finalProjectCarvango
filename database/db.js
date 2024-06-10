const mysql = require("mysql2");

const pool = mysql.createPool({
  connectionLimit: 100, //important
  host: "localhost",
  user: "root",
  password: "",
  database: "alwadiflafel",
});
//https://vscode.dev/github/georgear54/finalProjectCarvango/blob/mainwadiflafel.sql
module.exports = pool.promise();
