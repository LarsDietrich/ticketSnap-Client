var loginUrl = "http://goticketsnap.xpertogo.com/myticket_login.php"; 

//http://mobile.goticketsnap.com/


//#############################################################// 
exports.userRegistration = function (_case,_fname,_lname,_email,_pwd,_actInd,callback){
	  
	  
	 //var isRegistered;
	  var loginRequest = Titanium.Network.createHTTPClient();
	     loginRequest.onload = function(){  
	  var json = this.responseText;
		    Ti.API.info('RAW RESPONSE: '+json); 
		    var response = JSON.parse(json);
		        callback(response);
		        _actInd.hide();
		    
		    
		   // alert('Message:'+response.message);
		    //Ti.API.info('RESPONSE:  '+response);  
		 // if(response.message == true){isRegistered = true}else{isRegistered =false}
		}; // end onload
		
		loginRequest.onerror = fail();
		
		loginRequest.open("POST",loginUrl);
			
			var params = {  
   				fname:_fname,
   				lname:_lname,
   				//phone:_phone,
   				email:_email,
   				//adress:_adress,
   				password:_pwd,
   				condition:_case,  
        		
    		};
    		
    			if (checkInternetConnection()) {
    			
    		loginRequest.send(params);
    		
    		} else {
    			
             alert('Please check your cellular connection ');
            }
    		
    		
    		//return isRegistered;
   			
};
//#############################################################// 

exports.login = function(_case,_email,_password,_actInd,callback){
			
    var loginRequest = Titanium.Network.createHTTPClient();
		loginRequest.onload = function()  
		{  
	var json = this.responseText;
		    Ti.API.info('RAW RESPONSE: '+json); 
		    var response = JSON.parse(json);
		    callback(response);
		    _actInd.hide();
		    Ti.API.info('RESPONSE:  '+response);  
		    
		    
		    
		}; // end onload
		
		loginRequest.onerror = fail();
		
			loginRequest.open("POST",loginUrl);
			
			var params = {  
   				email: _email,  
        		password:_password,
        		condition:_case,  
    		};
    		
    			if (checkInternetConnection()) {
    			
    		loginRequest.send(params);
    		
    		} else {
    			
             alert('Please check your cellular connection ');
    }

   	};
  
//#############################################################// 	
exports.sendticket = function(_sender_id,_ticketimage){
			
    var loginRequest = Titanium.Network.createHTTPClient();
        loginRequest.setRequestHeader("enctype", "multipart/form-data");
        loginRequest.setRequestHeader("Content-Type", "image/png");
		loginRequest.onload = function()  
		{  
	    var json = this.responseText;
		    Ti.API.info('RAW RESPONSE: '+json); 
		    var response = JSON.parse(json);
		       //callback(response);
		    Ti.API.info('RESPONSE:  '+response);  
		    return response.result;
		}; // end onload
		
		loginRequest.onerror = fail();
		
			loginRequest.open("POST","http://goticketsnap.xpertogo.com/mt_insert_ticket.php");
			
			var params = {  
   				sender_id:_sender_id,
   				ticketimage:_ticketimage
    		};
    		
    			if (checkInternetConnection()) {
    			
    		loginRequest.send(params);
    		
    		} else {
    			
             alert('Please check your cellular connection ');
    }

   	};
  //#############################################################// 
  
	exports.sendemail = function(_msg,_reciepentEmail,_sender_id,_imgname){
			
    var loginRequest = Titanium.Network.createHTTPClient();
    
		loginRequest.onload = function()  
		{  
	    var json = this.responseText;
		    Ti.API.info('RAW RESPONSE: '+json); 
		    var response = JSON.parse(json);
		       //callback(response);
		    Ti.API.info('RESPONSE:  '+response);  
		    
		}; // end onload
		
		loginRequest.onerror = fail();
		
			loginRequest.open("POST","http://goticketsnap.xpertogo.com/mt_sendmail.php");
			
			var params = {  
   				sender_id:_sender_id,
   				msg:_msg,
   				reciepent:_reciepentEmail,
   				img:_imgname,
   				
    		};
    		
    			if (checkInternetConnection()) {
    			
    		loginRequest.send(params);
    		
    		} else {
    			
             alert('Please check your cellular connection ');
    }

   	};
  
	

//#############################################################// 	

exports.mytickets = function(_user_id,_req,_actInd,callback){
			
    var loginRequest = Titanium.Network.createHTTPClient();
//<<<<<<< HEAD
		loginRequest.onload = function()  
		{  
	var json = this.responseText;
		    Ti.API.info('RAW RESPONSE: '+json); 
		    var response = JSON.parse(json);
		     Ti.API.info('RESPONSE:  '+response);  
		    callback(response);
			_actInd.hide();	   
				    
		}; // end onload
		loginRequest.onerror = fail();
		
		/*	loginRequest.open("POST",'http://goticketsnap.xpertogo.com/ticketView.php');
//=======
	loginRequest.onload = function()  
	{  
		var json = this.responseText;
		Ti.API.info('RAW RESPONSE: '+json); 
		var response = JSON.parse(json);
		Ti.API.info('RESPONSE:  '+response);  
		callback(response);   
	} // end onload
		*/
	loginRequest.open("POST",'http://goticketsnap.xpertogo.com/ticketView.php');
	
	
//>>>>>>> 8feb4fe3ec3108a9e178ada65be339d76009bfa9
			
	var params = {  
		user_id: _user_id,  
	    request:_req,  
	};
    		
//<<<<<<< HEAD
    			if (checkInternetConnection()) {
    			
    		loginRequest.send(params);
    		
    		} else {
    			
             alert('Please check your cellular connection ');
    }

   //	};
//=======
    loginRequest.send(params);
};

//>>>>>>> 8feb4fe3ec3108a9e178ada65be339d76009bfa9
   	
   	//#############################################################// 
   	
   	exports.msgs = function(_imgname,_user_id,_req,callback){
			
    var loginRequest = Titanium.Network.createHTTPClient();
		loginRequest.onload = function()  
		{  
			
	var  json = this.responseText;
		    Ti.API.info('RAW RESPONSE MSG : '+json); 
		  var response = JSON.parse(json);
		    Ti.API.info('RESPONSE MSG:  '+response);  
		    callback(response);  
		    
		}; // end onload
		
		 loginRequest.onerror = fail();
		
			loginRequest.open("POST",'http://goticketsnap.xpertogo.com/ticketView.php');
			
			var params = {  
				imgname:_imgname,
   				user_id: _user_id,  
        	    request:_req,  
    		};
    		
    		if (checkInternetConnection()) {
    			
    		loginRequest.send(params);
    		
    		} else {
    			
             alert('Please check your cellular connection ');
    }

   	};
  

  //#############################################################// 

function checkInternetConnection() {
    return Ti.Network.online;
}
 
/* ------------- [ Callbacks ] ----------------- */
// Fail Callback
function fail() {
    alert('Something went wrong!')
}
 

































