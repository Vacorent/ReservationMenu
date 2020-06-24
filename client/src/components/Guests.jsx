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
      isDropdown: !isDropdown,
    });
    e.preventDefault();
  }

  changeGuestCount(type, inc) {
    const { adultCount, childCount, infantCount } = this.state;
    if (type === 'adult') {
      if (inc === 1) {
        this.setState({
          adultCount: adultCount + 1
        })
      } else {
        this.setState({
          adultCount: adultCount - 1
        })
      }
    } else if (type === 'child') {
      if (inc === 1) {
        this.setState({
          childCount: childCount + 1
        })
      } else {
        this.setState({
          childCount: childCount - 1
        })
      }
    } else if (type === 'infant') {
      if (inc === 1) {
        this.setState({
          infantCount: infantCount + 1
        })
      } else {
        this.setState({
          infantCount: infantCount - 1
        })
      }
    }
  }

  renderView() {
    const {
      isDropdown, adultCount, childCount, infantCount,
    } = this.state;
    const { capacity } = this.props;
    if (isDropdown) {
      return (
        <tbody className="dropdownGuests">
          <tr className="guestRow">
            <td>
              <div>Adults</div>
            </td>
            <td className="guestButtonsTD">
              <button className="guestButton" type="button" onClick={() => {this.changeGuestCount('adult', 0)}}>-</button>
              {' '}
              {adultCount}
              {' '}
              <button className="guestButton" type="button" onClick={() => {this.changeGuestCount('adult', 1)}}>+</button>
            </td>
          </tr>
          <tr className="guestRow">
            <td>
              <div>Children</div>
              <div className="guestStatic" type="button">Ages 2 - 12</div>
            </td>
            <td className="guestButtonsTD">
              <button className="guestButton" type="button" onClick={() => {this.changeGuestCount('child', 0)}}>-</button>
              {' '}
              {childCount}
              {' '}
              <button className="guestButton" type="button" onClick={() => {this.changeGuestCount('child', 1)}}>+</button>
            </td>
          </tr>
          <tr className="guestRow">
            <td>
              <div>Infants</div>
              <div className="guestStatic">Under 2</div>
            </td>
            <td className="guestButtonsTD">
              <button className="guestButton" type="button" onClick={() => {this.changeGuestCount('infant', 0)}}>-</button>
              {' '}
              {infantCount}
              {' '}
              <button className="guestButton" type="button" onClick={() => {this.changeGuestCount('infant', 1)}}>+</button>
            </td>
          </tr>
          <tr className="guestRow">
            <td colSpan="2" className="maxCapacityText">
              {capacity}
              {' '}
              guests maximum. Infants don't count toward the number of guests.
            </td>
          </tr>
          <tr className="guestRow">
            <td colSpan="2" className="guestButtonsTD">
              <button className="closeButton" onClick={this.dropdownClick} type="button">Close</button>
            </td>
          </tr>
        </tbody>
      );
    }
    return null;
  }

  renderArrow() {
    const { isDropdown } = this.state;
    if (isDropdown) {
      return <div className="uparrow">&#8963;</div>;
    }
    return <div className="downarrow">&#8964;</div>;
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
