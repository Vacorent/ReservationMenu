import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Guests from './Guests';
import Month from './Month';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentMonth: Moment().month(),
      nextMonth: Moment().month() + 1,
      currentMonthYear: Moment().year(),
      nextMonthYear: Moment().add(1, 'months').year(),
      startDate: '',
      endDate: '',
      isDropdown: false,
    };
    this.dropdownClick = this.dropdownClick.bind(this);
  }

  dropdownClick(e) {
    console.log('calendar clicked');
    const { isDropdown } = this.state;
    this.setState({
      isDropdown: !isDropdown,
    });
    e.preventDefault();
  }

  renderView() {
    const { isDropdown, currentMonth, nextMonth, currentMonthYear, nextMonthYear } = this.state;
    const { calendar } = this.props;
    if (isDropdown) {
      return (
        <tbody className="dropdownCalendar" >
          <tr>
            <td>
              <Month data={calendar[currentMonth]} monthNum={currentMonth} yearNum={currentMonthYear} />
            </td>
            <td>
              <Month data={calendar[nextMonth]} monthNum={nextMonth} yearNum={nextMonthYear} />
            </td>
          </tr>
          <tr >
            <td colSpan="2" className="calendarButtons">
              <button>Clear dates</button>
              <button>Close</button>
            </td>
            </tr>
        </tbody>
      )
    }
    return null;
  }

  render() {
    const { capacity } = this.props;
    let { startDate, endDate } = this.state;
    if (!startDate) {
      startDate = 'Add date';
    }
    if (!endDate) {
      endDate = 'Add date';
    }
    return (
      <table className="table">
        <tbody>
          <tr>
            <td className="checkin" role="presentation" onClick={this.dropdownClick} onKeyDown={this.dropdownClick}>
              <div className="staticText">CHECK-IN</div>
              <div className="dynamicText">{startDate}</div>
            </td>
            <td className="checkout" role="presentation" onClick={this.dropdownClick} onKeyDown={this.dropdownClick}>
              <div className="staticText">CHECKOUT</div>
              <div className="dynamicText">{endDate}</div>
            </td>
          </tr>
        </tbody>
        {this.renderView()}
        <Guests capacity={capacity} />
      </table>
    );
  }
}

Calendar.propTypes = {
  capacity: PropTypes.number.isRequired,
  calendar: PropTypes.object.isRequired,
};

export default Calendar;
