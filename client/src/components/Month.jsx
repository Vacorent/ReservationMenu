import React from 'react';
import PropTypes from 'prop-types';
import Moment from 'moment';



const Month = ({ data, monthNum, yearNum }) => {
  console.log('data passed to month is ', data['26'].cost)
  return (
  <div>{monthNum} and also {yearNum}</div>
  )
}

Month.propTypes = {
  data: PropTypes.object.isRequired,
  monthNum: PropTypes.number.isRequired,
  yearNum: PropTypes.number.isRequired,
};

export default Month;
