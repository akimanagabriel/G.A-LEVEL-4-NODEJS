const express = require("express");
const db = require("./connection");

const app = express();

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});

/**
 *  GET     /courses => all modules
 *  GET     /courses/10 => display a specific module based on id
 *  POST   /courses => insert new module
 */

app.get("/courses", (req, res) => {
  db.query("SELECT * FROM courses", (error, result) => {
    res.send(result);
  });
});

app.get("/courses/:cid", (req, res) => {
  db.query(
    "SELECT * FROM courses WHERE id = " + req.params.cid,
    (err, result) => {
      res.send(result);
    }
  );
});

app.use(express.json()); // allow express application to read request body

// insert new course
app.post("/courses", (req, res) => {
  // res.send({ message: "data uploaded", data: req.body });
  const sql = `INSERT into courses (name, credits) VALUES ('${req.body.name}', '${req.body.credits}') `;
  db.query(sql, (err, result) => {
    if (err) {
      console.log(err);
    }
    res.send({ message: "Data inserted", data: result.affectedRows });
  });
});
