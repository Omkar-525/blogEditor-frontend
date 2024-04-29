import React from "react";
import PostCard from "@/components/PostCard";
import { useEffect, useState } from "react";
import { getAllPosts } from "@/api/posts";
import { useRouter } from "next/router";
import PostButton from "@/components/post";
import { SearchIcon } from "@heroicons/react/solid";

const Explore = () => {
  const router = useRouter();
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

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
  const filteredPosts = (posts || []).filter(
    (posts) =>
      posts.title &&
      posts.title.toLowerCase().includes(searchTerm.toLowerCase())
  ); // Filter splits based on search term

  return (
    <div className="bg-white dark:bg-black">
      <PostButton />
      <div className="relative flex justify-center w-full">
        <div className="w-full sm:w-3/4 md:w-1/2 lg:w-1/3 xl:w-1/4">
          <input
            type="text"
            placeholder="Search Post..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full border rounded-md text-black dark:text-gray-300 dark:bg-gray-800"
          />
        </div>
      </div>
      <ul className="divide-y divide-gray-200 px-2 pt-5 dark:divide-gray-600">
        {filteredPosts.map((post, index) => (
          <li
            key={index}
            className="py-4 border border-gray-300 rounded-lg shadow-md hover:shadow-lg transition duration-300 px-4 bg-gray-100 dark:bg-gray-900"
          >
            <PostCard post={post} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Explore;
