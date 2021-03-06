var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');

var credentials = {
    host: "iris-se-database.mysql.database.azure.com",
    port: "3306",
    user: "iris_se@iris-se-database",
    password: "Soft20ware",
    database: 'iris_db', //database: "azureDB", (YOU MUST SPECIFY THE NAME OF THE DATABASE CREATED IN CLOUD, NOT THE NAME OF THE CONNECTION IN WORKBENCH)
    ssl: true //ssl=true (TYPO)
};

// var credentials = {
//     host: "http://iris-aws-db.c4hq5iosxryf.us-east-1.rds.amazonaws.com",
//     port: "3306",
//     user: "admin",
//     password: "#!Pascal1050ti",
//     database: 'iris_db', //database: "azureDB", (YOU MUST SPECIFY THE NAME OF THE DATABASE CREATED IN CLOUD, NOT THE NAME OF THE CONNECTION IN WORKBENCH)
//     ssl: true //ssl=true (TYPO)
// };

var conn = mysql.createConnection(credentials);

app.use(bodyParser.urlencoded({
    extended: true
}));

app.get("/", function (req, res) {
    res.send({
        "message": "good to go"
    });
});

//login 
app.post("/login", function (req, res) { 
    let user = req.body.email; //username - email id of faculty
    let pass = req.body.pswrd; //entered password
    let rem_chk = req.body.rem; //checkin remember or not
    let message = "";
    console.log("rem "+rem_chk)
    conn.connect(function (err) {
        conn.query("SELECT COUNT(*) AS cnt FROM iris_db.emp_login WHERE f_email='" + user + "'", function(error, rows, fields) {
            if(rows[0].cnt == 0) {
                message = "user name and password mismatch";
                res.send({
                    "message": message
                });
            }
            else {
                conn.query("SELECT * FROM iris_db.emp_login", function (error, rows, fields) {
                    console.log("Connected " + user + " " + pass);
                    let length = rows.length;
                    console.log(length);
        
                    for (i = 0; i < length; i++) {
                        if (rows[i].f_email === user) {
                            if (rows[i].f_remember === '1' || rows[i].f_pword === pass) {
                                console.log("herheh");
                                message = "success";
                                if (rem_chk === '1') { //value of remember checkbox is '1'
                                    conn.query("UPDATE iris_db.emp_login SET f_remember='1' WHERE f_email='" + user + "'", function (error, rows, fields) {
                                    console.log("Remember column updated");
                                    })
                                }
                            } else {
                                message = "failure";
                            }
                            break;
                        }
                    }
                    res.send({
                        "message": message
                    });
                })
            }
        })
    });
})

let server = app.listen(8081, () => {
    console.log("Listening on port " + server.address().port + "...");
});

module.exports = server;