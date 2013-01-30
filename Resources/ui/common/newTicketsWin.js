var globals    = require('/lib/AppProperties');
var loggedIn   = globals.isLoggedIn();
var _sender_id = globals.getCurrentUserID();

////////////////////////////////////////////var ticketID;
var net = require ('lib/network');

var afterPressView  = null;
var afterSubmitView = null;
var imgView =  null ;
var thisWin = null ;
var toolbar = null;
var submit  = null ;
var tf = null;
//var message;	
  
//#############################################################// 
// random function starts
function randNum (){        				
	
	var data =['A0','B1','C2',
			   'D3','E4','F5',
			   'G6','H7','I8',
			   'J9','K0','L1',
			   'M2','N3','O4',
			   'P5','Q6','R7',
			   'S8','T9','U0',
			   'V1','W2','X3',
			   'Y4','Z5'];
		
	var  random = Math.floor(Math.random()*24);
	var   randomnumber=Math.floor(Math.random()*100);
	Ti.API.info("random: " +data[random]+randomnumber);
	
	return data[random]+ randomnumber;
	
};// random ends

//#############################################################// 
function capture_func(/*Identifier*/){
	var  randomInt = randNum(); // this will generate random name for tickets	

	if(Ti.Media.isCameraSupported){
		Ti.Media.showCamera({
	    	success:function(event){
				var image = event.media.imageAsResized(480,640);//event.media.width / 2, event.media.height / 2); 
				//event.media;
				imgView.image =image;
				
				// save for future
				// // function is called here
	
	     		thisWin.add(afterPressView);
		 		thisWin.add(toolbar);
				////Titanium.UI.currentTab.open(thisWin,{animated:true});
				thisWin.open({modal:true});
				//alert(Titanium.UI.currentTab);
				 
				submit.addEventListener('click',function(){
	
					if(globals.isLoggedIn()){
							
						var message = tf.value;
						
						if( message ==''){
		
							var conform = Titanium.UI.createAlertDialog({ 
								title: 'send mail',
	   	  						message:'Are you sure sending no msg with Ticket',
	      						buttonNames: ['yes', 'No'], cancel: 1});
	
	      					conform.addEventListener('click', function(e) { 
	      						Titanium.API.info('e = ' + JSON.stringify(e));
	
		   						//Clicked cancel, first check is for iphone, second for android
		    					if (e.cancel === e.index || e.cancel === true) {
		      						return;
		     					}
	
	    						//now you can use parameter e to switch/case
		   						switch (e.index) {
		      						case 0:
			      						// press code 
			      						for(var i=0; i<thisWin.getChildren().length;i++){
								    	    thisWin.remove(thisWin.children[i]);
								    	    thisWin.children[i]=null;
				                        }
				    
				            		thisWin.add(afterSubmitView);
				            var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tktsnap'+randomInt+'.png');
				         				
							  			    f.write(image);
							  			
										// var net = require('lib/network');
						   
						   				//var result =
						
						   			///	net.sendticket(globals.getCurrentUserID(),f.read(),function(e){
						     	 		///	Ti.API.info('Callback RESPONSE:  '+ e.result); 
						     	 			///var result = e.result;
						     	 			///if(result == true){	
						     	 				
						         				net.sendemail('There is no message for you only ticket snap',globals.getCurrentUserID(),f.read());
			                     				tf.value = '';
			                     				
						     	 			///}
						     	 		///});
			                    		thisWin.remove(toolbar);	
			  							break;
									//This will never be reached, if you specified cancel for index 1
		      						case 1: //alert('Clicked button 1 (NO)');
		      							break;
									default:
		      							break;
		  						}
							});
	
							conform.show();
						} //end if condition
						else{
		
							for(var i=0; i<thisWin.getChildren().length;i++){
		    	    			thisWin.remove(thisWin.children[i]);
		    	    			thisWin.children[i]=null;
		                    }
		    
		              		thisWin.add(afterSubmitView);
		              		alert ('THIS ALERT IS BEFORE WRITING TO FILESYSTEM');
		          			var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tktsnap'+randomInt+'png');
		          			f.write(image);
		          			// alert("resolvedddd:" + f.resolve() + ' ' + Ti.Filesystem.applicationDataDirectory);
// 		          		
		          			// if(f.exists()) {
		          				// alert("Directory exists yahoo");
		          			// } else {
// 		          		
		          				// alert("Drictory doesnt exist");
		          				// f.createDirectory();
// 		          		
		          			// }
		          			
		          			// var f1 = Ti.Filesystem.getFile(f.resolve(),'tktsnap'+randomInt+'.png');
// 
		          			// alert("image" + image);
					  		// if(f1.write(image)===false) {
					  			// alert("Writing failed");
					  		// }
					  		// //f = null;
							// //f1 = null;		
							// var read_file = Ti.Filesystem.getFile(f.resolve(),'tktsnap'+randomInt+'.png');
							// var blob = read_file.read();
							// var readText = blob.text;
// 		
					  		// alert('READ FROM FILESYSTEM: ' + blob + ' ' + blob.size + ' ' + readText + ' ' + read_file);
				   			
				   		///	net.sendticket(globals.getCurrentUserID(),image,function(e){
				     	 	///	Ti.API.info('Callback RESPONSE:  '+ e.result); 
				     	 		///var result = e.result;
				     	 		
				     	 		///alert('RESULT FROM SENDTICKET: ' + e.result);
				     	 		///if(result == true){
				     	 			
				         			net.sendemail("NEW TICKET",globals.getCurrentUserID(),f.read());	
	                     			tf.value = ''; 	
	                     			
				     	 		///}     	
				     		///});
				   
	               			thisWin.remove(toolbar);	
		
						} // end else condition
					} 
					else{
	
	         			alert('please login before you send');
					} // if login condition ends  
				}); // end submit.addEventListener
			},
	        cancel:function(){
	         	 	
	       		for(var i=0; i<thisWin.getChildren().length;i++){
	    			thisWin.remove(thisWin.children[i]);
	    			thisWin.children[i]=null;
	    		}
	    
               	thisWin.close();
	        },
	        error:function(){
	        	var a = Ti.UI.createAlertDialogue({title:'camera Error'});
	          	if(error.code==Ti.Media.NO_CAMERA){
	          		a.setMessage('camera_error_details');
	          	}
	          	else{	 	
	          		a.setMessage('Unexpected Error :'+error.code);
	        	} 
	        	a.show();
	        },

	        saveToPhotoGallery:true,
	        allowEditing:true,
	        mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO],			
	    });
	} // end if camera is supported
	 
	else{  // if camera is not supported (simulator)
	 	
		Ti.Media.openPhotoGallery({
 			success:function(event){
				var image = event.media;
				imgView.image = image;			
             	thisWin.add(afterPressView);
                thisWin.add(toolbar);
				thisWin.open({modal:true});
	
				submit.addEventListener('click',function(){
					if(globals.isLoggedIn()){
						var message = tf.value;
						
						if( message ==''){
							var conform = Titanium.UI.createAlertDialog({ title: 'send mail',
		   	  					message:'Are you sure sending no msg',
		      					buttonNames: ['yes', 'No'], cancel: 1
		      				});
		
		     		 		conform.addEventListener('click', function(e) { 
			      				Titanium.API.info('e = ' + JSON.stringify(e));
			
							   //Clicked cancel, first check is for iphone, second for android
							    if (e.cancel === e.index || e.cancel === true) {
							      return;
							     }
			
			    				//now you can use parameter e to switch/case
			   					switch (e.index) {
							    	case 0:
								      	// press code 
				      					for(var i=0; i<thisWin.getChildren().length;i++){
					    	    			thisWin.remove(thisWin.children[i]);
					    	    			thisWin.children[i]=null;
					                    }
					    
					            		thisWin.add(afterSubmitView);
					            		
					          			var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tktsnap'+randomInt+'.png');
					          			
								  		f.write(image);
								  
								  		
							    
							     		///net.sendticket(globals.getCurrentUserID(),f.read(),function(e){
							     	
							     	 		///Ti.API.info('Callback RESPONSE:  '+ e.result); 
							     	 		///var result = e.result;
							     	 		////if(result == true){
							     	 			
							     	 			net.sendemail('There is no message for you only ticketsnap.',globals.getCurrentUserID(),f.read());	
				                     			tf.value = '';
							     	 	//	}
							     	   ///});
							     	   
							     	   
						
				                       thisWin.remove(toolbar);	
									   break;
						      		//This will never be reached, if you specified cancel for index 1
						      		case 1: //alert('Clicked button 1 (NO)');
						      			break;
						      		default:
						      			break;
			  					}
							});
							
							conform.show();
							// conform box ended	
						}
						else{
			
							for(var i=0; i<thisWin.getChildren().length;i++){
			    	    		thisWin.remove(thisWin.children[i]);
			    	    		thisWin.children[i]=null;
			                };
			                         
			              	thisWin.add(afterSubmitView);
			              
			          		var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tktsnap'+randomInt+'.png');
						  	f.write(image);
					 
					 		// var read_file = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tktsnap'+randomInt+'.png');
							// var blob = read_file.read();
							// var readText = blob.text;
		
					  		//alert('READ FROM FILESYSTEM: ' + blob + ' ' + readText + ' ' + read_file);
					  		
					     ///	net.sendticket(globals.getCurrentUserID(),blob,function(e){
					     	//	Ti.API.info('Callback RESPONSE:  '+ e.result); 
					     	 //	var result = e.result;
					     	 	///if(result == true){
					     	 		net.sendemail(message,globals.getCurrentUserID(),f.read());	
		                     		tf.value = '';
					     	 	//}
					     	///});
					     
					       thisWin.remove(toolbar);	
						} // if condition
					} 
					else{
						alert('please login before you send');
					} // if login
				}); 
 				   		
       		},

        	cancel:function(){  
 	
        		for(var i=0; i<thisWin.getChildren().length;i++){
	    			thisWin.remove(thisWin.children[i]);
	    			thisWin.children[i]=null;
	    		}
	    		
             	thisWin.close();	
        	 },
			 
			 error:function(error) {
			 	var a = Ti.UI.createAlertDialog({title:L('camera_error')});
			 	if (error.code == Ti.Media.NO_CAMERA) {
			 		a.setMessage(L('camera_error_details'));
			 	}
			 	else {
				 	a.setMessage('Unexpected error: ' + error.code);
			 	}
			 	a.show();
			 },	
        	 
        	 saveToPhotoGallery:true,
       		 allowEditing:true,
        	 mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]	
        });
    }
}; // capture_func ends

//#############################################################// 
function newTicketWin (){

	// function ticket_fnc (image,imgname){
	//#############################################################// 
	
	var _win = require('/ui/handheld/ApplicationWindow');
	thisWin = new _win();
	thisWin.zIndex=10;
	 	 
	//#############################################################// 
	// this below code starts working after pressing camera 
	afterPressView = Ti.UI.createView({
		backgroundImage:'images/otis_redding.png',
		layout: 'vertical',
		bottom:40,
	});	
	
    imgView = Titanium.UI.createImageView({
	     //image:image,
		 top:10,
		 width:300,
		 borderWidth:10,
		 borderColor:'black',
		 height:300,
	});
	
	afterPressView.add(imgView); 	
	 	
	submit = Ti.UI.createButton({
		backgroundColor:'black',
		left:20,
		style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,	
		//image:'images/btn-back@2x.png',
		color:'#6d0a0c',
		bottom:5,
		opacity:1,
		title: 'Submit',
	});
	 	
	var reTake = Ti.UI.createButton({
		backgroundColor:'black',
		right:20,
		//image:'images/btn-back@2x.png',
		style:Titanium.UI.iPhone.SystemButtonStyle.DONE,		
		color:'#6d0a0c',
		bottom: 5,
		opacity:1,
		title: 'Retake'
	});
	
	var flexSpace = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});

 	tf = Titanium.UI.createTextArea({
		height:32,
		backgroundImage:'images/inputfield.png',
		width:200,
		font:{fontSize:13},
		borderRadius:15,
		color:'#777',
		paddingLeft:10,
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED,	
		//keyboardToolbar:toolbar,
	});
		
    toolbar = Titanium.UI.iOS.createToolbar({
		items:[flexSpace,submit,flexSpace,tf,flexSpace,reTake,flexSpace],
		bottom:5,
		borderTop:false,
		borderBottom:false,
		translucent : true,
		barColor :'#000',
		zIndex:10,
		//barColor:'#336699'
	});

	tf.addEventListener('focus',function(){
		toolbar.bottom =210;
	});

	tf.addEventListener('blur',function(){
		toolbar.bottom = 0 ;
	});

	//#############################################################// 
	// this code work after submit ticket
  
	afterSubmitView = Ti.UI.createView({
   		backgroundImage:'images/otis_redding.png',
		layout: 'vertical'	
	});	   
       
    var logo  = Ti.UI.createImageView({
		image:'/images/TICKETSNAP_bar_tr.png',
		backgroundColor: 'transparent',
		width:200,
		height: 100,
		top:10
	});
		
	afterSubmitView.add(logo);
		
  	var thanks  = Titanium.UI.createLabel({
		text:'   Thank you',
		font: {fontSize: 28, fontWeight: 'bold'},
		//left:50,
		top: 10,
		height:25,
		width: 210
	}); 		
		
	afterSubmitView.add(thanks);
  
  	var forsbt  =  Titanium.UI.createLabel({
		text:'for submitting your ticket.\n\n The next available attorney will review your information. You will be contacted for more info if needed. Check on the status of your ticket by clicking the My Tickets tab below\n',
	 	font: {fontSize: 16, fontWeight: 'normal'},
		//left:50,
	  	//backgroundImage:'images/chat.png',
	  	top:25,
	  	height:'auto',
	  	width: 250
	});   

	afterSubmitView.add(forsbt);

 	/* var sendmsg = Ti.UI.createButton({
			backgroundColor:'black',
			left:20,
			style:Titanium.UI.iPhone.SystemButtonStyle.BORDERED,	
			//image:'images/btn-back@2x.png',
			color:'#6d0a0c',
			bottom:5,
			opacity:1,
			title: 'Message',
	});*/
	 	
	var closeWin = Ti.UI.createButton({
		backgroundColor:'black',
		left:120,
		//image:'images/btn-back@2x.png',
		//style:Titanium.UI.iPhone.SystemButtonStyle.ROUNDED,		
		color:'#6d0a0c',
		bottom: 5,
		opacity:1,
		title: 'Done'
	});
		
	afterSubmitView.add(closeWin);
	//#############################################################// 
	// after submit ticket code ends here 
	
	//#############################################################// 
	//*
	// here is camera function called
       
    capture_func(); 
  
	//#############################################################// 
	// i have same problem with retake when i click it and take pic again and submit it stores 2 images

	reTake.addEventListener('click',function(){
		// camera function is here
		///randomInt ='';

		for(var i=0; i<thisWin.getChildren().length;i++){
	    	thisWin.remove(thisWin.children[i]);
	    	thisWin.children[i]=null;
	    }
    
    	thisWin.close();
    	capture_func();
    });
   
  	//#############################################################// 	
			
	// Handle close_modal event
	closeWin.addEventListener('click', function() {
	
		for(var i=0; i<thisWin.getChildren().length;i++){
	    	thisWin.remove(thisWin.children[i]);
	    	thisWin.children[i]=null;
	    }
	    
        thisWin.close();
    });
	//#############################################################// 	
    return thisWin;
};
	 
module.exports  = newTicketWin;






