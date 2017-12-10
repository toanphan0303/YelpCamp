var express     = require("express");
var router      = express.Router();
var User        = require("../models/user");
var passport    = require("passport");
router.get("/", function(req, res){
    res.render("landing");
})

// Render register paga
router.get("/register", function(req, res) {
    res.render("register");
});

// Register a user. If success redirect to /campground page, else redirect to register page
router.post("/register", function(req, res){
    console.log(req.body.password);
    User.register(new User({username: req.body.username}), req.body.password, function(err, user){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            return res.redirect("/register")
        } 
        passport.authenticate("local")(req, res, function(){
        req.flash("success", "User was created successfully");
        res.redirect("/campgrounds")
        });
    })
})


// Render login page
router.get("/login", function(req, res) {
    res.render("login");
});

// Login to page
router.post("/login", passport.authenticate("local", 
    {
    successRedirect: '/campgrounds',
    failureRedirect: '/login',
    failureFlash: true
    }),function(req, res) {

});

// Log out 
router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "You have logged out");
    res.redirect("/campgrounds");
})


module.exports = router;