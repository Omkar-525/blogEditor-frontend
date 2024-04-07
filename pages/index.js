import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/api/posts";
import PostCard from "@/components/PostCard";
import PostButton from "@/components/post";

const Home = () => {
  const [posts, setPosts] = useState([]);

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
    <div>
      <div className="text-center font-bold text-2xl mt-10">
        Get started with CodeBlog
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts.map((post, index) => (
          <PostCard post={post} key={index} />
        ))}
      </div>
    </div>
  );
};

export default Home;
