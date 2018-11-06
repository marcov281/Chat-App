//intializing controller
app.controller('myctrl1',function($scope,$http,$location){
console.log('hii')
/**
 * this function will passs value from the form to the backend api
 */

    $scope.mobileNo="";

   /**
    * @description: thhis function will take all the value and send the value to the backend api
    */
    $scope.submit= function()
    {
        if(this.check_name==true || this.mob_number==true || this.pass_word==true || this.same_pass==true )
        {
            return;
        }
         $scope.data = {
            "name":$scope.user_name,//takes username
            "email":$scope.email_input,//takes mail
            "mobileNo":$scope.mobileNo,//takes mob no
            "password":$scope.password,//takes password
            "confirmpass":$scope.confirmpass
                        }
        console.log('hii in reg')
        $http.post('/signup',$scope.data).success(function(data, status) {  //posting the data
            console.log('Data posted successfully')
            // alert("sucessfully registered");

            $location.path('/login');
         
        }).error(function(err){
              alert(err.message)
          });
          
        
          
    }
    /**
     * @description:user name validation
     */
    $scope.check_name=function(){
        var name=$scope.user_name
        if($scope.user_name !== undefined){    
        if($scope.user_name.length<4||$scope.user_name==' '||!isNaN($scope.user_name)||name==null)//validate value
        {
            return true;
        }
    }
        else 
        return false 
    }
    /**
     *@description: mobile no validation
     */
    $scope.mob_number=function()
    
    {
        var mob=$scope.mob_number
        console.log(typeof(mob))
        if($scope.mobileNo.length!=10)
        {
           return true;
        }
    
        else 
            return false;

    }

    /**
     * @description:this method will validate the password 
     */
    $scope.pass_word=function()
    {
        var pass=$scope.password
        if($scope.password !== undefined){
        if($scope.password.length<4||pass==null||pass=='    ')
        {
            return true;
        }
    }
        else 
        return false;

    }
    /**
     * @description:this function will check wheather the two password are same or not
     */

    $scope.same_pass=function()
    {
        if($scope.password!==undefined && $scope.confirmpass!==undefined)
        {
        if($scope.password!=$scope.confirmpass)
        {
            return true;
        }
    }
        else
        return false;
    }

})