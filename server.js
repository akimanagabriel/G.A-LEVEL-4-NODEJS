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

// delete one course by using ID
app.delete("/courses/:courseId", function (req, res) {
  db.query(
    "DELETE FROM courses WHERE id = " + req.params.courseId,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send({ message: "Course is deleted ", data: result });
      }
    }
  );
});

// update course;
app.put("/courses/:id", (req, res) => {
  const id = req.params.id;
  const name = req.body.name;
  db.query(
    `UPDATE courses SET name='${name}' WHERE id = '${id}'`,
    (error, result) => {
      if (error) {
        console.log(error);
      } else {
        res.send(result);
      }
    }
  );
});
