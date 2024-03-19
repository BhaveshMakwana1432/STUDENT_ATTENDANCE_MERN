import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import Register from "./pages/register/Register";
import LogIn from "./pages/login/LogIn";
import Dashboard from "./pages/Dashboard";
import UpdateAttendance from "../src/components/UpdateAttendance";
import AttendanceForm from "./components/AttendanceForm";

function App() {
  let isUser = true;
  let user;
  if (localStorage.getItem("user") == null) {
    isUser = false;
  }
  if (localStorage.getItem("user") != null) {
    isUser = true;
    user = JSON.parse(localStorage.getItem("user"));
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={isUser ? <Dashboard /> : <Register />} />
        <Route path="/addNew" element={<AttendanceForm />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/:id" element={<UpdateAttendance />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
