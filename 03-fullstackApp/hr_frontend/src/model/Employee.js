export default class Employee
{
    constructor(employee = {
        identityNo : "11111111110",
        fullname : "Kate Austen",
        iban : "TR463347985047300994585415",
        birthYear: 1959,
        salary: 10000,
        department: "IT",
        fulltime: true
    })
    {
        this.identityNo = employee.identityNo;
        this.fullname   = employee.fullname;
        this.iban       = employee.iban;
        this.photo      = employee.photo;
        this.birthYear  = employee.birthYear;
        this.salary     = employee.salary;
        this.department = employee.department;
        this.fulltime   = employee.fulltime;
    }
}