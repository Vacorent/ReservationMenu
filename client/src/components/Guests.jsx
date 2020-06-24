import React from 'react';

class Guests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adultCount: 1,
      childCount: 0,
      infantCount: 0,
      isDropdown: false,
    };
    this.dropdownClick = this.dropdownClick.bind(this);
  }

  dropdownClick(e) {
    console.log('table clicked');
    const { isDropdown } = this.state;
    this.setState({
      isDropdown: !isDropdown
    })
    e.preventDefault();
  }

  renderView() {
    const { isDropdown, adultCount, childCount, infantCount } = this.state;
    const { capacity } = this.props;
    if (isDropdown) {
      return (
        <tbody className="dropdownGuests">
          <tr className="guestRow">
            <td>
              <div>Adults</div>
            </td>
            <td className="guestButtonsTD">
              <button className="">-</button>
              {' '}
              {adultCount}
              {' '}
              <button>+</button>
            </td>
          </tr>
          <tr className="guestRow">
            <td>
              <div>Children</div>
              <div className="guestStatic">Ages 2 - 12</div>
            </td>
            <td className="guestButtonsTD">
              <button>-</button>
              {' '}
              {childCount}
              {' '}
              <button>+</button>
            </td>
          </tr>
          <tr className="guestRow">
            <td>
              <div>Infants</div>
              <div className="guestStatic">Under 2</div>
            </td>
            <td className="guestButtonsTD">
              <button>-</button>
              {' '}
              {infantCount}
              {' '}
              <button>+</button>
            </td>
          </tr>
          <tr className="guestRow">
            <td colSpan="2" className="maxCapacityText">
              {capacity} guests maximum. Infants don't count toward the number of guests.
            </td>
          </tr>
          <tr className="guestRow">
            <td colSpan="2" className="guestButtonsTD">
              <button className="closeButton" onClick={this.dropdownClick}>Close</button>
            </td>
          </tr>
        </tbody>
      )
    } else {
      return;
    }

  }

  renderArrow() {
    const { isDropdown } = this.state;
    if (isDropdown) {
      return <div className="uparrow">&#8963;</div>
    } else {
      return <div className="downarrow">&#8964;</div>
    }
  }

  render() {
    const { adultCount, childCount } = this.state;
    const totalCount = adultCount + childCount;
    const guestText = totalCount === 1 ? 'guest' : 'guests';
    return (
      <>
        <tbody>
          <tr>
            <td colSpan="2" className="guests" onClick={this.dropdownClick}>
              <div className="guestText1">GUESTS</div>
              <div className="guestText2">
                {totalCount}
                {' '}
                {guestText}
              </div>
              {this.renderArrow()}
            </td>
          </tr>
        </tbody>
        {this.renderView()}
      </>
    );
  }
}

export default Guests;
