function settings (){

var _settingsWin = require('/ui/handheld/ApplicationWindow');
var settingsWin = new _settingsWin();
settingsWin.title='Settings';	

var view2 = Ti.UI.createView({
	 backgroundImage:'images/otis_redding.png',	
});

// populate 


var data = []; //empty data array
   //declare the http client object
  
 var tblRecipes = Titanium.UI.createTableView({
     height: 366,
     width: 320,
     top: 0,
     left: 0,
     rowHeight: 70,
   });

   
   ///settingsWin.containingTab.open();
   
 tblRecipes.addEventListener('click',function(e){
 	
   //_data = e.rowData; 
    
    var detailWin = new _settingsWin();
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
      
settingsWin.containingTab.open(detailWin);  	

 });  
 
   
   //Terminating in response to SpringBoard's termination.
  view2.add(tblRecipes);
  
     //loop each item in the xml
     for (var i = 0; i < 5; i++) {//create a table row
     	
var row = Titanium.UI.createTableViewRow({
    hasChild: true,
    className: 'recipe-row'
});

//title label
var titleLabel = Titanium.UI.createLabel({
  text:'2012/22 Ticket No.1(On Hold)' ,
  font: {fontSize: 14, fontWeight: 'bold'},
  left: 70,
  top: 5,
  height: 20,
  width: 210
});

row.add(titleLabel);

//description label
var descriptionLabel = Titanium.UI.createLabel({
  text:'Join the very first European Titanium Mobile Development Conference, that is entirely community-organized. Weve got a city - the beautiful Valencia in Spain, and a venue - the amazing Astoria Palace hotel, right in the heart of this historic quarter.',
  font: {fontSize: 10, fontWeight: 'normal'},
  left: 70,
  top: 25,
  height: 40,
  width: 200
});

if(descriptionLabel.text == '') {
  descriptionLabel.text = 'No description is available.';
}
  row.add(descriptionLabel);
  
  //add our little icon to the left of the row
  var iconImage = Titanium.UI.createImageView({
    image: 'images/screenCam.png',
    width: 50,
    height: 50,
    left: 10,
    top: 10 });
  row.add(iconImage);
  
  //add the table row to our data[] object
  data.push(row);
}//finally, set the data property of the tableView to our
     //data[] object
     tblRecipes.data = data;
//};


settingsWin.add(view2);
/*		
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
		// settingsWin.animate({view:view,transition:Ti.UI.iPhone.AnimationStyle.CURL_UP});
		// settingsWin.title ='My Tickets'
	// });
	// view2.add(closebutton);
	
		
		// send ends here
		// image tacking code ends here
		
/*
    settingsWin.setLeftNavButton(navBtn);
    navBtn.addEventListener('click',function(){
	settingsWin.close();
	settingsWin=null;
	
    });
    */
    // settingsWin.animate({view:view2, transition:Ti.UI.iPhone.AnimationStyle.CURL_DOWN});
	    // settingsWin.add(view2); 
        //settingsWin.open({modal:true});
        
        
    return settingsWin;
};

module.exports  = settings;