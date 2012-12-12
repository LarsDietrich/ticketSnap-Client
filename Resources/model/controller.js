var globals = require('/lib/AppProperties');  // reference to global vars
var _newTicketWin = require('ui/common/newTicketsWin');  // load newTicketWindow
var newTicketWin = null;
//var _myTicketsView = require('/ui/common/myTicketView');  // load view inside of myTickets Window
var _myTixWin = require('/ui/common/myTicketsWin');  //load my tickets window. This is also the main window of the app.
var myTixWin = null;
var _settingsWin = require('ui/common/settingsWin');
var settingsWin = null;
// var _appNavgroup = require('/ui/common/appNavGroup');
// var appNavgroup;
// navGroup will control the navigation of the windows in the app.
var navGroup=null;

//main window of the application that contains navgroup
var mainWin = null;

//animations to apply to left menu open and closing
var animateLeft	= Ti.UI.createAnimation({
	left: globals.screenWidth*.50,
	curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
	duration: 500
});
	
var animateRight = Ti.UI.createAnimation({
	left: 0,
	curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
	duration: 500
});

// isToggled checks to see whether menu is open(true) or closed
var isToggled = false;

// currentWindow keeps track of when settings is in front and remove it from memory
var currentWindow=null;

function newTicket(){
	
	// if(globals.isLoggedIn()){
	if(settingsWin)//(settingsWin.visible || settingsWin != null)
	{
		navGroup.close(settingsWin);
		settingsWin=null;	
	}
	closeMenu();
 	newTicketWin = new _newTicketWin();
	// }else{
		// Ti.App.fireEvent('loginFirst');	
	// }
}

function fbLogout(){
	Titanium.Facebook.logout();
	alert("Logged out!");
	// TODO: put this function in fbook.js for consistency
};

function startApp(){
	
	myTixWin = new _myTixWin();
	
	mainWin = Titanium.UI.createWindow({
		left: 0,
		zIndex: 10,
		barColor: 'blue',
	});
	
	var _mainMenu = require('/ui/common/mainMenu');
	mainMenu = new _mainMenu();
	mainMenu.open();
	
	navGroup = Titanium.UI.iPhone.createNavigationGroup({
   		window: myTixWin,
   		left: 0,
   		width: Ti.Platform.displayCaps.platformWidth
	});
	
	// = _appNavgroup.getAppNavGroup(myTixWin);
	mainWin.add(navGroup);
	mainWin.open();
	//var _tixView = require('/ui/common/myTicketsView')
};

function toggleMenu(){
	if( !isToggled ){
		//mainMenu.open();
	    mainWin.animate(animateLeft);
		isToggled = true;
	} else
	{
		//mainMenu.close();
	    mainWin.animate(animateRight);
		isToggled = false;
	}
}

function openSettings(){
	if(settingsWin==null)
	{
		settingsWin = new _settingsWin();//(myTixWin,view);
		navGroup.open(settingsWin);
	}
	// Ti.App.fireEvent('closeMenu');
	closeMenu();
};

function loadMyTickets(){
	if(settingsWin)//(settingsWin.visible || settingsWin != null)
	{
		navGroup.close(settingsWin);
		settingsWin=null;
	}
	closeMenu();
}

function closeMenu(){
	//myTixWin.closeMenu();
	mainWin.animate(animateRight);
	isToggled = false;
}

//function to set all LoginBtns to correctStatus
// function setLoginBtnStatus(isLoggedIn){
// 	
	// myTixWin.setLoginBtnState(isLoggedIn);
	// if(settingsWin)
	// {
		// settingsWin.setLoginBtnState(isLoggedIn);
	// }
// 	
// }

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
		// case 'loginBtnStatus':
			// setLoginBtnStatus(e.loggedIn);
			// break;
		default:
			break;
	}
})

exports.startApp = startApp;
