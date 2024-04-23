import React from 'react';
import '../../styles/product-card.css';
import { Link, useNavigate } from 'react-router-dom';

const ProductCard = (props) => {
  const { _id, name, image, price, discount } = props.item;
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/foods/${_id}`);
  };

  return (
    <div className="product__item">
      {discount > 0 && <div className="product__sale">Hot</div>}
      <div className="product__img">
        <Link to={`/foods/${_id}`}>
          <img src={image} alt="product-img" className="w-50" />
        </Link>
      </div>

      <div className="product__content">
        <h5>
          <Link to={`/foods/${_id}`}>{name}</Link>
        </h5>
        <div className="d-flex align-items-center justify-content-between">
          {discount > 0 ? (
            <div className="d-flex align-items-center justify-content-center ">
              <span className="product__price">
                ${(price * (1 - Number(discount / 100))).toFixed(1)}
              </span>
              <span className="product__price-sale">-{discount}%</span>
            </div>
          ) : (
            <span className="product__price">${price.toFixed()}</span>
          )}
          <button className="addToCart__btn" onClick={() => handleViewDetails()}>
            View Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
