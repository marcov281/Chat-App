var jwt = require('jsonwebtoken');
var secret="fufuy@yt&6bjbV&696";
// var route=require('../routes/authroutes')
var text="invalid login attempt"

/**
 * @description:this function will verify the user whoever is going to login it will vrify the token 
 * that it is getting from the client http req header
 */

var auth=function(req,res,next)
{   
    var token=req.headers['token']//accquiring token from header

    jwt.verify(token, secret, function(err, decoded) //verifying token
    {
        if(err)
        {
            res.status(401).send(text)//sending error rsponse if an error
        }
        else
        {
            next();//elese continue for the next function execution 
        }
    });
    
    
}
module.exports=auth;


