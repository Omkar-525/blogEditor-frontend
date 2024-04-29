import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import PostCard from "@/components/PostCard";
import PostButton from "@/components/post";
import FeedbackButton from "@/components/feedback";

const Profile = () => {
  const router = useRouter();
  // State to store user posts
  const [showModal, setShowModal] = useState(false);
  const [userPosts, setUserPosts] = useState([]);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [user, setUser] = useState(null); // Initialize user state with null

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const jwt = localStorage.getItem("jwt");
    if (!storedUser || !jwt) {
      router.push("/login");
    } else {
      setUser(JSON.parse(storedUser)); // Set user state if available
    }
  }, [router]); // Add router to dependency array

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const token = localStorage.getItem("jwt"); // Replace with your JWT token
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

  const handleDeletePost = async (postId) => {
    try {
      const token = localStorage.getItem("jwt");
      const response = await fetch(`http://localhost:8080/post/${postId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      // Remove the deleted post from the userPosts state
      setUserPosts(userPosts.filter((post) => post.id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <div className="bg-white dark:bg-black min-h-screen">
      {/* Main Content */}
      <PostButton />
      <div className="flex flex-col lg:flex-row items-start justify-center mt-8">
        {/* Left Section: User Details */}
        {user &&
          user.name &&
          user.username &&
          user.email && ( // Add conditional rendering to ensure user data is available
            <div className="w-full lg:w-1/4 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg shadow-md p-6 border-t-4 border-gray-300 mt-5">
              <div className="flex flex-col items-center">
                {/* User Name */}
                <div className="mb-2">
                  <span className="font-semibold mr-2">Name:</span> {user.name}
                </div>

                {/* Username */}
                <div className="mb-2">
                  <span className="font-semibold mr-2">Username:</span>{" "}
                  {user.username}
                </div>

                {/* Email */}
                <div className="mb-2">
                  <span className="font-semibold mr-2">Email:</span>{" "}
                  {user.email}
                </div>

                {/* Edit Profile Button */}
                <button
                  onClick={() => setShowModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4 transition duration-300 ease-in-out"
                >
                  Edit Profile
                </button>
              </div>
              {showModal && (
                <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50 dark:bg-opacity-50 z-50">
                  <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md relative z-50">
                    <h2 className="text-xl font-bold mb-4 text-gray-900 dark:text-gray-100">
                      Change Password
                    </h2>
                    <form onSubmit={handleEditProfile}>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          Current Password
                        </label>
                        <input
                          type="password"
                          value={currentPassword}
                          onChange={(e) => setCurrentPassword(e.target.value)}
                          className="p-2 border rounded w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          New Password
                        </label>
                        <input
                          type="password"
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          className="p-2 border rounded w-full"
                        />
                      </div>
                      <div className="mb-4">
                        <label className="block text-sm font-medium mb-2">
                          Confirm New Password
                        </label>
                        <input
                          type="password"
                          value={confirmNewPassword}
                          onChange={(e) =>
                            setConfirmNewPassword(e.target.value)
                          }
                          className="p-2 border rounded w-full"
                        />
                      </div>
                      <div className="flex justify-between">
                        <button
                          type="submit"
                          className="bg-blue-500 text-white px-4 py-2 rounded"
                        >
                          Change Password
                        </button>
                        <button
                          type="button"
                          className="text-gray-500"
                          onClick={() => setShowModal(false)}
                        >
                          Close
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </div>
          )}

        {/* Divider */}
        <div className="w-px bg-gray-300 dark:bg-gray-600 my-6 mx-0 lg:mx-6"></div>

        {/* Right Section: User Posts */}
        <div className="w-px bg-gray-300 dark:bg-gray-600 my-6 mx-0 lg:mx-6"></div>
        <div className="flex-1 w-full rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4 text-center text-black dark:text-white">
            My Posts
          </h2>
          {userPosts.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-400">
              You haven't posted anything yet.
            </p>
          ) : (
            <div className="pt-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {userPosts.map((post, index) => (
                  <div key={index}>
                    <PostCard post={post} />
                    <button
                      onClick={() => handleDeletePost(post.id)}
                      className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded mt-2"
                    >
                      Delete
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;
