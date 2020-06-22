import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Header from './components/Header.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      price: 0,
      rating: 0,
      reviewCount: 0,
      calendar: []
    }
  }

  componentDidMount() {
    this.getAll();
  }

  getAll() {
    axios.get('http://localhost:3004/reservation/0')
      .then((res) => {console.log('good get ', res)})
      .catch((err) => {console.log('error in get ', err)});
  }


  render() {
    return (
      <div>
        <div className="head">HelloWorld</div>
        <div className="notHead">Yoyoyo Test</div>
      </div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('resMenu'));