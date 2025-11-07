import React from "react";
import { useTranslation } from 'react-i18next'

const CategoryNav = ({ categories, onCategorySelect, selectedCategory }) => {
  const { t } = useTranslation()

  return (
    <div className="category-nav-container fade-in-up">
      <h4 className="category-title fade-in-up">{t('carta.categories.all') ? t('carta.categories.all') : 'Navegación'}</h4>
      <nav className="category-nav">
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`category-btn ${
              selectedCategory === cat ? "active" : ""
            }`}
            onClick={() => onCategorySelect(cat)}
          >
            {t(`carta.categories.${cat}`)}
          </button>
        ))}
      </nav>
    </div>
  );
};

export default CategoryNav;
