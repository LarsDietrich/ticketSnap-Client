
var globals = require('/lib/AppProperties');
var loggedIn = globals.isLoggedIn();
var _mainMenu = require('ui/common/mainMenu');

function ApplicationWindow() {

	// animations
	var animateLeft	= Ti.UI.createAnimation({
		left: 150,
		curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
		duration: 500
	});
	
	var animateRight	= Ti.UI.createAnimation({
		left: 0,
		curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
		duration: 500
	});
	
	var animateNegativeLeft = Ti.UI.createAnimation({
					left: -150,
					curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
					duration: 500
	});

	var win = Titanium.UI.createWindow({
		left: 0,
		zIndex: 10,
		barColor: '#05e177',
	});
	
	var myTixWin = Titanium.UI.createWindow({
	    backgroundColor: 'white',
	    title: 'tickeTSnap',
	    color:'dark grey',
	    barColor: 'blue',
	    left: 0,
		zIndex: 10
	});

 	// var view = Ti.UI.createView({
		 // backgroundImage:'images/light_toast_@2X.png',
		 // width: Ti.Platform.displayCaps.platformWidth,
		 // height:Ti.Platform.displayCaps.platformHeight,	
	// });
// 	
	// myTixWin.add(view);
	
	// var lbl = Ti.UI.createLabel({
		// text:'Currently no ticket available',
		// top:200,
		// color:'dark grey'
// 		
	// });
	// view.add(lbl);
	
	var leftMenu	= Ti.UI.createWindow({
		backgroundColor: 'red',
		top:   0,
		left:  0,
		width: 150,
		zIndex: 1
	});
  	
 	var mainMenu = new _mainMenu(myTixWin,view);
    
    leftMenu.add(mainMenu);
    leftMenu.open();
	
	var nav = Titanium.UI.iPhone.createNavigationGroup({
   		window: myTixWin,
   		left: 0,
   		width: Ti.Platform.displayCaps.platformWidth
	});

	var menuBtn = Ti.UI.createButton({
	backgroundImage: '/images/menuTr.png',
	width: 40,
	height: 30,
	backgroundColor: 'transparent'
	//image:'images/menuTr.png',
	});

	var loginButton = Ti.UI.createButton({
		title:globals.isLoggedIn() ? 'Logout':'Login', //this will correctly label the button according to login status
		right: 10,
		top: 5,
		color:'#494a4a'	
	});
	
	function handleLogin(){
		if(globals.isLoggedIn()){
	 		Ti.App.fireEvent('GLOBALEVENT',{func: 'fbLogout'});
    		// TODO:call Activity Indicator here so that it waits for logout before changing loginButton.title
     		loginButton.title = 'Login';
     		globals.setLoggedIn(false); 
		} 
		else{
			loginButton.enabled=false;
			menuBtn.enabled=false;
			var loginWin = require('ui/common/loginWin');
			new loginWin(myTixWin, function(e){
				loginButton.enabled=true;
				menuBtn.enabled=true;
				if(globals.isLoggedIn())
				{
					loginButton.title='logout';
				}
			});
		}
	}
	
	loginButton.addEventListener('click',function(){		
		handleLogin();	  		   
	});		
	
	myTixWin.setLeftNavButton(menuBtn);
	myTixWin.setRightNavButton(loginButton);
	win.add(nav);
	win.open();
	
	var isToggled = false;
	
	menuBtn.addEventListener('click',function(e){
		
		if( !isToggled ){
	    	//leftMenu.open();
	    	win.animate(animateLeft);
			isToggled = true;
		
		} else
		{
			//leftMenu.close();
	    	win.animate(animateRight);
			isToggled = false;
		}
	});
	
	Ti.App.addEventListener('closeMenu',function(){
		win.animate(animateRight);
			isToggled = false;
	});
	
	Ti.App.addEventListener('loginFirst', function(e){
		handleLogin();
	})	
};
	
module.exports = ApplicationWindow;