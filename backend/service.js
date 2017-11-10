var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.json());

var choice = 0;

app.post("/service/login", function(request, response) {
    if(request.body.pass == "3MEEKUM201516")
    {
        response.status(200);
        response.send("/cv/real_verified.html");
        return;
    }

    response.status(400);
    response.send("error");
});

app.get("/service/haschosen", function(request, response) {
    response.status(200);
    response.send(choice);
});

app.get("/service/choose", function(request, response) {
    console.log(request.body);
    choice = request.body;
    response.status(200);
    response.send();
});

app.listen(80);