const index = require("../index");

describe("Engineer", () => {
    describe("constructor", () => {
        it("should return a new instance of an Engineer with correct values for all properties", ()=> {
            const eName = "Ryan";
            const id = 473;
            const email = "r@nowhere.com";
            const github = "octoryan";

            const newEngineer = new Engineer(eName, id, email, github);

            expect(NewEngineer.name).toEqual(eName);
            expect(NewEngineer.id).toEqual(id);
            expect(NewEngineer.email).toEqual(email);
            expect(NewEngineer.github).toEqual(github);
        });

        it("should return the correct values for all getter methods", () => {
            const eName = "Ryan";
            const id = 473;
            const email = "r@nowhere.com";
            const role = "Engineer";
            const github = "octoryan";

            const NewEngineer = new Engineer(eName, id, email, github);
            const itsName = NewEngineer.getName();
            const itsId = NewEngineer.getId();
            const itsEmail = NewEngineer.getEmail();
            const itsRole = NewEngineer.getRole();
            const itsGithub = NewEngineer.getGithub();

            expect(itsName).toEqual(eName);
            expect(itsId).toEqual(id);
            expect(itsEmail).toEqual(email);
            expect(itsRole).toEqual(role);
            expect(itsGithub).toEqual(github);
        });
    });
});