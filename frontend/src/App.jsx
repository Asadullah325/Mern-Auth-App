import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login";
import PageError from "./pages/PageError";
import Register from "./pages/Register";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Home from "./pages/Home";
import RefreshHandler from "./utils/RefreshHandler";

const App = () => {
  const [isAuthenticated, setisAuthenticated] = useState(false);

  const privateRoute = (Component) => {
    return isAuthenticated ? Component : <Navigate to="/login" />;
  };

  return (
    <>
      <Router>
        <RefreshHandler setisAuthenticated={setisAuthenticated} />
        <Routes>
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={privateRoute(<Home />)} />
          <Route path="/register" element={<Register />} />
          <Route path="*" element={<PageError />} />
        </Routes>
      </Router>
      <ToastContainer />
    </>
  );
};

export default App;
