import { useState } from "react";
import PostCardList from "../components/PostCardList";
import Tab from "../components/Tab";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");

  return (
    <div>
      <Tab
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PostCardList selectedCategory={selectedCategory} />
    </div>
  );
}

export default HomePage;
