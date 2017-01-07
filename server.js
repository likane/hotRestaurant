var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

//RESERVATION DATA
//============================================================
var reservations = [{
	routeName: "francis",
	phone: "9492939767",
	email: "flao@ucla.edu",
	uniqueID: 1
}]


//============================================================
app.get("/", function(req, res){
	res.sendFile(path.join(__dirname, "index.html"))
});


app.get("/reserve", function(req, res){
	res.sendFile(path.join(__dirname, "reserve.html"))
});

// Search for Specific Character (or all characters) - provides JSON
app.get("/api/:characters?", function(req, res) {
  var chosen = req.params.characters;

  if (chosen) {
    console.log(chosen);

    for (var i = 0; i < characters.length; i++) {
      if (chosen === characters[i].routeName) {
        res.json(characters[i]);
        return;
      }
    }

    res.json(false);
  }
  else {
    res.json(characters);
  }
});

//CREATE NEW RESERVATIONS
app.post("/api/reserve", function(req, res){

	//console.log("hi");

	var newResrvation = req.body;
	//newResrvation.routeName = newResrvation.name.replace(/\s+/g, "").toLowerCase();

	console.log(newResrvation);
	reservations.push(newResrvation);
	res.json(newResrvation);
});



// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});