var app = angular.module('myApp', ['ngRoute','btford.socket-io'])


//this is the routing section
app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {    //default page

            templateUrl: '/templates/login.html',
            controller:'myctrl2'
        })
        
        .when('/login', {    //login page

            templateUrl: '/templates/login.html',
            controller:'myctrl2'
        })

        .when('/signup', {//signup page

            templateUrl: 'templates/registration.html',
            controller:'myctrl1'
        })

        .when('/dashboard',{

            templateUrl:'./templates/dashboard.html',
            controller:'myctrl3'

        })

        .when('/forgot_pass',{

            templateUrl:'./templates/forgot_pass.html',
            controller:'myctrl4'
        })

        })

    app.service('socketService',['socketFactory',function socketService(socketFactory){
        return socketFactory({
            ioSocket:io.connect()
        })
    }])
