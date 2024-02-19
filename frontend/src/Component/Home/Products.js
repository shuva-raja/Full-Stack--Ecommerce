import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loader/Loader";
import { useAlert } from "react-alert";
import { clearErrors } from "../../Reducers/Productslice";

import ProductCard from "./ProductCard";
import { Pagination, Slider, Typography } from "@mui/material";
import "./Products.css";
import { useParams } from "react-router-dom";
import fetchProducts from "../../actions/product/fetchProduct";
const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Camera",
  "SmartPhones",
];

const Products = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const [rating, setrating] = useState(0);
  const [price, setprice] = useState([0, 25000]);
  const [category, setcategory] = useState(null);
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error, resultperpage, count } = useSelector(
    (state) => state.Product
  );
  const priceHandler = (event, newvalue) => {
    setprice(newvalue);
    console.log(price);
  };

  const handleCategoryClick = (category) => {
    setcategory(category);
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(fetchProducts(keyword, currentPage, price, category, rating));
  }, [dispatch, alert, error, keyword, currentPage, price, category, rating]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="merged-container">
            <div className="filtercomponent">
              <Typography>Price</Typography>
              <Slider
                size="small"
                value={price}
                onChange={priceHandler}
                valueLabelDisplay="auto"
                min={0}
                max={25000}
              />
              <Typography>Category:</Typography>
              <ul className="categories">
                {categories.map((i, key) => (
                  <li
                    className="li-items"
                    key={key}
                    onClick={() => handleCategoryClick(i)}
                  >
                    {i}
                  </li>
                ))}
              </ul>
              <Typography>Ratings Above:</Typography>
              <Slider
                value={rating}
                size="small"
                valueLabelDisplay="auto"
                marks
                max={5}
                onChange={(e) => setrating(e.target.value)}
              />
            </div>

            <div className="productMainContainer">
              <div className="product-heading">
                <h1>Products</h1>
                <hr />
              </div>

              <div className="product-Container" id="products-container">
                {products &&
                  products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
              </div>
            </div>
          </div>
          <div className="pagination">
            <Pagination
              count={Math.ceil(count / resultperpage)}
              page={currentPage}
              onChange={(e, page) => setCurrentPage(page)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default Products;
