//requiring express module
var express         = require('express');
var routes      =   express.Router();//accquiring rounting service

var controller=require('../controller/registration2')//importing user controller api
var auth=require('../authentication/auth')//importing authentication fumction

routes.get('/:id',auth,controller.userlist);//

module.exports=routes;//exporting routes
