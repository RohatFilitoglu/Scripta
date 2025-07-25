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
    <div className="w-full mt-6">
      <div className="flex justify-center">
        <div className="overflow-x-auto">
          <nav className="flex w-max border-b border-gray-300 space-x-4 px-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`whitespace-nowrap py-2 px-3 text-sm font-medium transition-all duration-300
                  ${
                    selectedCategory === category
                      ? "border-b-2 border-black text-black"
                      : "border-b-2 border-transparent text-gray-600 hover:text-black hover:border-gray-300"
                  }`}
              >
                {category}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
