import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/toast";

const Register = () => {
  const [signUpInfo, setsignUpInfo] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newInfo = { ...signUpInfo };
    newInfo[name] = value;
    setsignUpInfo(newInfo);
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password } = signUpInfo;
    if (!name || !email || !password) {
      return handleError("All fields are required");
    }
    try {
      const url = "https://mern-auth-app-backend-kappa.vercel.app/api/auth/register";
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpInfo),
      });
      const data = await response.json();
      const { success, message, error } = data;
      if (success) {
        setTimeout(() => {
          handleSuccess(message);
          navigate("/login");
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
          <h1 className="text-3xl text-center font-bold mb-4">Register</h1>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="name"
                className="mb-2 text-gray-600 font-semibold"
              >
                Name:
              </label>
              <input
                type="text"
                onChange={handleChange}
                id="name"
                name="name"
                placeholder="Name"
                className="p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="flex flex-col mb-4">
              <label
                htmlFor="email"
                className="mb-2 text-gray-600 font-semibold"
              >
                Email:
              </label>
              <input
                type="text"
                onChange={handleChange}
                id="email"
                name="email"
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
                onChange={handleChange}
                id="password"
                name="password"
                placeholder="password"
                className="p-2 border border-gray-300 rounded outline-none"
              />
            </div>
            <div className="flex flex-col mb-4">
              <button className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded cursor-pointer">
                Register
              </button>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Already have an account?</p>
              <Link to="/login" className="text-blue-500 hover:underline">
                Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
