const bcrypt = require('bcrypt');
const _ = require("lodash");
const { User } = require('../models/user.js');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const passport = require('passport');
const FacebookAuth = require('../Oauth/Facebook/facebook-oauth');
const users = require("../routes/users");
const cookieParser = require('cookie-parser');
const cookieSession = require('cookie-session');
const localStorage = require('node-localstorage').localStorage;
FacebookAuth(passport);
const { SocialLink } = require('../models/social-link');



router.get('/', function (req, res, next) {
  console.log("query param is:", req.query)
  req.session.actype = req.query.type;
  if (req.query.type != 1) {
    req.session.user_id = req.query.user_id;
  }

  next();
},
  passport.authenticate('facebook', { scope: ['email', 'public_profile'], session: false }));

router.get('/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  function (req, res) {
    // Successful authentication, redirect home.
    console.log(req.user.token)
    console.log(req.user.profile.provider)
    console.log(req.user.profile.displayName)
    console.log(req.user.profile.emails[0].value)

    if (req.session.actype == 1) {
      User.findOne({ email: req.user.profile.emails[0].value }, (ern, rsn) => {

        if (rsn == null) {
          SocialLink.findOne({ email: req.user.profile.emails[0].value }, (err, rss) => {
            if (rss == null) {
              res.status(403).send("Wrong Credentials!")
            } else {
              var token = req.user.token;
              User.findOne({ _id: rss.user_id }, (e, r) => {
                res.redirect("http://localhost:3000?type=2&&name=userId" + "&&token=" + rss.user_id + "&&email=" + r.email);

              });


            }
          });
        }
        else {
          var token = req.user.token;
          res.redirect("http://localhost:3000?type=2&&name=userId" + "&&token=" + rsn._id + "&&email=" + rsn.email);
        }
      })

    }
    else if (req.session.actype == 2) {
      //signup content goes here
      User.findOne({ email: req.user.profile.emails[0].value }, (e, r) => {
        if (r == null) {
          var newuser = new User({
            email: req.user.profile.emails[0].value,
            provider: req.user.profile.provider,
            token: req.user.token,
            ac_type: 2
          });
          newuser.save();
          var linksocial = new SocialLink(
            {
              user_id: newuser._id, provider: req.user.profile.provider,
              token: req.user.token, email: req.user.profile.emails[0].value
            }
          );

          linksocial.save();
          res.redirect("http://localhost:3000?type=2&&name=userId" + "&&token=" + newuser._id + "&&email=" + newuser.email);

        }
        else {
          res.send("User Already exist!.")
        }
      })

    }
    else {
      //linking of social account code goes here
      SocialLink.findOne({ email: req.user.profile.emails[0].value }, (er, rs) => {
        if (rs == null) {
          var link = new SocialLink({
            user_id: req.session.user_id, provider: req.user.profile.provider,
            token: req.user.token, email: req.user.profile.emails[0].value
          });

          link.save();
          res.redirect("http://localhost:3000?type=1&&name=" + req.user.profile.provider + "&&token=" + req.user.token);

        }
        else{
          res.send("social account already linked")
      }
      })

    }
  });

module.exports = router;
