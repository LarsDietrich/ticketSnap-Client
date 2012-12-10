var globals = require('/lib/AppProperties');
var newTicketWin = require('ui/common/newTicketsWin');
var _myTicketsView = require('/ui/common/myTicketsView');

function newTicket(){
	
	if(globals.isLoggedIn()){
 		var newTicket = new newTicketWin();
	}else{
		Ti.App.fireEvent('loginFirst');	
	}
}

function fbLogout(){
	Titanium.Facebook.logout();
	alert("Logged out!");
	// TODO: put this function in fbook.js for consistency
};

function startApp(){
	var Window = require('/ui/handheld/ApplicationWindow');
	var myticketsWin = new Window();
	var _tixView = require('/ui/common/myTicketsView')
};

function openSettings(){
	var settingsWin = require('ui/common/settingsWin');
	new settingsWin(win,view);
	Ti.App.fireEvent('closeMenu');
}

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
		default:
			break;
	}
})

exports.startApp = startApp;
