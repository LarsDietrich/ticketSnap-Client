// this is the root of the application

function ApplicationTabGroup(){
	
	var ApplicationWindow = require('/ui/handheld/ApplicationWindow');
	
	// create tab group
	var tabGroup = Titanium.UI.createTabGroup();

	//
	// create base UI tab and root window
	//
	var fugitiveWin = new ApplicationWindow({isCaptured:false});
	
	var tab1 = Titanium.UI.createTab({  
	    icon:'/ui/images/fugitives.png',
	    title:'Fugitives',
	    window:fugitiveWin
	});
	
	fugitiveWin.containingTab = tab1;
	//
	// create controls tab and root window
	//
	var capturedWin = new ApplicationWindow({isCaptured:true});
	
	var tab2 = Titanium.UI.createTab({  
	    icon:'/ui/images/captured.png',
	    title:'Captives',
	    window:capturedWin
	});
	
	capturedWin.containingTab = tab2;
		
	//
	//  add tabs
	//
	tabGroup.addTab(tab1);  
	tabGroup.addTab(tab2);
	
	//mainWindow.add(tabGroup);
	return tabGroup;
};



module.exports = ApplicationTabGroup;
