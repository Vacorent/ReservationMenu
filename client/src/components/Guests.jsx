import React from 'react';

class Guests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <td colSpan="2" className="guests">
        <div className="guestText1">GUESTS</div>
        <div className="guestText2">1 guest</div>
        <div className="downArrow">&#8964;</div>
      </td>
    );
  }
}

export default Guests;
