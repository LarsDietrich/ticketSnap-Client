function myticketView (user_id){
	
	var data = []; //empty data array
	//declare the http client object
	var xhr = Titanium.Network.createHTTPClient();
   
	var tblRecipes = Titanium.UI.createTableView({
    	top: 0,
		left: 0,
     	rowHeight: 70
   	});
   
   	var thisView = Ti.UI.createView({
   		backgroundColor: 'transparent'
   	});
   	
   	//win.add(tblRecipes);
   	
   	//this method will process the remote data
   	xhr.onload = function() {
   	var json = this.responseText;
    Ti.API.info('RAW RESPONSE: '+json); 
    var response = JSON.parse(json)
     ///var xml = this.responseXML;
     //get the item nodelist from our response xml object
     //var items = xml.documentElement.getElementsByTagName("item");
     //loop each item in the xml
     for (var i = 0; i < response.length; i++) {//create a table row
	var row = Titanium.UI.createTableViewRow({
  hasChild: true,
  className: 'recipe-row'
});
//title label
var titleLabel = Titanium.UI.createLabel({
  text:response.sub,
  //items.item(i).getElementsByTagName("title").item(0).text,
  font: {fontSize: 14, fontWeight: 'bold'},
  left: 70,
  top: 5,
  height: 20,
  width: 210
});
row.add(titleLabel);
//description label
var descriptionLabel = Titanium.UI.createLabel({
    text:response.desc,
  //items.item(i).getElementsByTagName("description").item(0).text,
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
    image: 'images/Camera-Icon.jpg',
    width: 50,
    height: 50,
    left: 10,
    top: 10 });
  row.add(iconImage);
  //add the table row to our data[] object
  data.push(row);
} //finally, set the data property of the tableView to our
     //data[] object
     tblRecipes.data = data;
};

   //open up the recipes xml feed
   xhr.open('GET', 'http://www.limonscene.com/mt_insert_ticket.php');
   param = {user_id:user_id}
   //finally, execute the call to the remote feed
   xhr.send(param);	
	
	
	
};
module.exports = myticketView;

