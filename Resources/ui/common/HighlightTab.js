exports.setHighlightTab = function(_params) {
	
	/*
	 * Define the used Variables
	 */
	var icon = _params.icon
	var tabgroup = _params.tabgroup;
	
	/*
	 * Create the Tab-View
	 */
	var view = Ti.UI.createView({
		bottom : 0,
		width : 107,//Ti.Platform.displayCaps.platformWidth*.3,
		height : 60,
		backgroundImage : 'images/camTabBG2.png',
		backgroundColor: 'transparent',//#34d200',
	});
	
	/*
	 * Create the Image-View of the used View
	 */
	var image = Ti.UI.createImageView({
		image : icon,
		//width : 26,
		//height : 26
	});
	
	/*
	 * Add the Child-View to the Tab-View
	 */
	view.add(image);
	
	/*
	 * Add the Tab-View to the TabGroup
	 */
	tabgroup.add(view);

	/*
	 * React to the Click-Event of the new added View
	 */
	//Ti.App.fireEvent('GLOBALEVENT',{func: 'openCamScreen'});
	view.addEventListener("click", function() {
		
		// 
		// Filterable Camera module example of default user interface
		// 
		//var Camera = require('ui/common/FilterCamera');
		//var win = new Camera();
		//Ti.include('ui/common/FilterCamera.js');
		//alert('Middle Tab Clicked');
		
		Ti.App.fireEvent('GLOBALEVENT',{func: 'openCamScreen'});

	});
	
 
	
}