// UserForm.js

import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser, updateUserDetails } from "../userSlice";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { setToken } from "../authSlice";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [phone, setPhone] = useState("");
  const [isRegistered, setIsRegistered] = useState(true);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/login", {
        email,
        password,
      });

      const token = response.data.token;

      dispatch(setToken(token));
      navigate("/taskboard");
    } catch (error) {
      console.error("Login failed", error);
      setIsRegistered(false);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:8080/api/register", {
        email,
        password,
        name,
        role,
        phone,
      });
      setIsRegistered(true);
    } catch (error) {
      console.error("Registration failed", error);
    }
  };

  return (
    <div>
      {isRegistered ? (
        // Show Login form
        <div className="bg-indigo-500 flex flex-col justify-center items-center h-screen">
          <div className="bg-teal-400  p-4 w-1/3 rounded-2xl">
            <h2 className="text-center font-bold">Login</h2>
            <form className="flex flex-col m-2">
              <label>Email:</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded-lg my-2"
              />

              <label>Password:</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded-lg my-2 "
              />

              <button
                type="button"
                onClick={handleLogin}
                className="bg-indigo-800 my-2 rounded-lg p-2 text-white"
              >
                Login
              </button>
              <button
                className="bg-indigo-800 my-2 rounded-lg p-2 text-white"
                onClick={() => setIsRegistered(false)}
              >
                New User
              </button>
            </form>
          </div>
        </div>
      ) : (
        // Show Registration form
        <div className="bg-indigo-500 flex flex-col justify-center items-center h-screen">
          <div className="bg-teal-400 p-4 w-1/3 rounded-lg">
            <h2 className="text-center">Registration</h2>
            <form className="flex flex-col">
              <label>Email:</label>
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="p-2 rounded-lg my-2"
              />

              <label>Password:</label>
              <input
                required
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-2 rounded-lg my-2"
              />

              <label>Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="p-2 rounded-lg my-2"
              />

              <label>Role:</label>
              <input
                type="text"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="p-2 rounded-lg my-2"
              />

              <label>Phone:</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="p-2 rounded-lg my-2"
              />

              <button
                type="button"
                onClick={handleRegister}
                className="bg-indigo-800 my-2 rounded-lg p-2 text-white"
              >
                Register
              </button>
              <button
                type="button"
                onClick={() => setIsRegistered(true)}
                className="bg-indigo-800 my-2 rounded-lg p-2 text-white"
              >
                Log In
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default LoginPage;
