const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path")
require("dotenv").config()

var app = express(); //This is our server object


PORT = process.env.PORT || 5050
/*
	Middleware section: Here we specify our middleware, middlewares are basically functions that modify 
	request and response objects and some processing before they are handled by our routes 

		- body-parser provides middleware to modify the data sent as part of the requests to that
		  is appears/oraganized and easily accessed 
*/

app.use(cors({origin: true, credentials: true}));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "client", "build")))

/**
	
	The below lines import the schema that we created for storing movies, and then sets some
	default values for mongoose to prevent too many warnings from popping up. The mongoose.connect()
	statement in the code connects your application with MongoDB.

**/

var Anomoly = require("./models/Anomoly.js");
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
DATABASE_CONNECTION = process.env.MONGODB_URI || "mongodb://localhost:27017/maintenance-system"
console.log(DATABASE_CONNECTION)
mongoose.connect(DATABASE_CONNECTION,{useNewUrlParser: true});  

app.get("/api",(req,res)=>{
    res.send({"message": "Welcome to the Maintenance API. ~InnoHack"});
});

app.get("/api/classes",(req,res)=>{
	/// get a list of all movies in the database
    Anomoly.find({},(err, obj) => {
        if (err) {
          res.send({status:false, error:err})
        } 
        else {
          res.send(obj);
        }
      }	
    );
});

app.post("/api/class/add",(req,res)=>{
	/// add a movie to the database
    var class_object = {name: req.body.name, description: req.body.desc, severity_level: req.body.severity_level, post_action: req.body.post_action, discovered_at: new Date(Date.now()).toISOString(), number_discovered: 1};
    Anomoly.create(class_object,(err, obj) => {
        if (err) {
          console.log(err);
          res.send({status:false, error:err});
        } 
        else {
          console.log("New class added successfully.");
          res.status(200).send({status:true, newErrorClass: obj});
        }
      }	
    );
});

app.get("/api/class/:id/delete",(req,res)=>{
    Anomoly.findByIdAndDelete(req.params.id,(err, obj) => {
        if (err) {
          res.send({status:false, message:"Unexpected error occurred."});
        } 
        else {
          res.send({status: true, classRemoved: obj});
        }
      }
    );
});

app.get('/api/class/:id',(req,res)=>{
	// get movie details by movie ID
    Anomoly.findById(req.params.id,(err, obj) => {
        if (err) {
          res.status(200).send({status:false, message:"Class not found"});
        } 
        else {
          res.status(200).send({class: obj});
        }
      }
    );
})

app.post("/api/class/:id/update",(req,res)=>{
    /// update the attributes of a movie in the database 
    var update = {};
    if("name" in req.body){
		  update["name"] = req.body.name;
	  }
  	if("description" in req.body){
  		update["description"] = req.body.description;	
  	}
  	if("post_action" in req.body){
  		update["post_action"] = req.body.post_action;
  	}
  	if("severity_level" in req.body){
  		update["severity_level"] = req.body.severity_level;	
  	}
    Anomoly.findByIdAndUpdate(req.params.id, update, (err, doc) => {
    	if(err){
    		res.send({status:false, message:"Error: not updated"});
    	}
    	else {
    		res.send({status:true, message:"Success: Updated"});	
    	}
    });
});

app.get("/api/class/:id/increment", (req, res)=>{
  Anomoly.findById(req.params.id,(err, obj) => {
      if (err) {
        res.status(200).send({status:false, message:"Class not found"});
      } 
      else {
        var update = {}
        update["number_discovered"] = obj.number_discovered + 1;
        Anomoly.findByIdAndUpdate(req.params.id, update, (err2, doc) => {
          if(err2){
            res.status(200).send({status:false, message:"Error: not updated"});
          }
          else {
            res.status(500).send({status:true, message:"Success: Anomaly noted."});  
          }
        });
      }
    }
  );
});

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

/*
	Staring up our server/microservice: The following peice of code starts up our server, tells which 
	port to listen to and a callback on successful deployment
*/
app.listen(PORT,function(){
    console.log("Listening on port ", PORT);
})

