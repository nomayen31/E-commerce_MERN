const { Schema, model } = require("mongoose");
const bcrypt = require('bcrypt');
const { defaultImagePath } = require("../secret");


const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'User name is require'],
        trim: true,
        // 8 min 
        minlength: [3, 'The length of user name can be minimum 31 character'],
        maxlength: [31, 'The length of user name can be maximum 31 character']
    },
    email: {
        type: String,
        require: [true, ' email is require'],
        trim: true,
        unique: true,
        lowercase: true,
        message:'please enter a valid email',
        // validate:{
        //     validator: function (v) {
        //         return /^\S+@\S+\.\S+$/.test(v),
        //     },
        // }
    },
    password: {
        type: String,
        require: [true, 'User password is require'],
        minlength: [6, 'The length of user password can be minimum 6 character'],
        set: (v)  =>  bcrypt.hashSync(v, bcrypt.genSaltSync(10)), 
    },
    image: {
        type: String,
        default:
        defaultImagePath,

    },
    address: {
        type: String,
        require: [true, 'User address is require'],
    },
    phone: {
        type: String,
        require: [true, 'User phone is require'],
    },
    isAdmin: {
        type: Boolean,
        default:false
    },
    isBanned: {
        type: Boolean,
        default:false
    },
  
    
},{timestamps:true});


const User = model("Users", userSchema)

module.exports =User;

