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
      currentMonthYear: Moment().year(),
      startDate: '',
      endDate: '',
      isDropdown: false,
    };
    this.dropdownClick = this.dropdownClick.bind(this);
    this.prevMonthClick = this.prevMonthClick.bind(this);
    this.nextMonthClick = this.nextMonthClick.bind(this);
  }

  dropdownClick(e) {
    console.log('calendar clicked');
    const { isDropdown } = this.state;
    this.setState({
      isDropdown: !isDropdown,
    });
    e.preventDefault();
  }

  prevMonthClick(e) {
    console.log('prevmonth clicked');
    const { currentMonth, currentMonthYear } = this.state;
    this.setState({
      currentMonth: currentMonth === 0 ? 11 : currentMonth - 1,
      currentMonthYear: currentMonth === 0 ? currentMonthYear - 1 : currentMonthYear,
    })
    e.preventDefault();
  }

  nextMonthClick(e) {
    console.log('nextmonth clicked');
    const { currentMonth, currentMonthYear } = this.state;
    this.setState({
      currentMonth: currentMonth === 11 ? 0 : currentMonth + 1,
      currentMonthYear: currentMonth === 11 ? currentMonthYear + 1 : currentMonthYear,
    })
    e.preventDefault();
  }

  renderView() {
    const { isDropdown, currentMonth, currentMonthYear } = this.state;
    const { calendar } = this.props;
    const nextMonth = Moment([currentMonthYear, currentMonth]).add(1, 'months');
    const nextMonthNum = nextMonth.month();
    const nextMonthYear = nextMonth.year();
    const textCurrMonth = Moment(currentMonth + 1, 'M').format('MMMM');
    const textNextMonth = Moment(currentMonth + 2, 'M').format('MMMM');
    if (isDropdown) {
      return (
        <tbody className="dropdownCalendar" >
          <tr>
            <td>
              <button onClick={this.prevMonthClick}>{'<'}</button><div>{textCurrMonth} {currentMonthYear}</div>
                <Month data={calendar[currentMonth]} monthNum={currentMonth} yearNum={currentMonthYear} />
            </td>
              <td>
              <button onClick={this.nextMonthClick}>{'>'}</button><div>{textNextMonth} {nextMonthYear}</div>
                <Month data={calendar[nextMonthNum]} monthNum={nextMonthNum} yearNum={nextMonthYear} />
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
    const { capacity} = this.props;
    let { startDate, endDate} = this.state;
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
