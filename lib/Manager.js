// TODO: Write code to define and export the Manager class. HINT: This class should inherit from Employee.
const Employee = require("./Employee");

class Manager extends Employee {
    constructor(id, name, email, officeNum) {
        super(id, name, email);
        this.officeNum = officeNum;
    }

    getOfficeNumber(){
        return this.officeNum;
    }

    getRole(){
        return "Manager";
    }
}

module.exports = Manager;