const JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const key = require('../setup/myUrl');
const passport = require('passport');
const User = require('../models/User');

var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = key.secret;

module.exports = passport => {
    passport.use(new JwtStrategy(opts,(jwt_payload, done) => {
        User.findById(jwt_payload.id)
            .then(person => {
                if(person){
                    return done(null, person)
                }
                return done(null, false)
            })
            .catch(err => console.log(err))
    }));
}

