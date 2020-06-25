import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';



const Month = ({ data, monthNum, yearNum }) => {
  const formattedMonth = Moment(monthNum, 'M').format('MMMM');

  return (
    <>
    <div>
      {formattedMonth}
      {' '}
      {yearNum}
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
      </tbody>
      </table>
    </div>
    </>
  )
}

Month.propTypes = {
  data: PropTypes.object.isRequired,
  monthNum: PropTypes.number.isRequired,
  yearNum: PropTypes.number.isRequired,
};

export default Month;
