import React from 'react';

class Guests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adultCount: 1,
      childCount: 0,
      infantCount: 0
    };
    this.dropdownClick = this.dropdownClick.bind(this);
  }

  dropdownClick(e) {
    console.log('table clicked');
    e.preventDefault();
  }

  renderView() {

  }

  render() {
    let { adultCount, childCount } = this.state;
    let totalCount = adultCount + childCount;
    let guestText = totalCount === 1 ? 'guest' : 'guests';
    return (
      <tr>
        <td colSpan="2" className="guests" onClick={this.dropdownClick}>
          <div className="guestText1">GUESTS</div>
          <div className="guestText2">{totalCount} {guestText}</div>
          <div className="downArrow">&#8964;</div>
        </td>
      </tr>
    );
  }
}

export default Guests;
