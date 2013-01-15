//var Cloud = require('ti.cloud');
var UrbanAirship = require('ti.urbanairship');
var globals = require('/lib/AppProperties');  // reference to global vars
var screenWidth = globals.screenWidth;
var _newTicketWin = require('ui/common/newTicketsWin');  // load newTicketWindow. App will start with this screen.
var newTicketWin = null;
var newTixTab = null;
// var _appTabGroup = require('/ui/common/ApplicationTabGroup'); // load appTabGroup
var appTabGroup = null; //tabGroup for app
var _myTixView = require('/ui/common/myTicketView');
var myTixView = null;
var _myTixWin = require('/ui/common/myTicketsWin');  //load my tickets window.
var myTixWin = null;
var _loginWin = require('/ui/common/loginWin'); // load login screen
var loginWin = null;
var HighlightTab = require('ui/common/HighlightTab');
var _alertsWin   = require('/ui/common/alertsWin');
var alertsWin = null;
var deviceToken = null;
// var _settingsWin = require('/ui/common/settingsWin');
// create alerts screen

//animations to apply to right menu open and closing
var animateLeft	= Ti.UI.createAnimation({
	right: 275,
	left: -275,
	curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
	duration: 500
});

animateLeft.addEventListener('start', function(e){
});
	
var animateRight = Ti.UI.createAnimation({
	right: 0,
	left: 0,
	curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
	duration: 500
})	;

animateRight.addEventListener('start', function(e){
	
});

// isToggled checks to see whether loginScreen is open(true) or closed
var isToggled = false;

// currentWindow keeps track of when settings is in front and remove it from memory
var currentWindow=null;

// function newTicket(){
// 	
	// // if(globals.isLoggedIn()){
	// // if(settingsWin)//(settingsWin.visible || settingsWin != null)
	// // {
		// // navGroup.close(settingsWin);
		// // settingsWin=null;	
	// // }
	// // closeMenu();
 	// // newTicketWin = new _newTicketWin();
	// // }else{
		// // Ti.App.fireEvent('loginFirst');	
	// // }
// }

function logout(){
	Titanium.Facebook.logout();
	globals.setCurrentUserID(null);
	alert("Logged out!");
	// TODO: put this function in fbook.js for consistency
};



function startApp(){
	
	// Cloud.Users.login({
    	// login: 'pushUser',
    	// password: '12345'}, 
    	// function (e) {
			// if (e.success) {
				// var user = e.users[0];
 				// alert("Loggin successfully");
    		// } else {
        		// alert("Error :"+e.message);
    		// }
	// });
	
	// Set UA options
	UrbanAirship.tags = [ 'testingtesting', 'appcelerator', 'my-tags' ];
	UrbanAirship.alias = 'testDevice';
	UrbanAirship.autoBadge = true;
	UrbanAirship.autoResetBadge = true;
	
	function eventCallback(e) {
	// Pass the notification to the module
    UrbanAirship.handleNotification(e.data);
    	
  	Ti.API.info('Push message received');
  	alert('  Message: ' + e.data.alert+'\n' + '  Payload: ' + e.data.aps);
    
    appTabGroup.badge= e.data.badge;
    appTabGroup.setActiveTab(alertsTab);
    // labelMessage.text = e.data.alert;
	// labelPayload.text = JSON.stringify(e.data.aps);	
}

function eventSuccess(e) {
	// *MUST* pass the received token to the module
    UrbanAirship.registerDevice(e.deviceToken);  
    
    Ti.API.info('Received device token: ' + e.deviceToken);
    deviceToken = e.deviceToken;
    // btnOpen.enabled = true;		
}

function eventError(e) {
    Ti.API.info('Error:' + e.error);
    var alert = Ti.UI.createAlertDialog({
        title: 'Error',
        message: e.error
    });
    alert.show();	
}

Ti.Network.registerForPushNotifications({
    types:[
        Ti.Network.NOTIFICATION_TYPE_BADGE,
        Ti.Network.NOTIFICATION_TYPE_ALERT,
        Ti.Network.NOTIFICATION_TYPE_SOUND
    ],
    success: eventSuccess,
    error: eventError,
    callback: eventCallback
});
	
	// // register for push notifications
	// Ti.Network.registerForPushNotifications({
		// types: [
    		// Ti.Network.NOTIFICATION_TYPE_BADGE,
     		// Ti.Network.NOTIFICATION_TYPE_ALERT,
     		// Ti.Network.NOTIFICATION_TYPE_SOUND
		// ],
 		// success:function(e) {
    		// Ti.API.info('Device Token :  '+e.deviceToken);
    		// deviceToken=e.deviceToken;
		// },
 		// error:function(e) {
    		// Ti.API.info("push notifications failed: "+e);
    		// alert("push notifications failed: "+e.error);
		// },
 		// callback:function(e) {
    	 // alert('Push received');
		// }	
	// });
	
	// Cloud.PushNotifications.subscribe({
    // channel: 'demo_alert',
    // type:'ios',
    // device_token: deviceToken
// }, function (e) {
    // if (e.success) {
        // alert('Success :'+((e.error && e.message) || JSON.stringify(e)));
    // } else {
        // alert('Error:' + ((e.error && e.message) || JSON.stringify(e)));
    // }
// });
	
	// instantiate the windows
	myTixView = new _myTixView(globals.getCurrentUserID());
	myTixWin = new _myTixWin();
	myTixWin.add(myTixView.getView());
	myTixWin.zIndex = 10;
	
	alertsWin = new _alertsWin();
	alertsWin.zIndex = 10;
	
	
	
	
	
	loginWin = new _loginWin(/*here pass in callback function to loggedIn screen*/);
	//loginWin.zIndex=1;
	
	if(globals.isLoggedIn()){
		var _loggedInView = require('/ui/common/loggedInView');
		var loggedInView = new _loggedInView();
		loginWin.add(loggedInView);
	}
	else{
		
		var _loginView = require('/ui/common/logInView');
		var loginView = new _loginView();
		loginWin.add(loginView);
	}
	
	loginWin.open();
	
	appTabGroup = Ti.UI.createTabGroup({
		zIndex: 10,
		top: 0
	});
	
	var alertsTab = Ti.UI.createTab({
		icon: '/images/40-inbox.png',
		window: alertsWin,
		title: 'Alerts',
		badge:5,
	});
	alertsWin.containingTab = alertsTab;
	
//alertsTab.addEventListener('focus',function(e){
    //alert('good');
	//setInterval(function(e){
  //alertsTab.badge +=1;
	///},1000);
	//alertsTab.badge.hide();
 	
//});	
	
	var myTixTab = Ti.UI.createTab({
		icon: '/images/KS_nav_ui.png',
		window: myTixWin,
		title: 'My Tickets',
		
	});
	
	/*
	   newTixTab = Ti.UI.createTab({
		icon: 'images/btn-camera.png',
		window: newTicketWin,
		title: 'NEW',
		zIndex:50,
		
	});*/
	
	HighlightTab.setHighlightTab({
		tabgroup: appTabGroup,
		//window:newTicketWin,title:'New Ticket',
		icon: 'images/btn-camera.png'
	});
/*	
	￼// Sets the app's icon badge to 23 Ti.UI.iPhone.appBadge = 23;
var tabGroup = Titanium.UI.createTabGroup(); var win1 = Titanium.UI.createWindow({
title:'Window 1',
backgroundColor:'#fff' });
// Set the badge for this tab to 10 var tab1 = Titanium.UI.createTab({
icon:'KS_nav_views.png', title:'Tab 1', window:win1,
badge:10
});
	*/
	
	
	
	appTabGroup.addTab(alertsTab);
	appTabGroup.addTab(Ti.UI.createTab({backgroundImage : 'images/camTab.png',}));
	appTabGroup.addTab(myTixTab);
	appTabGroup.setActiveTab(myTixTab);
	
	appTabGroup.open();
	
	openCamScreen();
	
};

function toggleMenu(){
	if( !isToggled ){
		//openLoginWin();
	    appTabGroup.animate(animateLeft);
	    isToggled = true;
	
	} else
	{
	    appTabGroup.animate(animateRight); 
		isToggled = false;
	}
}

// function openSettings(){
	// // if(settingsWin==null)
	// // {
		// // settingsWin = new _settingsWin();
		// // navGroup.open(settingsWin);
	// // }
// // 
	// // closeMenu();
// };

// function loadMyTickets(){
	// // if(settingsWin)
	// // {
		// // navGroup.close(settingsWin);
		// // settingsWin=null;
	// // }
	// // closeMenu();
// };

function closeMenu(){
	
	appTabGroup.animate(animateleft);
	isToggled = false;
}

function openCamScreen(currentTab){
	//alert('Cam Button Pressed!');

	newTicketWin = new _newTicketWin();
	newTicketWin.zIndex = 10;
	newTicketWin.open();
	
	//callback();
}

function handleLogin(args){
	if(globals.isLoggedIn()){
		logout();
		globals.setLoggedIn(false);
		// for users not loggedIn to FB call logout function here which will reset all screens with Data.
		loggedInView=null;
		var _loginView = require('/ui/common/logInView');
		var loginView = new _loginView();
		for(var i=0; i<loginWin.getChildren().length;i++){
	    	loginWin.remove(loginWin.children[i]);
	    	loginWin.children[i]=null;
	    }
		loginWin.add(loginView);
		myTixView.refreshCF(null);
	}
	else
	{ 
		var net = require('lib/network');
   	
   		net.login('login',args.email,args.pwd,args.actInd,function(response){
   	
	       	if(response.loggedIn == true){
	       		
	       		globals.setCurrentUserID(response.uid);
	       		globals.setLoggedIn(response.loggedIn);
	       		globals.setCurrentUserName(response.name);
	       		
	       		loginView = null;	
	       		var _loggedInView = require('/ui/common/loggedInView');
	       		var loggedInView = new _loggedInView();
	       		for(var i=0; i<loginWin.getChildren().length;i++){
	       			loginWin.remove(loginWin.children[i]);
	       			loginWin.children[i]=null;
	       		}
	       		loginWin.add(loggedInView);
	       		myTixView.refreshCF(response.uid);
	       		toggleMenu();
	       		alert("Welcome " + response.name);
	       	}
	       	
	       	else  
				{  
		     		alert(response.message);  
				} 
		});
	}
};

Ti.App.addEventListener('GLOBALEVENT', function(e){
	switch(e.func)
	{
		case 'logout':
			logout();
			break;
		case 'newTicket':
			newTicket();
			break;
		case 'loadARScreen':
			loadARScreen(e.DATA);
			break;
		// case 'settings':
			// openSettings();
			// break;
		case 'closeMenu':
			closeMenu();
			break;
		case 'toggleMenu':
			toggleMenu();
			break;
		case 'myTickets':
			loadMyTickets();
			break;
		case 'openCamScreen':
			openCamScreen(newTixTab);
			break;
		case 'handleLogin':
			handleLogin({email: e.email, pwd: e.pwd,actInd:e.actInd});
			break;
		default:
			break;
	}
});

exports.startApp = startApp;
