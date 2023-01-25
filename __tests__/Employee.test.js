import {Employee} from "../index";

describe("Employee", () => {
    describe("constructor", () => {
        it("should return a new instance of an Employee with correct values for all properties", ()=> {
            const eName = "Ryan";
            const id = 473;
            const email = "r@nowhere.com";

            const newEmployee = new Employee(eName, id, email);

            expect(newEmployee.name).toEqual(eName);
            expect(newEmployee.id).toEqual(id);
            expect(newEmployee.email).toEqual(email);
        });

        it("should return the correct values for all getter methods", () => {
            const eName = "Ryan";
            const id = 473;
            const email = "r@nowhere.com";
            const role = "Employee";

            const newEmployee = new Employee(eName, id, email);
            const itsName = newEmployee.getName();
            const itsId = newEmployee.getId();
            const itsEmail = newEmployee.getEmail();
            const itsRole = newEmployee.getRole();

            expect(itsName).toEqual(eName);
            expect(itsId).toEqual(id);
            expect(itsEmail).toEqual(email);
            expect(itsRole).toEqual(role);
        });
    });
});