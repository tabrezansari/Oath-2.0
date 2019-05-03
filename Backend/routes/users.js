const bcrypt = require('bcrypt');
const _ = require("lodash");
const { User } = require('../models/user.js');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();
const { SocialLink } = require('../models/social-link');
const vehData= require('./vehdata.json');


router.post("/login", async (req, res) => {
    console.log(req.body)
    let user = await User.findOne({ email: req.body.email }, (err, data) => {

        if (!data) return res.send({status:false,message:"wrong credentials!"});

        bcrypt.compare(req.body.password, data.password, function (error, ress) {
            if (ress) {
                res.send(_.pick(data, ['_id', 'name', 'email']));


            } else {
                res.send({status:false,message:"Wrong credentials!"});

            }
        });

    });



});


router.post("/register", async (req, res) => {
    console.log(req.body)
    // const {error} = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists');


    user = new User(_.pick(req.body, ['name', 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);


    await user.save();

    res.send(_.pick(user, ['_id', 'name', 'email']));

});


router.post("/regtest", async (req, res) => {
    console.log(req.body)
    // const {error} = validate(req.body);
    // if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({ email: req.body.email });
    if (user) return res.status(400).send('User already exists');


    user = new User(_.pick(req.body, ['email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);


    await user.save();

    res.send(_.pick(user, ['_id', 'email']));

});


router.get("/gettabledata",(req, res) => {
   

    res.send(vehData);

});




router.post("/deleteAccount", async (req, res) => {
    console.log(req.body);
    var myquery = { user_id: req.body.user_id };

    SocialLink.deleteMany(myquery, function (err, obj) {
        if (err) throw err;
        console.log(obj + " document(s) deleted");


        User.deleteOne({ _id: req.body.user_id }, function (er, userobj) {
            if (er) throw er;
            console.log(userobj + " document(s) deleted");

            res.send({ status: true, message: "Account deleted succesfull!" })

        });


    });


});


router.post("/unlinkSocial", async (req, res) => {
    console.log(req.body);
    var myquery = { user_id: req.body.user_id };

    SocialLink.deleteOne({ user_id: req.body.user_id, provider: req.body.provider }, function (er, userobj) {
        if (er) throw er;
        console.log(userobj + " document(s) deleted");

        res.send({ status: true, message: "Account deleted succesfull!" })

    });





});


router.post("/update", async (req, res) => {
    console.log(req.body)
    let user = await User.findOne({ _id: req.body.user_id });
    console.log("user data:", user)
    if (user) {
        user.email = req.body.email;
        await user.save();
        res.send(user);
    } else {
        return res.status(400).send('User cannot find!');

    }

});

router.post("/socials", async (req, res) => {
    let social = await SocialLink.find({ user_id: req.body.user_id });
    console.log("user data:", social)
    if (social) {

        res.send(social);
    } else {
        return res.status(400).send('no social account is linked');

    }

});



module.exports = router;
