const mongoose = require('mongoose');
const passport = require('passport');
const express = require('express');
const User = require("../../models/User");

const router = express.Router();

router.get('/',passport.authenticate('jwt', {session: false}) ,(req,res) => {
    res.json({
        id: req.user.id,
        profilepic: req.user.profilepic,
        name: req.user.name,
        username: req.user.username,
        email: req.user.email,
        date: req.user.date
    })
})


module.exports = router;

