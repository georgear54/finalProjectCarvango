const doQuery = require("../query");

/**
 * Add a new user to the database
 * @param {Object} signUp - Object containing user sign up details (username, password, firstName, lastName, email)
 * @returns {Promise} - Resolves with the result of the query if user is added successfully, otherwise rejects with error
 */
async function addUser(signUp) {
  try {
    // Destructure signUp object to extract user sign up details
    const { username, password, firstName, lastName, email } = signUp;
    console.log("-------------------------------------------------", signUp); // Log the sign up details for debugging

    // SQL query to insert user details into the database
    const sql = `INSERT INTO people (username, password, first_name, last_name, email)
                 VALUES (?, ?, ?, ?, ?)`;

    const params = [username, password, firstName, lastName, email]; // Parameters for the query

    // Execute the query to add the new user to the database
    const result = await doQuery(sql, params);

    console.log("User added successfully:", result); // Log success message and result for debugging

    return result; // Return the result for potential further processing
  } catch (error) {
    console.error("Error adding user:", error); // Log error message for debugging
    throw error; // Re-throw the error for error handling at the caller level
  }
}

module.exports = { addUser };
