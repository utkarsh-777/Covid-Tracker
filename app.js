var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var ejs = require('ejs');

var app = express();

//port
var port = process.env.PORT || 3000;

//importing routes
const auth = require('./routes/api/auth');
const home = require('./routes/api/home');

//set Views
app.use('/',express.static(__dirname + '/public'));

app.set('view engine','ejs');

app.get("/user/signup",(req,res) => {
    res.render('signup')
})

app.get("/user/login",(req,res) => {
    res.render('login')
})

app.use("/user/home",home);

app.get("/user/home",(req,res) => {
    res.render('home')
})

//passport middlewares
app.use(passport.initialize());

//passport config
require('./strategy/jsonwtStrategy')(passport);

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//url
const key = require('./setup/myurl');
const db = key.db;

app.listen(port,(req,res) => {
    console.log(`App is running at ${port}`)
});

app.get('/',(req,res) => {
    res.send('Covid app is working!')
})

mongoose.connect(db,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
}).then(
    console.log("DB CONNECTED")
).catch(err => console.log(err))

//routes
app.use("/user",auth);