import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import SignIn from "./components/SignIn";
import Tab from "./components/Tab";
import PostCardList from "./components/PostCardList";
import { useState } from "react";
import PostDetailPage from "./pages/post-detail.page";

function Home() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div>
      <Navbar />
      <Tab
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PostCardList selectedCategory={selectedCategory} />
    </div>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/post/:id" element={<PostDetailPage />} />
        <Route path="/post/:title" element={<PostDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
