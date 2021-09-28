import {useState} from "react";
import Employee from "./model/Employee";
import CardTitle from "./component/CardTitle";

/*
* Components:
*   1 --> Stateless => function
*   2 --> Statefull =>
*     ==> class
*     ==> React hooks => function
*/
function HRApp() /* this is a hook function. attention to useState Method */
{
    let [employee, setEmployee] = useState(new Employee());
    let [employees, setEmployees] = useState([]);

    return (
        <div className="container">
            <CardTitle title="HR Panel"/>
            <div className="card-body">
                <div className="form-group">
                    <label htmlFor="identity">Identity:</label>
                    <input id="identity" className="form-control" name="Identity" type="text" value={employee.identityNo}/>
                </div>
                <div className="form-group">
                    <label htmlFor="fullname">Fullname:</label>
                    <input id="fullname" className="form-control" name="Fullname" type="text" value={employee.fullname}/>
                </div>
                <div className="form-group">
                    <label htmlFor="iban">IBAN:</label>
                    <input id="iban" className="form-control" name="IBAN" type="text" value={employee.iban}/>
                </div>
                <div className="form-group">
                    <label htmlFor="salary">Salary:</label>
                    <input id="salary" className="form-control" name="Salary" type="text" value={employee.salary}/>
                </div>
                <div className="form-group">
                    <label htmlFor="birthYear">Birth Year:</label>
                    <input id="birthYear" className="form-control" name="Birthyear" type="text" value={employee.birthYear}/>
                </div>
                <div className="form-group">
                    <label htmlFor="department">Department:</label>
                    <select id="department" className="form-control">
                        <option>IT</option>
                        <option>Sales</option>
                        <option>Finance</option>
                        <option>HR</option>
                    </select>
                </div>
                <div className="form-group">
                    <label htmlFor="fulltime">Fulltime:</label>
                    <input id="fulltime" name="Fulltime" type="checkbox" value={employee.fulltime}/>
                </div>
                <div className="form-group">
                    <label htmlFor="photo">Photo:</label>
                    <img id="photo" name="Fulltime" src={employee.photo}/>
                    <label className={"btn btn-success"}>
                        <input type={"file"} style={{display: "none"}}/>
                    </label>
                </div>
            </div>
        </div>
    );
}

export default HRApp;
