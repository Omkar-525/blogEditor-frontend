import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Nav from "@/components/nav";
import { getUserPosts } from "@/api/posts"; // Import the API call function

const Profile = () => {
  const router = useRouter();
  // State to store user posts
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState({});

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const jwt = localStorage.getItem("jwt");
    if (!storedUser || !jwt) {
      router.push("/login");
    }
    setUser(JSON.parse(storedUser));
    console.log(JSON.parse(storedUser));
  }, []);

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Replace with your JWT token
        console.log("JWT token:", token); // Debug log
        const response = await fetch("http://localhost:8080/user/post", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch user posts");
        }
        const data = await response.json();
        console.log("API response:", data); // Debug log
        setUserPosts(data.posts); // Assuming the response contains a field named "posts" containing the array of posts
      } catch (error) {
        console.error("Error fetching user posts:", error);
      }
    };

    fetchUserPosts();
  }, []);

  const handleEditProfile = () => {
    // Handle edit profile action
    console.log("Editing profile...");
  };
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Main Content */}
      <div className="flex flex-col lg:flex-row items-start justify-center mt-8">
        {/* Left Section: User Details */}
        <div className="w-full lg:w-1/4 bg-white text-gray-800 rounded-lg shadow-md p-6 border-t-4 border-gray-300">
          <div className="flex flex-col items-center">
            {/* User Image */}
            <div className="relative rounded-full overflow-hidden h-24 w-24 mb-4">
              <Image
                src={"/public/assets/images/test.png"} // Replace with the path to the user's image
                alt="User profile"
                className="rounded-full object-cover w-full h-full bg-slate-200"
                width={40}
                height={40}
              />
            </div>

            {/* User Name */}
            <div className="mb-2">
              <span className="font-semibold mr-2">Name:</span> {user["name"]}
            </div>

            {/* Username */}
            <div className="mb-2">
              <span className="font-semibold mr-2">Username:</span>{" "}
              {user["username"]}
            </div>

            {/* Description */}
            <div className="mb-2">
              <span className="font-semibold mr-2">Description:</span>{" "}
              {user["description"]}
            </div>

            {/* Email */}
            <div className="mb-2">
              <span className="font-semibold mr-2">Email:</span> {user["email"]}
            </div>

            {/* Edit Profile Button */}
            <button
              onClick={handleEditProfile}
              className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 transition duration-300 ease-in-out"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-300 my-6 mx-0 lg:mx-6"></div>

        {/* Right Section: User Posts */}
        <div className="flex-1 w-full rounded-lg p-6 ">
          <h2 className="text-2xl font-semibold mb-4 text-center">My Posts</h2>
          {userPosts.length === 0 ? (
            <p className="text-gray-600">You haven't posted anything yet.</p>
          ) : (
            <>
              {/* Iterate over user posts and map them into list items */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userPosts.map((post, index) => (
                  <div
                    key={post.id}
                    className="bg-white rounded-lg shadow-md p-4"
                  >
                    <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
                    <p
                      className="text-gray-600 overflow-hidden"
                      style={{ maxHeight: "3em", lineHeight: "1.5em" }}
                    >
                      {post.content}
                    </p>
                    <p
                      className="black overflow-hidden"
                      style={{ maxHeight: "3em", lineHeight: "1.5em" }}
                    >
                      {post.category}
                    </p>

                    {/* Link to full post or other actions */}
                    <a
                      href="#"
                      className="text-blue-500 mt-2 inline-block transition duration-300 ease-in-out transform hover:scale-105"
                    >
                      Read More
                    </a>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
