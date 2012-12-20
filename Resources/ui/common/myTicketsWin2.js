var globals = require('/lib/AppProperties');
var loggedIn = globals.isLoggedIn();
<<<<<<< HEAD
var user_id  = globals.getCurrentUserID();
var _win  = require('/ui/handheld/ApplicationWindow');
var _view = require('/ui/common/myTicketView');
=======
var user_id = globals.getCurrentUserID();
var _win = require('/ui/handheld/ApplicationWindow');
//var _view = require('/ui/common/myTicketView');
>>>>>>> b62e88dad3df4cc38938d66d18a2ae2e3c24f10a

function myticket(){
	
var thisWin = new _win();
	thisWin.zIndex=10;
	thisWin.title='My Tickets';
<<<<<<< HEAD
	alert(user_id);
 var view = new _view(2);
     thisWin.add(view);	
	
	

=======
	var testBtn = Ti.UI.createButton({
		title: 'test',
		top: 50
	});
	testBtn.addEventListener('click',function(e){
		alert(user_id);
	});
	thisWin.add(testBtn);
	
>>>>>>> b62e88dad3df4cc38938d66d18a2ae2e3c24f10a
    return thisWin;
	};

    module.exports = myticket;


