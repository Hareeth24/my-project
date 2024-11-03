import React, { useState } from "react";
import AddPost from "../components/AddPost";
import { PostData } from "../context/PostContext";
import PostCard from "../components/PostCard";
import { FaArrowUp, FaArrowDownLong } from "react-icons/fa6";
import { Loading } from "../components/Loading";

const Reels = () => {
  const { reels, loading } = PostData();
  const [index, setIndex] = useState(0);

  const prevReel = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };
  const nextReel = () => {
    if (index < reels.length - 1) {
      setIndex(index + 1);
    }
  };

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-10 pb-20">
          <AddPost type="reel" />
          <div className="flex flex-col items-center mb-4">
            {reels && reels.length > 0 ? (
              <PostCard key={reels[index]._id} value={reels[index]} type={"reel"} />
            ) : (
              <p className="text-gray-500">No reels yet</p>
            )}
          </div>
          <div className="flex gap-6">
            <button
              className={`bg-gray-500 text-white py-3 px-5 rounded-full ${index === 0 ? "hidden" : ""}`}
              onClick={prevReel}
              disabled={index === 0} // Disable button if at the first reel
            >
              <FaArrowUp />
            </button>
            <button
              className={`bg-gray-500 text-white py-3 px-5 rounded-full ${index === reels.length - 1 ? "hidden" : ""}`}
              onClick={nextReel}
              disabled={index === reels.length - 1} // Disable button if at the last reel
            >
              <FaArrowDownLong />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Reels;
