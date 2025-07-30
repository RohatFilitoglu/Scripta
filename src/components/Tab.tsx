import { useTranslation } from "react-i18next";

interface Props {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategoryTabs: React.FC<Props> = ({
  selectedCategory,
  setSelectedCategory,
}) => {
  const { t } = useTranslation();
  const categories = [
    { key: t("all"), value: "All" },
    { key: t("technology"), value: "Technology" },
    { key: t("programming"), value: "Programming" },
    { key: t("design"), value: "Design" },
    { key: t("tutorials"), value: "Tutorials" },
    { key: t("productivity"), value: "Productivity" },
    { key: t("career"), value: "Career" },
    { key: t("dataScience"), value: "Data Science" },
    { key: t("startups"), value: "Startups" },
    { key: t("lifeThoughts"), value: "Life & Thoughts" },
  ];

  return (
    <div className="w-full mt-6">
      <div className="flex justify-center">
        <div className="overflow-x-auto">
          <nav className="flex w-max border-b border-gray-300 space-x-4 px-4">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setSelectedCategory(category.value)}
                className={`whitespace-nowrap py-2 px-3 text-sm font-medium transition-all duration-300
                  ${
                    selectedCategory === category.value
                      ? "border-b-2 border-black text-black"
                      : "border-b-2 border-transparent text-gray-600 hover:text-black hover:border-gray-300"
                  }`}
              >
                {category.key}
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default CategoryTabs;
