import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserData } from "../context/UserContext";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowDownLong, FaArrowUp } from "react-icons/fa6";
import Modal from "../components/Modal";
import axios from "axios";
import { Loading } from "../components/Loading";
import { CiEdit } from "react-icons/ci";
import toast from "react-hot-toast";

const Account = ({ user }) => {
  const navigate = useNavigate();

  const { logoutUser, updateProfilePic, updateProfileName } = UserData();
  const { posts, reels, loading } = PostData();

  const [type, setType] = useState("post");
  const [index, setIndex] = useState(0);
  const [show, setShow] = useState(false);
  const [show1, setShow1] = useState(false);
  const [followersData, setFollowersData] = useState([]);
  const [followingsData, setFollowingsData] = useState([]);
  const [file, setFile] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState(user.name || "");
  const [showUpdatePass, setShowUpdatePass] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    followData();
  }, [user]);

  const followData = async () => {
    try {
      const { data } = await axios.get(`/api/user/followdata/${user._id}`);
      setFollowersData(data.followers);
      setFollowingsData(data.followings);
    } catch (error) {
      console.error(error);
    }
  };

  const logoutHandler = () => {
    logoutUser(navigate);
  };

  const prevReel = () => index > 0 && setIndex(index - 1);
  const nextReel = () => index < myReels.length - 1 && setIndex(index + 1);

  const changeFileHandler = (e) => {
    setFile(e.target.files[0]);
  };

  const changleImageHandler = () => {
    const formData = new FormData();
    formData.append("file", file);
    updateProfilePic(user._id, formData, setFile);
  };

  const UpdateName = () => {
    updateProfileName(user._id, name, setShowInput);
  };

  const updatePassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`/api/user/${user._id}`, {
        oldPassword,
        newPassword,
      });
      toast.success(data.message);
      setOldPassword("");
      setNewPassword("");
      setShowUpdatePass(false);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const myPosts = posts?.filter((post) => post.owner._id === user._id);
  const myReels = reels?.filter((reel) => reel.owner._id === user._id);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-10 pb-20">
          {show && <Modal value={followersData} title="Followers" setShow={setShow} />}
          {show1 && <Modal value={followingsData} title="Followings" setShow={setShow1} />}

          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg flex flex-col items-center">
            <div className="image flex flex-col items-center mb-4 gap-4">
              <img
                src={user.profilePic.url}
                alt="Profile"
                className="w-[150px] h-[150px] rounded-full shadow-lg"
              />
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  onChange={changeFileHandler}
                  className="mb-2"
                  style={{ display: "none" }} // Hide the default file input
                  id="fileInput"
                />
                <label
                  htmlFor="fileInput"
                  className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded-md cursor-pointer"
                >
                  Choose File
                </label>
                <span className="text-gray-500">{file ? file.name : "No file chosen"}</span>
              </div>
              <button
                className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 rounded-md"
                onClick={changleImageHandler}
              >
                Update Profile Picture
              </button>
            </div>

            <div className="flex flex-col items-center gap-2">
              {showInput ? (
                <div className="flex gap-2 items-center">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter Name"
                    className="border border-gray-300 rounded-md p-2"
                    required
                  />
                  <button
                    onClick={UpdateName}
                    className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-3 py-1 rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowInput(false)}
                    className="bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-md"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <h2 className="text-xl font-semibold text-gray-700">
                  {user.name}{" "}
                  <button onClick={() => setShowInput(true)}>
                    <CiEdit className="inline" />
                  </button>
                </h2>
              )}
              <p className="text-gray-500">{user.email}</p>
              <p className="text-gray-500">{user.gender}</p>
              <div className="flex gap-5 mt-3">
                <button onClick={() => setShow(true)} className="text-blue-500">
                  {user.followers.length} Followers
                </button>
                <button onClick={() => setShow1(true)} className="text-blue-500">
                  {user.followings.length} Following
                </button>
              </div>
              <button onClick={logoutHandler} className="bg-gradient-to-r from-red-600 to-red-400 text-white rounded-md px-4 py-2 mt-4">
                Logout
              </button>
            </div>
          </div>

          <button
            onClick={() => setShowUpdatePass(!showUpdatePass)}
            className="bg-gradient-to-r from-blue-500 to-blue-800 text-white px-4 py-2 mt-6 rounded-md"
          >
            {showUpdatePass ? "Cancel" : "Update Password"}
          </button>

          {showUpdatePass && (
            <form onSubmit={updatePassword} className="bg-white p-6 rounded-md shadow-md mt-4 max-w-lg w-full">
              <div className="mb-4">
                <label htmlFor="oldPassword" className="block text-gray-700 mb-2">Old Password</label>
                <input
                  type="password"
                  id="oldPassword"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="newPassword" className="block text-gray-700 mb-2">New Password</label>
                <input
                  type="password"
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
              </div>
              <button type="submit" className="bg-gradient-to-r from-blue-500 to-blue-800 text-white rounded-md px-4 py-2">
                Update Password
              </button>
            </form>
          )}

          <div className="flex gap-4 mt-8">
            <button
              className={`px-4 py-2 rounded-md ${
                type === "post" ? "bg-gradient-to-r from-blue-500 to-blue-800 text-white" : "bg-gray-200"
              }`}
              onClick={() => setType("post")}
            >
              Posts
            </button>
            <button
              className={`px-4 py-2 rounded-md ${
                type === "reel" ? "bg-gradient-to-r from-blue-500 to-blue-800 text-white" : "bg-gray-200"
              }`}
              onClick={() => setType("reel")}
            >
              Reels
            </button>
          </div>

          <div className="mt-4 w-full">
            {type === "post" ? (
              myPosts.length > 0 ? (
                myPosts.map((post) => <PostCard key={post._id} post={post} />)
              ) : (
                <p className="text-gray-500">No Posts available</p>
              )
            ) : (
              myReels.length > 0 ? (
                myReels.map((reel) => <PostCard key={reel._id} post={reel} />)
              ) : (
                <p className="text-gray-500">No Reels available</p>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Account;
