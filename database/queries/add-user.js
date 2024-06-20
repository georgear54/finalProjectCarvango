const doQuery = require("../query");

async function addUser(userData) {
  try {
    const {
      email,
      role,
      city,
      street_number,
      last_name,
      first_name,
      phone_number,
    } = userData;
    const sql = `INSERT INTO people (email, role, city, street_number, last_name, first_name, phone_number)
                 VALUES (?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      email,
      role,
      city,
      street_number,
      last_name,
      first_name,
      phone_number,
    ];
    const result = await doQuery(sql, params);
    return result;
  } catch (error) {
    console.error("Error adding user:", error);
    throw error;
  }
}

module.exports = { addUser };
