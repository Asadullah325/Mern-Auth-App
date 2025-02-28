import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/toast";

const Login = () => {
  const [loginInfo, setloginInfo] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newInfo = { ...loginInfo };
    newInfo[name] = value;
    setloginInfo(newInfo);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { email, password } = loginInfo;
    if (!email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "https://mern-auth-app-backend-kappa.vercel.app/api/auth/login";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginInfo),
      });
      const data = await response.json();
      const { success, message, token, user, error } = data;
      if (success) {
        localStorage.setItem("token", token);
        localStorage.setItem("LoggedInUser", user.name);
        setTimeout(() => {
          navigate("/home");
          handleSuccess(message);
        }, 1000);
      } else if (error) {
        handleError(error);
      } else {
        handleError(message);
      }
    } catch (error) {
      handleError(error.message);
    }
  };

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen w-screen bg-gray-200">
        <div className="w-100 bg-white p-8 rounded-lg shadow-lg">
          <h1 className="text-3xl text-center font-bold mb-4">Login</h1>
          <form onSubmit={handleLogin}>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="email"
                className="mb-2 text-gray-600 font-semibold"
              >
                Email:
              </label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                id="email"
                placeholder="Email"
                className="p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="password"
                className="mb-2 text-gray-600 font-semibold"
              >
                Password:
              </label>
              <input
                type="password"
                id="password"
                name="password"
                onChange={handleChange}
                placeholder="password"
                className="p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="flex items-center justify-end mb-4">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="flex flex-col mb-4">
              <button className="w-full cursor-pointer bg-blue-500 hover:bg-blue-600 text-white py-2 rounded">
                Login
              </button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Don't have an account?</p>
              <Link to="/register" className="text-blue-500 hover:underline">
                Register
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
