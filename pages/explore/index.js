import React from "react";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/api/posts";
import { useRouter } from "next/router";

const Explore = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const jwt = localStorage.getItem("jwt");
    if (!storedUser || !jwt) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getAllPosts();
        console.log("response :>> ", response);
        if (response.httpStatus === "OK") {
          setPosts(response.posts);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="pt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Explore;
