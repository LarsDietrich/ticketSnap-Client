var globals = require('lib/AppProperties');
var loggedIn = globals.isLoggedIn();
var user_id = globals.getCurrentUserID();

var net = require('lib/network');

function MessageWin (_msgId){

//alert(_imgname);

var sendWin = Titanium.UI.createWindow({
    backgroundColor: 'white',
    title: 'Send Mail',
    left: 0,
	zIndex:1,
	 titleImage: '/images/TICKETSNAP_bar_tr.png',
	 barColor: '#202020'
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
	 height:(Ti.Platform.displayCaps.platformHeight),//-40
     scrollType:'horizontal',
     layout:'vertical',
     contentHeight : 'auto',
     scrolshowVerticalScrollIndicator:true,
    /// bottom:40,
      scrollsToTop:true,
    
});
  // view2.scrollTo();
   
  //#############################################################//  
   //here i start to populate the Scroll view by  msgs sent earlier
    var answers = [];
    var top = 40;  
                 
   // if(user_id !=''){
    	
    net.msgs (_msgId,user_id,'newReply',function(array_resp){
	
            if(array_resp.length > 0) {
 
              var iconImage = Titanium.UI.createImageView({
				    image: 'http://mobile.goticketsnap.com/mytickets/'+array_resp[0].image,
				    width: 300,
				    height:Ti.UI.SIZE,
				    borderWidth:'2',
				    //left: 10,
				    top: top, });
				  view.add(iconImage);
                for(var i = 0; i < array_resp.length; i++) {
                   
                    var type = array_resp[i].type;
        
				//description label
			
				
			var     descriptionLabel = Titanium.UI.createLabel({
				    text:(type == 'msg')?'\n\n'+array_resp[i].Message+'\n\n'+array_resp[i].date_time+'\n\n' :'\n\n'+array_resp[i].Reply+'\n\n'+array_resp[i].date_time+'\n\n',
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
////view2.add(toolbar);
sendWin.add(view2);
sendWin.open({modal:true});
 	
};
module.exports  = MessageWin;

