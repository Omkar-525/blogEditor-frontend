import Nav from "@/components/nav";
import React, { useState, useEffect } from "react";
import Image from "next/image";

const Profile = () => {
  // State to store user posts
  const [userPosts, setUserPosts] = useState([]);

  // Simulate fetching data
  useEffect(() => {
    // Replace this with your actual fetch call
    const fetchUserPosts = async () => {
      // Example static data
      const postsData = [
        {
          id: 1,
          title: "Post Title 1",
          excerpt: "This is a summary of post 1...",
        },
        {
          id: 2,
          title: "Post Title 2",
          excerpt: "This is a summary of post 2...",
        },
        {
          id: 3,
          title: "Post Title 3",
          excerpt: "This is a summary of post 2...",
        }
        // ...more posts
      ];
      setUserPosts(postsData);
    };

    fetchUserPosts();
  }, []);

  // Dummy user object
  const dummyUser = {
    name: "John Doe",
    username: "johndoe123",
    email: "johndoe@example.com",
    description: "description",
    profileImage: "/path-to-your-user-image.jpg",
  };

  return (
    <div className="">
      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <div className="flex items-stretch mt-8">
        {/* Left Section: User Details */}
        <div className="w-full lg:w-1/4 bg-white text-gray-800 rounded-lg shadow-md p-6 border-t-4 border-gray-300">
          <div className="flex flex-col items-center">
            {/* User Image */}
            <div className="relative rounded-full overflow-hidden h-24 w-24 mb-4">
              <Image 
                src={dummyUser.profileImage} // Replace with the path to the user's image
                alt="User profile"
                className="rounded-full object-cover w-full h-full bg-slate-200"
                width={40}
                height={40}
              />
            </div>

            {/* User Name */}
            <div className="mb-2">
              <span className="font-semibold mr-2">Name:</span>{" "}
              {dummyUser.name}
            </div>

            {/* Username */}
            <div className="mb-2">
              <span className="font-semibold mr-2">Username:</span>{" "}
              {dummyUser.username}
            </div>

            {/* Description */}
            <div className="mb-2">
              <span className="font-semibold mr-2">Description:</span>{" "}
              {dummyUser.description}
            </div>

            {/* Email */}
            <div className="mb-2">
              <span className="font-semibold mr-2">Email:</span>{" "}
              {dummyUser.email}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="w-px bg-gray-300 my-6 mx-6"></div>

 {/* Right Section: User Posts */}
<div className="flex-1 bg-white rounded-lg shadow-md p-6 border-t-4 border-gray-300">
<h2 className="text-xl font-semibold mb-4">My Posts</h2>
<ul>
  {/* Iterate over user posts and map them into list items */}
  {userPosts.map((post, index) => (
    <li key={post.id} className="mb-4 pl-4 relative">
      <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
      <p className="text-gray-600">{post.excerpt}</p>
      {/* Link to full post or other actions */}
      <a href="#" className="text-blue-500 mt-2">
        Read More
      </a>
      {/* Darker inline block as separator */}
      {index !== userPosts.length - 1 && <div className="bg-gray-800 rounded-2xl my-2 mx-auto" style={{ width: "50px", height: "4px" }}></div>}
    </li>
  ))}
</ul>
</div>


</div>
</div>
);
};

export default Profile;
