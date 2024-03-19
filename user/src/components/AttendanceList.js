// AttendanceList.js
import React, { useState, useEffect } from "react";
import "./css/AttendanceList.css"; // Import CSS file for AttendanceList styles
import api from "../services/api";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import axios from "axios";
import { Link } from "react-router-dom";

function AttendanceList() {
  const [attendanceRecords, setAttendanceRecords] = useState([]);

  async function handleDelete(id) {
    await axios
      .delete(`http://localhost:5000/api/attendance/${id}`, {
        withCredentials: true,
      })
      .then(() => {
        window.location.reload();
      });
  }

  useEffect(() => {
    const fetchAttendanceRecords = async () => {
      try {
        const response = await api.get("/attendance");
        setAttendanceRecords(response.data);
      } catch (error) {
        console.error("Error fetching attendance records:", error.message);
      }
    };

    fetchAttendanceRecords();
  }, []);

  return (
    <div className="attendance-list-container">
      <h3 className="attendance-list-heading">Attendance Records</h3>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {attendanceRecords.map((record, index) => (
            <tr key={index}>
              <td>{record.studentName}</td>
              <td>{record.date}</td>
              <td>{record.status}</td>
              <td className="icons ">
                <Link to={`/${record._id}`} style={{ textDecoration: "none" }}>
                  <button className="edit button-icon">
                    <EditIcon />
                  </button>
                </Link>
                <button
                  onClick={() => handleDelete(record._id)}
                  className="button-icon trash"
                >
                  <DeleteIcon />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AttendanceList;
