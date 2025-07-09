import axios from "axios";
import React, { createContext, useEffect, useState } from "react";

const PostContext = createContext();

const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  //   Get all post function
  const getAllPosts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get("/api/v1/post/get-all-post");
      setPosts(data?.posts);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  //   intially get the post from backend
  useEffect(() => {
    getAllPosts();
  }, []);

  return (
    <PostContext.Provider value={[posts, setPosts, getAllPosts]}>
      {children}
    </PostContext.Provider>
  );
};

export { PostContext, PostProvider };
