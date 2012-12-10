function myticket (){
	
var myticketWin = Titanium.UI.createWindow({
    backgroundColor: 'white',
    title: 'Settings',
    barColor: '#05e177',
    color:'#494a4a',
    left: 0,
	zIndex:1,
	//barImage:'images/btn-settings.png',
});

var view = Ti.UI.createScrollView({
	scrollType:'horizontal',
	 backgroundImage:'images/light_toast_@2X.png',
	 width: Ti.Platform.displayCaps.platformWidth,
	 height:Ti.Platform.displayCaps.platformHeight
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


  
    myticketWin.setLeftNavButton(navBtn);
    navBtn.addEventListener('click',function(){
	myticketWin.close();
	
    });
	    myticketWin.add(view); 
        myticketWin.open({modal:true});
    //return win;
	};


    module.exports = myticket;


