var globals = require('/lib/AppProperties');

function logInView(args){
	
	args = args || {};
	
	var thisView = Ti.UI.createView({
		backgroundImage: '/images/grey_background.png',
	});
	
	var scrollView = Ti.UI.createScrollView({
		horizontalBounce: false,
		verticalBounce: false,
		backgroundImage: '/images/grey_background.png',
		layout: 'vertical',
		//height: globals.screenHeight,
	});
	
	thisView.add(scrollView);
	scrollView.add(Ti.UI.createImageView({
		image: '/images/TICKETSNAP_bar_tr.png',
		top: 35
	}));
	
	var _fbLoginBtn = require('ui/common/fbook');
	var fbLoginBtn = new _fbLoginBtn({top:35, width: 210, height: 45, callback: args.callback});
	scrollView.add(fbLoginBtn);
	
	scrollView.add(Ti.UI.createLabel({
		text: 'OR',
		textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
		font: {
			fontSize: 20,
		},
		top: 20
	}));
	
	var loginBG = Ti.UI.createView({
		backgroundImage:'/images/loginInputFieldsBackground.png',
		width: 210,
		height: 100,
		backgroundLeftCap: 10,
		backgroundTopCap: 10,
		layout: 'vertical',
		backgroundColor: 'transparent',
		top: 20
	});
	
	scrollView.add(loginBG);
	
    var user_email = Ti.UI.createTextField({
        hintText: 'user Email',
        top:5,
        width:200,
         color:'#494a4a',
        height: 40,
        //borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        //autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        autocorrect: false
    });
    
    loginBG.add(user_email);

    var password = Ti.UI.createTextField({
        hintText: 'Password',
        top:10,
        width:200,
        height: 40,
        color:'#494a4a',
        //borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask: true
    });
    
    loginBG.add(password);

    var button = Ti.UI.createButton({
        title: 'Login User',
         color:'#494a4a',
        top:20,
        height: 45,
        width: 210
    });
    
    scrollView.add(button);
    
    var registerLink = Ti.UI.createLabel({
    	top: 15,
    	text: 'Don\'t have an account? Create one now',
    	textAlign: Ti.UI.TEXT_ALIGNMENT_LEFT,
    	width: 210,
    });
    
    scrollView.add(registerLink);
    
    button.addEventListener('click', function(){
	// here will be login work
	var email = user_email.value;
	var pwd  =  password.value;	
		
	if (email != '' && pwd != '')  
	{	
		Ti.App.fireEvent('GLOBALEVENT',{func: 'handleLogin', email: email, pwd: pwd});
	}
	else
	{
		alert("Username/Password are required");
	}
    
	});
	
	registerLink.addEventListener('click', function(e){
		alert('register clicked');
		var _registerWin = require('/ui/common/registerWin');
		var registerWin = new _registerWin();
		//registerWin.open({animated: true});
	});
	
	return thisView;
}

module.exports = logInView;