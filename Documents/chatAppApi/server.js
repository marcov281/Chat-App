/**
 * this file is user to create server on the port 1337
 * here we are connecting the required databse aloso so whenever an user hit the server 
 * database get connected with the front end form
 */
var express     =   require("express");//requireing express to create server
var app         =   express();
var bodyParser  =   require("body-parser");//requiring body parser
const mongoose = require('mongoose');//requiring mongoose db driver
var routes=require('./routes/routes');  //reuiring router
var controller=require('./controller/registration2')

var server = require('http').createServer(app);  
var io = require('socket.io')(server);


var no_0f_user=[];
//----connecting mongo db-----------------------------
mongoose.connect('mongodb://localhost:27017/userDB', {
    useCreateIndex: true,//connecting to database
    useNewUrlParser: true
});
//-----------------------------------------------------



app.use(express.static('./public'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended" : false}));

app.use('/', routes);//using router to route

//------------------------------------------------------
io.on('connection', function(socket){
    no_0f_user.push(socket);  //no no of active sockets
    console.log('connected:%s user connected',no_0f_user.length)//finding no of online

    socket.on('disconnect', function(){
      no_0f_user.splice(no_0f_user.indexOf(socket),1);//removing disconnected sockets
      console.log('disconnected:%s user connected',no_0f_user.length);//finding no of online
  
      })


      socket.on('toBackEnd', function(data) {  
      controller.add_to_db(data.msg,data.userid,data.username,data.date);
      io.emit('toFrontend',data)
      console.log('to backend',data)
    });

    socket.on('toBackEndUser', function(data) {  
      console.log('data in server->'+data)
      controller.add_to_db_person(data.msg,data.userid,data.username,data.send_username,data.date);
      socket.emit('toFrontendUser',data)
      console.log('to backend',data)
    });

  });
// //-----------------------------------------------------




server.listen(1337);//starting server in port 1337
console.log("Listening to PORT 1337");
