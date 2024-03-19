import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

import "./login.css";

export default function Register() {
  const email = useRef();
  const password = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();

    const data = {
      email: email.current.value,
      password: password.current.value,
    };

    try {
      const res = await axios.post(
        "http://localhost:5000/api/users/login",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      const { user, token } = res.data;
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("token", token);
      navigate("/");
      window.location.reload();
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div className="login">
        <div className="loginWrapper">
          <div className="loginLeft"></div>
          <div className="loginRight">
            <form className="loginBoxr" onSubmit={handleSubmit}>
              <h5 className="animate-charcter loginLogo">
                Student Attendance Data
              </h5>
              <input
                placeholder="Email"
                required
                ref={email}
                className="loginInput"
                type="email"
              />
              <input
                placeholder="Password"
                required
                ref={password}
                className="loginInput"
                type="password"
                minLength="6"
              />
              <button className="loginButton" type="submit">
                LogIn
              </button>
              <Link to={`/register`}>
                <button className="loginRegisterButton">Register</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
