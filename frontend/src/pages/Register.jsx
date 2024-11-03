import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";

const Register = () => {
  const COLORS = {
    beige: "#e0e5ec", // Lighter background for neumorphism
    container: "#ecf0f3", // Slightly off-white background for container
    teal: "#0fb9b1", // Accent color for button
    textGray: "#1f2937",
  };

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [file, setFile] = useState("");
  const [filePrev, setFilePrev] = useState("");

  const { registerUser, loading } = UserData();
  const { fetchPosts } = PostData();

  const changeFileHandler = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onloadend = () => {
      setFilePrev(reader.result);
      setFile(file);
    };
  };

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();
    const formdata = new FormData();

    formdata.append("name", name);
    formdata.append("email", email);
    formdata.append("password", password);
    formdata.append("gender", gender);
    formdata.append("file", file);

    registerUser(formdata, navigate, fetchPosts);
  };

  return (
    <>
      {loading ? (
        <h1>Loading....</h1>
      ) : (
        <div className="flex justify-center items-center min-h-screen bg-[#f2f2ef]">
          <div className="flex flex-col justify-center items-center neumorphism-container p-6">
            {filePrev && (
              <img
                src={filePrev}
                className="profile-pic shadow-md"
                alt="Profile Preview"
              />
            )}
            <h1 className="text-2xl font-semibold text-gray-800 mb-6">
              Sign in to Social Media
            </h1>

            <form onSubmit={submitHandler} className="w-full">
              <div className="space-y-4">
                <input
                  type="file"
                  className="neumorphism-input"
                  onChange={changeFileHandler}
                  accept="image/*"
                  required
                />
                <input
                  type="text"
                  className="neumorphism-input"
                  placeholder="User Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
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
                <select
                  className="neumorphism-input"
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  required
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>
              <div className="text-center mt-8">
                <button className="neumorphism-btn">Register</button>
              </div>
            </form>

            <div className="mt-8 text-center text-gray-500">
              <p>Already have an account?</p>
              <Link to="/login" className="text-teal-500 font-semibold">
                Login
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
          width: 90%;
          max-width: 400px;
          
        }

        .neumorphism-input {
          background-color: ${COLORS.container};
          color: ${COLORS.textGray};
          border-radius: 12px;
          padding: 12px;
          width: 100%;
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

        .profile-pic {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          object-fit: cover;
          margin-bottom: 20px;
        }
      `}</style>
    </>
  );
};

export default Register;
