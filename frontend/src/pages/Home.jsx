import React from "react";
import AddPost from "../components/AddPost";
import PostCard from "../components/PostCard";
import { PostData } from "../context/PostContext";
import { Loading } from "../components/Loading";

const Home = () => {
  const { posts, loading } = PostData();

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-10 pb-20">
          <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-lg flex flex-col items-center">
            <AddPost type="post" />
            <div className="w-full mt-4">
              {posts && posts.length > 0 ? (
                posts.map((e) => (
                  <PostCard value={e} key={e._id} type={"post"} />
                ))
              ) : (
                <p>No Posts Yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
