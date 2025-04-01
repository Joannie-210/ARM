import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const baseURL = import.meta.env.VITE_API_BASE_URL; // Ensure it matches Posts.jsx
        const response = await axios.get(`${baseURL}/users/${id}`);
        setUser(response.data);
      } catch (err) {
        setError("Failed to fetch profile: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser(); 
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;
  if (!user) return <p>User not found.</p>;

  return (
    <div className="border-2 border-gray-500 p-5 flex flex-col items-center justify-center w-80 m-auto mt-40">
      <h2>User Profile</h2>
      <p><strong>ID:</strong> {user.id}</p>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Username:</strong> {user.username}</p>

      <Link to="/Api" className="mt-3 text-blue-500 underline">
        Back to Posts
      </Link>
    </div>
  );
};

export default UserProfile;
