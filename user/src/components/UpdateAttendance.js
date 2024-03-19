// AttendanceForm.js
import React, { useEffect, useState } from "react";
import "./css/AttendanceForm.css"; // Import CSS file for AttendanceForm styles
import api from "../services/api";
import axios from "axios";
import { useNavigate } from "react-router";
import Topbar from "./Topbar";

function AttendanceForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    studentName: "",
    date: "",
    status: "",
  });

  const [forUpdate, setforUpdate] = useState({
    _id: "",
    studentName: "",
    date: "",
    status: "",
  });

  async function fetchData() {
    try {
      const res = await axios.get("http://localhost:5000/api/attendance/");
      const user = res.data;
      function findAttendanceRecordByIdFromURL() {
        const url = window.location.href;
        const idFromURL = url.substring(url.lastIndexOf("/") + 1);
        return user.find((record) => record._id === idFromURL);
      }
      const data = findAttendanceRecordByIdFromURL();
      const { _id, studentName, date, status } = data;
      const dateObject = new Date(date);
      const year = dateObject.getFullYear(); // Get the year
      const month = String(dateObject.getMonth() + 1).padStart(2, "0"); // Get the month and pad with leading zero if necessary
      const datee = String(dateObject.getDate()).padStart(2, "0"); // Get the date and pad with leading zero if necessary
      const formattedDate = `${year}-${month}-${datee}`;

      setforUpdate({
        _id: _id,
        studentName: studentName,
        date: formattedDate,
        status: status,
      });
    } catch (e) {
      console.log(e);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log(formData);
    e.preventDefault();
    try {
      const response = await api.put(
        `http://localhost:5000/api/attendance/${forUpdate._id}`,
        formData
      );
      console.log("Attendance record added:", response.data);
    } catch (error) {
      console.error("Error adding attendance record:", error.message);
    }
    navigate("/");
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
              placeholder={forUpdate.studentName}
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
              value={forUpdate.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="status">Status:</label>
            <select
              id="status"
              name="status"
              value={forUpdate.status}
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
