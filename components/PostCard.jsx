const DOMPurify = require("isomorphic-dompurify");
const { useEffect, useState } = require("react");

const PostCard = ({ post }) => {
  const [content, setContent] = useState("");

  useEffect(() => {
    let purified = DOMPurify.sanitize(post.content.substring(0, 10));

    setContent(purified);
  });

  return (
    <div key={post.id} className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-1">{post.title}</h3>
      <p
        className="text-gray-600 overflow-hidden"
        style={{ maxHeight: "3em", lineHeight: "1.5em" }}
      >
        <div
          className="text-left"
          dangerouslySetInnerHTML={{ __html: content }}
        />
      </p>
      <p
        className="black overflow-hidden"
        style={{ maxHeight: "3em", lineHeight: "1.5em" }}
      >
        {post.category}
      </p>

      {/* Link to full post or other actions */}
      <a
        href={`/post/${post.id}`}
        className="text-blue-500 mt-2 inline-block transition duration-300 ease-in-out transform hover:scale-105"
      >
        Read More
      </a>
    </div>
  );
};

export default PostCard;
