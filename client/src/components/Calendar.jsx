import React from 'react';
import Guests from './Guests';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
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
        <tbody>
          <tr>
            <Guests />
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Calendar;
