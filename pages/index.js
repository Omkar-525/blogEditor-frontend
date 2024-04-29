import Link from "next/link";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/api/posts";
import PostCard from "@/components/PostCard";
import PostButton from "@/components/post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const jwt = localStorage.getItem("jwt");
    if (storedUser && jwt) {
      setIsLoggedIn(true);
    }
  }, []);

  return (
    <div className="bg-white dark:bg-black">
      <div className="text-center font-bold text-2xl mt-10 text-black dark:text-white">
        Get started with CodeBlog
      </div>
      <ul className="divide-y divide-gray-200 px-2 pt-5 dark:divide-gray-600">
        {posts.map((post, index) => (
          <li
            key={index}
            className="py-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 px-4 bg-gray-100 dark:bg-gray-900"
            style={{ marginBottom: "1rem" }} // Added margin-bottom for spacing between posts
          >
            <PostCard post={post} />
          </li>
        ))}
      </ul>
      {isLoggedIn && <PostButton />}
    </div>
  );
};

export default Home;
