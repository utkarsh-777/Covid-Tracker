const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jsonwt = require('jsonwebtoken');
const passport = require('passport');
const Key = require("../../setup/myurl");
var $ = require( "jquery" );

//models schema
const User = require('../../models/User');

router.post('/signup',(req,res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                res.render('alreadyregistered');
                return res.status(400).json({message:"Email Already registered"});
            }
            User.findOne({username: req.body.username})
                .then(user => {
                    if(user){
                        res.render('usernametaken')
                        return res.status(400).json({message:"username already exists use another username"})
                    }

                    const newuser = new User({
                        name: req.body.name,
                        username: req.body.username,
                        email: req.body.email,
                        password: req.body.password,
                        profilepic: req.body.pic
                })

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(req.body.password, salt, (err, hash) => {
                        if(err) throw err;
                        newuser.password = hash;
                        newuser.save()
                            .then(user => res.send(user))
                            .catch(err => console.log("Error in saving"+err))

                            res.render('aftersignup')
                    });
                });  
            })
            .catch(err => console.log("Error in finding username"+err))
        })
        .catch(err => console.log("Error in finding User"+err))
})

router.post('/login',(req,res) => {
    User.findOne({email: req.body.email})
        .then(user => {
            if(!user){
                res.render('nouser')
                return res.status(400).json("Email not registered..U need to signup first")
            }
            const hash = user.password;
            bcrypt.compare(req.body.password, hash)
                .then(success => {
                    if(success){
                        const payload = {
                            id: user.id,
                            name: user.name,
                            email: user.email
                        }
                        jsonwt.sign(
                            payload,
                            Key.secret,
                            { expiresIn: 3600 },
                            (err,token) => {
                                if(err) throw err;
                                res.render('home',{Data:{name: payload.name,profilepic: user.profilepic,email: payload.email,username: user.username,id: user.id}});
                                return res.json({
                                    success: true,
                                    token: "Bearer "+token
                                })
                            }
                        )
                    } else {
                        res.render('epdoesnotmatch');
                        return res.json({message:"Email and password does not match!"})
                    }
                })
                .catch(err => console.log("Token error"+err))
        })
        .catch(err => {
            console.log(err)
        })
})

module.exports = router;