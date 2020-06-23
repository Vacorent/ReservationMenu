import React from 'react';

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
            <td colSpan="2" className="guests">
              <div className="staticText">GUESTS</div>
              <div className="darkDynamicText">1 guest</div>
              <div className="downArrow">&#8964;</div>
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}

export default Calendar;
