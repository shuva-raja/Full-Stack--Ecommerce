import { Rating } from "@mui/material";
import React from "react";

import profilePng from "../Image-Footer/Profile.png";
import "./ReviewCard.css";
const ReviewCard = ({ review }) => {
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,
  };

  return (
    <div className="reviewcontainer">
      <div className="reviewCard">
        <img src={profilePng} alt="User" />
        <span>{review.name}</span>
        <Rating {...options} />
        <span className="reviewCardComment">{review.comment}</span>
      </div>
    </div>
  );
};

export default ReviewCard;
