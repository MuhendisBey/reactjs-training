import React from "react";
import Move from './model/Move'
import Badge from "./component/Badge";
import CardTitle from "./component/CardTitle";
import TableHeader from "./component/TableHeader";
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
*
* Dinamik olarak uretilen yerlerde muhakkak "key"i kullan. Daha etkin konsulasyon yapiyor.
*/
class MasterMindApp extends React.PureComponent
{
  constructor(props, context)
  {
    super(props, context);
    this.state = {
      game : {
        secretNumber : this.createSecretNumber(3),
        level : 3,
        tries : 0,
        guessNumber : 123,
        moves : [],
        timeout : 60,
      },
      statistics : {
        wins : 0,
        loses : 0,
        averageWinTime : 0 //TODO
      }
    }
  }

  /* when componen is loaded we shoud load back state from local storage*/
  // componentDidMount = () => {
  //   let masterMindState = localStorage.getItem("mastermind-state");
  //   if (null === masterMindState || undefined === masterMindState)
  //   {
  //     localStorage.setItem("mastermind-state", JSON.stringify(this.state))
  //   }
  //   else
  //   {
  //     let state = JSON.parse(masterMindState);
  //     this.setState(state);
  //   }
  // }

  // updateStateCallback = (state) =>
  // {
  //   localStorage.setItem("mastermind-state", JSON.stringify(state));
  // }

  createDigit = (min, max) =>
  {
    return Math.floor(Math.random() * (max  - min + 1 ) + min);
  }

  createSecretNumber = (level) =>
  {
    let digits = [this.createDigit(1,9)];
    while (digits.length < level)
    {
      let digit = this.createDigit(0,9);
      if (!digits.includes(digit))
      {
        digits.push(digit);
      }
    }

    let secretNumber = digits.reduce((number, digit) => 10 * number + digit, 0);
    console.log("Generated secretNumber: " + secretNumber.toString())

    return secretNumber;
  }

  play = () =>
  {
    let game = {...this.state.game};
    let statistics = {...this.state.statisctis}

    game.tries++;
    if (game.guessNumber === game.secretNumber) // full match
    {
      game.level++;
      if (game.level > 10)
      {
        // TODO player wins
        statistics.wins++;
        this.props.history.push("/wins");
      }
      else
      {
        game.tries = 0;
        game.moves = [];
        game.secretNumber = this.createSecretNumber(game.level);
        game.timeout = 60;
        this.setState({game})
      }
    }
    else // partial or none match
    {
      if (game.tries > 10)
      {
        // TODO player loses
        statistics.loses++;
        this.props.history.push("/loses");
      }
      else
      {
        game.moves.push(new Move(game.guessNumber, this.createEvaluation(game.guessNumber, game.secretNumber)));
        this.setState({game});
      }
    }
  }

  createEvaluation = (guess, secret) => {
    let perfectMatch = 0;
    let partialMatch = 0;
    let guessAsString = guess.toString();
    let secretAsString = secret.toString();
    for (let i = 0; i< guessAsString.length;++i)
    {
      let g = guessAsString.charAt(i);
      for (let j = 0; j< secretAsString.length;++j)
      {
        let s = secretAsString.charAt(j);
        if (g === s)
        {
          if (i===j)
          {
            perfectMatch++;
          }
          else
          {
            partialMatch++;
          }
        }
      }
    }
    if (partialMatch === 0 && perfectMatch=== 0)
      return "No match";
    let evaluationString = "";
    if (partialMatch>0)
      evaluationString += `-${partialMatch}`;
    if (perfectMatch>0)
      evaluationString += `+${perfectMatch}`;
    return evaluationString;
  }

  handleChange = (event) =>
  {
    let tmpGameState = {...this.state.game};
    console.log("event.target.value: " + event.target.value);
    tmpGameState.guessNumber = Number(event.target.value);
    this.setState({game: tmpGameState});
    console.log("After calling setState():" + this.state.game.guessNumber);
  }

  render = () =>
  {
    console.log("Called MasterMind.render");
    return ( // View kucuk oldugu surece recon.. algorimasinin daha hizli calismasini saglar
        <div className="container">
          <div className="card">
            <div className="card-header">
              <CardTitle title="MasterMind: Game Console"/>
            </div>
            <div className="card-body">
              <div className="form-group">
                <label htmlFor="level">Game Level:</label>
                <span className="badge alert-info" id="level">{this.state.game.level}</span>
              </div>
              <Badge id="tries" label="Tries" value={this.state.game.tries}/>
              <Badge id="counter" label="Counter" value={this.state.game.counter}/>
              <div className="form-group">
                <label htmlFor="guess">Guess:</label>
                <input id="guess"
                       name="guess"
                       className="form-control"
                       onChange={this.handleChange}
                       type="text" value={this.state.game.guessNumber}/>
              </div>
              <div className="form-group">
                <button className="btn btn-success"
                        onClick={this.play}> Play
                </button>
              </div>
            </div>
          </div>
          <p/>
          <div className="card">
            <div className="card-header">
              <CardTitle title="Moves"/>
            </div>
            <div className="card-body">
              <table className="table table-bordered table-hover table-responsive table-info">
                <TableHeader headers="No,Guess,Evaluation"/>
                <tbody>
                {
                  this.state.game.moves.map((move, index) =>
                      <tr key={move.guessNumber + index.toString()}>
                        <td>{index + 1}</td>
                        <td>{move.guessNumber}</td>
                        <td>{move.evauluationString}</td>
                      </tr>
                  )
                }
                </tbody>
              </table>
            </div>
          </div>
          <p/>
          <div className="card">
            <div className="card-header">
              <CardTitle title="Statistics"/>
            </div>
            <div className="card-body">
              <Badge id="wins" label="Wins:" value={this.state.statistics.wins + " of " + (this.state.statistics.wins + this.state.statistics.loses)}/>
              <Badge id="wins" label="Wins:" value={this.state.statistics.loses + " of " + (this.state.statistics.loses + this.state.statistics.wins)}/>
            </div>
          </div>
        </div>
    );
  }
}

export default MasterMindApp;
