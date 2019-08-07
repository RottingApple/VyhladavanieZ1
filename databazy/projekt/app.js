var express = require("express");
var bodyParser = require("body-parser");


//Routes
var indexRoutes = require("./routes/index");

var app = express();
console.log("OUR EXPRESS APP");

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + "/public"));
app.use(require("express-session")({
    secret: "Ten co stoji v dyme",
    resave: false,
    saveUninitialized: false
}));

/*app.get("/", function(req, res){
	db.any('SELECT * FROM films')
	.then(function(data){
		console.log("Success");
		console.log(data);
	})
	.catch(function(err){
		console.log("Error");
		console.log(err.message);
	})
	res.send("Hi there!");
})*/

app.use(indexRoutes);


app.listen(3000,function(){
	console.log("Server has been started on port 3000");
	console.log("Hi there!");
})

