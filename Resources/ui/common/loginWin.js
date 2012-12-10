var globals = require('/lib/AppProperties');

function login_module (win,callback){

win.orientationModes = [
	Titanium.UI.PORTRAIT,
	Titanium.UI.LANDSCAPE_LEFT,
	Titanium.UI.LANDSCAPE_RIGHT
];

// win.addEventListener('focus', function()
// {
	// Ti.API.info('FOCUSED EVENT RECEIVED');
// });

	var t = Titanium.UI.create2DMatrix();
	t = t.scale(0);

	var w = Titanium.UI.createWindow({
		backgroundColor:'blue',
		borderWidth:1,
		borderColor:'#999',
		height:350,
		width:300,
		borderRadius:10,
		opacity:0.92,
		transform:t
	});

	// create first transform to go beyond normal size
	var t1 = Titanium.UI.create2DMatrix();
	t1 = t1.scale(1.1);
	var a = Titanium.UI.createAnimation();
	a.transform = t1;
	a.duration = 200;

	// when this animation completes, scale to normal size
	
	a.addEventListener('complete', function()
	{
		Titanium.API.info('here in complete');
		var t2 = Titanium.UI.create2DMatrix();
		t2 = t2.scale(1.0);
		w.animate({transform:t2, duration:200});

	});

	var closeButton = Ti.UI.createImageView({
		image: '/images/icon-close-window.png',
		top: -1,
		left: -1,
		backgroundColor: 'transparent',
		zIndex: 10,
	});
	
	w.add(closeButton);

     var user_email = Ti.UI.createTextField({
        hintText: 'user Email',
        top:40,
        width:200,
         color:'#494a4a',
        height: 40,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        autocorrect: false
    });
    w.add(user_email);

    var password = Ti.UI.createTextField({
        hintText: 'Password',
        top:120,
        width:200,
        height: 40,
         color:'#494a4a',
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask: true
    });
    w.add(password);

    var button = Ti.UI.createButton({
        title: 'Login User',
         color:'#494a4a',
        top:200,
        height: 30 
    });
     w.add(button);
    
    closeButton.addEventListener('click', function(e){
    	// to close modal win
        var t3 = Titanium.UI.create2DMatrix();
		t3 = t3.scale(0);
		w.close({transform:t3,duration:300});
    	w=null;
    	callback();
    });
    
	button.addEventListener('click', function()
	{
		// here will be login work
	var email = user_email.value;
	var pwd  =  password.value;	
		
	if (email != '' && pwd != '')  
		{	
       var net = require('lib/network');
       net.login('login',email,pwd,function(response){
       	
       	if(response.loggedIn == true){
       		
       		globals.setCurrentUserID(response.uid);
       		globals.setLoggedIn(response.loggedIn);	
       		alert("Welcome " + response.name);	
       		//globalVars.setDouble('userid',response.uid);
       	
	       	// to close modal win
	        var t3 = Titanium.UI.create2DMatrix();
			t3 = t3.scale(0);
			w.close({transform:t3,duration:300});
			w=null;
			callback();
       	//Ti.App.fireEvent('logIn');	
       	}
       	
       	else  
			{  
	     		alert(response.message);  
			} 
		
	   	
       	
       });
       	 		
	
		}
    	else
    	{
    		alert("Username/Password are required");
    	}
    
		 
		// login task ends
		
	
	});
	
	var fb = require('ui/common/fbook');
    fbButton = new fb(w,function(e){
    	// to close modal win
        var t3 = Titanium.UI.create2DMatrix();
		t3 = t3.scale(0);
		w.close({transform:t3,duration:300});
		w=null;
		fbButton=null;
    	callback();
    });
    
    //w.add(fbButton);

/* var fbButton = Ti.UI.createButton({
        title: 'Login with facebook',
        color:'#494a4a',
        top:240,
        height: 30 
    });
     w.add(fbButton);
      
	fbButton.addEventListener('click', function()
	{
		var t3 = Titanium.UI.create2DMatrix();
		t3 = t3.scale(0);
		w.close({transform:t3,duration:300});
	});
*/
	w.open(a);

};

module.exports = login_module;


