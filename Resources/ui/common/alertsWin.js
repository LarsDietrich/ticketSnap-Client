function alerts (){

var  _alertsWin   = require('/ui/handheld/ApplicationWindow');
var  alertsWin    = new _alertsWin();
     alertsWin.title  = 'alerts';	

var view2 = Ti.UI.createView({
	 backgroundImage:'images/otis_redding.png',	
});

<<<<<<< HEAD
=======
// populate 
//<<<<<<< HEAD
// populate 
//=======
//>>>>>>> made app login dynamic and added dynamic status view for each ticket
>>>>>>> d7369f0f284b321fd5a61274e126a96f81743a80
var data = []; //empty data array
   //declare the http client object
  
 var tblRecipes = Titanium.UI.createTableView({
     height: 366,
     width: 320,
     top: 0,
     left: 0,
    // rowHeight: 70,
   });
<<<<<<< HEAD
=======

   
//<<<<<<< HEAD
   ///settingsWin.containingTab.open();
//======
   ///alertsWin.containingTab.open();
//>>>>>>> made app login dynamic and added dynamic status view for each ticket

>>>>>>> d7369f0f284b321fd5a61274e126a96f81743a80
   
   //Terminating in response to SpringBoard's termination.
  view2.add(tblRecipes);
  
     //loop each item in the xml
     for (var i = 0; i < 5; i++) {//create a table row
     	
var row = Titanium.UI.createTableViewRow({
   // hasChild: true,
    className: 'recipe-row'
});

//title label
var titleLabel = Titanium.UI.createLabel({
  text:'2012/22    Ticket No.1  (On Hold)' ,
  font: {fontSize: 14, fontWeight: 'bold'},
  left: 70,
  top: 5,
  height: 20,
  width: 280,
});

row.add(titleLabel);

//description label
var descriptionLabel = Titanium.UI.createLabel({
  text:'Join the very first European Titanium Mobile Development Conference, that is entirely community-organized. Weve got a city - the beautiful Valencia in Spain, and a venue - the amazing Astoria Palace hotel, right in the heart of this historic quarter.',
  font: {fontSize: 10, fontWeight: 'normal'},
  left:20,
  top: 25,
  height:20,
  width: 280,
  //bottom:30,
});

if(descriptionLabel.text == '') {
  descriptionLabel.text = 'No description is available.';
}
  row.add(descriptionLabel);
  
var takePic = Ti.UI.createButton({
			backgroundColor:'black',
			left:20,	
			color:'#6d0a0c',
		    bottom:5,
			opacity:1,
			title: 'Take Pic', });
			
			
   row.add(takePic);
   
 takePic.addEventListener('click',function(){
 	
 	
 Ti.App.fireEvent('GLOBALEVENT',{func: 'openCamScreen'});
 	
 });  
  
  var CallAtrn = Ti.UI.createButton({
  	
			backgroundColor:'black',
			right:20,
			color:'#6d0a0c',
			bottom:5,
			opacity:1,
			title: 'Call Atty', });
			
	 row.add(CallAtrn);
	    
	    takePic.hide();
	    CallAtrn.hide();
			
  //add our little icon to the left of the row
 /* var iconImage = Titanium.UI.createImageView({
    image: 'images/screenCam.png',
    width: 50,
    height: 50,
    left: 10,
    top: 10 });
  row.add(iconImage);*/
  
  //add the table row to our data[] object
  data.push(row);
}//finally, set the data property of the tableView to our
     //data[] object
     tblRecipes.data = data;
//};


 var isViewed = false;  
 tblRecipes.addEventListener('click',function(e){
 	
 	if(!isViewed){
   //_data = e.rowData;
   isViewed = true;
   e.row.children[1].font    = {fontSize: 16, fontWeight: 'normal'};
   e.row.children[1].height  = 'auto';
   e.row.children[1].bottom  = 60;
   e.row.children[2].show();
   e.row.children[3].show();
  }else{
  	
   isViewed = false;
   e.row.children[1].font     = {fontSize: 10, fontWeight: 'normal'};
   e.row.children[1].height   = 20;
   e.row.children[1].bottom   = 0;
   e.row.children[2].hide();
   e.row.children[3].hide();
  	
  	
  }
   
  // alert(e.row.children[1].height); 
  // e.Height = 200;
   
//<<<<<<< HEAD
  //  var detailWin = new _settingsWin();
//=======
    var detailWin = new _alertsWin();
//>>>>>>> made app login dynamic and added dynamic status view for each ticket
        detailWin.title = 'Action Alert';
	    
	    var dView = Ti.UI.createView({
	                backgroundImage:'images/otis_redding.png',
	                	
               });
	        
	    detailWin.add(dView);
	        
	        
	//title label
	
var     titleLabel = Titanium.UI.createLabel({
		  text:'2012/22 Ticket No.1(On Hold)' ,
		  font: {fontSize: 14, fontWeight: 'bold'},
		  left: 70,
		  top: 5,
		  height: 20,
		  width: 210
		  });

      dView.add(titleLabel);
      
<<<<<<< HEAD
<<<<<<< HEAD
settingsWin.containingTab.open(detailWin);  	*/
=======
//<<<<<<< HEAD
//settingsWin.containingTab.open(detailWin);  	*/
//=======
//alertsWin.containingTab.open(detailWin);  //	*/
//>>>>>>> made app login dynamic and added dynamic status view for each ticket
>>>>>>> d7369f0f284b321fd5a61274e126a96f81743a80

alertsWin.containingTab.open(detailWin);  	

 });  
 













alertsWin.add(view2);
/*		
var registerButton = Ti.UI.createButton({
	title:'Register',
	//color:'white',
	top:90,
	height:Ti.UI.SIZE,
	 color:'#494a4a',
	width:200,
	//image:'images/btn-alerts.png',
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
			//image:'images/btn-alerts.png',
			});
		
		 var Edit_pwd_Button = Ti.UI.createButton({
			title:'Edit Password',
			//color:'white',
			 color:'#494a4a',
			top:190,
			height:Ti.UI.SIZE,
			width:200,
			//image:'images/btn-alerts.png',
			//enabled:false,
			});
				
      // var closebutton = Ti.UI.createButton({
      	// title:'Close Me',
      	// width:200,
      	// height:Ti.UI.SIZE,
	    // color:'#494a4a',
	    // top:240 });
			
	
	view2.add(registerButton);
		view2.add(Edit_UserName_Button);
		view2.add(Edit_pwd_Button);
		*/
		
	// closebutton.addEventListener('click',function()
	// {
		// alertsWin.animate({view:view,transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
		// alertsWin.title ='My Tickets'
	// });
	// view2.add(closebutton);
	
		
		// send ends here
		// image tacking code ends here
		
/*
    alertsWin.setLeftNavButton(navBtn);
    navBtn.addEventListener('click',function(){
	alertsWin.close();
	alertsWin=null;
	
    });
    */
    // alertsWin.animate({view:view2, transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	    // alertsWin.add(view2); 
        //alertsWin.open({modal:true});
        
        
    return alertsWin;
};

module.exports  = alerts;