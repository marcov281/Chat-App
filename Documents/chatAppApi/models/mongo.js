const mongoose = require('mongoose');//requireing mongoose driver
var userSchema = new mongoose.Schema({//creating new instance of schema
    fullName: { //full name 
        type: String,
        required: 'Full name can\'t be empty'
    },
    email: {//email
        type: String,
        required: 'Email can\'t be empty',
        unique: true
    },
    mobilleNo:{//mobile no
            type:Number,
            required:'can not be empty'
    },
    password: { //password
        type: String,
        required: 'Password can\'t be empty',
        minlength : [4,'Password must be atleast 4 character long']
    },
    saltSecret: String
});
 
// Custom validation for email
userSchema.path('email').validate((val) => {
    emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return emailRegex.test(val);
}, 'Invalid e-mail.');
 
module.exports = mongoose.model('User',userSchema);//exporing the schema