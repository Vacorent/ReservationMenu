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
      totalPrice: 0,
      stayCal: [],
      stayDuration: 0,
      adultCount: 1,
      childCount: 0,
      infantCount: 0,
      guestCountMultiplier: 1,
      suggestStart: '',
      suggestEnd: '',
      costBreakdown: false,
    };
    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.handleGuestChange = this.handleGuestChange.bind(this);
    this.handleSuggestion = this.handleSuggestion.bind(this);
    this.handleCostDropdownClick = this.handleCostDropdownClick.bind(this);
    this.handleCostCloseClick = this.handleCostCloseClick.bind(this);
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    const setData = this.setData.bind(this);
    // const { origin } = window.location;
    // const id = window.location.href.slice(origin.length + 1);
    axios.get('/reservation/10')
      .then((res) => {
        // console.log('res in response is ', res)
        setData(res.data['0'], res.data['1']);
      })
      .catch((err) => { console.log('error in get ', err); });
  }

  setData(data, cal) {
    const today = Moment().add(1, 'days');
    let currDay; let
      currMonth;
    let { suggestStart, suggestEnd } = this.state;
    while (suggestStart === '') {
      currDay = today.date();
      currMonth = today.month();
      // console.log('todays day and month are ', Moment([currMonth, currDay]))
      if (cal[currMonth][currDay].isBooked === false) {
        suggestStart = today.format('MM/DD/YYYY');
      } else {
        today.add(1, 'days');
      }
    }
    while (suggestEnd === '') {
      currDay = today.date();
      currMonth = today.month();
      if (cal[currMonth][currDay].isBooked === true) {
        today.subtract(1, 'days');
        suggestEnd = today.format('MM/DD/YYYY');
      } else {
        today.add(1, 'days');
      }
    }
    this.setState({
      price: cal['0']['1'].cost,
      rating: data.reviewAverage,
      reviewCount: data.reviewCount,
      capacity: data.guestCapacity,
      calendar: cal,
      suggestStart,
      suggestEnd,
    });
  }

  handleStartChange(date) {
    const { calendar } = this.state;
    let { price } = this.state;
    if (date !== '') {
      const month = parseInt(date.slice(0, 2), 10) - 1;
      const day = parseInt(date.slice(3, 5), 10);
      // console.log('in start change', calendar[month][day])
      price = calendar[month][day].cost;
      this.setState({
        startDate: date,
        price,
        costBreakdown: false,
      });
    } else {
      this.setState({
        startDate: '',
        price,
        costBreakdown: false,
      });
    }
  }

  handleEndChange(date) {
    const { calendar, startDate } = this.state;
    let {
      totalPrice, stayDuration, price, stayCal,
    } = this.state;
    if (date !== '') {
      totalPrice = 0;
      const startMoment = Moment(startDate, 'MM/DD/YYYY');
      const endMoment = Moment(date, 'MM/DD/YYYY').add(1, 'days');
      let currMonth; let
        currDate;
      while (startMoment.isBefore(endMoment)) {
        currMonth = startMoment.month();
        currDate = startMoment.date();
        totalPrice += calendar[currMonth][currDate].cost;
        stayDuration += 1;
        stayCal.push([startMoment.format('MM/DD/YYYY'), calendar[currMonth][currDate].cost]);
        startMoment.add(1, 'days');
      }
      price = parseInt(totalPrice / stayDuration, 10);
    } else if (date === '') {
      price = calendar['0']['1'].cost;
      stayDuration = 0;
      stayCal = [];
    }
    this.setState({
      price,
      endDate: date,
      totalPrice,
      stayDuration,
      stayCal,
      costBreakdown: false,
    });
  }

  handleGuestChange(type, inc) {
    const {
      adultCount, childCount, infantCount, guestCountMultiplier,
    } = this.state;
    if (type === 'adult') {
      if (inc === 1) {
        this.setState({
          adultCount: adultCount + 1,
          guestCountMultiplier: guestCountMultiplier * 1.05,
        });
      } else {
        this.setState({
          adultCount: adultCount - 1,
          guestCountMultiplier: guestCountMultiplier / 1.05,
        });
      }
    } else if (type === 'child') {
      if (inc === 1) {
        this.setState({
          childCount: childCount + 1,
          guestCountMultiplier: guestCountMultiplier * 1.05,
        });
      } else {
        this.setState({
          childCount: childCount - 1,
          guestCountMultiplier: guestCountMultiplier / 1.05,
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

  handleSuggestion(e) {
    const { suggestStart, suggestEnd } = this.state;
    this.handleStartChange(suggestStart);
    setTimeout(() => {
      this.handleEndChange(suggestEnd);
    }, 100);
    e.preventDefault();
  }

  handleCostDropdownClick(e) {
    const { costBreakdown } = this.state;
    this.setState({
      costBreakdown: !costBreakdown,
    });
    e.preventDefault();
  }

  handleCostCloseClick() {
    this.setState({
      costBreakdown: false,
    });
  }

  renderAvailButton() {
    const { startDate, endDate } = this.state;
    if (startDate && endDate) {
      return <button type="submit" className={styles.availButton}>Reserve</button>;
    }
    return <button type="submit" className={styles.availButton}>Check availability</button>;
  }

  renderCostBreakdown() {
    const {
      costBreakdown, stayCal, price, guestCountMultiplier, stayDuration,
    } = this.state;
    const finalBase = parseInt(price * guestCountMultiplier, 10) * stayDuration;
    const perDayBase = stayCal.reduce((acc, el) => acc + el[1], 0);
    // console.log('perdayBase is ', perDayBase)
    const guestFee = Math.max(finalBase - perDayBase, 0);
    let stayCalIndex = 0;
    const stayCalElements = stayCal.map((date) => {
      stayCalIndex += 1;
      return (
        <tr key={stayCalIndex}>
          <td className={styles.costLeftNoUnder}>{date[0]}</td>
          <td className={styles.costRight}>
            $
            {date[1]}
          </td>
        </tr>
      );
    });
    const guestFeeElement = guestFee
      ? (
        <tr>
          <td className={styles.costLeftNoUnder}>Extra Guest Fee</td>
          <td className={styles.costRight}>
            $
            {guestFee}
          </td>
        </tr>
      )
      : null;
    const addGuestText = guestFee
      ? <td className={styles.addGuestText}>Includes extra guest fees.</td> : null;
    if (costBreakdown) {
      return (
        <table className={styles.costBreak}>
          <tbody>
            <tr>
              <td className={styles.costBreakLeft}>Base Price Breakdown</td>
              <td className={styles.costBreakRight}>
                <button className={styles.costClose} onClick={this.handleCostCloseClick} type="button">x</button>
              </td>
            </tr>
            {stayCalElements}
            {guestFeeElement}
            <tr className={styles.costTotalBreak}>
              <td className={styles.costTotalLeft}>Total Base Price</td>
              <td className={styles.costTotalRight}>
                $
                {finalBase}
              </td>
            </tr>
            <tr>
              {addGuestText}
            </tr>
          </tbody>

        </table>

      );
    }
    return null;
  }

  renderCosts() {
    const {
      endDate, stayDuration, price, guestCountMultiplier,
    } = this.state;
    const finalPrice = parseInt(price * guestCountMultiplier, 10);
    const subCost = finalPrice * stayDuration;
    const cleaningFee = parseInt(subCost / 8.2, 10) + 8;
    const serviceFee = parseInt(subCost / 10.5, 10) + 5;
    const nightText = stayDuration === 1 ? ' night' : ' nights';
    const totalCost = subCost + cleaningFee + serviceFee;
    if (endDate) {
      return (
        <>
          <div className={styles.costDrop}>
            <div>You won&apos;t be charged yet</div>
          </div>
          <div className={styles.costBox}>
            <div
              className={styles.costLeft}
              onClick={this.handleCostDropdownClick}
              onKeyDown={this.handleCostCloseClick}
              role="presentation"
            >
              $
              {finalPrice}
              {' x '}
              {stayDuration}
              {nightText}
            </div>
            <div className={styles.costRight}>
              $
              {subCost}
            </div>
            {this.renderCostBreakdown()}
          </div>
          <div className={styles.costBox}>
            <div className={styles.costLeftNoUnder}>Cleaning fee</div>
            <div className={styles.costRight}>
              $
              {cleaningFee}
            </div>
          </div>
          <div className={styles.costBoxLast}>
            <div className={styles.costLeftNoUnder}>Service Fee</div>
            <div className={styles.costRight}>
              $
              {serviceFee}
            </div>
          </div>
          <div className={styles.costTotal}>
            <div className={styles.costTotalLeft}>Total</div>
            <div className={styles.costTotalRight}>
              $
              {totalCost}
            </div>
          </div>
        </>
      );
    }
    return null;
  }

  renderSuggestions() {
    const { endDate, suggestStart, suggestEnd } = this.state;
    const formatSuggStart = Moment(suggestStart, 'MM/DD/YYYY').format('MMM D');
    const formatSuggEnd = Moment(suggestEnd, 'MM/DD/YYYY').format('MMM D');
    if (endDate) {
      return (
        <div className={styles.suggestionBox}>
          <div className={styles.suggText}>
            <span className={styles.suggestionBold}>This is a rare find </span>
            <span>Dennis and Bradley&apos;s place is normally booked!</span>
          </div>
          <span className={styles.suggCal} role="img" aria-labelledby="calendar">&#x1F48E;</span>
        </div>
      );
    }
    return (
      <div className={styles.suggestionBox}>
        <div className={styles.suggText}>
          <span className={styles.suggestionBold}>Possible dates for your trip </span>
          <span>
            This place is available
            {' '}
            {formatSuggStart}
            {' '}
            -
            {formatSuggEnd}
            .
          </span>
          {' '}
          <button
            onClick={this.handleSuggestion}
            onKeyDown={this.handleSuggestion}
            className={styles.addDates}
            type="button"
          >
            Add these dates
          </button>
        </div>
        <span className={styles.suggCal} role="img" aria-labelledby="calendar">&#x1F4D6;</span>
      </div>
    );
  }

  render() {
    const {
      reviewCount, capacity, calendar, startDate,
      endDate, adultCount, childCount, infantCount, guestCountMultiplier,
    } = this.state;
    let { price } = this.state;
    price = parseInt(price * guestCountMultiplier, 10);
    let { rating } = this.state;
    rating = rating.toFixed(2);

    return (
      <>
        <div className={styles.root}>
          <Header price={price} rating={rating} reviewCount={reviewCount} />
          <br />
          <Calendar
            capacity={capacity}
            calendar={calendar}
            handleStartChange={this.handleStartChange}
            handleEndChange={this.handleEndChange}
            startDate={startDate}
            endDate={endDate}
            adultCount={adultCount}
            childCount={childCount}
            infantCount={infantCount}
            handleGuestChange={this.handleGuestChange}
            handleCostClose={this.handleCostCloseClick}
          />
          {this.renderAvailButton()}
          {this.renderCosts()}
        </div>
        {this.renderSuggestions()}
      </>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('resMenu'));
