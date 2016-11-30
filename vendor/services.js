angular.module('demoApp')
.factory('CurrentUser', ['$http','$window','$cookieStore','CONFIG','UserInfo', function ($http,$window,$cookieStore,CONFIG,UserInfo) {
    return {
        check: function () {
        	if(typeof $cookieStore.get('userId') === "undefined"){
        		$cookieStore.put('userId','guest');
        	}
        	UserInfo.userId =$cookieStore.get('userId');
            if (UserInfo.userId == 'guest') {
                $window.location.href = '/pages/login.html';
            }
        },
        register: function (data) {
            return $http.post(CONFIG.API + 'register/',data);
        },
        login: function (data) {
            return $http.post(CONFIG.API + 'login/', data);
        },
        logout: function (id) {
        	$cookieStore.put('userId','guest');
            UserInfo.userId = 'guest';
            return $http.get(CONFIG.API + 'logout/');
        },
        userApi: function () {
            if (UserInfo.userId == 'guest')
            {
                return "";
            } else {
                return CONFIG.USERAPI + UserInfo.userId;
            }
           
        },
        api: function () {
            return CONFIG.API;
        },
        setId: function(userId) {
        	$cookieStore.put('userId',userId);
            UserInfo.userId = userId;
        },
        getId: function () {
        	if(typeof $cookieStore.get('userId') === "undefined"){
        		$cookieStore.put('userId',UserInfo.userId);
        	}
        	else
        	{
        		UserInfo.userId =$cookieStore.get('userId');
        	}
            return UserInfo.userId;
        }
    }
}])
.factory('RequestLetters', ['$http', 'CurrentUser', function ($http, CurrentUser) {
    return {
        get: function () {
            return $http.get(CurrentUser.userApi() + '/requestletter');
        },

        create: function (data) {
            return $http.post(CurrentUser.userApi() + '/requestletter', data);
        },

        delete: function (id) {
            return $http.delete(CurrentUser.userApi() + '/requestletter/' + id);
        },

        update: function (data) {
            return $http.put(CurrentUser.userApi() + '/requestletter/' + data.id, data);
        }
    }
}])
.factory('StatusReports', ['$http', 'CurrentUser', function ($http, CurrentUser) {
    return {
        get: function () {
            return $http.get(CurrentUser.userApi() + '/statusreport');
        },

        create: function (todoData) {
            return $http.post(CurrentUser.userApi() + '/statusreport', todoData);
        },

        delete: function (id) {
            return $http.delete(CurrentUser.userApi() + '/statusreport/' + id);
        },

        update: function (todoData) {
            return $http.put(CurrentUser.userApi() + '/statusreport/' + todoData.id, todoData);
        }
    }
}])
.factory('TimeSheets', ['$http', 'CurrentUser', function ($http, CurrentUser) {
    return {
        get: function () {
            return $http.get(CurrentUser.userApi() + '/timesheet');
        },
        getHistory: function () {
            return $http.get(CurrentUser.userApi() + '/timesheet/history');
        },
        getCurrent: function () {
            return $http.get(CurrentUser.userApi() + '/timesheet/current');
        },
        create: function (todoData) {
            return $http.post(CurrentUser.userApi() + '/timesheet', todoData);
        },

        delete: function (id) {
            return $http.delete(CurrentUser.userApi() + '/timesheet/' + id);
        },

        update: function (todoData) {
            return $http.put(CurrentUser.userApi() + '/timesheet/' + todoData.id, todoData);
        }
    }
}])
.service('popupService', function ($window) {
    this.showPopup = function (message) {
        return $window.confirm(message);
    }
});