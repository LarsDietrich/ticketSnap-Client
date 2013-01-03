var globals = require('/lib/AppProperties');
var loggedIn = globals.isLoggedIn();

function ApplicationWindow(params) {

	params = params || {};
	
	//animations to apply to left menu open and closing
	var animateLeft	= Ti.UI.createAnimation({
		right: globals.screenWidth*(-.80),
		curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
		duration: 500
	});
	
	var animateRight = Ti.UI.createAnimation({
		right: globals.screenWidth,
		curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
		duration: 500
	});
	
	// isToggled checks to see whether loginScreen is open(true) or closed
	var isToggled = false;

	var thisWin = Titanium.UI.createWindow({
	    backgroundImage:'images/black-wood-bg.png',
	    titleImage: '/images/TICKETSNAP_bar_tr.png',
	    barColor: '#202020'
	});
	
	var loginButton = Ti.UI.createButton({
		backgroundImage: '/images/user.png',
		width: 32,
		height: 30,
		backgroundColor: 'transparent'
	});
	
	loginButton.addEventListener('click',function(){		
		
		Ti.App.fireEvent('GLOBALEVENT',{func: 'toggleMenu'});	  		   
	});

	thisWin.setRightNavButton(loginButton);
	
	return thisWin;
};
	
module.exports = ApplicationWindow;