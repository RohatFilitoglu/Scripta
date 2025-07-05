import "./App.css";
import Navbar from "./components/Navbar";
import { Outlet } from "react-router-dom"; // 💡 Bunu ekle

function App() {
  return (
    <div>
      <Navbar />
      <Outlet /> {/* 👉 Route'lara göre içerik burada değişecek */}
    </div>
  );
}

export default App;
