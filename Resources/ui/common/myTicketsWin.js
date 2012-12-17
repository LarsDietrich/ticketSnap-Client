var globals = require('/lib/AppProperties');
var loggedIn = globals.isLoggedIn();
var _win = require('/ui/handheld/ApplicationWindow');

function myticket(){
	
var thisWin = new _win();
	thisWin.zIndex=10;
	thisWin.title='My Tickets';


    return thisWin;
	};

    module.exports = myticket;


