var express     = require("express");
var router      = express.Router({mergeParams: true});
var campGround  = require("../models/campgroud");
var Comment     = require("../models/comment");

var middlewear  = require("../middlewear")
// render page to add new comments
router.get("/new",middlewear.isLoggedIn, function(req, res) {
    campGround.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", err.message);
            console.log(err);
        } else{
            res.render("comments/new", {campground:campground});
        }
    })
})
// Post new comment to a specific campground
router.post("/", function(req, res){
    // look campground using id
    campGround.findById(req.params.id, function(err, campground){
        if(err){
            req.flash("error", err.message);
            console.log(err);
            require("/campgrounds");
        } else {
            console.log(req.body.comment);
            Comment.create(req.body.comment, function(err, comment){
                if(err){
                    console.log(err);
                } else{
                    // add username and id
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    comment.save();
                    // save comment
                    campground.comments.push(comment);
                    campground.save();
                    req.flash("success", "Success post a comment");
                    res.redirect("/campgrounds/"+campground._id);
                }
            })
        }
    })
})
// comment edit page
router.get("/:comment_id/edit",middlewear.checkCommentOwnership, function(req, res){
    Comment.findById(req.params.comment_id, function(err, comment) {
        if(err){
            req.flash("error", err.message);
            res.redirect("back")
        } else {
            res.render("comments/edit", {campground_id:req.params.id, comment:comment});
        }
        
    })
});

// comment update
router.put("/:comment_id",middlewear.checkCommentOwnership, function(req, res){
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, comment) {
        if(err){
            req.flash("error", err.message);
            res.redirect("back");
        } else {
            req.flash("success", "Comment updated successfully");
            res.redirect("/campgrounds/"+ req.params.id)
        }
    })
})
// comment destroy routes
router.delete("/:comment_id/",middlewear.checkCommentOwnership, function(req, res){
    Comment.findByIdAndRemove(req.params.comment_id, function(err, comment){
        if(err){
            req.flash("error", err.message);
            res.redirect("back")
        } else {
            req.flash("error", "Comment was deleted");
            res.redirect("back")
        }
    })
});


// Check if user is login, if not redirect to login page

module.exports = router;