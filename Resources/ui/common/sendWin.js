var globals = require('lib/AppProperties');
var loggedIn = globals.isLoggedIn();
var user_id = globals.getCurrentUserID();

var net = require('lib/network');

function send (_imgname){

//alert(_imgname);

var sendWin = Titanium.UI.createWindow({
    backgroundColor: 'white',
    title: 'Send Mail',
    left: 0,
	zIndex:1,
	barImage:'images/btn-settings.png',
});

var view2 = Ti.UI.createView({
	//backgroundImage:'images/black-wood-bg.png',
	height:Ti.UI.SIZE,
	// color:'red',	
});

var view = Ti.UI.createScrollView({
	backgroundImage:'images/black-wood-bg.png',
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
  // view2.scrollTo();
   
  //#############################################################//  
   //here i start to populate the Scroll view by  msgs sent earlier
    var answers = [];
    
  
    var top = 60;  
                 
   // if(user_id !=''){
    	
    net.msgs (_imgname,user_id,'All',function(array_resp){
	
            if(array_resp.length > 0) {
 
             
                for(var i = 0; i < array_resp.length; i++) {
                   
                    var type = array_resp[i].type;
        
				//description label
			
				
			var     descriptionLabel = Titanium.UI.createLabel({
				    text:(type == 'msg')?'\n\n'+array_resp[i].Message+'\n\n'+array_resp[i].date_time :array_resp[i].Reply+'\n\n'+array_resp[i].date_time+'\n\n',
				    font: {fontSize: 12, fontWeight: 'normal'},
				    backgroundImage:(type == 'msg')?'images/chat.png':'images/GrayBalloonRight.png',
				    left:(type=='msg')?60:5,
				    textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
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
                
               /// view.contentHeight = top ;
            }
            
           //alert(view.contentHeight);
           
           //sview.scrollTo(0,300);
	
});

//}else{
	
	//alert('please log in first');
	
//}

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
    bottom:0,
    visible:true,
    zIndex:10,
    
    //zIndex:,
    borderTop:true,
    borderBottom:true,
    
});


var animateTop	= Ti.UI.createAnimation({
	bottom: 250,
	//top: -250,
	curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
	duration: 500
});

//animateLeft.addEventListener('start', function(e){
//});
	
var animateBottom = Ti.UI.createAnimation({
	bottom: 5,
	//sleft: 0,
	curve: Ti.UI.iOS.ANIMATION_CURVE_EASE_OUT,
	duration: 500
})	;

tf.addEventListener('focus',function(){
	
	toolbar.bottom =210;
	
});

tf.addEventListener('blur',function(){
	
	toolbar.bottom =0 ;
	
});

//#############################################################// 

//tf.addEventListener("focus", function() { view.scrollTo(0, 210);});

send.addEventListener("click",  function() {
	
	 if(tf.value != ''){
	
   net.sendemail(tf.value,'hbm_b@yahoo.com',user_id,_imgname);
    alert(user_id);	 	
  
					
				
				//description label
				
			
				
				var Label = Titanium.UI.createLabel({
				  text:'\n\n'+tf.value+'\n\n',
				  backgroundImage:'images/chat.png',
				   textAlign:Ti.UI.TEXT_ALIGNMENT_CENTER,
				  font: {fontSize: 12, fontWeight: 'normal'},
				  right:5,
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

view2.add(view);
view2.add(toolbar);
sendWin.add(view2);
sendWin.open({modal:true});
 	
};
module.exports  = send;

