
var net = require('/lib/network'); //////<<<<<<<---- need to set the right url

function myticketView (user_id){

var view2 = Ti.UI.createView({
	
	 backgroundImage:'images/otis_redding.png',
	// color:'red',	
});
/*
var titleLabel = Titanium.UI.createLabel({
  text:'   Open Tickets (swipe to see more)',
  font: {fontSize: 16, fontWeight: 'bold',color:'#494a4a',},
  left:15,
  top:0,
  height: 25,
  width:'90%',
  //borderBottom:'2',
  //borderWidth: 2,
  //borderColor: 'black',
  
});
view2.add(titleLabel);

var tktNo = Titanium.UI.createLabel({
  text:'Tickets No.1     HC120239',
  font: {fontSize: 16, fontWeight: 'bold',color:'#494a4a',},
  left:50,
  top:27,
  height: 25,
  width:'100%',
  //borderWidth: 2,
  
});

view2.add(tktNo);
*/
var sbmit = Titanium.UI.createLabel({
  text:'  Submitted > In-proccess > Resolution',
  font: {fontSize: 16, fontWeight: 'bold',color:'#494a4a',},
  left:10,
  top:10,
  height: 25,
  width:'95%',
  borderWidth: 2,
  borderColor:'black',
  
});

view2.add(sbmit);
/*
var await = Titanium.UI.createLabel({
  text:'Submitted:Awating attorny review',
  font: {fontSize: 16, fontWeight: 'bold',color:'#494a4a',},
  left:25,
  top:76,
  height: 25,
  width:'100%',
  
  
});

view2.add(await);
*/
     var coverFlowView = Titanium.UI.iOS.createCoverFlowView({
           backgroundColor:'#000',
           backgroundImage:'images/1.png',
           height:325,
           top:40,
           images:[],
        
		});
   view2.add(coverFlowView);
 // this is the function to get tickets
 
    net.mytickets(user_id,'tickets',function(_data){
    	if (_data.length === 0){
            return;
        }
        
        var images = [];
        for (var c = 0; c < _data.length; c++){
        	// Ti.API.info ('image:'+_data[c].image+'\nsender_id:'+_data[c].sender_id+'\nstatus:'+_data[c].status);
          images[c] = {image:_data[c].image,width:225, height:240,id:_data[c].sender_id,imgname:_data[c].imgname,status:_data[c].status};// width:225, height:275
        }
        
        coverFlowView.images = images;
    });
  
    // click listener - when image is clicked
    coverFlowView .addEventListener('click',function(e) {
    // the window to place the image in
   //  Titanium.API.info("image clicked: "+e.index+', selected is '+coverFlowView.selected); 
     
var imgWindow = Ti.UI.createWindow({ 
    modal: true,
    title:'SMS VIEW',
    barColor: '#050505',
    color:'#494a4a',
    backgroundColor: '#050505' 
});

var scrollView = Ti.UI.createScrollView({
	contentWidth:320,
	contentHeight:'auto',
	top:0,
	showVerticalScrollIndicator:true,
	//showHorizontalScrollIndicator:true,
    layout: 'vertical',

});  
 
//alert('id:'+coverFlowView.images[e.index].id+'status :'+coverFlowView.images[e.index].status+'imagename :'+coverFlowView.images[e.index].imgname); 

 
var imgView = Titanium.UI.createImageView({
    top :1,
    image  :coverFlowView.images[e.index].image,
    zIndex :10,
    right  :10,
    height:230
}); 
scrollView.add(imgView);

var detailView = Titanium.UI.createView({
    backgroundColor:'white',
    top:imgView.bottom,
    width:320,
    height:'auto',

});


// this call get the msgs and replies related to it.
var imgname = coverFlowView.images[e.index].imgname; 
net.msgs (imgname,user_id,'msg',function(array_resp){
	
	 //var top = 0;
           //  var top = 0;
            if(array_resp.length > 0) {
 
                var answers = [];
                for(var i = 0; i < array_resp.length; i++) {
                    //top += 120;
                    var type = array_resp[i].type;
                    
                  //answers = [{title :(type=='msg')?array_resp[i].Message:array_resp[i].reply,
                         //    backgroundImage:'images/chat.png',
                    // title:semofertas}];
                    
                    //create a table row
				var row = Titanium.UI.createTableViewRow({
					backgroundImage:(type=='msg')?'images/chat.png':'images/GrayBalloonRight.png',
					height:'auto',
				  //hasChild: true,
				  className: 'recipe-row'
				});
				
				//title label
				var titleLabel = Titanium.UI.createLabel({
				  text:(type == 'msg') ? 'Client Message':'Lawyer Reply',
				  font: {fontSize: 14, fontWeight: 'bold'},
				  left: 70,
				  top: 5,
				  height: 20,
				  width: 210
				});
				row.add(titleLabel);
				
				//description label
				var descriptionLabel = Titanium.UI.createLabel({
				  text:(type=='msg')?array_resp[i].Message+'\n\n':array_resp[i].Reply+'\n\n'+array_resp[i].date_time+'\n\n',
				  font: {fontSize: 12, fontWeight: 'normal'},
				  left: 25,
				  //backgroundImage:'images/chat.png',
				  top: 25,
				  height:'auto',
				  width: 250
				});
				
				if(descriptionLabel.text == '') {
				  descriptionLabel.text = 'No description is available.';
				}
				  row.add(descriptionLabel);
				  //add our little icon to the left of the row
				/*  var iconImage = Titanium.UI.createImageView({
				    image: 'images/foodicon.jpg',
				    width: 50,
				    height: 50,
				    left: 10,
				top: 10 });
				  row.add(iconImage);*/
				  //add the table row to our data[] object
				  
				  answers.push(row);
				       
                }
                
                var viewanswer = Titanium.UI.createTableView({
                            data:answers,
                            top:5,
                            });
                            detailView.add(viewanswer); 
                
                
            }  else {
            	
                var semofertas = Titanium.UI.createLabel({
                    color : '#000',
                    text : 'There is no message for this',
                    top : 140,
                    left : '30 px',
                    width : '420 px',
                    height : '100 px',
                    visible : 'true',
                    backgroundColor : 'white',
                    font : FontNormal,
                });
                
                detailView.add(semofertas);
            }
   
	
	
});


// Create a button to close the modal window
var close_modal = Titanium.UI.createButton({title:'Close'});
imgWindow.rightNavButton = close_modal;

// Handle close_modal event
close_modal.addEventListener('click', function() {
    imgWindow.close();
});
// Add the views to the window and open it


//detailView.add(lbl);
scrollView.add(detailView);
//scrollView.add(detailView);

imgWindow.add(scrollView);
imgWindow.open();

});

// get tickets end here

	return view2
	
};
module.exports = myticketView;

