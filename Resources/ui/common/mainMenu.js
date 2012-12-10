
var globals = require('/lib/AppProperties');
var loggedIn = globals.isLoggedIn();


function mainMenu (win,view)  {
 
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
		color:'#fff'	
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
			var id = e.rowData.id;
			// fire global event here for controller
			//
		    var mytickets = require('ui/common/myTicketsWin');
		    Ti.App.fireEvent('closeMenu');
			    //Ti.App.fireEvent('capture');
			
			switch(id){
		    	
		    	case 'new':
		    		// GLOBALEVENT listener is in controller.js
		    		Ti.App.fireEvent('GLOBALEVENT', {func: 'newTicket'});
					break;	
				case 'myticket':
    				new mytickets();
					Ti.App.fireEvent('closeMenu');
					break;	
				case 'settings':
					Ti.App.fireEvent('GLOBALEVENT',{func: 'settings'});
					//newTicket.open();
					break;	
		
		
	} // switch ends
	
	}
});
	return tableView;
};

module.exports = mainMenu;