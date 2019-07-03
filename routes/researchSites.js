var express     = require("express");
var router      = express.Router();
var ResearchSite  = require("../models/researchSite")
//var middleware = require("../middleware");

var NodeGeocoder = require('node-geocoder');
 
var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: process.env.GEOCODER_API_KEY,
  formatter: null
};
 
var geocoder = NodeGeocoder(options);
//INDEX - show all researchSite
router.get("/", function(req, res){
    ResearchSite.find({}, function(err, allResearchSites){
        if(err){
            console.log(err);
        } else {
            res.render("researchSites/index", {researchSites:allResearchSites});
        }
    });
});

//CREATE - add new researchSite to DB
router.post("/", isLoggedIn, function(req, res){
  // get data from form and add to researchSites array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var titlep1 = req.body.titlep1;
  var researcherp1 = req.body.researcherp1;
  var descriptionp1 = req.body.descriptionp1;
  var statusp1 = req.body.statusp1;
  var datavisp1 = req.body.datap1;
  var scriptp1 = req.body.datap1;
  var onerrorp1 = req.body.datap1;
  var titlep2 = req.body.titlep1;
  var researcherp2 = req.body.researcherp1;
  var descriptionp2 = req.body.descriptionp1;
  var statusp2 = req.body.statusp1;
  var datavisp2 = req.body.datap1;

  var author = {
      id: req.user._id,
      username: req.user.username
  }
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      //req.flash('error', 'Invalid address');
      console.log(err);
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newResearchSite = {name: name, image: image, description: desc, titlep1: titlep1, researcherp1: researcherp1, descriptionp1: descriptionp1, statusp1: statusp1, datap1: datap1, author:author, location: location, lat: lat, lng: lng};
    // Create a new researchSite and save to DB
    ResearchSite.create(newResearchSite, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to researchSites page
            console.log(newlyCreated);
            res.redirect("/researchSites");
        }
    });
  });
});


//NEW
router.get("/new", function(req, res) {
   res.render("researchSites/new"); 
});

//SHOW - shows more info about the site
router.get("/:id", function(req,res){
    //FIND THE CAMPGORUND WITH PROVIDED ID
    ResearchSite.findById(req.params.id).populate("comments").exec(function(err, foundResearchSite){
       if(err){
           console.log(err);
       } else {
           console.log(foundResearchSite);
           //render show template with that researchSite
        res.render("researchSites/show", {researchSite: foundResearchSite});
       }
    });
});

//CREATE - add new researchSite to DB
router.post("/", isLoggedIn, function(req, res){
  // get data from form and add to researchSites array
  var name = req.body.name;
  var image = req.body.image;
  var desc = req.body.description;
  var titlep1 = req.body.titlep1;
  var researcherp1 = req.body.researcherp1;
  var descriptionp1 = req.body.descriptionp1;
  var statusp1 = req.body.statusp1;
  var datap1 = req.body.datap1;
  var author = {
      id: req.user._id,
      username: req.user.username
  };
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    var lat = data[0].latitude;
    var lng = data[0].longitude;
    var location = data[0].formattedAddress;
    var newResearchSite = {name: name, image: image, description: desc, titlep1: titlep1, researcherp1: researcherp1, descriptionp1: descriptionp1, statusp1: statusp1, datap1: datap1, author:author, location: location, lat: lat, lng: lng};
    // Create a new researchSite and save to DB
    ResearchSite.create(newResearchSite, function(err, newlyCreated){
        if(err){
            console.log(err);
        } else {
            //redirect back to researchSites page
            console.log(newlyCreated);
            res.redirect("/researchSites");
        }
    });
  });
});

// UPDATE CAMPGROUND ROUTE
router.put("/:id", checkResearchSiteOwnership, function(req, res){
  geocoder.geocode(req.body.location, function (err, data) {
    if (err || !data.length) {
      req.flash('error', 'Invalid address');
      return res.redirect('back');
    }
    req.body.researchSite.lat = data[0].latitude;
    req.body.researchSite.lng = data[0].longitude;
    req.body.researchSite.location = data[0].formattedAddress;

    ResearchSite.findByIdAndUpdate(req.params.id, req.body.researchSite, function(err, researchSite){
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success","Successfully Updated!");
            res.redirect("/researchSites/" + researchSite._id);
        }
    });
  });
});

//middleware
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

function checkResearchSiteOwnership(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;