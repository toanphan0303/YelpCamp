// all the middlewear goes here
var middlewearObj = {};
var Comment = require("../models/comment");
var campGround = require("../models/campgroud")
middlewearObj.checkCommentOwnership = function (req, res, next){
    if(req.isAuthenticated()){
        Comment.findById(req.params.comment_id, function(err, comment) {
            if(err){
                res.redirect("back");
            } else{
                    // does user own campground
                    if(comment.author.id.equals(req.user._id)){
                        next();
                    } else{
                        res.redirect("back")
                    }
            } 
        })
    } else{
        res.redirect("/login");
    }
    
}
middlewearObj.checkCampgroundOwnership = function(req, res, next){
    if(req.isAuthenticated()){
        campGround.findById(req.params.id, function(err, campground) {
            if(err){
                res.flash("Campground is not found");
                res.redirect("back");
            } else{
                    // does user own campground
                    if(campground.author.id.equals(req.user._id)){
                        next();
                    } else{
                        req.flash("error", "You dont have perrmission to do that")
                        res.redirect("back")
                    }
            } 
        })
    } else{
        res.redirect("/login");
    }
    
}
middlewearObj.isLoggedIn = function(req, res, next){
    if(req.isAuthenticated()){
        return next();
    } else{
        req.flash("error", "Please Login first")
        res.redirect("/login");
    }
}

module.exports = middlewearObj;