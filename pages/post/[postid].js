import React, { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { fetchPostById } from "@/api/posts";
import { IoIosArrowBack } from "react-icons/io";
import { useRouter } from "next/router";

const PostDetailById = ({ post }) => {
  const router = useRouter();
  const { postId } = router.query;
  const [title, setTitle] = useState("");
  const [displayContent, setDisplayContent] = useState("");

  useEffect(() => {
    if (post && post.length > 0) {
      setTitle(post[0].title);
      setDisplayContent(DOMPurify.sanitize(post[0].content));
    }
  }, [postId]);

  const goBack = () => {
    window.history.back(); // Go back to previous page
  };

  return (
    <div className="bg-white dark:bg-black flex justify-center items-center pt-10">
      <div className="absolute top-0 left-0 mt-20 ml-4 z-10">
        <IoIosArrowBack
          className="text-blue-500 mr-2 cursor-pointer"
          size={24}
          onClick={goBack}
        />
        <span className="text-blue-500 text-lg cursor-pointer" onClick={goBack}>
          Go Back
        </span>
      </div>
      <div className="text-center border-3 border-gray-300 dark:border-white rounded-lg p-8 shadow-xl w-full max-w-3xl">
        <h1 className="text-2xl font-bold pb-6">{title}</h1>
        <div
          className="text-left text-gray-800 dark:text-white" // Adjust text color for dark mode
          dangerouslySetInnerHTML={{ __html: displayContent }}
        />
      </div>
    </div>
  );
};

export default PostDetailById;

export async function getServerSideProps(context) {
  const postId = context.params.postId;
  let post = await fetchPostById(postId);
  return {
    props: { post }, // will be passed to the page component as props
  };
}
