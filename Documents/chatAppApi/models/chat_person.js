const mongoose = require('mongoose');//accquiring mongoose
var chatSchema = new mongoose.Schema({//creating new schema

    msg: { //full name 
        type: String,
        required: 'msg can not be empty'
    },
    userid: {   //user id
        type:String,
        required:'true'
    },
    username:{//user anme
        type:String,
        required:'true',
    },
    send_username:{
        type:String,
    },
    date:{  //date of message
        type:String,
        required:'true'
    }

});

module.exports  =  mongoose.model('chat_person',chatSchema);//exporing the schema