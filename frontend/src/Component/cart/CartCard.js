import React, { useState,useEffect } from "react";
import "./CartCard.css";
import { useDispatch } from "react-redux";
import { addItemsToCart } from "../../actions/cartAction";
const CartCard = ({ data, removecarthandler }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(data.quantity);

  const increasedQuantity = () => {
    if (quantity === data.stock) return; // Check if quantity is already at maximum

    const qty = quantity + 1;
    setQuantity(qty);
  };

  const decreasedQuantity = () => {
    if (quantity <= 1) return; // Check if quantity is already at minimum

    const qty = quantity - 1;
    setQuantity(qty);
  };
  useEffect(() => {
   dispatch(addItemsToCart(data.id,quantity))
  }, [dispatch,quantity,data.id])
  

  return (
    <div className="cartSingle">
      <div className="cartsingleimage">
        <img src={data.image} alt="ok" />
        <div className="cartbuttons">
          <button onClick={decreasedQuantity}>-</button>
          <input readOnly value={quantity} type="number" />
          <button onClick={increasedQuantity}>+</button>
        </div>
      </div>

      <div className="cartsingledetails">
        <p>Product:{data.name}</p>
        <span>Price:₹{data.price}</span>
        <span className="withoutofferprice">{data.price * 1.2}</span>
        <p>Seller:Ecommerce</p>
        <p>{data.stock >= 1 ? "In Stock" : "Out Of Sttock"}</p>
        <div className="cartoptions">
          <p>Save For Later</p>
          <p onClick={() => removecarthandler(data.id)}>Remove</p>
        </div>
      </div>

      <div className="cartdelivery">Delivery in 2 Days</div>
    </div>
  );
};

export default CartCard;
