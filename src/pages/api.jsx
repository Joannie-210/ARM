
import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL;
        const response = await axios.get(`${baseURL}/posts`);
        setPosts(response.data);
      } catch (err) {
        console.log(err);
        setError("Failed to fetch posts. Please try again. " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div style={{ padding: "20px", maxWidth: "800px", margin: "auto" }}>
      <h2>Post List</h2>

      {loading && <p>Loading posts...</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <table className="w-full border-2 border-black border-collapse">
        <thead>
          <tr className="border-2 border-black">
            <th className="border-2 border-black p-2">ID</th>
            <th className="border-2 border-black p-2">Title</th>
            <th className="border-2 border-black p-2">Body</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post.id} className="border-2 border-black">
              <td className="border-2 border-black p-2">
                <Link to={`/user/${post.id}`} className="text-blue-500 hover:underline">
                  {post.id}
                </Link>
              </td>
              <td className="border-2 border-black p-2">{post.title}</td>
              <td className="border-2 border-black p-2">{post.body}</td>
            </tr>
          ))}
        </tbody>
      </table>
      )}
    </div>
  );
};

export default Posts;
