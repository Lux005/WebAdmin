// app.js
angular.module('demoApp',['ngCookies'])
.constant('CONFIG', {
    'APP_NAME': 'Admin Demo',
    'APP_VERSION': '0.0.0',
    'BASE_URL': '',
    'SYSTEM_LANGUAGE': '',
    'API': 'http://localhost:8080/api/',
    'USERAPI': 'http://localhost:8080/userapi/'
})
.value('UserInfo', {
    'userId': 'guest',
    'password': 'guest'
});