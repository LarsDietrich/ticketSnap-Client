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
	
	afterPressView.add(imgView); 	
	 	
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
    afterPressView.add(toolbar);



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


	 	// Create a button to close the modal window
var close_modal = Titanium.UI.createButton({title:'Close'});
      //thisWin.leftNavButton = close_modal;


// here goes the entire code to take pic

	 	camBtn.addEventListener('click',function(){
	 		
	 	 if(Ti.Media.isCameraSupported){
		 Ti.Media.showCamera({
	    	 success:function(event){
				var image = event.media;
				imgView.image =image;
				
				// save for future
				// // function is called here
				
			
		for(var i=0; i<thisWin.getChildren().length;i++){
	    	thisWin.remove(thisWin.children[i]);
	    	thisWin.children[i]=null;
	    }
	    
	     thisWin.add(afterPressView);
		
				 
submit.addEventListener('click',function(){
					
		for(var i=0; i<thisWin.getChildren().length;i++){
	    	thisWin.remove(thisWin.children[i]);
	    	thisWin.children[i]=null;
	    }
	    
	     thisWin.add(afterSubmitView);
		             
                   thisWin.leftNavButton = close_modal;
        
         var randomInt = randNum();	
				
		 var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tktsnap'+randomInt+'.png');
				f.write(image);
				
		 var net = require('lib/network');
		 var result = net.sendticket(_sender_id,f.read());
			    
 					
// 				
				}); 
// 		        		
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
				
		for(var i=0; i<thisWin.getChildren().length;i++){
	    	thisWin.remove(thisWin.children[i]);
	    	thisWin.children[i]=null;
	    }
	    
	     thisWin.add(afterPressView);
		
				 
submit.addEventListener('click',function(){
				
					for(var i=0; i<thisWin.getChildren().length;i++){
	    	             thisWin.remove(thisWin.children[i]);
	    	           thisWin.children[i]=null;
	                         }
	    
	                  thisWin.add(afterSubmitView);
	                  
	                 thisWin.leftNavButton = close_modal;
						
				   var randomInt = randNum();	
				
			var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tktsnap'+randomInt+'.png');
				f.write(image);
				
		        var net = require('lib/network');
			    var result = net.sendticket(_sender_id,f.read());
			    
 					
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
	 	
	




reTake.addEventListener('click',function(){


for(var i=0; i<thisWin.getChildren().length;i++){
	    	thisWin.remove(thisWin.children[i]);
	    	thisWin.children[i]=null;
	    }
	    
	     thisWin.add(thisView);

	
   });

	 	
// Handle close_modal event
close_modal.addEventListener('click', function() {
	
	for(var i=0; i<thisWin.getChildren().length;i++){
	    	thisWin.remove(thisWin.children[i]);
	    	thisWin.children[i]=null;
	    }
	    
	     thisWin.add(thisView);
	
                thisWin.close();

});

	 	
	 	cancelBtn.addEventListener('click',function(){
	 		
	 		thisWin.close();
	 		thisWin = null;
	 	});
		
	 	
	 	thisWin.add(thisView); //first view
	 	
		
         return thisWin;
        };
	 	
	 	
	 	

module.exports  = newTicketWin;