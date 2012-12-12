var globals = require('/lib/AppProperties');
var loggedIn = globals.isLoggedIn();
var loginButton=null;

function ApplicationWindow(params) {

	var thisWin = Titanium.UI.createWindow({
	    backgroundColor: 'white',
	    title: params.title,
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
	});
	
	loginButton = Ti.UI.createButton({
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
     		Ti.App.fireEvent('updateLoginBtn',{loggedIn:false});
     		
		} 
		else{
			 loginButton.enabled=false;
			menuBtn.enabled=false;
			var loginWin = require('ui/common/loginWin');
			new loginWin(thisWin, function(e){
				 loginButton.enabled=true;
				menuBtn.enabled=true;
				if(globals.isLoggedIn())
				{
					loginButton.title='logout';
					Ti.App.fireEvent('updateLoginBtn',{loggedIn:true});
				}
			});
		}
	}
	
	 loginButton.addEventListener('click',function(){		
		handleLogin();	  		   
	});
thisWin.setLeftNavButton(menuBtn);
	thisWin.setRightNavButton( loginButton);
	
	menuBtn.addEventListener('click',function(e){
		
		Ti.App.fireEvent('GLOBALEVENT',{func: 'toggleMenu'});
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
	
	return thisWin;
};
	
module.exports = ApplicationWindow;