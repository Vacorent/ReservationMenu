import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

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
    const { monthNum, yearNum, data } = this.props;
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
    const calEntries = calRows.map((calRow) => {
      rowCount += 1;
      const rowEntries = calRow.map((day) => {
        dayCount += 1;
        const date = day !== '' ? Moment([yearNum, monthNum, day]).format("MM/DD/YYYY") : '';
        if (data[day] === undefined || data[day].isBooked === true) {
          return <td key={dayCount}><button className="invalidDate" type="button" disabled>{day}</button></td>;
        }
        return <td key={dayCount}><button className="validDate" type="button" onClick={(() => this.handleDateClick(date))}>{day}</button></td>;
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
          <table className="monthCalendar">
            <thead>
              <tr>
                <th className="daysOfWeek">Su</th>
                <th className="daysOfWeek">Mo</th>
                <th className="daysOfWeek">Tu</th>
                <th className="daysOfWeek">We</th>
                <th className="daysOfWeek">Th</th>
                <th className="daysOfWeek">Fr</th>
                <th className="daysOfWeek">Sa</th>
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

};

export default Month;
