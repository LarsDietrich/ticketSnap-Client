function settings (settingsWin,view){

settingsWin.title ='Settings'

var view2 = Ti.UI.createView({
	 backgroundImage:'images/light_toast_@2X.png',
	 width: Ti.Platform.displayCaps.platformWidth,
	 height:Ti.Platform.displayCaps.platformHeight,
	
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

     
		
		 var registerButton = Ti.UI.createButton({
			title:'Register',
			//color:'white',
			top:90,
			height:Ti.UI.SIZE,
			 color:'#494a4a',
			width:200,
			//image:'images/btn-settings.png',
			//enabled:false,
			});	

 registerButton.addEventListener('click',function(){
	   	
	var registerWin = require('ui/common/registerWin');
	new registerWin();
	});	
 
        var Edit_UserName_Button = Ti.UI.createButton({
			title:'Edit Username',
			//color:'white',
			 color:'#494a4a',
			top:140,
			height:Ti.UI.SIZE,
			width:200,
			//image:'images/btn-settings.png',
			});
		
		 var Edit_pwd_Button = Ti.UI.createButton({
			title:'Edit Password',
			//color:'white',
			 color:'#494a4a',
			top:190,
			height:Ti.UI.SIZE,
			width:200,
			//image:'images/btn-settings.png',
			//enabled:false,
			});
				
      var closebutton = Ti.UI.createButton({
      	title:'Close Me',
      	width:200,
      	height:Ti.UI.SIZE,
	    color:'#494a4a',
	    top:240 });
			
	
	view2.add(registerButton);
		view2.add(Edit_UserName_Button);
		view2.add(Edit_pwd_Button);
		
		
	closebutton.addEventListener('click',function()
	{
		settingsWin.animate({view:view,transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
		settingsWin.title ='My Tickets'
	});
	view2.add(closebutton);
	
		
		// send ends here
		// image tacking code ends here
		
/*
    settingsWin.setLeftNavButton(navBtn);
    navBtn.addEventListener('click',function(){
	settingsWin.close();
	settingsWin=null;
	
    });
    */
    settingsWin.animate({view:view2, transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	    settingsWin.add(view2); 
        //settingsWin.open({modal:true});
    //return win;
	
	
};

module.exports  = settings;