import './App.css';
import React from 'react';
import ReactDOM from 'react-dom';
import NavigateBar from './App';

export default class Index extends React.Component {
  render() {
      return (<React.StrictMode> 
                <NavigateBar />
              </React.StrictMode>
      );
  }
}

ReactDOM.render(<Index />, document.getElementById("root"));


