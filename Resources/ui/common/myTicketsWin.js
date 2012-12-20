var globals = require('/lib/AppProperties');
var loggedIn = globals.isLoggedIn();
var user_id = globals.getCurrentUserID();
var _win = require('/ui/handheld/ApplicationWindow');
//var _view = require('/ui/common/myTicketView');

function myticket(){
	
var thisWin = new _win();
	thisWin.zIndex=10;
	thisWin.title='My Tickets';
	var testBtn = Ti.UI.createButton({
		title: 'test',
		top: 50
	});
	testBtn.addEventListener('click',function(e){
		alert(user_id);
	});
	thisWin.add(testBtn);
	
    return thisWin;
	};

    module.exports = myticket;


