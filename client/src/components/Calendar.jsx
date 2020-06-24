import React from 'react';
import PropTypes from 'prop-types';
import Guests from './Guests';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { capacity } = this.props;
    return (
      <table className="table">
        <tbody>
          <tr>
            <td className="checkin">
              <div className="staticText">CHECK-IN</div>
              <div className="dynamicText">Add date</div>
            </td>
            <td className="checkout">
              <div className="staticText">CHECKOUT</div>
              <div className="dynamicText">Add date</div>
            </td>
          </tr>
        </tbody>
        <Guests capacity={capacity} />
      </table>
    );
  }
}

Calendar.propTypes = {
  capacity: PropTypes.number.isRequired,
};

export default Calendar;
