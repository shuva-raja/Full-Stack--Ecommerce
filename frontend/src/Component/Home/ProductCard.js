import React from "react";
import { Link } from "react-router-dom";

import ReactStars from "react-rating-stars-component";
import "./ProductCard.css"
const ProductCard = ({ product }) => {
  const options = {
    count: 5,
    value: product.ratings,
    precision:true,
    size: 24,
    activeColor: "#ffd700",
  };

  return (
    <div className="product-container">
      <Link className="link" to={`/product/${product._id}`}>
        <img className="product-image" src={product.images[0].url} alt="specs" />
        <div className="product-details">
          <span className="product-name">{product.name}</span>
          <p className="product-desc">{product.description}</p>
          <span className="product-price">₹{product.price}</span>
          <ReactStars {...options} />{" "}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
