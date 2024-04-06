import React, { useEffect } from "react";
import DOMPurify from "isomorphic-dompurify";
import { fetchPostById } from "@/api/posts";
import { useRouter } from "next/router";
const PostDetailById = () => {
  const router = useRouter();
  const { postId } = router.query;
  const [displayContent, setDisplayContent] = useState("");
  const clean = DOMPurify.sanitize(displayContent);

  return (
    <div className="bg-white ">
      <section></section>
    </div>
  );
};

export default PostDetailById;
