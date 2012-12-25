var globals = require('/lib/AppProperties');
var _thisWin = require('/ui/handheld/ApplicationWindow');


function loginWin(callback){

	callback = callback || {};
	
	var thisWin = new _thisWin();

	thisWin.zIndex=0;
	thisWin.top=1;
	thisWin.left=45;
	thisWin.width=275;
	
	return thisWin;

};

module.exports = loginWin;


