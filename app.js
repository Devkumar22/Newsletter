const express = require("express");
const bodyParser = require("body-parser");
let request = require("request");
const https = require("https");
const app = express();

app.use(express.static("public"));
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())
app.get("/", function(req, res){
   res.sendFile(__dirname + "/sign-up.html");
});

app.post("/", function(req, res){
   const firstName = req.body.fName;
   const lastName = req.body.lName;
   const email = req.body.email;

   console.log(req.body);

   const data = {
      members: [
         {
            email_address: email,
            status: "subscribed",
            merge_fields: {
               FNAME: firstName,
               LNAME: lastName
            }
         }
      ]
   }
   console.log(data);
const jsonData = JSON.stringify(data);

const url = "https://us6.api.mailchimp.com/3.0/lists/354020868e/members/612db1e6113a5d423775f1fdbb010a29-us5/notes/dev.1923it1132@kiet.edu";

let options = {
   method: "POST",
   auth: "dev1:612db1e6113a5d423775f1fdbb010a29-us5"
}

request = https.request(url, options, (response)=>{
   response.on("data", function(data) {
      console.log(JSON.parse(data));
   })
})

request.write(jsonData);
request.end();
});



// thus is a commt

app.listen(3000 , function(){
   console.log("server is running on port 3000"); 
});

// 612db1e6113a5d423775f1fdbb010a29-us5
// 354020868e