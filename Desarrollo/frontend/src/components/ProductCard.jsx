import React from "react";

const ProductCard = ({ name, description, price, image }) => {
  return (
    <div className="product-card fade-in-up">
      <img src={image} alt={name} className="product-img" />
      <div className="product-info">
        <div className="product-header">
          <div className="product-name-line">
            <h3 className="product-name">{name}</h3>
            <div className="dotted-line"></div>
            <span className="product-price">${price}</span>
          </div>
        </div>
        <p className="product-description">{description}</p>
      </div>
    </div>
  );
};

export default ProductCard;
