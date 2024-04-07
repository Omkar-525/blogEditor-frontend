const PostButton = () => {
  return (
    <div
      style={{ position: "fixed", bottom: "20px", right: "20px", zIndex: 1000 }}
    >
      <button
        onClick={() => setShowForm(!showForm)}
        style={{
          backgroundColor: "#007BFF",
          color: "#FFF",
          border: "none",
          borderRadius: "5px",
          padding: "10px 20px",
          fontSize: "16px",
          cursor: "pointer",
          boxShadow: "0px 0px 10px rgba(0, 123, 255, 0.5)",
        }}
      >
        Post
      </button>
    </div>
  );
};

export default PostButton;
