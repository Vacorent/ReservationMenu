import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import Guests from './Guests';
import Month from './Month';
import styles from './../css/Calendar.css';

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
    this.setDateClick = this.setDateClick.bind(this);
    this.clearDateClick = this.clearDateClick.bind(this);
  }

  setDateClick(date) {
    const { startDate, endDate } = this.state;
    if (startDate === '') {
      this.setState({
        startDate: date,
      });
    } else if (endDate === '') {
      this.setState({
        endDate: date,
      });
    }
  }

  prevMonthClick(e) {
    console.log('prevmonth clicked');
    const { currentMonth, currentMonthYear } = this.state;
    if (currentMonth !== Moment().month() || currentMonthYear !== Moment().year()) {
      this.setState({
        currentMonth: currentMonth === 0 ? 11 : currentMonth - 1,
        currentMonthYear: currentMonth === 0 ? currentMonthYear - 1 : currentMonthYear,
      });
    }
    e.preventDefault();
  }

  nextMonthClick(e) {
    console.log('nextmonth clicked');
    const { currentMonth, currentMonthYear } = this.state;
    this.setState({
      currentMonth: currentMonth === 11 ? 0 : currentMonth + 1,
      currentMonthYear: currentMonth === 11 ? currentMonthYear + 1 : currentMonthYear,
    });
    e.preventDefault();
  }

  dropdownClick(e) {
    console.log('calendar clicked');
    const { isDropdown } = this.state;
    this.setState({
      isDropdown: !isDropdown,
    });
    e.preventDefault();
  }

  clearDateClick(e) {
    this.setState({
      startDate: '',
      endDate: '',
    });
    e.preventDefault();
  }

  renderView() {
    const { isDropdown, currentMonth, currentMonthYear } = this.state;
    const { calendar } = this.props;
    const nextMonth = Moment([currentMonthYear, currentMonth]).add(1, 'months');
    const nextMonthNum = nextMonth.month();
    const nextMonthYear = nextMonth.year();
    const textCurrMonth = Moment(currentMonth + 1, 'M').format('MMMM');
    const textNextMonth = Moment(nextMonthNum + 1, 'M').format('MMMM');
    if (isDropdown) {
      return (
        <tbody className={styles.dropdownCalendar}>
          <tr>
            <td className={styles.calHeader}>
              <button onClick={this.prevMonthClick} type="button" className={styles.prevMonthButton}>{'<'}</button>
              <div className={styles.calHeaderText}>
                {textCurrMonth}
                {' '}
                {currentMonthYear}
              </div>
              <Month
                data={calendar[currentMonth]}
                monthNum={currentMonth}
                yearNum={currentMonthYear}
                setDateClick={this.setDateClick}
              />
            </td>
            <td className={styles.calHeader}>
              <button onClick={this.nextMonthClick} type="button" className={styles.nextMonthButton}>{'>'}</button>
              <div className={styles.calHeaderText}>
                {textNextMonth}
                {' '}
                {nextMonthYear}
              </div>
              <Month
                data={calendar[nextMonthNum]}
                monthNum={nextMonthNum}
                yearNum={nextMonthYear}
                setDateClick={this.setDateClick}
              />
            </td>
          </tr>
          <tr>
            <td colSpan="2" className={styles.calendarButtons}>
              <button type="button" onClick={this.clearDateClick} className={styles.clearDates}>Clear dates</button>
              <button type="button" onClick={this.dropdownClick} className={styles.closeCal}>Close</button>
            </td>
          </tr>
        </tbody>
      );
    }
    return null;
  }

  render() {
    const { capacity } = this.props;
    let { startDate, endDate } = this.state;
    const { isDropdown } = this.state;
    if (!startDate) {
      if (isDropdown) {
        startDate = 'MM/DD/YYYY';
      } else {
        startDate = 'Add date';
      }
    }
    if (!endDate) {
      if (isDropdown) {
        endDate = 'MM/DD/YYYY';
      } else {
        endDate = 'Add date';
      }
    }
    return (
      <table className={styles.table}>
        <tbody>
          <tr>
            <td className={styles.checkin} role="presentation" onClick={this.dropdownClick} onKeyDown={this.dropdownClick}>
              <div className={styles.staticText}>CHECK-IN</div>
              <div className={styles.dynamicText}>{startDate}</div>
            </td>
            <td className={styles.checkout} role="presentation" onClick={this.dropdownClick} onKeyDown={this.dropdownClick}>
              <div className={styles.staticText}>CHECKOUT</div>
              <div className={styles.dynamicText}>{endDate}</div>
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
  calendar: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default Calendar;
