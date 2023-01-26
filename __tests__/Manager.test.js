const Manager = require("../lib/manager");

describe("Manager", () => {
    describe("constructor", () => {
        it("should return a new instance of a Manager with correct values for all properties", ()=> {
            const eName = "Ryan";
            const id = 473;
            const email = "r@nowhere.com";
            const office = 404;

            const newManager = new Manager(eName, id, email, office);

            expect(newManager.name).toEqual(eName);
            expect(newManager.id).toEqual(id);
            expect(newManager.email).toEqual(email);
            expect(newManager.officeNumber).toEqual(office);
        });

        it("should return the correct values for all getter methods", () => {
            const eName = "Ryan";
            const id = 473;
            const email = "r@nowhere.com";
            const role = "Manager";
            const office = 404;

            const newManager = new Manager(eName, id, email, office);
            const itsName = newManager.getName();
            const itsId = newManager.getId();
            const itsEmail = newManager.getEmail();
            const itsRole = newManager.getRole();

            expect(itsName).toEqual(eName);
            expect(itsId).toEqual(id);
            expect(itsEmail).toEqual(email);
            expect(itsRole).toEqual(role);
        });
    });
});