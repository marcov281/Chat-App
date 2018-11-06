/**
 * this is the main backend controller that will be the main program it will both
 * validate a returning user and also add a new user dtails to the database
 */
var jwt = require('jsonwebtoken');
const secret = "fufuy@yt&6bjbV&696"

var userMongo = require('../models/mongo'); //requiring mongo structure
var chatMongo=require('../models/chat')
var chat_person=require('../models/chat_person')

/**
 * 
 * @param {*} pass 
 */
function encrypt(pass) {


    var encryPass = require('crypto') //making the epassword encrypted
        .createHash('sha1')
        .update(pass) // Hash the password using SHA1 algorithm.
        .digest('base64');
    return encryPass;
}


//for registration purpose

/**
 * 
 * @param {*} req 
 * @param {*} res 
 */
exports.signup = function (req, res) {
    var db = new userMongo(); 
    var mail = req.body.email.toLowerCase(); //mail as input
    var mobileNo = req.body.mobileNo;
    var password = req.body.password;
    var confirmpass=req.body.confirmpass;
    var name=req.body.name

    try {
        var re = /\S+@\S+\.\S+/; //validating email
        if (typeof mail === '') {
            throw new Error("Email Address is required"); //throw error
        }

        if (!re.test(String(mail))) {
            throw new Error("Email Address is not in correct format."); //throw error
        }

        // if(name==null||name.lenght<4)
        // {
        //     throw new Error("enter name in proper format")
        // }

        // if(name!=null||name.length>4)
        // {
        //     userMongo.find({
        //         "fullName": name
        //     }, function (err, data)
        //     {
        //         if(data.length>0)
        //         {
        //             mgs="username already exixts!!!try different"
        //             return res.status(404).send(mgs);
        //         }  
        //         else 
        //         respon={
        //             "error": false,
        //             "message": "Successfully Registered"
        //         }
        //     })
        // }

        
        if (mobileNo.length != 10||isNaN(mobileNo)) 
        {
            throw new Error("mobile no is not valid")
        }
        if (password.length < 4||password==''||password==null) {
            throw new Error("password is not valid")
        }
        if(password!=confirmpass)
        {
            throw new Error("password did not match")
        }
         else {

            //crreating instance of schema
            var response = {};
            db.fullName = req.body.name; //taking username
            db.email = req.body.email.toLowerCase(); //taking mail
            db.mobilleNo = req.body.mobileNo; //taking mobile no
            db.password = encrypt(req.body.password);
            //to find the data from database
            userMongo.find({
                "emailId": mail
            }, function (err, data) {

                if (data.length > 0) { //validation

                    var response = {
                        "error": true,
                        "message": "Login credentials already Exist!!", //error message
                    };
                    return res.status(404).send(response);
                } else {
                    db.save(function (err) //for saving the data in database
                        {
                            // save() will run insert() command of MongoDB.
                            // it will add new data in collection.
                            if (err) {
                                response = {
                                    "error": true,
                                    "message": "Error in adding data", //error message
                                    "err": err
                                };
                                console.log(err)
                                return res.status(401).send(response)
                            } 
                            else {
                                response = {
                                    "error": false,
                                    "message": "Successfully Registered"
                                };
                            }
                            return res.status(200).send(response);

                        });
                }
            })
        }
    } //try finish here
    catch (e) //catch block starts
    {
        console.log(e);
        if (e instanceof ReferenceError || e instanceof SyntaxError || e instanceof TypeError) {
            var response = {
                "error": true,
                "message": "Something bad happened. Please contact system administrator"
            };

            return res.status(401).send(response)
        } else {
            var response = {
                "error": true,
                "message": e.message
            };
            return res.status(400).send(response)

        }
    }

} //catch ends here
//-------------------------------------------------------------------------------------------
//---------------------------------<<<login section>>>----------------------------------------
//--------------------------------------------------------------------------------------------

//for log in purposes
exports.login = function (req, res) {

   
    var mail = req.body.email;
    // console.log(mail)
    try {
        
        if (typeof mail === ' ') {
            throw new Error("Email Address is required");
        }

     
        var pass = encrypt(req.body.password);

        userMongo.find({
            "email": mail,
            "password": pass
        }, function (err, data) {
            // Mongo command to fetch all data from collection.
            
            if (err) {
                response = {
                    "error": true,
                    "message": "Error fetching data"
                };
                return res.status(400).send(err);
            } else {
                if (data.length > 0) {
                    var token = jwt.sign({
                            "email": mail,
                            "password": pass
                        },
                        secret, {
                            "expiresIn": 60 * 60 * 5
                        }
                    )

                    var response_sucess = {
                        "error": false,
                        "message": "login sucessful",
                        "token": token,
                        "userId": data[0]._id,
                        "username":data[0].fullName
                    };

                    return res.status(200).send(response_sucess);
                } else {
                    var response = {
                        "error": false,
                        "message": "Invalid credentials"
                    };
                    return res.status(401).send(response);
                }
            }

        });
    } catch (e) //catch eroor of every type
    {
        if (e instanceof ReferenceError || e instanceof SyntaxError || e instanceof TypeError) {
            var response = { //sending system error
                "error": true,
                "message": "please provide proper credentials"
            };

            return res.status(400).send(response)
        } else {
            var response = { //sending user defined error
                "error": true,
                "message": e.message
            };
            return res.status(400).send(response)

        }


    }
}
//finding user list
//--------------------------------------<<<<user list>>>>-------------------------------------------
//--------------------------------------------------------------------------------------------------
exports.userlist = function (req, res) {
    var userid = req.params.id; //to store id in userid
    var response = {}; //define blanck object
    var arr = []; //defining black array
    var responseList = {}; //define blanck object
    userMongo.find({ //finding if the id is valid or not
        "_id": {
            $ne: (userid) //return all user except the current user
        }
    }, function (err, data) {

        if (err) {
            response = {
                "message": "Error fetching data" //dending error
            }
        } else {
            return res.status(200).send(data);

        }

    });

}
//-----------------------------------------------------------------------------------
/**
 * @description this function is used to save the chat history to the database
 */
//------------------------------------------------------------------------------------
//---------------------add_to_db------------------------------------------------------
//-------------------------------------------------------------------------------------
exports.add_to_db=function(msg,userid,username,date)
{
    var db=new chatMongo();
    db.msg=msg;
    db.userid=userid;
    db.username=username;
    db.date=date;

    db.save(function (err) //for saving the data in database
                        {
                            // save() will run insert() command of MongoDB.
                            // it will add new data in collection.
                            if (err) {
                                response = {
                                    "error": true,
                                    "message": "Error in adding data", //error message
                                }; 
                                     } 
                            else {
                                response = {
                                    "error": false,
                                    "message": "Successfully Registered"
                                            };
                                }       
                        });


}
exports.add_to_db_person=function(msg,userid,username,send_username,date)
{
    var db=new chat_person();
    db.msg=msg;
    db.userid=userid;
    db.username=username;
    db.send_username=send_username;
    db.date=date;

    db.save(function(err){
        if (err) {
            response = {
                "error": true,
                "message": "Error in adding data", //error message
            }}
        else{
                response={
                    "error": false,
                    "message": "Successfully Registered"
                        };
            }   
    })

}

/**
 * @description;this function is returning the chat list that is the the chat history 
 * to the user 
 */

 exports.chat_list=function(request,response)
 {
     
    var resp = {}; //define blanck object
    chatMongo.find({

    },function (err, data) {

        if (err) {
            response = {
                "message": "Error fetching data" //dending error
            }
        } else {
            return response.status(200).send(data);
        }

    });


}

exports.chat_list_person=function(request,response)
{
     
    var resp = {}; //define blanck object
    chat_person.find({

    },function (err, data) {

        if (err) {
            response = {
                "message": "Error fetching data" //dending error
            }
        } else {
            return response.status(200).send(data);
        }

    });
}

exports.forgot_password=function(req,res,$location)

{
     
    var mail=req.body.mail;
    console.log('mail in reg 2',mail)
    var txt='this email address does not exist'
    
 
    userMongo.find({
        "email":mail
    }),function(err,data)
    {
        if(err)
        {
            res.status(401).send(txt);
        }
        if(data)
        {
            res.status(200).send()
        }
    }





}
