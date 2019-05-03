var express = require("express");
const User = require('./models/user.js');
const mongoose = require('mongoose');
const _ = require("lodash");
const bcrypt = require('bcrypt');
const passport = require('passport');
const googleAuth = require('./Oauth/Google/google-oauth');
const FacebookAuth = require('./Oauth/Facebook/facebook-oauth');
const users = require("./routes/users");
const facebookauth = require("./routes/facebook");
const googleauth = require("./routes/google");
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const localStorage = require('node-localstorage').localStorage;

var app = express();
var port = 3006;

const cors = require('cors')

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());
app.use(passport.initialize());
app.use(cookieSession({
    name: 'session',
    keys: ['123']
}));
app.use(cookieParser());


//mongoose databse connection 
mongoose.connect("mongodb://localhost:27017/scapic")
    .then(() => console.log("db connected"))
    .catch(err => console.log(err));




app.get("/", async (req, res) => {
    res.send("jhi");

});



//importing all routes in the server main
app.use('/api/oauth/google', googleauth);
app.use('/api/oauth/facebook', facebookauth);
app.use('/api/users', users);

app.listen(port, () => {
    console.log("Server listening on port " + port);
});