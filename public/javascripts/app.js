var myApp = angular.module('myApp',['ngRoute']);
myApp.config(['$routeProvider', function($routeProvider){
$routeProvider
.when('/set',{
  templateUrl : '/views/set.ejs',
  controller : 'set_controller'


})
.when('/modify',{
  templateUrl : '/views/modify.ejs',
  controller : 'modify_controller'

})
.when('/disable',{
  templateUrl : '/views/disable.ejs',
  controller : 'disable_controller'

})
.when('/delete',{
  templateUrl : '/views/delete.ejs',
  controller : 'delete_controller'

})

.when('/allReminders',{
  templateUrl : '/views/all.ejs',
  controller : 'all_controller'

})
.otherwise({redirectTo:'/allReminders'});

}]);

myApp.controller('set_controller',['$scope','$http',function($scope,$http){
  $scope.names = ['Math','Science','SST','English','Computer'];
  $scope.setReminder = function(){
    var body = {
      user : $scope.id,
      description : $scope.description,
      email : $scope.email,
      mobile : $scope.mobile,
      subject : $scope.subject,
    }
    $http({
  method: 'POST',
  url: 'http://localhost:3000/api/addReminder',
  data: JSON.stringify(body)
})
.then(function (success) {
  alert(success.data.message);
      }, function (error) {
  alert(error.data.message);
});
  };
}]);

myApp.controller('modify_controller',['$scope','$http',function($scope,$http){
  $scope.updateReminder = function(){
    var body = {
      description : $scope.description,
      email : $scope.email,
      mobile : $scope.mobile,
      subject : $scope.subject,
    }
    $http({
  method: 'PUT',
  url: 'http://localhost:3000/api/updateReminder/' +$scope.Rid ,
  data: JSON.stringify(body)
})
.then(function (success) {
  alert(success.data.message);
      }, function (error) {
  alert(error.data.message);
});
  };

  $scope.find= function(Rid){
    $http({
         method: 'GET',
         url: 'http://localhost:3000/api/reminderById/' + Rid
      }).then(function (success){
        $scope.description = success.data.description;
        $scope.email = success.data.email;
        $scope.mobile = success.data.mobile;
        $scope.subject = success.data.subject;
      },function (error){
    console.log("err");
      });
  };

}]);

myApp.controller('disable_controller',['$scope','$http',function($scope,$http){
  $scope.disable = function(){
    var body = {
    status : 'Disable'
    }
    $http({
  method: 'PUT',
  url: 'http://localhost:3000/api/updateReminder/' +$scope.Rid ,
  data: JSON.stringify(body)
})
.then(function (success) {
  alert(success.data.message);
      }, function (error) {
  alert(error.data.message);
});
  };

}]);

myApp.controller('delete_controller',['$scope','$http',function($scope,$http){
  $scope.delete = function(){

    $http({
  method: 'DELETE',
  url: 'http://localhost:3000/api/deleteReminder/' +$scope.Rid
})
.then(function (success) {
  alert(success.data.message);
      }, function (error) {
  alert(error.data.message);
});
  };

}]);
myApp.controller('all_controller',['$scope','$http',function($scope,$http){
  $http({
       method: 'GET',
       url: 'http://localhost:3000/api/allReminders'
    }).then(function (success){
      console.log(success);
      $scope.rem = success.data;

    },function (error){
  console.log(error);
    });
$scope.selectList = [];
$scope.select = function(check,uid,ustatus){
  if(check){
    $scope.selectList.push({id : uid , status : ustatus});

  }
  else{
    var index = $scope.selectList.indexOf({id : uid , status : ustatus});
    $scope.selectList.splice(index,1);
  }
  console.log($scope.selectList);
}
$scope.delete = function(){
  $scope.selectList.forEach(function(user){
    $http({
  method: 'DELETE',
  url: 'http://localhost:3000/api/deleteReminder/' +user.id
})
.then(function (success) {
  alert(success.data);
      }, function (error) {
$scope.message = error;
});
  });
  location.reload();
};


$scope.update = function(){
  $scope.selectList.forEach(function(user){
    var body = {
    status : (user.status == 'Disable')? 'Active' : 'Disable'
    }

    $http({
  method: 'PUT',
  url: 'http://localhost:3000/api/updateReminder/' +user.id ,
  data: JSON.stringify(body)
})
.then(function (success) {
  alert(success.data.message);
      }, function (error) {
  alert(error.data.message);
});
  });
  location.reload();

};
}]);
