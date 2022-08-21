// import ReactStars from " react-rating-stars-component ";
// import React from "react";
// import { render } from "react-dom";

// const ratingChanged = (newRating) => {
//   console.log(newRating);
// };

// render(
//   <ReactStars
//     count={5}
//     onChange={ratingChanged}
//     size={24}
//     isHalf={true}
//     emptyIcon={<i className="far fa-star"></i>}
//     halfIcon={<i className="fa fa-star-half-alt"></i>}
//     fullIcon={<i className="fa fa-star"></i>}
//     activeColor="#ffd700"
//   />,

//   document.getElementById("where-to-render")
// );
import React, { useState } from "react";
import { Rating } from "react-simple-star-rating";

export default function MyComponent() {
  const [rating, setRating] = useState(0); // initial rating value

  // Catch Rating value
  const handleRating = (rate) => {
    setRating(rate);
    // other logic
  };

  return (
    <div className="App">
      <Rating
        onClick={handleRating}
        ratingValue={rating} /* Available Props */
      />
    </div>
  );
}
