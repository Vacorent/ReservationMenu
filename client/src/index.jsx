import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from './components/Header';
import Calendar from './components/Calendar';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      price: 0,
      rating: 0,
      reviewCount: 0,
      capacity: 0,
      calendar: {},
    };
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    const setData = this.setData.bind(this);
    axios.get('http://localhost:3004/reservation/0')
      .then((res) => {
        console.log('good get ', res.data['0'], res.data['1']);
        setData(res.data['0'], res.data['1']);
      })
      .catch((err) => { console.log('error in get ', err); });
  }

  setData(data, cal) {
    this.setState({
      price: cal['0']['1'].cost,
      rating: data.reviewAverage,
      reviewCount: data.reviewCount,
      capacity: data.guestCapacity,
      calendar: cal,
    });
  }

  render() {
    const {
      price, reviewCount, capacity, calendar,
    } = this.state;
    let { rating } = this.state;
    rating = rating.toFixed(2);
    return (
      <div id="root">
        <Header price={price} rating={rating} reviewCount={reviewCount} />
        <br />
        <Calendar capacity={capacity} calendar={calendar} />
        <button type="submit" className="availButton">Check availability</button>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('resMenu'));
