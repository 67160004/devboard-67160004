import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import PostCard from "../components/PostCard";
import LoadingSpinner from "../components/LoadingSpinner";

function SearchPage() {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q") || ""; // ดึงคำค้นหาจาก URL

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPosts() {
      setLoading(true);
      const res = await fetch("https://jsonplaceholder.typicode.com/posts");
      const data = await res.json();

      // กรองโพสต์ตามคำค้นหา
      const filtered = data.filter((post) =>
        post.title.toLowerCase().includes(q.toLowerCase()),
      );

      setPosts(filtered);
      setLoading(false);
    }
    fetchPosts();
  }, [q]);

  if (loading) return <LoadingSpinner />;

  return (
    <div style={{ maxWidth: "700px", margin: "2rem auto", padding: "0 1rem" }}>
      <h2
        style={{ borderBottom: "2px solid #1e40af", paddingBottom: "0.5rem" }}
      >
        ผลการค้นหา: "{q}" ({posts.length} รายการ)
      </h2>

      {posts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#718096", padding: "2rem" }}>
          ไม่พบโพสต์ที่ตรงกับคำค้นหา
        </p>
      ) : (
        posts.map((post) => <PostCard key={post.id} post={post} />)
      )}
    </div>
  );
}

export default SearchPage;
