angular.module('demoApp')
.controller('globalController', ['$scope', '$location','$window','CurrentUser', function ($scope, $location,$window, CurrentUser) {
    CurrentUser.check();
    
    $scope.logout = function(){
    	CurrentUser.logout()
        .success(function (data) {
            $window.location.href = '/pages/login.html';
        });
    	
    }
    $scope.isActive = function (viewLocation) {
        var active = (viewLocation === $location.path());
        return active;
    };
    
    
}])
.controller('indexController', function ($scope) {
    //CurrentUser.check();
})
.controller('requestLetterController', function ($scope,RequestLetters) {
	$scope.createRequestLetter = function() {
        if(!$scope.requestLetterForm.$valid) {
            return;
        }
      
        RequestLetters.create($scope.requestLetterformData)
        .success(function(data) {
            $scope.requestLetterformData = {}; // clear the form so our user is ready to enter another
            $scope.requestLetters.push(data);
        });
    };

    $scope.removeRequestLetter = function(id) {
    	RequestLetters.delete(id)
        .success(function(data) {
        	angular.forEach($scope.requestLetters, function(letter, index){
                if(letter.id == id) {
                	$scope.requestLetters.splice(index, 1);
                }
        	});
        });
    };
    // when landing on the page, get all todos and show them
    RequestLetters.get()
    .success(function(data) {
       $scope.requestLetters=data;
    });
    //CurrentUser.check();
})
.controller('statusReportController', function ($scope,StatusReports) {
	var date=new Date();
	$scope.statusReportformData={};
	$scope.formDate =  date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
	$scope.createStatusReport = function() {
        if(!$scope.statusReportForm.$valid) {
            return;
        }
        var date = new Date($scope.formDate)
        date =   new Date(date.getTime() + ( date.getTimezoneOffset() * 60000 ) );
        $scope.statusReportformData.date=date;
        StatusReports.create($scope.statusReportformData)
        .success(function(data) {
            $scope.statusReportformData = {}; // clear the form so our user is ready to enter another
            $scope.statusReportformData.date =  date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
            $scope.statusReports.push(data);
        });
    };

    $scope.removeStatusReport = function(id) {
    	StatusReports.delete(id)
        .success(function(data) {
        	angular.forEach($scope.statusReports, function(report, index){
                if(report.id == id) {
                	$scope.statusReports.splice(index, 1);
                }
        	});
        });
    };
    // when landing on the page, get all todos and show them
    StatusReports.get()
    .success(function(data) {
       $scope.statusReports=data;
    });
    //CurrentUser.check();
    //CurrentUser.check();
})
.controller('timeSheetController', function ($scope,TimeSheets) {

	

	$scope.submitTimeSheet = function() {
        if(!$scope.timeSheetForm.$valid) {
            return;
        }
       // $scope.timeSheetformData.date=$scope.timeSheetformData.dates[1];
    	if(typeof $scope.timeSheetformData.id === "undefined" || $scope.timeSheetformData.id==null){
    	//	alert("create");
    		 TimeSheets.create($scope.timeSheetformData)
    	        .success(function(data) {
    	        	if(data.completed==true){
     	        		$scope.timeSheetformData = {}; // clear the form so our user is ready to enter another
     	        		var date=new Date();
     	        		$scope.formDate =  date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
     	        		 updateFormDate($scope.formDate);
     	        		$scope.timeSheets.push(data);
     	        		$scope.timeSheetformData.hours=[0,0,0,0,0,0,0];
    	        	}else{
    	        		
    	        	}
    	            
    	        });
    	}else{
    //		alert("update");
    		 TimeSheets.update($scope.timeSheetformData)
    		 .success(function(data) {
 	        	if(data.completed==true){
 	        		$scope.timeSheetformData = {}; // clear the form so our user is ready to enter another
 	        		var date=new Date();
 	        		$scope.formDate =  date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
 	        		updateFormDate($scope.formDate);
 	        		$scope.timeSheets.push(data);
 	        		$scope.timeSheetformData.hours=[0,0,0,0,0,0,0];
 	        	}else{
 	        		
 	        	}
 	            
 	        });
    	}
    };

    $scope.resetTimeSheet = function() {
    	$scope.timeSheetformData.hours=[0,0,0,0,0,0,0];
    };
    
    $scope.removeTimeSheet = function(id) {
    	TimeSheets.delete(id)
        .success(function(data) {
        	angular.forEach($scope.timeSheets, function(sheet, index){
                if(sheet.id == id) {
                	$scope.timeSheets.splice(index, 1);
                }
        	});
        });
    };
    
	$scope.saveTimeSheet = function(){
		$scope.timeSheetformData.completed=false;
		$scope.submitTimeSheet();
	};
	$scope.createTimeSheet = function(){
		$scope.timeSheetformData.completed=true;
		$scope.submitTimeSheet();
	};
	
    TimeSheets.getCurrent()
    .success(function(data) {
       $scope.timeSheetformData=data;
       var date= new Date(data.dates[0]);
       $scope.formDate =  date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
    });
    
    function isDate (x) 
    { 
      return (null != x) && !isNaN(x) && ("undefined" !== typeof x.getDate); 
    }
    function updateFormDate (formdate) 
    { 
    	var date =new Date(formdate);
        date =   new Date(date.getTime() + ( date.getTimezoneOffset() * 60000 ) );
		if(isDate(date)){
			date.setDate(date.getDate()-date.getDay());
			date= new Date(date);
			$scope.timeSheetformData.dates=[];
			$scope.timeSheetformData.dates[0]=date.setDate(date.getDate()+0);
			$scope.timeSheetformData.dates[1]=date.setDate(date.getDate()+1);
			$scope.timeSheetformData.dates[2]=date.setDate(date.getDate()+1);
			$scope.timeSheetformData.dates[3]=date.setDate(date.getDate()+1);
			$scope.timeSheetformData.dates[4]=date.setDate(date.getDate()+1);
			$scope.timeSheetformData.dates[5]=date.setDate(date.getDate()+1);
			$scope.timeSheetformData.dates[6]=date.setDate(date.getDate()+1);
		}
    }
    $scope.$watch('formDate', function (formdate)
    	    {
    	updateFormDate(formdate);
    });

    
	$scope.changeDate = function(){

	};
	
 
    TimeSheets.getHistory()
    .success(function(data) {
       $scope.timeSheets=data;
    });
    
    
    
    
    

    
    $(function() {
        Morris.Bar({
            element: 'morris-bar-chart',
            data: [{
                y: '2006',
                a: 100
            }, {
                y: '2007',
                a: 75
            }, {
                y: '2008',
                a: 50
            }, {
                y: '2009',
                a: 75
            }, {
                y: '2010',
                a: 50
            }, {
                y: '2011',
                a: 75
            }, {
                y: '2012',
                a: 100
            }],
            xkey: 'y',
            ykeys: ['a'],
            labels: ['Series A'],
            hideHover: 'auto',
            resize: true
        });
        
    });

    //CurrentUser.check();
})
.controller('loginController', function ($scope,$window,CurrentUser) {
    $scope.userLogin = function () {
        if (!$scope.loginForm.$valid) {
            return;
        }
        CurrentUser.login($scope.loginData)
        .success(function (data) {
            CurrentUser.setId(data.userId);
            $window.location.href = 'index.html';
        });
    };
    $scope.userRegister = function () {
        if (!$scope.loginForm.$valid) {
            return;
        }
        CurrentUser.register($scope.loginData)
        .success(function (data) {
            CurrentUser.setId(data.userId);
            $window.location.href = 'login.html';
        });
    };
    
    //CurrentUser.check();
});