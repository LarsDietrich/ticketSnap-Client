var globals = require('/lib/AppProperties');
var uname = globals.getCurrentUserName();

function loggedInView(args){
	args = args || {};
	
	var scrollView = Ti.UI.createScrollView({
		horizontalBounce: false,
		verticalBounce: true,
		backgroundImage: '/images/solid.png',
		layout: 'vertical'
	});
	
	scrollView.add(Ti.UI.createImageView({
		image: '/images/TICKETSNAP_bar_tr.png',
		top: 35
	}));
	
	scrollView.add(Ti.UI.createLabel({
		text: 'WELCOME ' + uname,
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {fontSize: 16},
		top: 35
	}));
	
	var changeEmailBtn = Ti.UI.createButton({
		title: 'Change Email',
		width: 210,
		height: 45,
		top: 30
	});
	
	scrollView.add(changeEmailBtn);
	
	var changePasswordBtn = Ti.UI.createButton({
		title: 'Change Password',
		width: 210,
		height: 45,
		top: 20
	});
	
	scrollView.add(changePasswordBtn);
	
	var logoutBtn = Ti.UI.createButton({
		title: 'Logout',
		width: 210,
		height: 45,
		top: 20
	});
	
	scrollView.add(logoutBtn);
	
	logoutBtn.addEventListener('click', function(e){
		Ti.App.fireEvent('GLOBALEVENT',{func: 'handleLogin'});
	});
	
	return scrollView;
}



module.exports = loggedInView;