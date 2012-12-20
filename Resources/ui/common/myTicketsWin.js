var globals = require('/lib/AppProperties');
var loggedIn = globals.isLoggedIn();

var user_id  = globals.getCurrentUserID();
var _win  = require('/ui/handheld/ApplicationWindow');
var _view = require('/ui/common/myTicketView');



function myticket(){
	
var thisWin = new _win();
	thisWin.zIndex=10;
	thisWin.title='My Tickets';
//<<<<<<< HEAD
	alert(user_id);
 var view = new _view(2);
     thisWin.add(view);	
	
	
    return thisWin;
	};

    module.exports = myticket;


