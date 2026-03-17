import { useState } from "react";
import PostCard from "./PostCard";
import LoadingSpinner from "./LoadingSpinner";
import PostCount from "./PostCount";
import { useFetch } from "../hooks/useFetch"; // ดึง Custom Hook มาใช้

function PostList({ favorites, onToggleFavorite }) {
  // ดึงข้อมูลด้วยบรรทัดเดียว! แถมดึง refetch มาให้ปุ่มโหลดใหม่ด้วย
  const { data, loading, error, refetch } = useFetch(
    "https://jsonplaceholder.typicode.com/posts",
  );

  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");
  const toggleSort = () => setSortOrder((e) => (e === "desc" ? "asc" : "desc"));
  const [currentPage, setCurrentPage] = useState(1);

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div
        style={{
          padding: "1.5rem",
          background: "#fff5f5",
          border: "1px solid #fc8181",
          borderRadius: "8px",
          color: "#c53030",
        }}
      >
        เกิดข้อผิดพลาด: {error}
      </div>
    );

  // เอาแค่ 20 โพสต์แรก
  const posts = data.slice(0, 20);

  // กรองและเรียงลำดับ
  const filtered = [...posts]
    .filter((post) => post.title.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => (sortOrder === "desc" ? b.id - a.id : a.id - b.id));

  // ระบบ Pagination
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filtered.length / itemsPerPage);
  const paginatedPosts = filtered.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage,
  );

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
          marginBottom: "1rem",
        }}
      >
        <h2 style={{ color: "#2d3748", margin: 0 }}>โพสต์ล่าสุด</h2>
        <button
          onClick={() => {
            refetch(); // เรียกใช้ฟังก์ชันที่ส่งมาจาก Hook
            setCurrentPage(1);
          }}
          style={{
            padding: "0.4rem 0.8rem",
            background: "#e2e8f0",
            border: "1px solid #cbd5e0",
            borderRadius: "6px",
            cursor: "pointer",
            fontSize: "0.9rem",
          }}
        >
          🔄 โหลดใหม่
        </button>
      </div>

      <input
        type="text"
        placeholder="ค้นหาโพสต์..."
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setCurrentPage(1);
        }}
        style={{
          width: "100%",
          padding: "0.5rem 0.75rem",
          border: "1px solid #cbd5e0",
          borderRadius: "6px",
          fontSize: "1rem",
          marginBottom: "1rem",
          boxSizing: "border-box",
        }}
      />

      {filtered.length === 0 && (
        <p style={{ color: "#718096", textAlign: "center", padding: "2rem" }}>
          ไม่พบโพสต์ที่ค้นหา
        </p>
      )}

      <PostCount count={filtered.length} />

      <button
        onClick={toggleSort}
        style={{
          display: "flex",
          marginBottom: "1rem",
          background: "none",
          border: "1px solid #cbd5e0",
          padding: "0.5rem",
          borderRadius: "6px",
          cursor: "pointer",
        }}
      >
        {sortOrder === "desc" ? "🔽 ใหม่สุดก่อน" : "🔼 เก่าสุดก่อน"}
      </button>

      {paginatedPosts.map((post) => (
        <PostCard
          key={post.id}
          post={post}
          isFavorite={favorites.includes(post.id)}
          onToggleFavorite={() => onToggleFavorite(post.id)}
        />
      ))}

      {filtered.length > 0 && (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "1rem",
            marginTop: "1.5rem",
          }}
        >
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #cbd5e0",
              borderRadius: "6px",
              background: currentPage === 1 ? "#f7fafc" : "white",
              cursor: currentPage === 1 ? "not-allowed" : "pointer",
              color: currentPage === 1 ? "#a0aec0" : "#2d3748",
            }}
          >
            ← ก่อนหน้า
          </button>
          <span style={{ color: "#4a5568", fontSize: "0.95rem" }}>
            หน้า {currentPage} / {totalPages || 1}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages || totalPages === 0}
            style={{
              padding: "0.5rem 1rem",
              border: "1px solid #cbd5e0",
              borderRadius: "6px",
              background: currentPage === totalPages ? "#f7fafc" : "white",
              cursor: currentPage === totalPages ? "not-allowed" : "pointer",
              color: currentPage === totalPages ? "#a0aec0" : "#2d3748",
            }}
          >
            ถัดไป →
          </button>
        </div>
      )}
    </div>
  );
}

export default PostList;
