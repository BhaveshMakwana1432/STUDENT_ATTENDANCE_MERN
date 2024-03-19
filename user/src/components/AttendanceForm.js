// AttendanceForm.js
import React, { useState } from "react";
import "./css/AttendanceForm.css"; // Import CSS file for AttendanceForm styles
import api from "../services/api";
import Topbar from "./Topbar";

function AttendanceForm() {
  const [formData, setFormData] = useState({
    studentName: "",
    date: "",
    status: "present",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/attendance", formData);
      console.log("Attendance record added:", response.data);
      setFormData({
        studentName: "",
        date: "",
        status: "present",
      });
    } catch (error) {
      console.error("Error adding attendance record:", error.message);
    }
    window.location.reload();
  };

  return (
    <>
      <Topbar />
      <div className="attendance-form-container">
        <h3 className="attendance-form-heading">Add New Attendance Record</h3>
        <form onSubmit={handleSubmit} className="attendance-form">
          <div className="form-group">
            <label htmlFor="studentName">Student Name:</label>
            <input
              type="text"
              id="studentName"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date:</label>
            <input
              type="date"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={formData.status}
              onChange={handleChange}
              required
            >
              <option value="present">Present</option>
              <option value="absent">Absent</option>
              <option value="late">Late</option>
            </select>
          </div>
          <button type="submit" className="submit-button">
            Add Record
          </button>
        </form>
      </div>
    </>
  );
}

export default AttendanceForm;
