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
	
		
	var  random =Math.floor(Math.random()*24);
	var   randomnumber=Math.floor(Math.random()*100);
	Ti.API.info("random: " +data[random]+randomnumber);
	
	return data[random]+ randomnumber;
	
};// random ends

//#############################################################// 
function capture_func(/*Identifier*/){
  
  var randomInt = randNum(); // this will generate random name for tickets	
  
        
	
		 if(Ti.Media.isCameraSupported){
		 Ti.Media.showCamera({
	    	 success:function(event){
				var image = event.media;
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
	
	var conform = Titanium.UI.createAlertDialog({ title: 'send mail',
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
			
			  net.sendticket(globals.getCurrentUserID(),f.read(),function(){
			  	
			  	alert('fooooooooooooooo1');
			  	
			  });
			    	
			   	net.sendemail('No Message','hbm_b@yahoo.com',globals.getCurrentUserID(),'tktsnap'+randomInt+'.png');	
                tf.value = '';
                   
			       
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

 //dbpop.populatetbl_riderpro();	
	
}else{
	
for(var i=0; i<thisWin.getChildren().length;i++){
	    	    thisWin.remove(thisWin.children[i]);
	    	    thisWin.children[i]=null;
	                         }
	    
	              thisWin.add(afterSubmitView);
	              
	          var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tktsnap'+randomInt+'.png');
				  f.write(image);
				  
				// var net = require('lib/network');
			  //var result = net.sendticket(globals.getCurrentUserID(),f.read());
			
			    //var result =
			
			  net.sendticket(globals.getCurrentUserID(),f.read(),function(){
			  	
			  	alert('fooooooooooooooo1');
			  	
			  });
			    	
			   	net.sendemail(message,'hbm_b@yahoo.com',globals.getCurrentUserID(),'tktsnap'+randomInt+'.png');	
                tf.value = '';
                   
               thisWin.remove(toolbar);	
	
} // if condition

	
 } else{

         alert('please login before you send');

} // if login condition ends  
	
// 				
// 				
				}); 
// 		        			
			        //db.addPhoto(_bounty.id,f.nativePath);
			         //sendButton.enabled = true;
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
 			 success:function(event){
//
			var image = event.media;
				imgView.image = image;			
             	thisWin.add(afterPressView);
                thisWin.add(toolbar);
	//Titanium.UI.currentTab.open(thisWin,{animated:true});
	thisWin.open({modal:true});
	//alert(Titanium.UI.currentTab);
				 
submit.addEventListener('click',function(){
	if(globals.isLoggedIn()){
		
	var message = tf.value;
	if( message ==''){
	
	var conform = Titanium.UI.createAlertDialog({ title: 'send mail',
   	  message:'Are you sure sending no msg',
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
			// here i am having a problem the blow call back function does not work .
			//if it works i have to use net.sendmail function in it so that firstly tickets will be added in db and then the message 
			//var result =
			
			  net.sendticket(globals.getCurrentUserID(),f.read());
			    	
			   	net.sendemail('No Message','hbm_b@yahoo.com',globals.getCurrentUserID(),'tktsnap'+randomInt+'.png');	
                tf.value = '';
                   
			   
			       // if(result){
			    	//   alert(result);
			  
			     //  }
			     
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
 //dbpop.populatetbl_riderpro();	
	
}else{
	
for(var i=0; i<thisWin.getChildren().length;i++){
	    	    thisWin.remove(thisWin.children[i]);
	    	    thisWin.children[i]=null;
	                         }
	                         
	              thisWin.add(afterSubmitView);
	          var f = Ti.Filesystem.getFile(Ti.Filesystem.applicationDataDirectory,'tktsnap'+randomInt+'.png');
				  f.write(image);
				  
				// var net = require('lib/network');
				
			    //var result =
			     net.sendticket(globals.getCurrentUserID(),f.read());
			     net.sendemail(message,'hbm_b@yahoo.com',globals.getCurrentUserID(),'tktsnap'+randomInt+'.png');	
                 tf.value = '';
			   	
			   /////////});
			     
			  // if(result){
			   	//	alert(result);
			    	
                	
			         //   }
			    
                  thisWin.remove(toolbar);	
	
} // if condition

	
} else{

alert('please login before you send');

} // if login
				
// 				
				}); 
// 		        		
		   				
		        		
		   		// 		    		//db.addPhoto(_bounty.id,f.nativePath);
       },
        
        	 cancel:function() {
//         	 	
        for(var i=0; i<thisWin.getChildren().length;i++){
	    	thisWin.remove(thisWin.children[i]);
	    	thisWin.children[i]=null;
	    }
// 	    
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

      	
	
	
};

// capture_func ends

//#############################################################// 
function newTicketWin (){

	// function ticket_fnc (image,imgname){
	//#############################################################// 
	
		var _win = require('/ui/handheld/ApplicationWindow');
		     thisWin = new _win();
		    thisWin.zIndex=10;
		    //thisWin.modal = true;
		    
	//#############################################################// 
	
	/*	var thisView = Ti.UI.createView({
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
	 	
	 */
	 	
	 
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

    //afterPressView.add(toolbar);

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
		
/*var tbar = Titanium.UI.iOS.createToolbar({
	items:[sendmsg,flexSpace,closeWin],
	bottom:0,
	borderTop:false,
	borderBottom:false,
	translucent : true,
	barColor :'#000',
	//barColor:'#336699'
});
afterSubmitView.add(tbar);
*/
//#############################################################// 


// after submit ticket code ends here 


	 	// Create a button to close the modal window
//var close_modal = Titanium.UI.createButton({title:'Close'});
     // thisWin.leftNavButton = close_modal;


	
//#############################################################// 
//*
// here is camera function called
       
       capture_func(); 
  
//#############################################################// 
// i have same problem with retake when i click it and take pic again and submit it stores 2 images

reTake.addEventListener('click',function(){
	
// camera function is here
      capture_func();

for(var i=0; i<thisWin.getChildren().length;i++){
    thisWin.remove(thisWin.children[i]);
    thisWin.children[i]=null;
    }
	    ///submit.removeEventListener('click');
	    
	   //ticketID = captureImage();

	
   });
   
  //#############################################################// 
   
// send msg here 
	// sendmsg.addEventListener('click',function(){
	  //  var _sendWin = require('ui/common/sendWin');
	    //new _sendWin('tktsnap'+randomInt+'.png');   
 	
     // });
		
	//#############################################################// 	
			
// Handle close_modal event
closeWin.addEventListener('click', function() {
	
	for(var i=0; i<thisWin.getChildren().length;i++){
	    	thisWin.remove(thisWin.children[i]);
	    	thisWin.children[i]=null;
	    }
	    
               /////////Ti.UI.currentTab.close(thisWin);//.close();
      thisWin.close();
         });
	//#############################################################// 	
         return thisWin;

        };
	 	

module.exports  = newTicketWin;






