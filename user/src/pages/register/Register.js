import axios from "axios";
import React, { useRef } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import "./register.css";

export default function Register() {
  const role = useRef();
  const email = useRef();
  const password = useRef();
  const passwordAgain = useRef();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    var user = {
      role: "",
      email: "",
      password: "",
    };
    e.preventDefault();
    if (passwordAgain.current.value !== password.current.value) {
      passwordAgain.current.setCustomValidity("Passwords don't match!");
    } else {
      user = {
        role: role.current.value,
        email: email.current.value,
        password: password.current.value,
      };

      try {
        await axios.post("http://localhost:5000/api/users/register", user);
        navigate("/login");
      } catch (e) {
        console.log(e);
      }
    }

    console.log(user);
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
              <div>
                <select className="loginInput selectOption" ref={role}>
                  <option value="">Select Role</option>
                  <option value="admin">admin</option>
                  <option value="user">user</option>
                </select>
              </div>
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
              <input
                placeholder="Password Again"
                required
                ref={passwordAgain}
                className="loginInput"
                type="password"
              />
              <button className="loginButton" type="submit">
                Register
              </button>
              <Link to={`/login`}>
                <button className="loginRegisterButton">LogIn</button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
