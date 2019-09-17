var mongoose = require("mongoose");

//SCHEMA SETUP
var campgroudSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String,
    titlep1: String,
    researcherp1: String,
    researcher2: String,
    bioresearcher1: String,
    bioresearcher2: String,
    descriptionp1: String,
    statusp1: String,
    datap1: String,
    refdatavisp1: String,
    datavisp1: String,
    scriptp1: String,
    onerrorp1: String,
    titlep2: String,
    researcherp2: String,
    descriptionp2: String,
    statusp2: String,
    datap2: String,
    datavisp2: String,
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

