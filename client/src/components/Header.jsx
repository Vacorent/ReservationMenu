import React from 'react';

const Header = (props) => (
  <div>
    <div className="price"><b>${props.price}</b><span className="ptext"> / night </span><span className="star">&#11088;</span><span className="rating">{props.rating} ({props.reviewCount})</span></div>
  </div>
)

export default Header;