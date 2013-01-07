var controller = require('/model/controller');
//var APP = {};
(function() {
	Ti.API.info('Welcome to My Tickets for ' + Ti.Platform.osname);
	controller.startApp();
})();