require('dotenv').config();
var express     = require("express"),
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    passport    = require("passport"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose"),
    ResearchSite  = require("./models/researchSite"),
    Comment     = require("./models/comments"),
    User        = require("./models/user"),
    seedDB      = require("./seeds");


//requiring routes   
var commentRoutes       = require("./routes/comments"),
    researchSiteRoutes   = require("./routes/researchSites"),
    indexRoutes         = require("./routes/index");
    
mongoose.connect("mongodb://localhost/SmartForest", { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
seedDB();

//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Let's figth climate change",
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
});

app.use("/",indexRoutes);
app.use("/researchSites", researchSiteRoutes);
app.use("/researchSites/:id/comments", commentRoutes);

app.listen(80, '206.167.88.175', function(){
    console.log("The YelpCamp Server Has Started!");
});
