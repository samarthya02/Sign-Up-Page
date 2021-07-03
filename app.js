// jshint esversion: 6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");
const https = require("https");
const app = express();


app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));

app.get("/" , function(req,res){
    res.sendFile(__dirname + "/index.html");
})

app.post("/" , function(req,res){
    const f_name = req.body.first_name;
    const s_name = req.body.last_name;
    const email = req.body.email;
    
    const data = {
        members : [
            {
                email_address : email,
                status : "subscribed",
                merge_fields : {
                    FNAME : f_name,
                    LNAME : s_name
                }
            }
        ]
    }
    const url = "https://us6.api.mailchimp.com/3.0/lists/07a5743751";
    const options = {
        method : "POST",
        auth : "samarthya02:f7c13e625136bfe913b6ab2bbd927fd9-us6"
    }

    const jsonData = JSON.stringify(data);
    const request = https.request(url , options , function(response){
        if(response.statusCode === 200 ){

            res.sendFile(__dirname + "/success.html")
        }else{
            res.sendFile(__dirname + "/failure.html")
        }

    })

    request.write(jsonData);
    request.end();



    
    


});

app.listen(process.env.PORT || 3000 , function(){
    console.log("started...............");
});

app.post("/success" , function(req,res){
    res.redirect("/");
})

app.post("/failure" , function(req,res){
    res.redirect("/");
})

// f7c13e625136bfe913b6ab2bbd927fd9-us6
// 07a5743751