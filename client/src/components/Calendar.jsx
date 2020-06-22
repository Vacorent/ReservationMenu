import React from 'react';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }


  render() {
  return (<table className="table">
    <tbody>
      <tr>
        <td className="checkin">Check-in</td>
        <td className="checkout">Check-out</td>
      </tr>
    </tbody>
    <tbody>
      <tr>
        <td colSpan="2" className="guests">Guests</td>
      </tr>
    </tbody>
  </table>)
  }
}


export default Calendar;