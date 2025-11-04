const mysql = require("mysql2");

const connection = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "l4_sod",
});

// connection.getConnection((err) => {
//   if (err) {
//     console.log("Failed to establish db connection");
//   } else {
//     console.log("Connected to the DB");
//   }
// });

module.exports = connection;
