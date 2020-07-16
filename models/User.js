const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        max: 50
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profilepic: {
        type: String,
        default: "https://www.pngitem.com/pimgs/m/455-4552929_profile-icon-png-transparent-png.png"
    },
    date: {
        type: Date,
        default: Date.now()
    }
})

module.exports = mongoose.model("User",UserSchema);