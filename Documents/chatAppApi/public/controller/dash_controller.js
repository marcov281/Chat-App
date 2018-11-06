// var user_controller=require('../../controller/registration2')

app.controller('myctrl3', function ($scope, $http,$location,socketService) {
    var send_username=null;
    $scope.group_display=true;
    $scope.login_send=true;
    var chat_array=[];
    
    var token = localStorage.getItem('token'); //getting token from local storage
    var userId = localStorage.getItem('userId'); //getting user id from local storage
    var username=localStorage.getItem('username')
    $scope.username=username;
    
    $http({ //sending get request to the authentication api
            method: 'GET',
            url: '/authentication/' + userId,
            headers: {
                'token': token
            }
        })
        .then(function (response) //receiving response
            {
            console.log(response);
                if (response.data.length) //if there are value
                
                {
                    var list = [] //taking new array
                    for (var i = 0; i < response.data.length; i++) {
                        console.log(response.data[i].fullName)
                        list.push(response.data[i].fullName)
                    }
                    $scope.list = list; //assigning value to list for printing
                    
                } else {
                    alert('u dont have any friends make some')
                }
            });

    /**
     * @description:this function will logout the user and delete all the user id and token that i in th
     * e local storage
     */

    $scope.logout = function () {
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        localStorage.removeItem('username')

        $location.path('/login')
    }
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
//------------------------------------------------------------------------------------------------
/**
 * @description:this function will print the message by emitting to the server
 */

 $scope.chatroom=function($event)
{
    var chat_array_person=[];
     send_username= event.target.id;
     console.log('username--',username)
    if(send_username)
    {
        $scope.group_display=false;
        $scope.login_send=false;
        $scope.person_display=true;
        $scope.person_send=true;    
    }
    $http({
        method:'GET',
        url:'/person_message',
        headers:
        {
           'send_username':send_username//passing local storage user id to the headers
        }
    }).then(function(resp){
            console.log(resp)
        if(resp.data.length>0)
        {    
            for(var i=0;i<resp.data.length;i++)
            {
            if((resp.data[i].username==send_username && resp.data[i].send_username==username)||(resp.data[i].username==username && resp.data[i].send_username==send_username))
             chat_array_person.push(resp.data[i])
            }
        }
         $scope.chat_array_person=chat_array_person;
        // var curr_user=localStorage.getItem('username')
        // $scope.curr_user=curr_user;
    })
}
  
$scope.send_message_person=function()
{
    if($scope.message==''||$scope.message==' '||$scope.message==null)
   {
       alert("please enter some message")
   }
   else
   socketService.emit('toBackEndUser',{"msg":$scope.message,"userid":userId,"username":username,"send_username":send_username,"date":new Date()})
   $scope.message=null;

}
socketService.on('toFrontendUser',function(data){  //catching value from the server side emit
    
    console.log('pushing data--',data);
    $scope.chat_array_person.push(data);
    // chat_array_person=[];
 }) 




    
/**
 * this function will send message to the div after hitting enter 
 * --------------------------------------------------------------
 * --------------------------------------------------------------
 */



/**
 * @description:this function will send new message to the  chat list
 */
// var socketService = io.connect();
$scope.send_message=function()
{
   if($scope.message==''||$scope.message==' '||$scope.message==null)
   {

       alert("please enter some message")
   }
   else
    socketService.emit('toBackEnd',{"msg":$scope.message,"userid":userId,"username":username,"date":new Date().getHours()+'H:'+new Date().getMinutes()+'M'})
   
    $scope.message=null;
}
//-------------------------------------------------------------------------------------------
//-------------------------------------------------------------------------------------------

$http({
    method:'GET',
    url:'/chat_list',
    headers:
    {
       'user_id':userId//passing local storage user id to the headers
    }
}).then(function(response){
        
    if(response.data.length>0)
    {
        // console.log('dtaa length'+response.data.length)
        
        for(var i=0;i<response.data.length;i++)
        {
            var str='';         //this is printing the output asa astring
            str=str+response.data[i].username+':  '+response.data[i].msg+'  '+response.data[i].date;          
            chat_array.push(str)
        }
    }

     $scope.chat_array=chat_array;

    // var curr_user=localStorage.getItem('username')
    // $scope.curr_user=curr_user;
})

socketService.on('toFrontend',function(data){  //catching value from the server side emit
    var str='';
    
    str=str+data.username+':  '+data.msg+'  '+data.date;
    
   $scope.chat_array.push(str);



}) 
 
})

