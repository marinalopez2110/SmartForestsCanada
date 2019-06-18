var mongoose = require("mongoose");

//SCHEMA SETUP
var campgroudSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    location: String,
    lat: Number, 
    lng: Number,
    comments: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "Comment"
      }
   ]
});

module.exports =  mongoose.model("ResearchSite", campgroudSchema);

