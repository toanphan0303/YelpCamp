var express = require("express");
var router  = express.Router();
var campGround  = require("../models/campgroud");
var middlewear = require("../middlewear");
// Get all campgrounds
router.get("/", function(req, res){
    // get all campground from DB
    campGround.find({}, function(err, camps){
        if(err){
            req.flash("error", err.message);
            console.log(err);
        } else{
            res.render("campgrounds/index",{campgrounds:camps});
        }
    });
})

// Add new campground
router.post("/",middlewear.isLoggedIn, function(req, res){
    //get data form and add to campground array
    var name= req.body.name;
    var image= req.body.image;
    var desciption = req.body.desciption;
    var author = {
        id: req.user._id,
        username: req.user.username
        };
    var newCamp = {name:name, image:image, desciption: desciption, author:author};
    // Create new campground and save to DB
    campGround.create(newCamp, function(err, camp){
        if(err){
            req.flash("error", err.message);
            console.log(err);
        } else{
            console.log("Create camp successful");
            console.log(camp);
        }
    });
    res.redirect("/campgrounds");
});

// render page to add new campground
router.get("/new", middlewear.isLoggedIn, function(req, res) {
    res.render("campgrounds/new.ejs");
});

// Get a specific campground
router.get("/:id", function(req, res) {
    // find the campground with provide id
    campGround.findById(req.params.id).populate("comments").exec( function(err, foundCamp){
        if(err){
            req.flash("error", err.message);
            console.log(err);
        } else{
            console.log(foundCamp);
            res.render("campgrounds/show", {campground:foundCamp});
        }
    })
});
// edit campground
router.get("/:id/edit",middlewear.checkCampgroundOwnership, function(req, res) {
    campGround.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", err.message);
            console.log(err);
        } else{
            res.render("campgrounds/edit", {campground:campground});
        }
    })
})
// update campground
router.put("/:id",middlewear.checkCampgroundOwnership, function(req, res) {
    // find campground and update
    campGround.findByIdAndUpdate(req.params.id,req.body.campground, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds/"+ req.params.id)
        }
            
    });
})
// destroy campground
router.delete("/:id",middlewear.checkCampgroundOwnership, function(req, res){
    campGround.findByIdAndRemove(req.params.id, function(err, campground){
        if(err){
            req.flash("error", err.message);
            res.redirect("/campgrounds");
        } else{
            res.redirect("/campgrounds");
        }
        
    });
});


module.exports = router;