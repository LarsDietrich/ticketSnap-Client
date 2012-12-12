exports.getAppNavGroup = function(win){
	
	var nav = Titanium.UI.iPhone.createNavigationGroup({
   		window: win,
   		left: 0,
   		width: Ti.Platform.displayCaps.platformWidth
	});
	
	return nav;
};
