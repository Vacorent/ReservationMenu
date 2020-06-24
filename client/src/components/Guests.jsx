import React from 'react';

class Guests extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      adultCount: 1,
      childCount: 0,
      infantCount: 0,
      isDropdown: false,
    };
    this.dropdownClick = this.dropdownClick.bind(this);
  }

  dropdownClick(e) {
    console.log('table clicked');
    const { isDropdown } = this.state;
    this.setState({
      isDropdown: !isDropdown
    })
    e.preventDefault();
  }

  renderView() {
    const { isDropdown } = this.state;
    if (isDropdown) {
      return (
        <tbody className="dropdownGuests">
          <tr>
            <td>
              <div>Test1</div>
            </td>
            <td>
              <button>Hello</button>
            </td>
          </tr>
          <tr >
            <td>
              <div>22</div>
            </td>
          </tr>
        </tbody>
      )
    } else {
      return;
    }

  }

  render() {
    const { adultCount, childCount } = this.state;
    const totalCount = adultCount + childCount;
    const guestText = totalCount === 1 ? 'guest' : 'guests';
    return (
      <>
        <tbody>
          <tr>
            <td colSpan="2" className="guests" onClick={this.dropdownClick}>
              <div className="guestText1">GUESTS</div>
              <div className="guestText2">
                {totalCount}
                {' '}
                {guestText}
              </div>
              <div className="downArrow">&#8964;</div>
            </td>
          </tr>
        </tbody>
        {this.renderView()}
      </>
    );
  }
}

export default Guests;
