import axios from "axios";

const BASE_URL = "http://localhost:8080/user/post";

export const getUserPosts = async (token) => {
  try {
    const response = await axios.get(`${BASE_URL}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data || [];
  } catch (error) {
    console.error("Error fetching user posts:", error);
    return [];
  }
};

export const fetchPostById = (postId) => {
  return axios
    .get(`${BASE_URL}/${postId}`)
    .then((response) => {
      if (
        response.status == 200 &&
        response.data &&
        typeof response.data.data === "object"
      ) {
        return response.data.data;
      }
      throw new Error("Error Fetching post.");
    })
    .catch(handleError);
};

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/all`);
    return response.data || [];
  } catch (error) {
    console.error("Error fetching all posts:", error);
    return [];
  }
};

export const createPost = async (token, postData) => {
  try {
    const response = await axios.post(`${BASE_URL}`, postData, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating post:", error);
    return null;
  }
};

export const deletePost = async (token, postId) => {
  try {
    const response = await axios.delete(`${BASE_URL}/user/posts/${postId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting post:", error);
    return null;
  }
};

const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    throw new Error(`Error: ${error.response.data.message || "Server Error"}`);
  } else if (error.request) {
    // The request was made but no response was received
    throw new Error("No response received from server.");
  } else {
    // Something happened in setting up the request that triggered an Error
    throw new Error(`Error: ${error.message}`);
  }
};
