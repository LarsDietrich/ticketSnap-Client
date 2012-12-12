var globals = require('/lib/AppProperties');
var loggedIn = globals.isLoggedIn();
//var loginButton = null;
function myticket(){
	
var myTixWin = Titanium.UI.createWindow({
	    backgroundColor: 'white',
	    title: 'tickeTSnap',
	    color:'dark grey',
	    barColor: 'blue',
	    left: 0,
		zIndex: 10
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
     		//Ti.App.fireEvent('GLOBALEVENT',{func: 'loginBtnStatus',loggedIn:false});
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
					loginButton.title='Logout';
					//Ti.App.fireEvent('GLOBALEVENT',{func: 'loginBtnStatus',loggedIn:true});
				}
			});
		}
	}

loginButton.addEventListener('click',function(){		
		handleLogin();	  		   
	});
myTixWin.setLeftNavButton(menuBtn);
	myTixWin.setRightNavButton(loginButton);
	
// var isToggled = false;
	
	menuBtn.addEventListener('click',function(e){
		
		Ti.App.fireEvent('GLOBALEVENT',{func: 'toggleMenu'});
		// if( !isToggled ){
	    	// //leftMenu.open();
	    	// win.animate(animateLeft);
			// isToggled = true;
// 		
		// } else
		// {
			// //leftMenu.close();
	    	// win.animate(animateRight);
			// isToggled = false;
		// }
	});	
	
	
	Ti.App.addEventListener('loginFirst', function(e){
		handleLogin();
	});
	
	Ti.App.addEventListener('updateLoginBtn', function(e){
		if(globals.isLoggedIn()){
			loginButton.title='Logout';
		}
		else
		{
			loginButton.title='Login';
		}
	});
	
// ApplicationWindow.prototype.closeMenu = function(){
	// win.animate(animateRight);
	// isToggled = false;
// };
    return myTixWin;
	};

    module.exports = myticket;


