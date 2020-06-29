import React from 'react';
import PropTypes from 'prop-types';
import styles from './../css/Guests.css';

class Guests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDropdown: false,
    };
    this.dropdownClick = this.dropdownClick.bind(this);
    this.changeGuestCount = this.changeGuestCount.bind(this);
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
    const { handleGuestChange } = this.props;
    handleGuestChange(type, inc);
  }

  renderAdultMinus() {
    const { adultCount } = this.props;
    if (adultCount === 1) {
      return <button className={styles.guestButtonDis} type="button" disabled>-</button>
    }
    return <button className={styles.guestButton} type="button" onClick={() => { this.changeGuestCount('adult', 0); }}>-</button>
  }

  renderAdultPlus() {
    const { adultCount, childCount, capacity } = this.props;
    if (adultCount + childCount === capacity) {
      return <button className={styles.guestButtonDis} type="button" disabled>+</button>
    }
    return <button className={styles.guestButton} type="button" onClick={() => { this.changeGuestCount('adult', 1); }}>+</button>
  }

  renderChildMinus() {
    const { childCount } = this.props;
    if (childCount === 0) {
      return <button className={styles.guestButtonDis} type="button" disabled>-</button>
    }
    return <button className={styles.guestButton} type="button" onClick={() => { this.changeGuestCount('child', 0); }}>-</button>
  }

  renderChildPlus() {
    const { adultCount, childCount, capacity } = this.props;
    if (adultCount + childCount === capacity) {
      return <button className={styles.guestButtonDis} type="button" disabled>+</button>
    }
    return <button className={styles.guestButton} type="button" onClick={() => { this.changeGuestCount('child', 1); }}>+</button>
  }

  renderInfantMinus() {
    const { infantCount } = this.props;
    if (infantCount === 0) {
      return <button className={styles.guestButtonDis} type="button" disabled>-</button>
    }
    return <button className={styles.guestButton} type="button" onClick={() => { this.changeGuestCount('infant', 0); }}>-</button>
  }

  renderInfantPlus() {
    const { infantCount } = this.props;
    if (infantCount === 5) {
      return <button className={styles.guestButtonDis} type="button" disabled>+</button>
    }
    return <button className={styles.guestButton} type="button" onClick={() => { this.changeGuestCount('infant', 1); }}>+</button>
  }

  renderView() {
    const { isDropdown } = this.state;
    const { adultCount, childCount, infantCount } = this.props;
    const { capacity } = this.props;
    if (isDropdown) {
      return (
        <tbody className={styles.dropdownGuests}>
          <tr className={styles.guestRow}>
            <td>
              <div>Adults</div>
            </td>
            <td className={styles.guestButtonsTD}>
              {this.renderAdultPlus()}
              {' '}
              <div className={styles.countText}>{adultCount}</div>
              {' '}
              {this.renderAdultMinus()}
            </td>
          </tr>
          <tr className={styles.guestRow}>
            <td>
              <div>Children</div>
              <div className={styles.guestStatic} type="button">Ages 2 - 12</div>
            </td>
            <td className={styles.guestButtonsTD}>
              {this.renderChildPlus()}
              {' '}
              <div className={styles.countText}>{childCount}</div>
              {' '}
              {this.renderChildMinus()}
            </td>
          </tr>
          <tr className={styles.guestRow}>
            <td>
              <div>Infants</div>
              <div className={styles.guestStatic}>Under 2</div>
            </td>
            <td className={styles.guestButtonsTD}>
              {this.renderInfantPlus()}
              {' '}
              <div className={styles.countText}>{infantCount}</div>
              {' '}
              {this.renderInfantMinus()}
            </td>
          </tr>
          <tr className={styles.guestRow}>
            <td colSpan="2" className={styles.maxCapacityText}>
              {' '}
              {capacity}
              {' '}
              guests maximum. Infants don&apos;t count toward the number of guests.
            </td>
          </tr>
          <tr className={styles.guestRow}>
            <td colSpan="2" className={styles.guestButtonsTD}>
              <button className={styles.closeButton} onClick={this.dropdownClick} type="button">Close</button>
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
      return <div className={styles.uparrow}>&#8963;</div>;
    }
    return <div className={styles.downarrow}>&#8964;</div>;
  }

  renderGuestText() {
    const { infantCount, adultCount, childCount } = this.props;
    const totalCount = adultCount + childCount;
    const guestText = totalCount === 1 ? 'guest' : 'guests';
    const infantText = infantCount === 1 ? 'infant' : 'infants';
    if (infantCount === 0) {
      return (
        <div className={styles.guestText2}>
          {totalCount}
          {' '}
          {guestText}
        </div>
      )
    }
    return (
      <div className={styles.guestText2}>
        {totalCount}
        {' '}
        {guestText}
        {', '}
        {infantCount}
        {' '}
        {infantText}
      </div>
    )
  }

  render() {
    return (
      <>
        <tbody>
          <tr>
            <td colSpan="2" className={styles.guests} onClick={this.dropdownClick} onKeyDown={this.dropdownClick} role="presentation">
              <div className={styles.guestText1}>GUESTS</div>
              {this.renderGuestText()}
              {this.renderArrow()}
            </td>
          </tr>
        </tbody>
        {this.renderView()}
      </>
    );
  }
}

Guests.propTypes = {
  capacity: PropTypes.number.isRequired,
};

export default Guests;
