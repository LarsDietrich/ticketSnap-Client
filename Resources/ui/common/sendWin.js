var globalVars = Ti.App.Properties;

function send (_image,_msg,imgname){

var sendWin = Titanium.UI.createWindow({
    backgroundColor: 'white',
    title: 'Send Mail',
    left: 0,
	zIndex:1,
	barImage:'images/btn-settings.png',
});

var view = Ti.UI.createScrollView({
	 backgroundImage:'images/bg@2x.png',
	 width: Ti.Platform.displayCaps.platformWidth,
	 height:(Ti.Platform.displayCaps.platformHeight-40),
     scrollType:'horizontal'
});

var bottomView = Ti.UI.createView({
	 backgroundImage:'images/btn-settings.png',
	 width: Ti.Platform.displayCaps.platformWidth,
	 height:40,
	 bottom:0,
	
});

var navBtn = Ti.UI.createButton({
	title: 'c',
	left: 10,
	width:10,
	//height: 30,
	image:'images/btn-back@2x.png',
	color:'#6d0a0c',
	top: 10,
	//opacity:0,
});
 
    sendWin.setLeftNavButton(navBtn);
    navBtn.addEventListener('click',function(){
	sendWin.close();
	
    });
	  
// this sets the background color of the master UIView (when there are no windows/tab groups on it)
   //Titanium.UI.setBackgroundColor('#000');
   //this variable will hold our image data blob from the device's gallery
   
var selectedImage = null;
     
var imageThumbnail = Titanium.UI.createImageView({
    width: Ti.Platform.displayCaps.platformWidth,
    height:200,
    left:0,
    image:_image,
    //top:15,
    top:20,
    backgroundColor: '#000',
    borderSize: 10,
    borderColor: '#fff'
   });
   
view.add(imageThumbnail);


var buttonSelectImage = Titanium.UI.createButton({
    // width:  100,
    height:  35,
     //top: 220,
     left: 10,
     borderRadius:5,
     backgroundColor:'black',
     title: 'Choose'
    });
  
 /* buttonSelectImage.addEventListener('click',function(e){
     //obtain an image from the gallery
     Titanium.Media.openPhotoGallery({
      success:function(event)
       {
         selectedImage = event.media;
         
         // set image view
         Ti.API.debug('Our type was: '+event.mediaType);
         if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO)
         {
           imageThumbnail.image = selectedImage;
         }
       },
           cancel:function()
           {
               //user cancelled the action from within
               //the photo gallery
           }
}); });
*/
   //bottomView.add(buttonSelectImage);
   
 var txtTitle = Titanium.UI.createTextField({
       width: 250,
       height: 35,
       left:0,
       bottom:180,
       value: 'Message title...',
       borderStyle: 2,
       backgroundColor: '#fff'
   });
   view.add(txtTitle);
   
var txtMessage = Titanium.UI.createTextArea({
    width:Ti.Platform.displayCaps.platformWidth,
    height:120,
    left:0,bottom:55,
    value: 'Message text...',
    font: {fontSize: 15},
    borderStyle: 2,
    backgroundColor: '#fff'
});
view.add(txtMessage);


var buttonEmail = Titanium.UI.createButton({
    //width:100,
     height:  35,
    top:5,
    //bottom:0,
     borderRadius:5,
     backgroundColor:'black',
    left:'45%',
    title: 'Send',
    //enabled:false,
});
buttonEmail.addEventListener('click', function(e){
	var sub  = txtTitle.value;
	var desc = txtMessage.value;
	if(sub!='' && desc !=''){
	 var net = require('lib/network');
	 var sender_id = globalVars.getDouble('userid');
	  net.sendemail(sub,desc,'hbm_b@yahoo.com',sender_id,imgname);
  
} 
});

var msgView = require('ui/common/msgView');
    new msgView (sendWin,_msg);



bottomView.add(buttonEmail);
	   
	sendWin.add(view);
	sendWin.add(bottomView); 
    sendWin.open({modal:true});
    //return win;



	
};
module.exports  = send;

