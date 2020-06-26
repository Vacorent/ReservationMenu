import React from 'react';
import PropTypes from 'prop-types';
import styles from './../css/Header.css';

const Header = ({ rating, price, reviewCount }) => (
  <div>
    <div className={styles.price}>
      <b>
        $
        {price}
      </b>
      <span className={styles.ptext}> / night </span>
      <span className={styles.star} role="img" aria-labelledby="star">&#11088;</span>
      <span className={styles.rating}>
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
  rating: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  reviewCount: PropTypes.number.isRequired,
};

export default Header;
