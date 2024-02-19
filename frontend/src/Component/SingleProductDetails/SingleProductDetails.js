import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import fetchSingleProduct from "../../actions/product/SingleProductAction";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ReviewCard from "./ReviewCard";
import BoltIcon from "@mui/icons-material/Bolt";
import "./SingleProductDetails.css";
import { Rating } from "@mui/material";
import { clearErrors } from "../../Reducers/Productslice";
import Productimages from "./Productimages";
import { addItemsToCart } from "../../actions/cartAction";
import { useAlert } from "react-alert";
const SingleProductDetails = () => {
  const alert = useAlert();
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);
  const dispatch = useDispatch();
  const { product, error, loading } = useSelector(
    (state) => state.SingleProduct
  );
  const increaseQuantity = () => {
    if (product.Stock <= quantity) return;

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreaseQuantity = () => {
    if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

  const options = {
    size: "large",
    value: product.ratings,
    precision: 0.5,

    readOnly: true,
  };
  const addToCarthandler = (id, qty) => {
    dispatch(addItemsToCart(id, qty));
    alert.success("Item added to cart")
  };
  useEffect(() => {
    if (error) {
      alert.error(error);
      clearErrors();
    }
    dispatch(fetchSingleProduct(id));
  }, [dispatch, id, error]);

  return (
    <div>
      {loading ? (
        <p>loading</p>
      ) : (
        <>
          <div className="productdetailsmaindiv">
            
            <div className="productDetails-image">
              {product.images && product.images[0] && (
                <Productimages images={product.images} />
              )}
              <div className="cartaddbutton">
                <button onClick={() => addToCarthandler(product._id, quantity)}>
                  <AddShoppingCartIcon />
                  ADD TO CART
                </button>
                <button>
                  <BoltIcon />
                  BUY NOW
                </button>
              </div>
            </div>
            <div className="product-details">
              <p>{product.description}</p>

              <span>{product.name}</span>

              <span style={{ marginLeft: ".4vmax", opacity: "30%" }}>
                #{product._id}
              </span>
              <div className="ratingreview">
                <p className="rating">
                  <Rating {...options} />
                </p>
                <span className="noofReviews">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <p className="priced"> Special Price</p>
              <span className="price">₹{product.price}</span>
              <span className="withoutofferprice">{product.price * 1.2}</span>
              <div className="addminustocart">
                <button onClick={decreaseQuantity}>-</button>
                <input readOnly type="number" value={quantity} />
                <button onClick={increaseQuantity}>+</button>
              </div>

              <p className="stock">
                {product.Stock >= 1 ? (
                  <p className="instock">In Stock</p>
                ) : (
                  <p className="outofstock">Out Of Stock</p>
                )}
              </p>
              <p>Delivery:Free</p>
            </div>
          </div>
          <div className="product-reviewscards">
            <div className="reviews-heading">
              <h3>Reviews</h3>
              <hr />
            </div>
            <div className="review-container">
              {product.reviews.length > 0 ? (
                product.reviews &&
                product.reviews.map((review) => <ReviewCard review={review} />)
              ) : (
                <p>No reviews yet</p>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleProductDetails;
