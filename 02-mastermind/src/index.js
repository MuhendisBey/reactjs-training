import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import MasterMindApp from './MasterMindApp';
import reportWebVitals from './reportWebVitals';
import {Route, BrowserRouter as Router} from "react-router-dom";
import UserWins from "./UserWins";
import UserLoses from "./UserLoses";

/* Static Routing Table */
let routing = <Router>
    <Route path="/" exact component={MasterMindApp}/>
    <Route path="/wins" exact component={UserWins}/>
    <Route path="/loses" exact component={UserLoses}/>
</Router>

ReactDOM.render(
  <React.StrictMode>
      {routing}
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
