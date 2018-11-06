//intializing controller
app.controller('myctrl2',function($scope,$http,$location){

  if(localStorage.getItem('token')!=null)
{
  $location.path('/dashboard')
}
        $scope.signin= function()
        {
            
          if($scope.username==null||$scope.username=='')//email validation
          {
            alert("email required")
            return;
          }
          if($scope.password==null||$scope.password=='')//password validation
          {
            alert("password required");
            return;
          }
          console.log('hii')
             $scope.data = {
                "email":$scope.username,//takes mail
                "password":$scope.password//takes password
                            }
                $http.post('/login',$scope.data).success(function(data, status) {//addding to backend
                   console.log(data)
                localStorage.setItem('token',data.token)
                localStorage.setItem('userId',data.userId)
                 localStorage.setItem('username',data.username)
                $location.path('/dashboard')
                  
                
                  }).error(function(err){
                    alert(err.message)
                });
                
         

        }
    })