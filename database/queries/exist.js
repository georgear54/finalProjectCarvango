const doQuery = require("../query");

/**
 * Check if a user exists based on username and id for updating or removing him from the database
 * @param {string} username The username of the user
 * @param {string} id The id of the user
 * @returns {boolean} True if the user exists, false otherwise
 */
async function exists(username, id) {
  try {
    // Perform a query to check if the user exists based on the provided username and person_id
    const sql = `SELECT * FROM people WHERE username = ? AND person_id = ?`;
    const params = [username, id];
    const result = await doQuery(sql, params);
    console.log(result);
    // If the result contains any rows, it means the user exists
    return result.length > 0;
  } catch (error) {
    console.error("Error checking user:", error);
    throw error;
  }
}

module.exports = exists;
