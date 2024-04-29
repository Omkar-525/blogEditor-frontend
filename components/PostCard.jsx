const DOMPurify = require("isomorphic-dompurify");
const { useEffect, useState } = require("react");

const PostCard = ({ post }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    let purified = DOMPurify.sanitize(post.content.substring(0, 10));

    setContent(purified);
  });

  return (
    <div
      key={post.id}
      className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4"
    >
      <h3 className="text-lg font-semibold mb-1 text-black dark:text-white">
        {post.title}
      </h3>
      <p
        className="text-gray-600 dark:text-gray-400 overflow-hidden"
        style={{ maxHeight: "3em", lineHeight: "1.5em" }}
      >
        <div
          className="text-left"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </p>
      <p
        className="text-black dark:text-white overflow-hidden"
        style={{ maxHeight: "3em", lineHeight: "1.5em" }}
      >
        {post.category}
      </p>

      {/* Link to full post or other actions */}
      <a
        href={`/post/${post.id}`}
        className="text-blue-500 dark:text-blue-300 mt-2 inline-block transition duration-300 ease-in-out transform hover:scale-105"
      >
        Read More
      </a>
    </div>
  );
};

export default PostCard;
