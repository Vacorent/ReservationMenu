import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';

class Month extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
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

    const calEntries = calRows.map((calRow, index) => {
      const rowEntries = calRow.map((day, index) => {
        if (data[day] === undefined || data[day].isBooked === true) {
          return <td key={index}><button className="invalidDate" disabled>{day}</button></td>;
        }
        return <td key={index}><button className="validDate">{day}</button></td>;
      });
      return (
        <tr key={index}>
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
    const { data, monthNum, yearNum } = this.props;

    return (
      <>
        <div>
          <table>
            <thead>
              <tr>
                <th>Su</th>
                <th>Mo</th>
                <th>Tu</th>
                <th>We</th>
                <th>Th</th>
                <th>Fr</th>
                <th>Sa</th>
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

// const Month = ({ data, monthNum, yearNum }) => {
//   const formattedMonth = Moment(monthNum, 'M').format('MMMM');

//   return (
//     <>
//     <div>
//       {formattedMonth}
//       {' '}
//       {yearNum}
//     <table>
//       <thead>
//         <tr>
//           <th>Su</th>
//           <th>Mo</th>
//           <th>Tu</th>
//           <th>We</th>
//           <th>Th</th>
//           <th>Fr</th>
//           <th>Sa</th>
//         </tr>
//       </thead>
//       <tbody>
//       </tbody>
//       </table>
//     </div>
//     </>
//   )
// }

// Month.propTypes = {
//   data: PropTypes.object.isRequired,
//   monthNum: PropTypes.number.isRequired,
//   yearNum: PropTypes.number.isRequired,
// };

export default Month;
