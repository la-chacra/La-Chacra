import React, { useState } from "react";
import ProductCard from "../../components/ProductCard";
import CategoryNav from "./CategoryNav";

const MenuSection = ({ title, categories, products }) => {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredProducts =
    selectedCategory === "Todos"
      ? products
      : products.filter((p) => p.category === selectedCategory);

  return (
    <section className="menu-section font-overlock fade-in-up">
      <h2 className="section-title">{title}</h2>
      {categories && (
        <CategoryNav
          categories={categories}
          onCategorySelect={setSelectedCategory}
          selectedCategory={selectedCategory}
        />
      )}
      <div className="products-list">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </section>
  );
};

export default MenuSection;
