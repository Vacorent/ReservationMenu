import React from 'react';
import PropTypes from 'prop-types';

const Header = ({ rating, price, reviewCount }) => (
  <div>
    <div className="price">
      <b>
        $
        {price}
      </b>
      <span className="ptext"> / night </span>
      <span className="star" role="img" aria-labelledby="star">&#11088;</span>
      <span className="rating">
        {rating}
        {' '}
        (
        {reviewCount}
        )
      </span>
    </div>
  </div>
);

Header.propTypes = {
  rating: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
};

export default Header;
