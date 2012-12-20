var globals = require('/lib/AppProperties');  // reference to global vars
var screenWidth = globals.screenWidth;
var _newTicketWin = require('ui/common/newTicketsWin');  // load newTicketWindow. App will start with this screen.
var newTicketWin = null;
// var _appTabGroup = require('/ui/common/ApplicationTabGroup'); // load appTabGroup
var appTabGroup = null; //tabGroup for app
var _myTixWin = require('/ui/common/myTicketsWin');  //load my tickets window.
var myTixWin = null;
var _loginWin = require('/ui/common/loginWin'); // load login screen
var loginWin = null;
var HighlightTab = require('ui/common/HighlightTab');
var _alertsWin   = require('/ui/common/settingsWin');
var alertsWin = null;

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

function fbLogout(){
	Titanium.Facebook.logout();
	alert("Logged out!");
	// TODO: put this function in fbook.js for consistency
};

function startApp(){
	
	// instantiate the windows
	myTixWin = new _myTixWin();
	myTixWin.zIndex = 10;
	
	alertsWin = new _alertsWin();
	alertsWin.zIndex = 10;
	
	newTicketWin = new _newTicketWin();
	newTicketWin.zIndex = 10;
	
	
	loginWin = new _loginWin(/*here pass in callback function to loggedIn screen*/);
	loginWin.zIndex=1;
	
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
		title: 'Alerts'
	});
	
	var myTixTab = Ti.UI.createTab({
		icon: '/images/KS_nav_ui.png',
		window: myTixWin,
		title: 'My Tickets'
	});
	
	HighlightTab.setHighlightTab({
		tabgroup: appTabGroup,
		icon: 'images/btn-camera.png'
	});
	
	appTabGroup.addTab(alertsTab);
	appTabGroup.addTab(Ti.UI.createTab({backgroundImage : 'images/camTab.png',window:newTicketWin,title:'New Ticket'}));
	appTabGroup.addTab(myTixTab);
	appTabGroup.setActiveTab(myTixTab);
	
	appTabGroup.open();
	
};

function toggleMenu(){
	if( !isToggled ){
		
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

function openCamScreen(){
	alert('Cam Button Pressed!');
	//callback();
}

function handleLogin(args){
	if(globals.isLoggedIn()){
		fbLogout();
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
	}
	else
	{ 
		var net = require('lib/network');
   	
   		net.login('login',args.email,args.pwd,function(response){
   	
	       	if(response.loggedIn == true){
	       		
	       		globals.setCurrentUserID(response.uid);
	       		globals.setLoggedIn(response.loggedIn);
	       		globals.setCurrentUserName(response.name);
	       		alert("Welcome " + response.name);
	       		loginView = null;	
	       		var _loggedInView = require('/ui/common/loggedInView');
	       		var loggedInView = new _loggedInView();
	       		for(var i=0; i<loginWin.getChildren().length;i++){
	       			loginWin.remove(loginWin.children[i]);
	       			loginWin.children[i]=null;
	       		}
	       		loginWin.add(loggedInView);
	       		toggleMenu();
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
		case 'fbLogout':
			fbLogout();
			break;
		case 'newTicket':
			newTicket();
			break;
		case 'loadARScreen':
			loadARScreen(e.DATA);
			break;
		case 'settings':
			openSettings();
			break;
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
			openCamScreen();
			break;
		case 'handleLogin':
			handleLogin({email: e.email, pwd: e.pwd});
			break;
		default:
			break;
	}
});

exports.startApp = startApp;
