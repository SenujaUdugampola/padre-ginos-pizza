const MenuFilter = ({ categories, selectedCategory, onCategoryChange }) => {
  return (
    <div className="menu-filter">
      <h3>Filter by Category:</h3>
      <div className="filter-buttons">
        <button 
          className={selectedCategory === "all" ? "active" : ""}
          onClick={() => onCategoryChange("all")}
        >
          All
        </button>
        {categories.map(category => (
          <button 
            key={category}
            className={selectedCategory === category ? "active" : ""}
            onClick={() => onCategoryChange(category)}
          >
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </button>
        ))}
      </div>
    </div>
  );
};

export default MenuFilter;
