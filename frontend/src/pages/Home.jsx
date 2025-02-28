import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { handleError, handleSuccess } from "../utils/toast";

const Home = () => {
  const [loggedinUser, setloggedinUser] = useState("");
  const [products, setProducts] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("LoggedInUser");
    setloggedinUser(user);
  }, []);

  const fetchProducts = async () => {
    try {
      const url = "http://localhost:3000/api/products";
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
      });
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      handleError(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("LoggedInUser");
    setTimeout(() => {
      navigate("/login");
      handleSuccess("Logged out successfully");
    }, 1000);
  };

  return (
    <>
      <div className="flex p-3 items-center justify-between  bg-gray-200">
        <h1>{loggedinUser}</h1>
        <button
          className="bg-red-500 rounded-lg hover:bg-red-700 text-white font-bold py-1 px-4 cursor-pointer "
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
      <div>
        {products &&
          products?.map((product, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 border-b"
            >
              <h1>{product.name}</h1>
              <h1>{product.price}</h1>
            </div>
          ))}
      </div>
    </>
  );
};

export default Home;
