import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div style={{ textAlign: "center", marginTop: "5rem" }}>
      <h1 style={{ fontSize: "4rem", color: "#e53e3e", margin: 0 }}>404</h1>
      <p style={{ fontSize: "1.2rem", color: "#4a5568" }}>
        ไม่พบหน้าที่คุณต้องการ
      </p>
      <Link
        to="/"
        style={{ color: "#1e40af", textDecoration: "none", fontWeight: "bold" }}
      >
        [ กลับหน้าหลัก ]
      </Link>
    </div>
  );
}

export default NotFoundPage;
