import CardTitle from "./component/CardTitle";
import {Link} from "react-router-dom";

export default function UserWins ()
{
    return (
        <div className="card">
            <CardTitle title="Good game!"/>
            <div className="card-body">
                <div className="card-body">
                    <Link to="/">Would you like to play again</Link>
                </div>
            </div>
        </div>
    )
}