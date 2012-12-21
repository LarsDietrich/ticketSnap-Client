var globals = require('/lib/AppProperties');
var loggedIn = globals.isLoggedIn();
var _sender_id = globals.getCurrentUserID();

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
	
		
	var  random =Math.floor(Math.random()*24);
	var   randomnumber=Math.floor(Math.random()*100);
	Ti.API.info("random: " +data[random]+randomnumber);
	
	return data[random]+ randomnumber;
	
};// random ends


function newTicketWin (){

	// function ticket_fnc (image,imgname){
	
		var _win = require('/ui/handheld/ApplicationWindow');
		var thisWin = new _win();
		    thisWin.zIndex=10;
	
		var thisView = Ti.UI.createView({
			 backgroundImage:'images/otis_redding.png',
			 layout: 'vertical'	
		});
		
		var lbl = Ti.UI.createLabel({
			text: 'Tap To take a picture of your ticket!',
			color: 'black',
			textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
			top: 10
		});
		thisView.add(lbl);
		
		var camBtn = Ti.UI.createImageView({
			image: '/images/screenCam.png',
			backgroundColor: 'transparent',
			width: globals.screenWidth*.7,
			height: globals.screenHeight*.5,
			top: 20
		});
		
		
		
		thisView.add(camBtn);
		
		var cancelBtn = Ti.UI.createButton({
			backgroundColor:'black',
			left: 10,
			image:'images/btn-back@2x.png',
			color:'#6d0a0c',
			top: 10,
			opacity:1,
			title: 'Cancel'
		});
	 	
	 	
	 	thisView.add(cancelBtn);
	 	thisWin.add(thisView);
	 	
	 	// Create a button to close the modal window
var close_modal = Titanium.UI.createButton({title:'Close'});
thisWin.leftNavButton = close_modal;

// Handle close_modal event
close_modal.addEventListener('click', function() {
    thisWin.close();
});
	 	
	 	
	 	// this below code starts working after pressing camera 
	 var afterPressView = Ti.UI.createView({
			 backgroundImage:'images/otis_redding.png',
			 layout: 'vertical'	
		});	
	
	 var imgView = Titanium.UI.createImageView({
	     //image:image,
		 top:10,
		 width:300,
		 borderWidth:10,
		 borderColor:'black',
		 height:360,
		});
	//afterPressView.add(imgView); 	
	 	
	   var submit = Ti.UI.createButton({
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

		
var toolbar = Titanium.UI.iOS.createToolbar({
	items:[submit,flexSpace,reTake],
	bottom:10,
	borderTop:false,
	borderBottom:false,
	translucent : true,
	barColor :'#000',
	//barColor:'#336699'
});
//afterPressView.add(toolbar);



// this code work after submit ticket
       
   var afterSubmitView = Ti.UI.createView({
			 backgroundImage:'images/otis_redding.png',
			 layout: 'vertical'	
		});	   
       
   var logo  = Ti.UI.createImageView({
			image: '/images/screenCam.png',
			backgroundColor: 'transparent',
			width:100,
			height: 100,
			top:10
		});
		//afterSubmitView.add(logo);
  var thanks  = Titanium.UI.createLabel({
				  text:'   Thank you',
				  font: {fontSize: 28, fontWeight: 'bold'},
				  //left:50,
				  top: 10,
				  height:25,
				  width: 210
				}); 		
		//afterSubmitView.add(thanks);
  var forsbt  =  Titanium.UI.createLabel({
				  text:'      for submitting your ticket.\n\n The next available attorney will review your information. You will be contacted for more info if needed. Check on the status of your ticket by clicking the My Tickets tab below ',
				  font: {fontSize: 16, fontWeight: 'normal'},
				  //left:50,
				  //backgroundImage:'images/chat.png',
				  top:25,
				  height:'auto',
				  width: 250
				});   
afterSubmitView.add(forsbt);
// after submit ticket code ends here 

reTake.addEventListener('click',function(){

 //thisWin.add(afterPressView); 	
 
thisView.remove(imgView);
thisView.remove(toolbar);


thisView.add(lbl);
thisView.add(camBtn);
thisView.add(cancelBtn);				
	//camBtn.click = true;
	
});




// here goes the entire code to take pic
	 	camBtn.addEventListener('click',function(){
	 		
	 	 if(Ti.Media.isCameraSupported){
		 Ti.Media.showCamera({
	    	 success:function(event){
				var image = event.media;
				imgView.image =image;
				// save for future
				// // function is called here
				// ticket_fnc(image,'ticket'+randomInt+'.png');
		    	//ticketimage.image =
		    
				 thisView.remove(lbl);
                 thisView.remove(camBtn);
                 thisView.remove(cancelBtn);
				
				 thisView.add(imgView);
                 thisView.add(toolbar);
                 
				 
submit.addEventListener('click',function(){
				
					 thisView.remove(imgView);
                     thisView.remove(toolbar);
                     
			        thisView.add(logo);
			         thisView.add(thanks);
			         thisView.add(forsbt);
					
				   var randomInt = randNum();	
				   var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tktsnap'+randomInt+'.png');
				       f.write(image);
						// // this is for sending in remote db;
			//	Titanium.App.addEventListener('sendpic',function(){
// 							
			var imagefile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tktsnap'+randomInt+'.png');
			   // Titanium.Filesystem.getFile('appdata://sign.jpg');
		        imagefile.write(imgView.toBlob());
		        var ticketpic = imagefile.read();
		        var net = require('lib/network');
			    var result = net.sendticket(_sender_id,ticketpic);
			    
// 								
// 				
				}); 
// 		        		
		   				
					//	});	
			        //db.addPhoto(_bounty.id,f.nativePath);
			         //sendButton.enabled = true;
			},
	         cancel:function(){},
	         error:function(){
	         var a = Ti.UI.createAlertDialogue({title:'camera Error'});
	          if(error.code==Ti.Media.NO_CAMERA){
	          a.setMessage('camera_error_details');
	          }else{	 	
	          a.setMessage('Unexpected Error :'+error.code);
	        	 } 
	        	 a.show();
	         },
// 	        
	         saveToPhotoGallery:true,
	         allowEditing:true,
	         mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
// 	        			
	     });
	 } 
	 else{
		 Ti.Media.openPhotoGallery({
// 		
			 success:function(event){
// 		
				 var image = event.media;
				imgView.image=image;
				// var randomInt = randNum();	
				 
				// ticket_fnc(image,'ticket'+randomInt+'.png');
// 	        			
	        	// // save 
	           	// var ticketimage = Titanium.UI.createImageView({
					// image:image,
					// top:15,
					// width:300,
					// height:400,
				 //});
//       	     
				
			 thisView.remove(lbl);
                 thisView.remove(camBtn);
                 thisView.remove(cancelBtn);
				
				 thisView.add(imgView);
                 thisView.add(toolbar);
                 
				 
submit.addEventListener('click',function(){
				
					 thisView.remove(imgView);
                     thisView.remove(toolbar);
                     
			        thisView.add(logo);
			         thisView.add(thanks);
			         thisView.add(forsbt);
					
				   var randomInt = randNum();	
				   var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tktsnap'+randomInt+'.png');
				       f.write(image);
						// // this is for sending in remote db;
			//	Titanium.App.addEventListener('sendpic',function(){
// 							
			var imagefile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tktsnap'+randomInt+'.png');
			   // Titanium.Filesystem.getFile('appdata://sign.jpg');
		        imagefile.write(imgView.toBlob());
		        var ticketpic = imagefile.read();
		        var net = require('lib/network');
			    var result = net.sendticket(_sender_id,ticketpic);
			    
// 								
// 				
				}); 
// 		        		
		   				
		        		
		   		// 		    		//db.addPhoto(_bounty.id,f.nativePath);
       },
        
        	 cancel:function() {},
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
	 
	 		
	 		
	 		
	 		
	 		
	 		
	 	});
	 	// take pic ends here
	 	
	 	cancelBtn.addEventListener('click',function(){
	 		
	 		thisWin.close();
	 		thisWin =null;
	 	});
		// // pic taking code starts here        
	    // //modal window code 
	    // newTicketWin.orientationModes = [
			// Titanium.UI.PORTRAIT,
			// Titanium.UI.LANDSCAPE_LEFT,
			// Titanium.UI.LANDSCAPE_RIGHT
		// ];
// 		
		// newTicketWin.addEventListener('focus', function()
		// {
			// Ti.API.info('FOCUSED EVENT RECEIVED');
		// });
// 	
		// var t = Titanium.UI.create2DMatrix();
		// t = t.scale(0);
// 	
		// var w = Titanium.UI.createWindow({
			// backgroundColor:'blue',
			// borderWidth:1,
			// borderColor:'#999',
			// height:350,
			// width:300,
			// borderRadius:10,
			// opacity:0.92,
			// transform:t
		// });
// 		
		// var closeButton = Ti.UI.createImageView({
			// image: '/images/icon-close-window.png',
			// top: -1,
			// left: -1,
			// backgroundColor: 'transparent',
			// zIndex: 10,
		// });
// 		
		// w.add(closeButton);
// 	
		// // create first transform to go beyond normal size
		// var t1 = Titanium.UI.create2DMatrix();
		// t1 = t1.scale(1.1);
		// var a = Titanium.UI.createAnimation();
		// a.transform = t1;
		// a.duration = 200;
// 	
		// // when this animation completes, scale to normal size
// 		
		// a.addEventListener('complete', function()
		// {
			// Titanium.API.info('here in complete');
			// var t2 = Titanium.UI.create2DMatrix();
			// t2 = t2.scale(1.0);
			// w.animate({transform:t2, duration:200});
// 	
		// });
// 		
		 // closeButton.addEventListener('click', function(e){
	    	// // to close modal win
	        // var t3 = Titanium.UI.create2DMatrix();
			// t3 = t3.scale(0);
			// w.close({transform:t3,duration:300});
	    	// w=null;
	    	// //callback();
	    // });
// 	    
// 	
		// var imgView = Ti.UI.createImageView({
	        // image:(image)?image:'/images/burglar.png', 
	        // height:250,
	        // width:200,
	        // top:20
	    // });
// 	    
	    // w.add(imgView);
// 	
// 	    
	   // var sendButton = Ti.UI.createButton({
				// title:'Send',
				// //color:'white',
				// color:'#494a4a',
				// top:300,
				// height:Ti.UI.SIZE,
				// width:200,
		// });
// 	    
	    // w.add(sendButton);
// 	      
		// sendButton.addEventListener('click', function()
		// {
		    // Titanium.App.fireEvent('sendpic');
// 		    	
		   	// var sendWin = require('ui/common/sendWin');	
			// new sendWin(image,'Ticket successfully sent',imgname);
// 		    	
			// var t3 = Titanium.UI.create2DMatrix();
			// t3 = t3.scale(0);
			// w.close({transform:t3,duration:300});	
		// });
// 	
		// w.open(a);
// 	        
	    // // modal win code ends
// 	    	
			// //view.add(sendButton);
			// // send ends here
			// // image tacking code ends here
// 			
// 	
	    // newTicketWin.setLeftNavButton(navBtn);
	    // navBtn.addEventListener('click',function(){
		// newTicketWin.close();
// 		
	    // });
		    // newTicketWin.add(view); 
	        // //newTicketWin.open({modal:true});
	// }; // ticket_func ends here
// 		
		 // // Ti.App.addEventListener('capture',function(){
            // // var db = require('lib/db');     
	// if(Ti.Media.isCameraSupported){
		// Ti.Media.showCamera({
	    	// success:function(event){
				// var image = event.media;
				// //imgView.image =image;
				// // save for future
				// // function is called here
				// var randomInt = randNum();	
				// ticket_fnc(image,'ticket'+randomInt+'.png');
		    	// var ticketimage = Titanium.UI.createImageView({
					// image:image,
					// width:200,
					// height:200
				// });
// 		        		
		        // var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'ticket'+randomInt+'.png');
				// f.write(image);
						// // this is for sending in remote db;
				// //	Titanium.App.addEventListener('sendpic',function(){
// 							
				// var imagefile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'ticket'+randomInt+'.png');
							// //Titanium.Filesystem.getFile('appdata://sign.jpg');
		        // imagefile.write(ticketimage.toBlob());
		        // var ticketpic = imagefile.read();
		        // var net = require('lib/network');
				// var result = net.sendticket(_sender_id,ticketpic);
// 								
// 							
// 							
						// //});	
								// //db.addPhoto(_bounty.id,f.nativePath);
								// //sendButton.enabled = true;
			// },
	        // cancel:function(){},
	        // error:function(){
	        	// var a = Ti.UI.createAlertDialogue({title:'camera Error'});
	        	// if(error.code==Ti.Media.NO_CAMERA){
	        		// a.setMessage('camera_error_details');
	        	// }else{	 	
	        		// a.setMessage('Unexpected Error :'+error.code);
	        	// } 
	        	// a.show();
	        // },
// 	        
	        // saveToPhotoGallery:true,
	        // allowEditing:true,
	        // mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
// 	        			
	    // });
	// } 
	// else{
		// Ti.Media.openPhotoGallery({
// 		
			// success:function(event){
// 		
				// var image = event.media;
				// //imgView.image=image;
				// var randomInt = randNum();	
				// ticket_fnc(image,'ticket'+randomInt+'.png');
// 	        			
	        	// // save 
	           	// var ticketimage = Titanium.UI.createImageView({
					// image:image,
					// width:200,
					// height:200
				// });
//       	
				// var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'ticket'+randomInt+'.png');
				// f.write(image);
// 			
				// // this is for sending in remote db;
// 						
				// //Titanium.App.addEventListener('sendpic',function(){
// 					
				// var imagefile = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'ticket'+randomInt+'.png');
				// //Titanium.Filesystem.getFile('appdata://sign.jpg');
	            // imagefile.write(ticketimage.toBlob());
	 	        // var ticketpic = imagefile.read();
//                       
				// var net = require('lib/network');
				// var result = net.sendticket(_sender_id,ticketpic);
// 						
        		// //db.addPhoto(_bounty.id,f.nativePath);
        	// },
//         
        	// cancel:function() {},
			// error:function(error) {
				// var a = Ti.UI.createAlertDialog({title:L('camera_error')});
				// if (error.code == Ti.Media.NO_CAMERA) {
					// a.setMessage(L('camera_error_details'));
				// }
				// else {
					// a.setMessage('Unexpected error: ' + error.code);
				// }
				// a.show();
			// },	
        	// //saveToPhotoGallery:true,
       		// allowEditing:true,
        	// mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]	
        // });
    // }
        //});		
    //return win;
    return thisWin;
};

module.exports  = newTicketWin;