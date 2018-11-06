app.controller('myctrl4',function($scope,$http,$location){

    

    $scope.forgot_submit=function()
    {
        
        if($scope.forgot_email=='')
        {
            alert('email needed');
            return;
        }
        $scope.data={

            "mail":$scope.forgot_email,
        }

       $http.post('/forgot_pass',$scope.data)
       .success(function(data,status){

        console.log('data--',data)

       }).error(function(err){

        console.log('resp--'+err)
       })

    }
      
})