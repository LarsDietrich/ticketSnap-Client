var globals = Ti.App.Properties;

var loggedIn = globals.getBool('loggedIn');
var currentDeviceToken = globals.getString('currentDeviceToken');

var currentUserID = globals.getString('currentUID');

var currentUserName = globals.getString('currentUserName');
//var currentUserName = null;

//Constants. These will never change because they are not in function.
exports.screenHeight = Ti.Platform.displayCaps.platformHeight;
exports.screenWidth = Ti.Platform.displayCaps.platformWidth;

//Device Scale for non-ios devices.
exports.deviceWidthScale = Ti.Platform.displayCaps.platformWidth/320;
exports.deviceHeightScale = Ti.Platform.displayCaps.platformHeight/480;

exports.getDeviceToken = function(){
	        
	   return currentDeviceToken;
}

exports.setDeviceToken = function(_deviceToken){
	currentDeviceToken = _deviceToken
	globals.setString('currentDeviceToken',_deviceToken);
}

exports.isLoggedIn = function(){
	if(loggedIn===null)
		loggedIn=false;

	return loggedIn;
}

exports.setLoggedIn = function(status){
	loggedIn=status;
	globals.setBool('loggedIn',status)
}

exports.getCurrentUserID = function(){
	return currentUserID;
}

exports.setCurrentUserID = function(_currentUserID){
	currentUserID = _currentUserID;
	globals.setString('currentUID',_currentUserID);
}

exports.setCurrentUserName = function(_currentUserName){
	currentUserName = _currentUserName;
	globals.setString('currentUserName', _currentUserName);
}

exports.getCurrentUserName = function(){
	return currentUserName;
};
