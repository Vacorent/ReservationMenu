import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Moment from 'moment';

import styles from './css/index.css';
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
      startDate: '',
      endDate: '',
      adultCount: 1,
      childCount: 0,
      infantCount: 0,
      guestCountMultiplier: 1,
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleGuestChange = this.handleGuestChange.bind(this);
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

  handleStartChange(date) {
    const { calendar } = this.state;
    let { price } = this.state;
    let month, day;
    if (date !== '') {
      month = parseInt(date.slice(0,2));
      day = parseInt(date.slice(3,5));
      price = calendar[month][day]['cost'];
    }
    this.setState({
      startDate: date,
      price: price,
    })
  }

  handleEndChange(date) {
    const { calendar, startDate } = this.state;
    let { price } = this.state;
    let month, day, startMonth, startDay;
    if (date !== '') {
      price = 0;
      const startMoment = Moment(startDate, "MM/DD/YYYY");
      const endMoment = Moment(date, "MM/DD/YYYY").add(1, 'days');
      let currMonth, currDate;
      while (startMoment.isBefore(endMoment)) {
        currMonth = startMoment.month();
        currDate = startMoment.date();
        price += calendar[currMonth][currDate]['cost'];
        startMoment.add(1, 'days');
      }
    } else if (date === '') {
      price = calendar['0']['1'].cost;
    }
    this.setState({
      endDate: date,
      price: price,
    })
  }

  handleGuestChange(type, inc) {
    const { adultCount, childCount, infantCount, guestCountMultiplier } = this.state;
    const totalCount = adultCount + childCount;
    if (type === 'adult') {
      if (inc === 1) {
        this.setState({
          adultCount: adultCount + 1,
          guestCountMultiplier: guestCountMultiplier*1.05,
        });
      } else {
        this.setState({
          adultCount: adultCount - 1,
          guestCountMultiplier: guestCountMultiplier/1.05,
        });
      }
    } else if (type === 'child') {
      if (inc === 1) {
        this.setState({
          childCount: childCount + 1,
          guestCountMultiplier: guestCountMultiplier*1.05,
        });
      } else {
        this.setState({
          childCount: childCount - 1,
          guestCountMultiplier: guestCountMultiplier/1.05,
        });
      }
    } else if (type === 'infant') {
      if (inc === 1) {
        this.setState({
          infantCount: infantCount + 1,
        });
      } else {
        this.setState({
          infantCount: infantCount - 1,
        });
      }
    }
  }

  renderAvailButton() {
    const { startDate, endDate } = this.state;
    if (startDate && endDate) {
      return <button type="submit" className={styles.availButton}>Reserve</button>
    }
    return <button type="submit" className={styles.availButton}>Check availability</button>
  }

  renderCosts() {

  }

  render() {
    const {
      reviewCount, capacity, calendar, startDate, endDate, adultCount, childCount, infantCount, guestCountMultiplier,
    } = this.state;
    let { price } = this.state;
    price = parseInt((price*guestCountMultiplier).toFixed(0));
    let { rating } = this.state;
    rating = rating.toFixed(2);
    return (
      <>
      <div className={styles.root}>
        <Header price={price} rating={rating} reviewCount={reviewCount} />
        <br />
        <Calendar capacity={capacity} calendar={calendar} handleStartChange={this.handleStartChange} handleEndChange={this.handleEndChange} startDate={startDate} endDate={endDate} adultCount={adultCount} childCount={childCount} infantCount={infantCount} handleGuestChange={this.handleGuestChange} />
        {this.renderAvailButton()}
        {this.renderCosts()}
      </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('resMenu'));
