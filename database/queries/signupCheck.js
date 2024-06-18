const doQuery = require("../query");

/**
 * Check if a user exists based on username for when signing up
 * @param {string} username The username of the user
 * @returns {boolean} True if the user exists, false otherwise
 */
async function checkUser(username) {
  try {
    // Perform a query to check if the user exists based on the provided username and password
    const sql = `SELECT * FROM people WHERE username = ?`;
    const params = [username];
    const result = await doQuery(sql, params);
    console.log(result);
    // If the result contains any rows, it means the user exists
    return result.length === 0;
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
}

module.exports = checkUser;
