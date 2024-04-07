import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import "react-quill/dist/quill.snow.css";
import DOMPurify from "isomorphic-dompurify";
import { createPost } from "@/api/posts";

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
    toolbar: {
      container: [
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
    },
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

  const handlePost = () => {
    const token = localStorage.getItem("jwt");
    if (title == null && content == null) {
      alert("empty post write something");
    } else {
      createPost(token, { title, content, category });
    }
    console.log("Posting the blog...");
  };

  return (
    <div className="min-h-screen flex justify-center">
      <div className="max-w-screen-lg w-full bg-white rounded-lg shadow-2xl p-6 relative flex-grow">
        <div className="pb-4">
          <label for="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            name="title"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></input>

          <label for="category">category</label>
          <input
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            name="category"
            class="w-full bg-white rounded border border-gray-300 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 resize-none leading-6 transition-colors duration-200 ease-in-out"
          ></input>
        </div>
        {typeof window !== "undefined" && (
          <ReactQuill
            theme="snow"
            value={content}
            onChange={setContent}
            modules={modules}
            ref={quillRef} // Assign ref to the Quill component
          />
        )}
      </div>
      <div className="flex flex-col items-end ml-4">
        {" "}
        {/* Added ml-4 for left margin */}
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
