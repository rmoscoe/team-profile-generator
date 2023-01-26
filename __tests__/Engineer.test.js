const Engineer = require("../lib/engineer");

describe("Engineer", () => {
    describe("constructor", () => {
        it("should return a new instance of an Engineer with correct values for all properties", ()=> {
            const eName = "Ryan";
            const id = 473;
            const email = "r@nowhere.com";
            const github = "octoryan";

            const newEngineer = new Engineer(eName, id, email, github);

            expect(newEngineer.name).toEqual(eName);
            expect(newEngineer.id).toEqual(id);
            expect(newEngineer.email).toEqual(email);
            expect(newEngineer.github).toEqual(github);
        });

        it("should return the correct values for all getter methods", () => {
            const eName = "Ryan";
            const id = 473;
            const email = "r@nowhere.com";
            const role = "Engineer";
            const github = "octoryan";

            const newEngineer = new Engineer(eName, id, email, github);
            const itsName = newEngineer.getName();
            const itsId = newEngineer.getId();
            const itsEmail = newEngineer.getEmail();
            const itsRole = newEngineer.getRole();
            const itsGithub = newEngineer.getGithub();

            expect(itsName).toEqual(eName);
            expect(itsId).toEqual(id);
            expect(itsEmail).toEqual(email);
            expect(itsRole).toEqual(role);
            expect(itsGithub).toEqual(github);
        });
    });
});