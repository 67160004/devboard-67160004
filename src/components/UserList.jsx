import UserCard from "./UserCard";
import LoadingSpinner from "./LoadingSpinner";
import { useFetch } from "../hooks/useFetch"; // ดึง Custom Hook ของเรามาใช้

// แก๊งเพื่อนของเนเน่ยังอยู่เหมือนเดิม
const MY_CUSTOM_USERS = [
  { id: 901, name: "Connie Con", email: "connie@test.com" },
  { id: 902, name: "Bonnie Bon", email: "bonnie@test.com" },
  { id: 903, name: "Aonnie Aon", email: "aonnie@test.com" },
];

function UserList() {
  // ใช้ Hook บรรทัดเดียว ดึงข้อมูลได้เลย!
  const {
    data: users,
    loading,
    error,
  } = useFetch("https://jsonplaceholder.typicode.com/users");

  if (loading) return <LoadingSpinner />;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // จับข้อมูลจาก API มารวมกับเพื่อนของเรา
  const allUsers = [...users, ...MY_CUSTOM_USERS];

  return (
    <div>
      <h2
        style={{
          color: "#2d3748",
          borderBottom: "2px solid #1e40af",
          paddingBottom: "0.5rem",
        }}
      >
        สมาชิก
      </h2>
      {allUsers.map((user) => (
        <UserCard key={user.id} name={user.name} email={user.email} />
      ))}
    </div>
  );
}

export default UserList;
