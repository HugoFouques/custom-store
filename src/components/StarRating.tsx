import Star from "../icons/star.svg";
import HalfStar from "../icons/half-star.svg";
import EmptyStar from "../icons/empty-star.svg";

import "./StarRating.css";

const StarRating = ({
  rating,
}: {
  rating: { rate: number; count: number };
}) => {
  const { rate, count } = rating;
  const roundedRating = Math.round(rate * 2) / 2;

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const isHalfStar = i - 0.5 === roundedRating;
      const isFilled = i <= roundedRating;

      stars.push(
        <img
          key={i}
          src={isFilled ? Star : isHalfStar ? HalfStar : EmptyStar}
          alt={`Star ${i}`}
          className={isFilled || isHalfStar ? "filled" : "empty"}
        />
      );
    }

    return stars;
  };

  return (
    <div className="star-rating">
      {renderStars()}({count})
    </div>
  );
};

export default StarRating;
