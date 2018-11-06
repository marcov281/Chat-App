/**
 * this function is mainly written to provide the perpose of routing
 */

var express         = require('express');
var routes      =   express.Router();
//requiring express router
var users=require('../controller/registration2')
var authentication=require('./authroutes')



routes.post('/signup',users.signup)
routes.post('/login',users.login)
// routes.post('/dashboard',users.dashboard)//new

routes.use('/authentication',authentication);
routes.get('/chat_list',users.chat_list);
routes.get('/person_message',users.chat_list_person);
routes.post('/forgot_pass',users.forgot_password);

module.exports=routes;