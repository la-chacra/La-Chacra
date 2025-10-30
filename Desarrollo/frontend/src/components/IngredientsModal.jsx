import React from 'react';

const IngredientsModal = ({ ingredients, onClose }) => {
  // Merge all ingredients into a single list
  const allIngredients = [
    ...(ingredients.agregados || []),
    ...(ingredients.removidos || []),
  ];

  return (
    <div className="im-modal-overlay" onClick={onClose}>
      <div className="im-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="im-modal-header">
          <h3>Ingredientes</h3>
          <button className="im-close-btn" onClick={onClose}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        <div className="im-modal-body">
          <ul className="im-ingredients-list">
            {allIngredients.map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default IngredientsModal;
