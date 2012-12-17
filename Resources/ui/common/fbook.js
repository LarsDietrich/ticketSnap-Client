var globals = require('/lib/AppProperties');

function facebookLogin(args){
	
	args = args || {};
	
	/*globals Titanium, Ti, alert, JSON */
	
	Titanium.Facebook.appid = "312452442202993";
	Titanium.Facebook.permissions = ['email'];
	
	//Ti.App.addEventListener('fbLogout',function(){Titanium.Facebook.logout(); });
	
	Titanium.Facebook.addEventListener('login', function(e) {
		
	        if (e.success) {
	        	
	        	// set loggedIn to true
	        	//globals.isLoggedIn(true);
	        	
	            Titanium.Facebook.requestWithGraphPath('me', {}, 'GET', function(e) {
	            
		            if (e.success) {
		          		var data= JSON.parse(e.result);
		                Ti.API.info("Name:"+ data.name);
		                Ti.API.info("last_name:"+ data.last_name);
		                //Ti.API.info("email:"+ data.email);
		                // Ti.API.info("location:"+ data.location.name);
		                //Ti.API.info("location:"+ data.hometown.name);
		                //Ti.API.info("facebook Id:"+ data.id);
		                      
		         		var email = data.email;
		         		var pwd   = data.id;
		                 
		         		// check login with FB login info 
		   				var net = require('lib/network');
		       			net.login('login',email,pwd,function(response){
		       	
				       		if(response.loggedIn == true){
					       		///alert('first');
					       		globals.setCurrentUserID(response.uid);
					       		globals.setLoggedIn(response.loggedIn);		
					       		alert("Welcome " + response.name);	
					       		callback();
					       		//globalVars.setDouble('userid',response.uid);
					       		//Ti.App.fireEvent('logIn');	
					       	}
			       		
				       		// // close pop up win              
			        		// var t3 = Titanium.UI.create2DMatrix();
					    	// t3 = t3.scale(0);
					    	// win.close({transform:t3,duration:300});
					    	// win=null; 
				       		//callback();
		       	
		       				else  
							{  
								var fname  = data.name;
								var lname  = data.last_name;
								//var adress = data.location.name;
					 	
			 					net.userRegistration('register',fname,lname,email,pwd,function(response){
				 
									if(response.message == true){
		              
		       							alert('welcome :'+fname +'.you have logged in via facebook');
		            					globals.setCurrentUserID(response.mt_user_id);
		       							globals.setLoggedIn(response.message);
		       							callback();		
								       //globalVars.setDouble('userid',response.mt_user_id);
								       //globalVars.setBool('loggedIn',response.message);
								       	//Ti.App.fireEvent('logIn'); 
		            				}
		            				
		            				else if(response.message == 'registered'){
		            	
		            					alert('you are already registered');
		            				}
		            				else{
		            					alert('Sorry Try Again');
		            				}
								}); //end net.userRegistration
		              
							} //end else
				
		       			}); // end net.login
	   
		            } // end if (e.success) inside Titanium.Facebook.requestWithGraphPath
		            else if (e.error) {
		            	alert(e.error);
		            } 
		            else {
		            	alert('Unknown response.');
		            }
	            
	            });// request graph
	            
	        } //end if(e.success) inside Titanium.Facebook.addEventListener
	        else{
	        	if(e.error){
	                alert(e.error);
	            }
	            else{
	                alert("Unkown error while trying to login to facebook.");
	            }
	        }
	});

	//
	// Login Button
	//
	var fbutton = Titanium.Facebook.createLoginButton({
			      style:Ti.Facebook.BUTTON_STYLE_WIDE,
			      //bottom:30,
			       top: args.top,
			       height: args.height,
			       width: 210
	});
	
	return fbutton;

}; //end function facebookLogin

module.exports = facebookLogin;