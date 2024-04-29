import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "isomorphic-dompurify";
import { createPost } from "@/api/posts";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "react-quill/dist/quill.bubble.css"; // Import Quill bubble theme styles
import "react-quill/dist/quill.core.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

const Post = () => {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [content, setContent] = useState("");
  const [displayedContent, setDisplayedContent] = useState("");
  const quillRef = useRef(null);
  const clean = DOMPurify.sanitize(displayedContent);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const jwt = localStorage.getItem("jwt");
    if (!storedUser || !jwt) {
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    const savedContent = localStorage.getItem("markdownContent");
    if (savedContent) {
      setContent(savedContent);
    }
  }, []);

  const categories = ["Category 1", "Category 2", "Category 3"];

  const handleImageUpload = async (file) => {
    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const imgTag = `<img src="${dataUrl}" alt="${file.name}" />`;
      insertImage(imgTag);
    };
    reader.readAsDataURL(file);
  };

  const insertImage = (imgTag) => {
    const quill = quillRef.current.getEditor();
    const range = quill.getSelection();
    quill.clipboard.dangerouslyPasteHTML(range.index, imgTag);
  };

  const handleShowData = () => {
    const savedContent = localStorage.getItem("markdownContent");
    setDisplayedContent(savedContent);
  };

  const modules = {
    toolbar: [
      [{ header: "1" }, { header: "2" }, { font: [] }],
      [{ size: [] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image", "video"],
      ["clean"],
    ],
  };

  const saveContentToLocalStorage = () => {
    localStorage.setItem("markdownContent", content);
  };

  const handleSave = () => {
    // Save Markdown content to localStorage
    localStorage.setItem("markdownContent", content);
    // Trigger page refresh
    window.location.reload();
  };

  const handlePost = async () => {
    const token = localStorage.getItem("jwt");
    if (!title || !content) {
      alert("Please fill in all fields");
      return;
    }

    try {
      await createPost(token, { title, content, category });
      alert("Blog posted successfully");
      router.push("/profile");
    } catch (error) {
      console.error("Error posting blog:", error);
      alert("Failed to post blog. Please try again later.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center bg-gray-100 dark:bg-black">
      <div className="max-w-screen-lg w-full bg-white dark:bg-gray-800 rounded-lg shadow-2xl p-6 relative flex-grow">
        <div className="pb-4">
          <label htmlFor="title" className="text-gray-800 dark:text-white">
            Title
          </label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            className="w-full bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-white py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          />
          <label htmlFor="category" className="text-gray-800 dark:text-white">
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            className="w-full bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-white py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out mt-2"
          >
            <option value="">Select Category</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
        {typeof window !== "undefined" && (
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            className="bg-white dark:bg-gray-700 rounded border border-gray-300 dark:border-gray-600 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 dark:text-white py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
            style={{ backgroundColor: "#FFF", color: "#000" }} // Override toolbar styles
          />
        )}
      </div>
      <div className="flex flex-col items-end ml-4">
        <button
          onClick={handlePost}
          className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out mt-4"
        >
          Post Blog
        </button>
      </div>
    </div>
  );
};

export default Post;
