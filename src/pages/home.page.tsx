import { useEffect, useState } from "react";
import PostCardList from "../components/PostCardList";
import CategoryTabs from "../components/Tab";

function HomePage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setCurrentPage(1);
  }, [selectedCategory]);

  return (
    <div>
      <CategoryTabs
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      <PostCardList
        selectedCategory={selectedCategory}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default HomePage;
