import React from 'react';

const Header = (props) => (
  <li className="feed-list-item">
    <div className="feed-list-item-title" onClick={props.handleClick}>{props.data.title}</div>
<div className="feed-list-item-byline"><span className="feed-list-item-byline-author">{props.data.author}</span> {props.data.createdAt}</div>
    <img src={props.data.imageUrl} onClick={props.handleClick} className="feed-list-item-image"/>
    <span className="feed-list-item-lede">{props.data.body}</span>
  </li>
)

export default Header;