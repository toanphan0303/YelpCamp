var mongoose        = require("mongoose"),
    campGround      = require("./models/campgroud"),
    Comment         = require("./models/comment");

var campgrounds = [
    {
        name: "Salmon Creek", 
        image :"https://media-cdn.tripadvisor.com/media/photo-s/05/c6/94/80/red-squirrel-campsite.jpg",
        desciption: "hehpppp"
        
    },
    {
        name: "Yosemity", 
        image:"http://www.theemotionmachine.com/wp-content/uploads/2017/06/tent_camping.jpg",
        desciption: "hehpppp  meee"
    },
    {
        name: "Yellow Stone", 
        image:"https://media.deseretdigital.com/file/7d35e73727?crop=top:0|left:0|width:400|height:284|gravity:Center&quality=55&interlace=none&resize=height:284&order=resize,crop&c=14&a=86335ee9",
        desciption: "hehpppp la la la la la"
    }]

function seedDB(){
    campGround.remove({}, function(err){
        // if(err){
        //     console.log(err);
        // } else{
        //     // initalize data
        //     campgrounds.forEach(function(seed){
        //         campGround.create(seed, function(err, camp){
        //             if(err){
        //                 console.log(err);
        //             } else{
        //                 Comment.create({
        //                     text: "This place is great, but the bathroom needed cleaner",
        //                     author: "nein0303@gmail.com"
        //                 }, function(err, comment){
        //                     if(err){
        //                         console.log(err);
        //                     } else {
        //                         camp.comments.push(comment);
        //                         camp.save();
        //                         console.log("create new comment");
        //                     }
        //                 })
        //             }
        //         })
        //     })
        // }
    });
}   

module.exports = seedDB;