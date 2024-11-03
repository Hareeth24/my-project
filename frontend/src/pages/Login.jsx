import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const { loginUser, loading } = UserData();
  const { fetchPosts } = PostData();

  const submitHandler = (e) => {
    e.preventDefault();
    loginUser(email, password, navigate, fetchPosts);
  };

  return (
    <>
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex justify-center min-h-screen items-center bg-[#f2f2ef]">
          <div className="flex flex-col md:flex-row neumorphism-container max-w-4xl w-[90%] md:w-[60%]">
            <div className="w-full md:w-2/3 p-6">
              <div className="text-xl flex flex-col justify-center items-center py-4">
                <h1 className="font-semibold text-2xl md:text-3xl text-gray-700 mb-4">
                  Login to Social Media
                </h1>
              </div>

              <form onSubmit={submitHandler}>
                <div className="flex flex-col items-center space-y-6 md:space-y-8">
                  <input
                    type="email"
                    className="neumorphism-input"
                    placeholder="User Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                  <input
                    type="password"
                    className="neumorphism-input"
                    placeholder="User Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <div className="text-center mt-8">
                  <button className="neumorphism-btn">Login</button>
                </div>
              </form>
            </div>

            <div className="w-full md:w-1/3 neumorphism-gradient flex flex-col items-center justify-center p-6 text-white text-center rounded-r-xl">
              <h1 className="text-3xl font-semibold mb-4">Don't Have an Account?</h1>
              <p className="text-base mb-6">Register to Social Media</p>
              <Link
                to="/register"
                className="bg-white text-emerald-400 px-6 py-2 rounded-xl font-semibold shadow-md hover:shadow-lg"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      )}
      <style jsx>{`
        .neumorphism-container {
          background-color: #BED7DC;
          border-radius: 20px;
          padding: 20px;
          
        }

        .neumorphism-input {
          background-color: #F5F5F5;
          border-radius: 12px;
          padding: 12px;
          width: 100%;
          color: #1f2937;
          box-shadow: inset 6px 6px 10px #babecc, inset -6px -6px 10px #ffffff;
          border: none;
          transition: box-shadow 0.2s;
        }

        .neumorphism-input:focus {
          outline: none;
          box-shadow: inset 4px 4px 8px #babecc, inset -4px -4px 8px #ffffff;
        }

        .neumorphism-btn {
          background-color: #074173;
          color: white;
          border: none;
          padding: 10px 20px;
          border-radius: 20px;
          cursor: pointer;
          
          transition: box-shadow 0.2s;
        }

        .neumorphism-btn:hover {
          box-shadow: 4px 4px 8px #babecc, -4px -4px 8px #ffffff;
        }

        .neumorphism-gradient {
          background: linear-gradient(to left, #240750, #344C64);
          border-radius: 20px 20px 20px 0;
          
        }
      `}</style>
    </>
  );
};

export default Login;
