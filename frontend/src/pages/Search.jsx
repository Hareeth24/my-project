import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { LoadingAnimation } from "../components/Loading";

const Search = () => {
  const COLORS = {
    beige: "#e0e5ec", // Lighter background for neumorphism
    container: "#ecf0f3", // Slightly off-white background for container
    teal: "#0fb9b1", // Accent color for button
    textGray: "#1f2937",
  };

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  async function fetchUsers() {
    setLoading(true);
    try {
      const { data } = await axios.get("/api/user/all?search=" + search);
      setUsers(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-gray-100 min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center neumorphism-container p-6">
        <div className="search flex justify-between items-center gap-4 mb-4 w-full">
          <input
            type="text"
            className="neumorphism-input"
            placeholder="Enter Name"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button
            onClick={fetchUsers}
            className="neumorphism-btn"
          >
            Search
          </button>
        </div>
        {loading ? (
          <LoadingAnimation />
        ) : (
          <>
            {users && users.length > 0 ? (
              users.map((e) => (
                <Link
                  key={e._id}
                  className="mt-3 px-3 py-2 bg-gray-300 rounded-md flex justify-center items-center gap-3 neumorphism-btn"
                  to={`/user/${e._id}`}
                >
                  <img
                    src={e.profilePic.url}
                    alt=""
                    className="w-8 h-8 rounded-full"
                  />
                  {e.name}
                </Link>
              ))
            ) : (
              <p>No User please Search</p>
            )}
          </>
        )}
      </div>

      <style jsx>{`
        .neumorphism-container {
          background-color: #FFF4B7;
          border-radius: 20px;
          width: 90%;
          max-width: 500px;
          box-shadow: 8px 8px 16px #babecc, -8px -8px 16px #ffffff;
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
          
        }

        .neumorphism-btn {
          background-color: ${COLORS.teal};
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
      `}</style>
    </div>
  );
};

export default Search;
