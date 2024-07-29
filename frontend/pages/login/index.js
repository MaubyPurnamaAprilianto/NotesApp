import axios from "axios";
import React, { useState } from "react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://localhost:5000/auth/login", {
        email,
        password,
      });
      console.log(response.data);
      const { token } = response.data;
      localStorage.setItem("authToken", token);
      alert("Login successful!");
      window.location.href = "/notes";
      // Redirect to another page or update state as needed
    } catch (error) {
      setError("Invalid email or password.");
      console.error("Error during login:", error);
    }
  };

  return (
    <>
      <div className="w-full h-screen  flex justify-center items-center bg-gray-100 px-[10%] py-8">
        <div className="w-full h-full bg-white  rounded-lg shadow-lg flex justify-between items-center text-black">
          <div className="mb-8 w-[50%] p-8">
            <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
            <form onSubmit={handleSubmit}>
              <div className="py-6">
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="email"
                  >
                    Email
                  </label>
                  <input
                    className="w-full border border-gray-200 p-2 bg-gray-100 rounded"
                    placeholder="Masukan Email"
                    type="email"
                    id="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div className="mb-4">
                  <label
                    className="block text-gray-700 font-bold mb-2"
                    htmlFor="password"
                  >
                    Password
                  </label>
                  <input
                    className="w-full border border-gray-200 p-2 bg-gray-100 rounded"
                    placeholder="Masukan Password"
                    type="password"
                    id="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
              <span className="block text-gray-700 font-bold mb-2">Apakah belum punya akun?<a href="/register" className="text-blue-500">Register</a></span>
              </div>
              <div className="mb-4">
                <button
                  className="bg-blue-500 text-white w-full p-3 rounded hover:bg-blue-600"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="w-[70%] h-full p-8 flex justify-center items-center bg-blue-500 rounded-lg">
            <img
              src="https://via.placeholder.com/500x500.png?text=Login+Image"
              alt="Login Image"
              className="w-[40%] h-[40%]"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
