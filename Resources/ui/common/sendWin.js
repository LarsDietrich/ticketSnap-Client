var globals = require('lib/AppProperties');
var loggedIn = globals.isLoggedIn();
var user_id = globals.getCurrentUserID();

var net = require('lib/network');

function send (_imgname){

alert(_imgname);

var sendWin = Titanium.UI.createWindow({
    backgroundColor: 'white',
    title: 'Send Mail',
    left: 0,
	zIndex:1,
	barImage:'images/btn-settings.png',
});

var view = Ti.UI.createScrollView({
	backgroundImage:'images/otis_redding.png',
	//backgroundColor:'black',
	 width: Ti.Platform.displayCaps.platformWidth,
	 height:(Ti.Platform.displayCaps.platformHeight-40),
     scrollType:'horizontal',
     layout:'vertical',
     contentHeight : 'auto',
     scrolshowVerticalScrollIndicator:true,
     bottom:40,
      scrollsToTop:true,
    
});
   //view.scrollTo(0, 200);
   
  //#############################################################//  
   //here i start to populate the Scroll view by  msgs sent earlier
    var answers = [];
    
  
    var top = 60;               
    net.msgs (_imgname,user_id,'All',function(array_resp){
	
            if(array_resp.length > 0) {
 
             
                for(var i = 0; i < array_resp.length; i++) {
                   
                    var type = array_resp[i].type;
        
				//description label
			
				
			var     descriptionLabel = Titanium.UI.createLabel({
				    text:(type == 'msg')?'\n\n'+array_resp[i].Message+'\n\n'+array_resp[i].date_time :array_resp[i].Reply+'\n\n'+array_resp[i].date_time+'\n\n',
				    font: {fontSize: 12, fontWeight: 'normal'},
				    //textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
				    left:(type == 'msg')?65:5,
				    
				    backgroundImage:(type == 'msg')?'images/chat.png':'images/GrayBalloonRight.png',
				    top: top,
				    height:Ti.UI.SIZE,
				    width: 250
				});
				
				
				if(descriptionLabel.text == '') {
				  descriptionLabel.text = 'No description is available.';
				}
				   top = top + descriptionLabel.height + 40; 
				   view.add(descriptionLabel);
				    
                }
                
               // view.contentHeight = top + 70;
            }
            
           
	
});

//#############################################################// 

var flexSpace = Titanium.UI.createButton({
	systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
});



var camera = Titanium.UI.createButton({
	backgroundImage:'images/camera.png',
	height:33,
	width:33
});

camera.addEventListener('click', function()
{
	Titanium.UI.createAlertDialog({title:'Toolbar',message:'You clicked camera!'}).show();
});

var send = Titanium.UI.createButton({
	backgroundImage:'/images/send.png',
	backgroundSelectedImage:'images/send_selected.png',
	width:67,
	height:32
});

/*
send.addEventListener('click', function()
{
	Titanium.UI.createAlertDialog({title:'Toolbar',message:'You clicked send!'}).show();
});*/
//var toolbar;


var tf = Titanium.UI.createTextArea({
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


  var  toolbar = Titanium.UI.iOS.createToolbar({
	
    items:[flexSpace,camera,flexSpace,tf,flexSpace, send,flexSpace],
    bottom:5,
    
    //zIndex:,
    borderTop:true,
    borderBottom:true,
    
});


//#############################################################// 

//tf.addEventListener("focus", function() { view.scrollTo(0, 210);});

send.addEventListener("click",  function() {
	
	 if(tf.value != ''){
	
  // net.sendemail(tf.value,'hbm_b@yahoo.com',user_id,_imgname);
   // alert(_imgname);	 	
  
					
				
				//description label
				
				var Label = Titanium.UI.createLabel({
				  text:'\n\n'+tf.value+'\n\n',
				  font: {fontSize: 12, fontWeight: 'normal'},
				  right:5,
				  backgroundImage:'images/chat.png',
				  top:top,
				  height:Ti.UI.SIZE,
				  width: 250
				});
				
				
				
				 
				view.add(Label);
				top = top + Label.height + 40;
	 }
	 });

//#############################################################// 


var close_modal = Titanium.UI.createButton({title:'Close'});
			sendWin.rightNavButton = close_modal;
			
			// Handle close_modal event
			close_modal.addEventListener('click', function() {
			    sendWin.close();
			});
			
			// Add the views to the window and open it
//#############################################################// 	



sendWin.add(view);
sendWin.add(toolbar);

sendWin.open({modal:true});
 	
};
module.exports  = send;

