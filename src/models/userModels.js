const { Schema, model } = require("mongoose");


const userSchema = new Schema({
    name: {
        type: String,
        require: [true, 'User name is require'],
        trim: true,
        minlength: [31, 'The length of user name can be minimum 31 character'],
        maxlength: [31, 'The length of user name can be maximum 31 character']
    },
    email: {
        type: String,
        require: [true, ' email is require'],
        trim: true,
        unique: true,
        lowercase: true,
        message:'please enter a valid email'
    },
    password: {
        type: String,
        require: [true, 'User password is require'],
        minlength: [31, 'The length of user password can be minimum 6 character'],
        
    },
  
    
});
