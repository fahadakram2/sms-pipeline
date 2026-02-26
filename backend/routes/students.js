const express = require("express");
const router = express.Router();
const Student = require("../models/Student");

// GET all students
router.get("/", async (req, res) => {
  const students = await Student.find();
  res.json(students);
});

// CREATE student
router.post("/", async (req, res) => {
  const { name, subject, age, email } = req.body;

  if (!name || !subject || !age || !email) {
    return res.status(400).json({ message: "All fields required" });
  }

  const newStudent = await Student.create({
    name,
    subject,
    age,
    email
  });

  res.json(newStudent);
});

// UPDATE student
router.put("/:id", async (req, res) => {
  await Student.findByIdAndUpdate(req.params.id, req.body);
  res.json({ message: "Updated" });
});

// DELETE student
router.delete("/:id", async (req, res) => {
  await Student.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;