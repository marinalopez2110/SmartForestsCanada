var express     = require("express");
var router      = express.Router({mergeParams: true});
var ResearchSite  = require("../models/researchSite");
var Comment     = require("../models/comments");

//=======================
// COMMENTS ROUTES
//=======================


//Comments new
router.get("/new", isLoggedIn, function(req, res){
    //find researchSite by id
    ResearchSite.findById(req.params.id, function(err, researchSite){
        if(err){
            console.log(err);
        }else{
               res.render("comments/new", {researchSite: researchSite}); 
        }
    });

});

//Comments create
router.post("/", isLoggedIn, function(req,res){
    //lookup compground using ID
    ResearchSite.findById(req.params.id, function(err, researchSite) {
        if(err){
            console.log(err);
             res.redirect("/researchSites");
        }else {
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                }else {
                    researchSite.comments.push(comment);
                    researchSite.save();
                    res.redirect('/researchSites/'+researchSite._id);
                }
            });
        }
    });
});

//middleware
function isLoggedIn(req, res, next){
    if (req.isAuthenticated()){
        return next();
    }
    res.redirect("/login");
}

module.exports = router;