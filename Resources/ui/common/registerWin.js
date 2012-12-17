function register (){
	
var registerWin = Titanium.UI.createWindow({
    backgroundColor: 'white',
    //title: 'Settings',
     //color:'dark grey',
	 //barColor: 'blue',
    //left: 0,
	//zIndex:1,
	//barImage:'images/btn-settings.png',
});

var view = Ti.UI.createScrollView({
	scrollType:'horizontal',
	 backgroundImage:'images/otis_redding.png',
	 width: Ti.Platform.displayCaps.platformWidth,
	 height:Ti.Platform.displayCaps.platformHeight,
	 
	
});

var navBtn = Ti.UI.createButton({
	title: 'Done',
	left: 10,
	width:10,
	//height: 30,
	//image:'images/btn-back@2x.png',
	color:'#6d0a0c',
	top: 10,
	//opacity:0,
});


    var fname = Ti.UI.createTextField({
        hintText: 'Firstname',
        top:40,
        height: 40,
        width:200,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        autocorrect: false
    });
    view.add(fname);
    
     var lname = Ti.UI.createTextField({
        hintText: 'Lastname',
        top:90,
        width:200,
        height: 40,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        autocorrect: false
    });
    view.add(lname);
    
 
var email = Ti.UI.createTextField({
        hintText: 'email',
        width:200,
        top:140,
        height: 40,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        autocapitalization: Ti.UI.TEXT_AUTOCAPITALIZATION_NONE,
        autocorrect: false
    });
    view.add(email);
    
 
    var password = Ti.UI.createTextField({
        hintText: 'Password',
        top:190,
        width:200,
        height: 40,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask: true
    });
    view.add(password);
    
     var c_password = Ti.UI.createTextField({
        hintText: 'Confirm Password',
        top:260,
        width:200,
        height: 40,
        borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
        passwordMask: true
    });
    view.add(c_password);

    var button = Ti.UI.createButton({
        title: 'Sign Up!',
        top: 310,
        height: 40,
    });
     view.add(button);
      
    button.addEventListener('click',function(){
 	var firstname = fname.value;
 	var lastname  = lname.value;
 	//var phonenumber = phone.value;
 	var emailadress = email.value;
 	//var adress    = location.value;
 	var pwdval    = password.value;
 	var c_pwdval = c_password.value;
 	
 	if(firstname!='' && lastname!='' && emailadress!='' ){
 		if(pwdval!='' && c_pwdval!='' && c_pwdval == pwdval){
 			
 			// code here 
 			
 		var net = require('lib/network');	
 	    net.userRegistration('register',firstname,lastname,emailadress,pwdval,function(response){
 	    	
 	    	 if(response.message == true){
 	    	 	
               alert('You are successfully Registered Login Now ');
            	registerWin.close();
            	var loginWin = require('ui/common/loginWin');
	            new loginWin(registerWin);
            	
            	
            } else if(response.message == 'registered'){
            	
            	alert('You are already registered');
            	
            }else{
            	
            	alert('Sorry Try Again');
            }
        
 	    	
 	    }); 
            
               
            			
 			
 		}else{alert('Sorry your password does not match Try Again!');}
 		
 		
 		
 	}else{alert('Please the fill the form correctly');}
 	
 	
    });     
    
    registerWin.setLeftNavButton(navBtn);
    navBtn.addEventListener('click',function(){
	registerWin.close();
	registerWin = null;
	
    });
	    registerWin.add(view); 
        registerWin.open({modal:true});
    //return win;
	};


    module.exports = register;


