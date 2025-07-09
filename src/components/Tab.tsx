

const categories = [
  "All",
  "Technology",
  "Programming",
  "Design",
  "Tutorials",
  "Productivity",
  "Career",
  "Data Science",
  "Startups",
  "Life & Thoughts",
];

interface Props {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryTabs: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  return (
    <div className="overflow-x-auto  min-w-max mt-6">
      <nav className="flex justify-center space-x-8 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-b border-gray-300">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm transition-colors duration-300
          ${
            selectedCategory === category
              ? "border-black text-black"
              : "border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300"
          }`}
          >
            {category}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default CategoryTabs;
