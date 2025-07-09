import { useState } from "react";
import PostCardList from "../components/PostCardList";
import Tab from "../components/Tab";
import Navbar from "../components/Navbar";

function HomePage() {
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

export default HomePage;
