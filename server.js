var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var app = express();
var PORT = 3000;


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

// Table Reservations (DATA)
// =============================================================
var reservations = [

];

var tables_r = [];
var waitlist_r = [];




// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/tables", function(req, res) {
  res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function(req, res) {
  res.sendFile(path.join(__dirname, "reserve.html"));
});

// Get JSON
app.get("/api/tables", function(req, res) {



    res.json(tables_r);

});

app.get("/api/waitlist", function(req, res) {



    res.json(waitlist_r);

});

app.get("/api/reservations", function(req, res) {



    res.json(reservations);

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
app.post("/api/reservations/", function(req, res) {

      var newreservation = req.body;
      newreservation.routeName = newreservation.reserve_name.replace(/\s+/g, "").toLowerCase();

      console.log(newreservation);
      reservations.push(newreservation);

      if (reservations.length <= 5) {
        tables_r.push(newreservation);
        res.json(newreservation);
      } else {
        waitlist_r.push(newreservation);
        res.json(newreservation);
      }
  });





// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});