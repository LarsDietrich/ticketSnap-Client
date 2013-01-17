//////<<<<<<<---- need to set the right url

var globals    = require('/lib/AppProperties');
function alerts (){

var  _alertsWin   = require('/ui/handheld/ApplicationWindow');
 this.alertsWin    = new _alertsWin();
 this.alertsWin.title  = 'alerts';	

var view2 = Ti.UI.createView({
	 backgroundImage:'images/otis_redding.png',	
});

var tblRecipes = Titanium.UI.createTableView({
     height: 366,
     width: 320,
     top: 0,
     left: 0,
    // data:data,
    // rowHeight: 70,
   });
 
   //Terminating in response to SpringBoard's termination.
 
  
  /////alert(globals.getCurrentUserID());
  //this.alertsWin.addEventListener('focus',function(){

  AlertPopulate(globals.getCurrentUserID(),tblRecipes);  /// populate alerts win 
///  	
 /// });
 
  
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
   
  
 });  
  

 


view2.add(tblRecipes);  
this.alertsWin.add(view2);

this.getWin = function(){
	 	return this.alertsWin;
	 }


this.refreshAlert = function(uid){
	
	AlertPopulate(uid,tblRecipes);
	
};





	//#############################################################// 

function AlertPopulate(uid,_tbl){
	
	 var data = []; //empty data array
	
	_tbl.setData = data;
	
	
	if(uid == null){
		
	//tblRecipes.data = [
    ///{title:'please log in first'},];	
	alert('please log in to view alerts');	
		
	}else{
		
		
	
   //declare the http client object
   
   
   alert('populatting alert view :'+uid);
   
    var net = require('/lib/network'); 
   
     net.repliesAlerts (uid,'reply', function(_data){
  			/// here populate fiun
			
		//	if (_data.length === 0){
	    			    	
	         //   return;
	      //  }
	            //loop each item in the xml
	            
   for (var i = 0; i < 15; i++) {//create a table row
   	alert('loop works');
   	
    ////s b++;	
var row = Titanium.UI.createTableViewRow({
   /// hasChild: true,
    className: 'recipe-row',
   /// id:_data[i].reply_id,
});

//title label
var titleLabel = Titanium.UI.createLabel({
  text:_data[i].date_time ,
  font: {fontSize: 14, fontWeight: 'bold'},
  left: 70,
  top: 5,
  height: 20,
  width: 280,
});

row.add(titleLabel);

//description label
var descriptionLabel = Titanium.UI.createLabel({
  text:'you have new message from Attorny ',
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
  var viewMessage = Ti.UI.createButton({
			backgroundColor:'black',
			left:20,	
			color:'#6d0a0c',
		    bottom:5,
			opacity:1,
			///id:_data[i].message_id,
			title: 'View Message', });
	row.add(viewMessage);
  
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
			
 
  data.push(row);

};//finally, set the data property of the tableView to our


_tbl.setData = data;
  
   
///tblRecipes.data = data;

			viewMessage.addEventListener('click',function(){
  var detailWin = new _alertsWin();
      detailWin.title = 'Action Alert';
  
  var dView = Ti.UI.createView({
	  backgroundImage:'images/otis_redding.png',
               });
	        
	    detailWin.add(dView);
 	  alertsWin.containingTab.open(detailWin);
 });  



	     //data[] object
   /////  tblRecipes.data = data;
//};

 
  });// net.tickets
 		
		
	}
	

} // populate function is here

  	//#############################################################//       
        
   ///// return alertsWin;
};

module.exports  = alerts;