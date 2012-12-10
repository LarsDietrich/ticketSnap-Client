var controller = require('/model/controller');

(function() {
	Ti.API.info('Welcome to My Tickets for ' + Ti.Platform.osname);
	controller.startApp();
	// var Window = require('ui/handheld/ApplicationWindow');
	// var myticketsWin = new Window();
	//myticketsWin.open({modal:true});
	//Ti.API.info('dataDirectroy path'+ Ti.Filesystem.getApplicationDirectory());
})();