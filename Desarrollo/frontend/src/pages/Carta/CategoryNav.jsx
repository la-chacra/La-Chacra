import React from "react";

const CategoryNav = ({ categories, onCategorySelect, selectedCategory }) => {
  return (
    <div className="category-nav-container fade-in-up">
      <h4 className="category-title fade-in-up">Navegación</h4>
      <nav className="category-nav">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => onCategorySelect(cat)}
          >
            {cat}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default CategoryNav;
