var express = require('express');
var app = express();
var mysql = require('mysql');
var bodyParser = require('body-parser');
var credentials = 
{
host: "iris-se-database.mysql.database.azure.com",
port: "3306",
user: "iris_se@iris-se-database",
password: "Soft20ware",
database: "iris_db",
ssl: true 
};
var conn = mysql.createConnection(credentials);

app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) 
{
  res.sendFile("register.html", { root: __dirname });
});

app.post('/register',function(req,res)
  {
    var fname = req.body.fname;
    var lname = req.body.lname;
    var pass = req.body.pswrd;
    var roll = req.body.rollno;
    var email = req.body.email;
    var gender = req.body.gender;
    var flag = 0;
    conn.connect(function(err)
    {
        conn.query("SELECT * FROM iris_db.emp_login",function(error,rows,fields)
        {
          console.log("Connected "+fname+" "+lname+" - "+roll);
          var length = rows.length;
          console.log(length);
          flag = 0;
          for(i=0;i<length;i++)
          { 
            if(rows[i].f_roll == roll) 
                {
                  console.log(rows[i].roll+" already exists in DB.");
                  flag = 1; 
                  break;
                }
                else
                {
                console.log('New Record up for registration');
                break;
                }
          }
        })
        if(!flag)
            var sql = "INSERT INTO iris_db.emp_details (f_fname, f_lname,f_password,f_roll,f_email,f_gender) VALUES (?,?,?,?,?,?)";
        else  
            alert("Your roll no"+roll+"is already registered :)");
        conn.query(sql,[fname,lname,pass,roll,email,gender], function (err, result) {
          if (err) throw err;
          console.log("1 record inserted");
    
          alert('Your submission was succesfully saved:)');
          res.sendFile('register_success.html',{root: __dirname});
          //setTimeout(function(){location.href="login.html"} , 5000);   
        });
      });
  })
app.listen(3001); 
