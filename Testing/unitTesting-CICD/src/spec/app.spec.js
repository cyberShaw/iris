const Request = require('request');

describe("Server", () => {
    var server;
    beforeAll(() => {
        server = require("D:\\SE-project\\testing\\unitTesting-CICD\\src\\app\\app.js");
    });

    afterAll(() => {
        server.close();
    });

    describe("POST /login", () => {
        it("0 0 0", () => {
            let data = {};
            let input = {
                "email": "abcxyz@gmail.com",
                "pswrd": "qwe123",
                "rem": "0"
            }
            Request.post("http://localhost:8081/login", {
                form: input
            }, (error, response, body) => {
                data.body = JSON.parse(body);
                expect(data.body.message).toBe("user name and password mismatch");
            });
        });
    });
});