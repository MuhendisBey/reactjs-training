import React from "react";
import {Line} from "react-chartjs-2";
import {io} from "socket.io-client";

export default class Market extends React.Component
{
    constructor(props, context)
    {
        super(props, context);
        this.state = {
            isMonitoring: false,
            trades: [],
            movingAvaragePrices: [],
            windowsSize: 25,
            totalVolume: 0,
            data: {
                labels: [],
                datasets: [

                ]
            }
        }
    }

    componentDidMount = () =>
    {
        this.socket = io("ws://localhost:5555");
        this.socket.on('ticker', this.listenTickerHandler);
    }

    listenTickerHandler = async (trade) =>
    {
        let trades = [...this.state.trades];
        trade.volume = Number(trade.price) * Number(trade.quantity);
        trades.push(trade);

        let avaragePrice = trades.reduce((sum, trade) => sum + Number(trade.price), 0)/trades.length;
        let movingAvaragePrices = [this.state.movingAvaragePrices];
        movingAvaragePrices.push(avaragePrice);

        let newData = {...this.state.data};
        newData.datasets[0].data = trades.map(trade => trade.price);
        newData.datasets[1].data = movingAvaragePrices;
        newData.labels.push(trade.timestamp);

        if (newData.data.datasets[0].data.length > this.state.windowsSize)
        {
            let index = newData.datasets[0].data.length - this.state.windowsSize;
            newData.datasets[0].data = newData.datasets[0].data.slice(index);
            newData.datasets[1].data = newData.datasets[1].data.slice(index);
            newData.labels = newData.labels.slice(index);
        }

        this.setState({trades, movingAvaragePrices, data: newData});
    }

    render = () =>
    {
        return (
            <div className="container">
                <div className="card">
                    <div className="card-header">
                        <div className="card-title">Market Panel</div>
                    </div>
                    <div className="card-body">
                        <Line redraw
                              data={this.state.data}
                              width={600}
                              height={480}
                              options={{maintainAspectRatio: false, animation: false}}
                        />
                    </div>
                </div>
            </div>
        )
    }

}