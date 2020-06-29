import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';
import styles from './../css/Month.css';

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
    this.handleDateClick = this.handleDateClick.bind(this);
  }

  handleDateClick(date) {
    const { setDateClick } = this.props;
    setDateClick(date);
  }

  renderView() {
    const { monthNum, yearNum, data, startDate, prevData } = this.props;
    // console.log('monthNum is ', monthNum)
    const startDayOfWeek = Moment([yearNum, monthNum]).startOf('month').day();
    const daysInMonth = Moment([yearNum, monthNum]).daysInMonth();
    const calRows = [];
    let currRow = [];
    let date = 1;
    let dayCounter = startDayOfWeek;
    while (date < daysInMonth + 1) {
      if (date === 1 && dayCounter !== 0) {
        for (let i = 0; i < dayCounter; i += 1) {
          currRow.push('');
        }
        currRow.push(date);
        if (dayCounter === 6) {
          calRows.push(currRow);
          currRow = [];
          dayCounter = 0;
        } else {
          dayCounter += 1;
        }
      } else if (dayCounter === 6) {
        currRow.push(date);
        calRows.push(currRow);
        currRow = [];
        dayCounter = 0;
      } else if (date === daysInMonth) {
        currRow.push(date);
        calRows.push(currRow);
      } else {
        currRow.push(date);
        dayCounter += 1;
      }
      date += 1;
    }

    let rowCount = 0;
    let dayCount = 0;
    const startDayMoment = Moment(startDate, 'MM/DD/YYYY');
    let notValidStreak;
    if (startDayMoment.isBefore(Moment([yearNum, monthNum, 1]))) {
      // console.log(prevData)
      notValidStreak = false;
      while (startDayMoment.isBefore(Moment([yearNum, monthNum, 1]))) {
        if (prevData[startDayMoment.date()].isBooked === true) {
          notValidStreak = true;
        }
        startDayMoment.add(1, 'days');
      }
    }
    // console.log(startDayMoment)
    const calEntries = calRows.map((calRow) => {
      rowCount += 1;
      const rowEntries = calRow.map((day) => {
        dayCount += 1;
        const currDate = Moment([yearNum, monthNum, day]);
        const dateText = day !== '' ? currDate.format('MM/DD/YYYY') : '';
        if (currDate.format('L') === startDayMoment.format('L')) {
          notValidStreak = false;
        }
        if (data[day] === undefined || data[day].isBooked === true || currDate.isBefore(startDayMoment) || notValidStreak) {
          if (startDayMoment.month() === monthNum) {
            notValidStreak = true;
          }
          return <td key={dayCount}><button className={styles.invalidDate} type="button" disabled>{day}</button></td>;
        }
        return <td key={dayCount}><button className={styles.validDate} type="button" onClick={(() => this.handleDateClick(dateText))}>{day}</button></td>;
      });
      return (
        <tr key={rowCount}>
          {rowEntries}
        </tr>
      );
    });

    return (
      <>
        {calEntries}
      </>
    );
  }

  render() {
    return (
      <>
        <div>
          <table className={styles.monthCalendar}>
            <thead>
              <tr>
                <th className={styles.daysOfWeek}>Su</th>
                <th className={styles.daysOfWeek}>Mo</th>
                <th className={styles.daysOfWeek}>Tu</th>
                <th className={styles.daysOfWeek}>We</th>
                <th className={styles.daysOfWeek}>Th</th>
                <th className={styles.daysOfWeek}>Fr</th>
                <th className={styles.daysOfWeek}>Sa</th>
              </tr>
            </thead>
            <tbody>
              {this.renderView()}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

Month.propTypes = {
  monthNum: PropTypes.number.isRequired,
  yearNum: PropTypes.number.isRequired,
  data: PropTypes.objectOf(PropTypes.object).isRequired,
  setDateClick: PropTypes.func.isRequired,
};

export default Month;
