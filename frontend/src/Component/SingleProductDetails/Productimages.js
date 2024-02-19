import React, { useState } from "react";
import "./Productimages.css";
const Productimages = ({ images }) => {
  const [imageUrl, setImageurl] = useState(images[0].url);
  const handleimage = (url) => {
    setImageurl(url);
  };
  return (
    <div className="image">
      <div className="scroll">
        {images.map((img) => (
          <img
            onClick={() => handleimage(img.url)}
            className="singleimage"
            src={img.url}
            alt={img.url}
          />
        ))}
      </div>
      
      <div className="big-image">
        <img className="image-show" src={imageUrl} alt="ok" />
      </div>
    </div>
  );
};

export default Productimages;
