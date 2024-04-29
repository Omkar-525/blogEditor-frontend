import React from "react";
import { RiAddLine } from "react-icons/ri";
import { useRouter } from "next/router";

const PostButton = () => {
  const router = useRouter();

  const redirectToPostPage = () => {
    // Redirect to the post page
    router.push("/post");
  };

  return (
    <div
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
    >
      <button
        onClick={redirectToPostPage}
        style={{
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "50%", // Making button round
          width: "50px", // Adjust width and height to make the button bigger
          height: "50px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.5)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <RiAddLine size={24} /> {/* Plus sign icon */}
      </button>
    </div>
  );
};

export default PostButton;
