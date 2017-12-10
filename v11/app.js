var express             = require("express"),
    app                 = express(),
    mongoose            = require("mongoose"),
    bodyParse           = require("body-parser"),
    seedDB              = require("./seeds"),
    flash               = require("connect-flash"),
    methodOverride      = require("method-override"),
    LocalStrategy       = require("passport-local").Strategy,
    User                = require("./models/user"),
    passport            = require("passport");

// requiring routes
var commentRoutes       = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campgrounds"),
    authRoutes          = require("./routes/index");
    
mongoose.Promise = global.Promise;
// seed database
// seedDB();    

mongoose.connect("mongodb://localhost/auth_demo_app");    
app.use(bodyParse.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());
// passport configuration
app.use(require("express-session")(
    {
        secret: "map thiet quay",
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
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.use("/campgrounds/:id/comments", commentRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/", authRoutes);



app.listen(process.env.PORT, process.env.IP, function(){
    console.log(" server is ready serving");
})
