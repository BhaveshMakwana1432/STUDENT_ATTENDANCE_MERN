import React from "react";
import AttendanceForm from "../components/AttendanceForm";
import AttendanceList from "../components/AttendanceList";
import "./Dashboard.css";
import Topbar from "../components/Topbar";
function Dashboard() {
  return (
    <>
      <Topbar />
      <div className="dashboard-container">
        <div className="dashboard-content">
          <AttendanceList />
        </div>
      </div>
    </>
  );
}

export default Dashboard;
