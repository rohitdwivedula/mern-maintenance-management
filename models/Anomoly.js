var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var AnomolySchema = new Schema({
	name: {
	    type: String,
	    unique: true,
	    required: true
  	},
 	description: {
	    type: String
  	},
  	post_action: {
	    type: String
  	},
  	severity_level: Number,
  	discovered_at: Date,
  	number_discovered: Number
});

module.exports = Anomoly = mongoose.model("Anomoly", AnomolySchema);

