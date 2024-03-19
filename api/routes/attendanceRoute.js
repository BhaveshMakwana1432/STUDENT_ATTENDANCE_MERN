const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");

// Route to get all attendance records
router.get("/", async (req, res) => {
  try {
    const attendanceRecords = await Attendance.find();
    res.json(attendanceRecords);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

// Route to create a new attendance record
router.post("/", async (req, res) => {
  try {
    const newAttendance = new Attendance(req.body);
    await newAttendance.save();
    res.status(201).json(newAttendance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const isDelete = await Attendance.findById(id).deleteOne();

    if (!isDelete) {
      return res.status(404).json({ message: "Data not found" });
    }

    res.status(200).json({ message: "Attendance Data deleted successfully" });
  } catch (error) {
    console.error("Error deleting Student Attendance:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const student = await Attendance.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });

    res.status(200).json({ message: "Attendance Data updated successfully" });
  } catch (error) {
    console.error("Error updating Data:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
