
 var globalVars = Ti.App.Properties;
 
 
 function table  (param)  {
 var loggedIn;
 var leftdata = [

	{title:'My Tickets', hasChild:true,id:'myticket',backgroundImage:'images/btn-settings.png',
	color:'#fff',},
	{title:'New Tickets', hasChild:true,id:'new',backgroundImage:'images/btn-settings.png',
	color:'#fff',},
	{title:'Settings', hasChild:true,id:'settings',backgroundImage:'images/btn-settings.png',
	color:'#fff',},
	
	
];



Ti.UI.createTableViewRow({
	backgroundImage:'images/btn-settings.png',
	color:'#fff',
	
});
	
	var tableView	= Ti.UI.createTableView({
		 data:leftdata,
		 //rowHeight:70,
		 backgroundColor:'transparent',
		 backgroundImage:'images/grain.png',
		  });
	
	tableView.addEventListener('click', function(e)
{
	if (e.rowData.id)
	{
	var id =	e.rowData.id;
	var newTicketWin = require('ui/common/newTicketsWin');
    var mytickets = require('ui/common/myTicketsWin');
	Ti.App.fireEvent('capture');
	switch(id){
		
	case 'new':
	loggedIn = globalVars.getBool('loggedIn');
	//alert(loggedIn);
	if(loggedIn == true){
	var newTicket = new newTicketWin();
	    Ti.App.fireEvent('closeMenu');
	//newTicket.open();
	}else{
	Ti.App.fireEvent('loginFirst');	
	//loginFirst
	};
	
	break;	
	
	
	case 'myticket':
    new mytickets();
	Ti.App.fireEvent('closeMenu');
	//newTicket.open();
	
	break;	
	
	
	case 'settings':
	var settingsWin = require('ui/common/settingsWin');
	 new settingsWin();
	//newTicket.open();
	
	break;	
		
		
	} // switch ends
	
	}
});
	return tableView;
};

module.exports = table;