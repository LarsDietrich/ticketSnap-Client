var loginUrl = "http://mobile.goticketsnap.com/myticket_login.php"; 

//http://mobile.goticketsnap.com/


//#############################################################// 

exports.userRegistration = function (_case,_fname,_lname,_email,_pwd,_deviceToken,_actInd,callback){
	  
	 //var isRegistered;
	  var RegisterationRequest = Titanium.Network.createHTTPClient();
	     RegisterationRequest.onload = function(){  
	  var json = this.responseText;
		    Ti.API.info('RAW RESPONSE: '+json); 
		    var response = JSON.parse(json);
		        callback(response);
		        _actInd.hide();
		    
		    
		   // alert('Message:'+response.message);
		    //Ti.API.info('RESPONSE:  '+response);  
		 // if(response.message == true){isRegistered = true}else{isRegistered =false}
		}; // end onload
		
		RegisterationRequest.onerror = function(e){
			fail();
		} 
		
		RegisterationRequest.open("POST",loginUrl);
			
			var params = {  
   				fname:_fname,
   				lname:_lname,
   				token:_deviceToken,
   				email:_email,
   				password:_pwd,
   				condition:_case,  
        		
    		};
    		
    			if (checkInternetConnection()) {
    			
    		RegisterationRequest.send(params);
    		
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
		
		loginRequest.onerror = function(e){
			fail();
		}
		
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
	////	var result;	
    var sendTicketRequest = Titanium.Network.createHTTPClient({
    	
    	onload : function()  
		{  
	    var json = this.responseText;
	    
		    Ti.API.info('RAW RESPONSE: '+json); 
		    
		   var response = JSON.parse(json);
		       callback(response);
		    Ti.API.info('RESPONSE:  '+response); 
		    alert("Result:"+response.result); 
		//   (response.result == true)?result = true:result = false;
		}, // end onload
		
		onerror : function(e){
			fail();
		},
    	
    });
       
				
		    sendTicketRequest.setRequestHeader("enctype", "multipart/form-data");
            sendTicketRequest.setRequestHeader("Content-Type", "image/png");
			sendTicketRequest.open("POST","http://mobile.goticketsnap.com/mt_insert_ticket.php");
			 
			var params = {  
   				sender_id:_sender_id,
   				ticketimage:_ticketimage
    		};
    		
    			if (checkInternetConnection()) {
    			
    		sendTicketRequest.send(params);
    		
    		} else {
    			
             alert('Please check your cellular connection ');
    }

      //return result;

   	};
  //#############################################################// 
  
	exports.sendemail = function(_msg,_reciepentEmail,_sender_id,_imgname){
			
    var sendEmailRequest = Titanium.Network.createHTTPClient();
		sendEmailRequest.onload = function()  
		{  
	    var json = this.responseText;
		    Ti.API.info('RAW RESPONSE: '+json); 
		    var response = JSON.parse(json);
		       //callback(response);
		    Ti.API.info('RESPONSE:  '+response);  
		    
		}; // end onload
		
		sendEmailRequest.onerror = function(e){
			fail();
		};
		
		sendEmailRequest.open("POST","http://mobile.goticketsnap.com/mt_sendmail.php");
			
		var params = {  
			sender_id:_sender_id,
			msg:_msg,
			reciepent:_reciepentEmail,
			img:_imgname
		};
    		
		if (checkInternetConnection()) {
    			
    		sendEmailRequest.send(params);
    		
    	} 
    	else {		
        	alert('Please check your cellular connection ');
    	}

 };

//#############################################################// 	

exports.mytickets = function(_user_id,_req,callback){
			
    var myTicketsRequest = Titanium.Network.createHTTPClient({
    	onload: function(e)  
		{  
			var json = this.responseText;
			Ti.API.info('RAW RESPONSE: '+json); 
			var response = JSON.parse(json);
			Ti.API.info('RESPONSE:  '+JSON.stringify(response));  
			callback(response);
			///alert('it works');
			
			//_actInd.hide();	   
		}, // end onload
		onerror: function(e){
			fail();
		}
    });

	myTicketsRequest.open("GET",'http://mobile.goticketsnap.com/ticketView.php');
	
	
//>>>>>>> 8feb4fe3ec3108a9e178ada65be339d76009bfa9
			
	var params = {  
		user_id: _user_id,  
	    request:_req,  
	};
    		
//<<<<<<< HEAD
    			if (checkInternetConnection()) {
    			
    		myTicketsRequest.send(params);
    		
    		} else {
    			
             alert('Please check your cellular connection ');
    }

  
};





exports.repliesAlerts = function(_user_id,_req,callback){
			
    var myTicketsRequest = Titanium.Network.createHTTPClient({
    	onload: function(e)  
		{  
			var json = this.responseText;
			Ti.API.info('RAW RESPONSE: '+json); 
			var response = JSON.parse(json);
			Ti.API.info('RESPONSE:  '+JSON.stringify(response));  
			///alert('it works');
			callback(response);
			
			
			//_actInd.hide();	   
		}, // end onload
		onerror: function(e){
			fail();
		}
    });

	myTicketsRequest.open("GET",'http://mobile.goticketsnap.com/ticketView.php');
	
	
//>>>>>>> 8feb4fe3ec3108a9e178ada65be339d76009bfa9
			
	var params = {  
		user_id: _user_id,  
	    request:_req,  
	};
    		
//<<<<<<< HEAD
    			//if (checkInternetConnection()) {
    			
    		myTicketsRequest.send(params);
    		
    		//} else {
    			
            /// alert('Please check your cellular connection ');
   // }

   //	};
//=======
    //loginRequest.send(params);
};




//>>>>>>> 8feb4fe3ec3108a9e178ada65be339d76009bfa9
   	
   	//#############################################################// 
   	
   	exports.msgs = function(_imgname,_user_id,_req,callback){
			
    var msgsRequest = Titanium.Network.createHTTPClient();
	     msgsRequest.onload = function()  
		{  
			
	var  json = this.responseText;
		    Ti.API.info('RAW RESPONSE MSG : '+json); 
		  var response = JSON.parse(json);
		    Ti.API.info('RESPONSE MSG:  '+response);  
		    callback(response);  
		    
		}; // end onload
		
		 msgsRequest.onerror = function(e){
		 	
		 	fail();
		}
		
			msgsRequest.open("POST",'http://mobile.goticketsnap.com/ticketView.php');
			
			var params = {  
				imgname:_imgname,
   				user_id: _user_id,  
        	    request:_req,  
    		};
    		
    		if (checkInternetConnection()) {
    			
    		msgsRequest.send(params);
    		
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
 
