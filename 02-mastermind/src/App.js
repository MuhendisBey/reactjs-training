import logo from './logo.svg';
import './App.css';

/*
* Brief:
*   Game level with 3 digit.
*     For ex: 549 --> secret
*       input: 123 --> no match
*       input: 456 --> -2 match (user found 2 digit but their location is wrong)
*       input: 574 --> (-1+1)
*       input 549 --> mathced, move to game level 4
* Max game level = 10
* user can try at max 10 iteration.
* user should take a move in 60 seconds
* if user lost game, user can continue last checkpoint
* some statistic should be taken into account:
*   wining count, losing count
* if user lost connection with game, user can continue last state
*   hint: Local Storage, component lifecycle
* Generic Hint: Redux, routing
*/
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
