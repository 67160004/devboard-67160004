import { createContext, useContext, useState, useEffect } from "react";

// 1. สร้าง context object
const FavoritesContext = createContext();

// 2. Provider component ครอบ App ทั้งหมด
export function FavoritesProvider({ children }) {
  // ดึงข้อมูลเริ่มต้นจาก localStorage (Challenge 3)
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem("favorites")) || [];
  });

  // เซฟลง localStorage อัตโนมัติเวลาหัวใจเปลี่ยน (Challenge 3)
  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites));
  }, [favorites]);

  function toggleFavorite(postId) {
    setFavorites((prev) =>
      prev.includes(postId)
        ? prev.filter((id) => id !== postId)
        : [...prev, postId],
    );
  }

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
}

// 3. Custom hook สำหรับใช้งาน context ง่ายๆ
export function useFavorites() {
  return useContext(FavoritesContext);
}
