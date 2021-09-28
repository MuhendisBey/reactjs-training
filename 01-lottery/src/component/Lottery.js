/* React Components:
*  1. Stateless
*   i.  function lottert () {...}
*  2. Statefull
*   i. javascript class -> class 00 extends --> React.PureComponent => We're here!
*   ii. react hooks --> function
 */

import React from "react";

// Stateful Component
class Lottery extends React.PureComponent
{
    constructor(props, ctx) {
        super(props, ctx);
        // this.numbers = []; // we dont do that here
        this.state = {
            numbers: [],
            column: 3
        };
    }

    getLotteryNumbers = (min, max, size) => {
        let lotteryNumbers = [];
        while (lotteryNumbers.length < size) {
            let number = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!lotteryNumbers.includes(number))
                lotteryNumbers.push(number);
        }
        lotteryNumbers.sort((x, y) => x - y);
        return lotteryNumbers;
    }

    /* React'de state degisikliklerini bu sekilde yaparsan daha performant ve daha uyumlu oluyor.
    * Bu biraz fazla bellek tuketebilir o an icin ama react'in state'i degistiren heuristic calisan fonksiyonu bu sekilde
    * daha etkin calisiyor.*/
    draw = () => {
        let newLotteryNumbers = [...this.state.numbers];
        for (let i = 0; i < this.state.column; ++i) {
            newLotteryNumbers.push(this.getLotteryNumbers(1, 60, 6));
        }
        // this.state.numbers.push // Bu yanlis
        this.setState({
            numbers: newLotteryNumbers
        });
    }

    reset = () => {
        this.setState({
            numbers: []
        });
    }

    remove = (lotteryNumberIdx) => {
        console.log("DEBUG: numbers[" + lotteryNumberIdx + "]: " + this.state.numbers[lotteryNumberIdx] );
        // let cloneNumbers = [...this.state.numbers]; /* Bunu da yapabilirsin ama zaten kopyalacak isen filter mekanizmasi
        // kullan */
        // this.setState({
        //     numbers: cloneNumbers
        // });

        this.setState({
            numbers: this.state.numbers.filter((lotteryNumber, idx) => lotteryNumberIdx !== idx)
        })
    }

    handleChange = (event) => {
        // this.setState is running as an async
        this.setState({
            column : event.target.value
        }, () => {
            console.log("State has changed: " + this.state.column);
        });
        console.log("After calling setState():" + this.state.column);
    }

    /*
    *   Render methodu:
    *       Component Base bir sekilde view yapiyor
    *       Dinamik kisimlar icin functional programming kullaniyoruz. ornegin this.state.numbers.map(...)
    */
    render = () => {
        let table = ""; // View esan edilebilinir
        if (this.state.numbers.length > 0) // Bu sayede table'in icinde hic eleman yok ise gosterme
        {
            table = <table className="table table-bordered table-hover table-responsive table-info ">
                <thead>
                <tr>
                    <th>No</th>
                    { //html icinde dinamik birsey yapiyorsan burada hep curly brace kullan
                        Array.from(Array(6).keys()).map(i => <th>Column #{i+1}</th>)
                    }
                    <th>Operations</th>
                </tr>
                </thead>
                <tbody>
                {
                    this.state.numbers.map((lotteryNumbers, index) =>
                        <tr>
                            <td>{index+1}</td>
                            {
                                lotteryNumbers.map(number =>
                                    <td>{number}</td>)
                            }
                            <td>
                                <button id={index+1} className="btn btn-danger" onClick={() => this.remove(index)}> Remove </button>
                            </td>
                        </tr>
                    )
                }
                </tbody>
            </table>;
        }
        // return MVC's V(iew)
        return( // View
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">Lottery Application</div>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <label htmlFor="column">Column:</label>
                            <input id="column" name="column" type="text" value={this.state.column}
    onChange={this.handleChange}/>
                        </div>
                        <div className="form-group">
                            <button className="btn-succes" onClick={this.draw}>Draw</button>
                            <button className="btn-succes" onClick={this.reset}>Reset</button>
                        </div>
                        <div className="form-group">
                            {table}
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Lottery;
