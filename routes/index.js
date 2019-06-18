var express     = require("express");
var router      = express.Router();
var passport    = require("passport");
var User        = require("../models/user");

//root route
router.get("/", function(req,res){
  res.redirect("researchSites"); 
});


////AUTH ROUTES

//SHOW REGISTER Form
router.get("/register", function(req, res){
   res.render("register"); 
});

//handle sign up logic
router.post("/register", function(req, res){
    var newUser = new User({username: req.body.username});
    User.register(newUser, req.body.password, function(err, user){
        if(err){
            console.log(err);
            return res.render("register");
        }
        passport.authenticate("local")(req, res, function(){
            res.redirect("/researchSites");
        });
    });
});

// show login form
router.get("/login", function(req,res){
    res.render("login");
    });

//handling login logic
router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/researchSites",
        failureRedirect: "/login"
    }), function(req,res){
    
});

//logout logic route
router.get("/logout", function(req,res){
    req.logout();
    res.redirect("/researchSites");
});

//middleware
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;