var express = require('express');
var app = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    extended: true
}));

app.post("/update_marks", function (req, res) { 
    let p1 = req.body.P1;
    let p2 = req.body.P2;
    if(p1>50|| p2>50 || p1<0 || p2<0) {
        res.send({
            "message":"Invalid marks"
        })
    }
    else{
        res.send({
            "message":"success"
        })
    }
})

let server = app.listen(8081, () => {
    console.log("Listening on port " + server.address().port + "...");
});

module.exports = server;