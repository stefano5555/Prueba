const express = require('express');
const app = express();
const htpps = require('https');
const port = 3000;
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
const https = require("https");
const { urlToHttpOptions } = require('url');

app.use(express.static("public"));

app.get('/', function(req,res){
    res.sendFile(__dirname + "/index.html");   
});

app.listen(process.env.PORT || 3000, () => {
    console.log(`Example app listening on port ${port}`)
  })

  app.post("/", function(req,res){

    const firstName = req.body.fName;
    const lastName = req.body.lName;
    const email = req.body.email;

    console.log(firstName + " " + lastName + " " + email);

    const data = {
        members: [
            {
                email_address: email,
                status:"subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };

    const jsonData = JSON.stringify(data);

    const options = {
        method: "POST",
        auth: "stefano:3c4401bb89773e9469ba687dd2c7f5f2-us14"
    } 

    const url = "https://us14.api.mailchimp.com/3.0/lists/5b98e0ae28"

    const request = https.request(url, options, function(response){
        response.on("data",function(data){

            if(response.statusCode === 200)
            {
                res.sendFile(__dirname + "/success.html");
            }
            else{
                res.sendFile(__dirname + "/failure.html");
            }
            console.log(JSON.parse(data));
        })
    })

    request.write(jsonData);
    request.end();

    
  })


  /*3c4401bb89773e9469ba687dd2c7f5f2-us14*/

  /*5b98e0ae28*/

