var loginUrl = "http://www.goticketsnap.xpertogo.com/myticket_login.php"; 

exports.userRegistration = function (_case,_fname,_lname,_email,_pwd,callback){
	  
	  
	 //var isRegistered;
	  var loginRequest = Titanium.Network.createHTTPClient();
	     loginRequest.onload = function(){  
	  var json = this.responseText;
		    Ti.API.info('RAW RESPONSE: '+json); 
		    var response = JSON.parse(json);
		        callback(response);
		    
		    
		   // alert('Message:'+response.message);
		    //Ti.API.info('RESPONSE:  '+response);  
		 // if(response.message == true){isRegistered = true}else{isRegistered =false}
		}; // end onload
		
		loginRequest.error =function(e){
			alert('Registration :'+e.error)
		}
		
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
    		
    		loginRequest.send(params);
    		
    		
    		//return isRegistered;
   			
};


exports.login = function(_case,_email,_password,callback){
			
    var loginRequest = Titanium.Network.createHTTPClient();
		loginRequest.onload = function()  
		{  
	var json = this.responseText;
		    Ti.API.info('RAW RESPONSE: '+json); 
		    var response = JSON.parse(json);
		    callback(response);
		    Ti.API.info('RESPONSE:  '+response);  
		    
		    
		    
		} // end onload
		
		
			loginRequest.open("POST",loginUrl);
			
			var params = {  
   				email: _email,  
        		password:_password,
        		condition:_case,  
    		};
    		
    		loginRequest.send(params);

   	};
  
	
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
		} // end onload
		
			loginRequest.open("POST","http://www.goticketsnap.xpertogo.com/mt_insert_ticket.php");
			
			var params = {  
   				sender_id:_sender_id,
   				ticketimage:_ticketimage
    		};
    		
    		loginRequest.send(params);

   	};
  
	exports.sendemail = function(_subject,_desc,_reciepentEmail,_sender_id,_imgname){
			
    var loginRequest = Titanium.Network.createHTTPClient();
    
		loginRequest.onload = function()  
		{  
	    var json = this.responseText;
		    Ti.API.info('RAW RESPONSE: '+json); 
		    var response = JSON.parse(json);
		       //callback(response);
		    Ti.API.info('RESPONSE:  '+response);  
		    
		} // end onload
		
			loginRequest.open("POST","http://www.goticketsnap.xpertogo.com/mt_sendmail.php");
			
			var params = {  
   				sender_id:_sender_id,
   				subject:_subject,
   				desc:_desc,
   				reciepent:_reciepentEmail,
   				img:_imgname,
   				
    		};
    		
    		loginRequest.send(params);

   	};
  
	

	

exports.mytickets = function(_user_id,_req,callback){
			
    var loginRequest = Titanium.Network.createHTTPClient();
	loginRequest.onload = function()  
	{  
		var json = this.responseText;
		Ti.API.info('RAW RESPONSE: '+json); 
		var response = JSON.parse(json);
		Ti.API.info('RESPONSE:  '+response);  
		callback(response);   
	} // end onload
		
	loginRequest.open("POST",'http://www.goticketsnap.xpertogo.com/ticketView.php');
			
	var params = {  
		user_id: _user_id,  
	    request:_req,  
	};
    		
    loginRequest.send(params);
};
   	
   	exports.msgs = function(_imgname,_user_id,_req,callback){
			
    var loginRequest = Titanium.Network.createHTTPClient();
		loginRequest.onload = function()  
		{  
			
	var  json = this.responseText;
		    Ti.API.info('RAW RESPONSE MSG : '+json); 
		  var response = JSON.parse(json);
		    Ti.API.info('RESPONSE MSG:  '+response);  
		    callback(response);  
		    
		} // end onload
		
		
			loginRequest.open("POST",'http://www.goticketsnap.xpertogo.com/ticketView.php');
			
			var params = {  
				imgname:_imgname,
   				user_id: _user_id,  
        	    request:_req,  
    		};
    		
    		loginRequest.send(params);

   	};
  

  



































