
const fs = require('fs');

var breuciaResponse = fs.readFileSync('breucia.html').toString();
var avengaalResponse = fs.readFileSync('avengaal.html').toString();
var slokosResponse = fs.readFileSync('slokos.html').toString();

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

app.get("/service/selectedChoice", function(request, response) {
    response.status(200);
    response.send(GetResponse(choice));
});

app.post("/service/makeChoice", function(request, response) {
    if(choice == 0)
    {
        choice = request.body.choice;
        response.status(200);
        response.send(GetResponse(choice));
        return;
    }

    response.status(400);
    response.send({ error: "Choice already made"})
});

function GetResponse(choice) {
    var response = "";
    switch(choice)
    {
        case 1:
            response = breuciaResponse;
            break;
        case 2:
            response = avengaalResponse;
            break;
        case 3:
            response = slokosResponse;
            break;
    }
    return { hasChosen: choice != 0, response: response };
}

app.listen(80);