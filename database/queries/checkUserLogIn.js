const doQuery = require("../query");

async function checkUser(email, password) {
  try {
    const sql = `SELECT * FROM people WHERE email = ? AND password = ?`;
    const params = [email, password];
    const result = await doQuery(sql, params);
    console.log("Check user result:", result); // Log the result
    return result.length > 0;
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
}

module.exports = checkUser;
