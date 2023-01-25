const index = require("../index");

describe("Intern", () => {
    describe("constructor", () => {
        it("should return a new instance of an Intern with correct values for all properties", ()=> {
            const eName = "Ryan";
            const id = 473;
            const email = "r@nowhere.com";
            const school = "UC Berkeley";

            const newIntern = new Intern(eName, id, email, school);

            expect(newIntern.name).toEqual(eName);
            expect(newIntern.id).toEqual(id);
            expect(newIntern.email).toEqual(email);
            expect(newIntern.school).toEqual(school);
        });

        it("should return the correct values for all getter methods", () => {
            const eName = "Ryan";
            const id = 473;
            const email = "r@nowhere.com";
            const role = "Intern";
            const school = "UC Berkeley";

            const newIntern = new Intern(eName, id, email, school);
            const itsName = newIntern.getName();
            const itsId = newIntern.getId();
            const itsEmail = newIntern.getEmail();
            const itsRole = newIntern.getRole();
            const itsSchool = newIntern.getSchool();

            expect(itsName).toEqual(eName);
            expect(itsId).toEqual(id);
            expect(itsEmail).toEqual(email);
            expect(itsRole).toEqual(role);
            expect(itsSchool).toEqual(school);
        });
    });
});