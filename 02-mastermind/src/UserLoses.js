import CardTitle from "./component/CardTitle";
import {Link} from "react-router-dom";

export default function UserLoses ()
{
    return (
        <div className="card">
            <CardTitle title="You have lost the game!"/>
            <div className="card-body">
                <Link to="/">Would you like to play again</Link>
            </div>
        </div>
    )
}