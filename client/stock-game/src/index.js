import React from 'react';
import ReactDOM from 'react-dom';
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import reportWebVitals from './reportWebVitals';

import '../src/assets/css/custom.scss';

// import App from './App';
// import TestPage from "views/TestPage/TestPage.js";
import MainPage from "./views/MainPage/MainPage.js";


var hist = createBrowserHistory();

ReactDOM.render(
  <Router history={hist}>
    <Switch>
      {/* <Route path="/test-page" component={TestPage} /> */}
      <Route path="/" component={MainPage} />
      {/* <Route path="/" component={App} /> */}
    </Switch>
  </Router>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
