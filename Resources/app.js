var controller = require('/model/controller');
//var APP = {};
(function() {
	Ti.API.info('Welcome to My Tickets for ' + Ti.Platform.osname);
	
	controller.startApp();
	
	
     //#############################################################// 	
     // this  request will go to receive mail and put it in db 
	setInterval(function(){
		
	var request = Titanium.Network.createHTTPClient();
		request.onload = function()  
		{  
	var json = this.responseText;
		Ti.API.info('RAW RESPONSE: '+json); 
		}; // end onload
		
		request.onerror = function(e){
		}
		
	   request.open("POST","http://mobile.goticketsnap.com/receivemail.php");
	   request.send();
		
	},50000);
	 
    //#############################################################// 		
    			
})();












