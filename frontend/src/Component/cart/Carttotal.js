import React from "react";
import "./Carttotal.css";
const Carttotal = ({ qty, totalcartprice }) => {
  return (
    <div className="carttotal">
      <p>PRICE DETAILS</p>
      <p>Total Items:{qty}</p>
      <p>Total Price:{totalcartprice}</p>
      <p>Delivery Charges :Free</p>
      <p className="totalamt">Total Amount:{totalcartprice}</p>
    </div>
  );
};

export default Carttotal;
