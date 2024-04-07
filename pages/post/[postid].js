import React, { useEffect, useState } from "react";
import DOMPurify from "isomorphic-dompurify";
import { fetchPostById } from "@/api/posts";
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

  return (
    <div className="bg-white flex justify-center items-center pt-10">
      <div className="text-center border-3 border-gray-300 rounded-lg p-8 shadow-xl w-full max-w-3xl">
        <h1 className="text-2xl font-bold pb-6">{title}</h1>
        <div
          className="text-left"
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
