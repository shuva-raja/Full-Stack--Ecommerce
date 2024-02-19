import React, { useEffect, useState } from "react";
import home from "../Image-Footer/cover.png";
import "./Home.css";

import { useSelector, useDispatch } from "react-redux";
import Loading from "../Loader/Loader";
import { useAlert } from "react-alert";
import { clearErrors } from "../../Reducers/Productslice";

import ProductCard from "./ProductCard";
import { useNavigate } from "react-router-dom";
import fetchProducts from "../../actions/product/fetchProduct";

const Home = () => {
  const navigate = useNavigate();
  const [Keyword, setKeyword] = useState("");
  const alert = useAlert();
  const dispatch = useDispatch();
  const { loading, products, error } = useSelector((state) => state.Product);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (Keyword.trim()) {
      navigate(`/products/${Keyword}`);
    } else {
      navigate("/products");
    }
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }

    dispatch(fetchProducts());
  }, [dispatch, alert, error]);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="home-container">
          <div className="top-home">
            <img src={home} alt="tophome" />
          </div>
          <div>
            <form onSubmit={onSubmitHandler}>
              <input
                type="text"
                placeholder="Enter Product Name..."
                onChange={(e) => setKeyword(e.target.value)}
              />
              <input type="submit" value="Search" />
            </form>
          </div>
          <div className="product-heading">
            <h1>Products</h1>
            <hr />
          </div>

          <div className="products-container">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
