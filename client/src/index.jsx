import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from './components/Header.jsx';
import Calendar from './components/Calendar.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      price: 0,
      rating: 0,
      reviewCount: 0,
      capacity: 0,
      calendar: []
    }
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    const setData = this.setData.bind(this);
    axios.get('http://localhost:3004/reservation/0')
      .then((res) => {
        console.log('good get ', res.data['0']);
        setData(res.data['0']);
      })
      .catch((err) => {console.log('error in get ', err)});
  }

  setData(data) {
    this.setState({
      price: data.calendar['0'].cost,
      rating: data.reviewAverage,
      reviewCount: data.reviewCount,
      capacity: data.guestCapacity,
      calendar: data.calendar,
    })
  }


  render() {
    const price = this.state.price;
    const rating = this.state.rating.toFixed(2);
    const reviewCount = this.state.reviewCount;
    return (
      <div>
        <Header price={price} rating={rating} reviewCount={reviewCount} />
        <Calendar price={price}/>
        <button className="availButton">Check availability</button>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('resMenu'));