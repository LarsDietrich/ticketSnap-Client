
var net = require('/lib/network'); //////<<<<<<<---- need to set the right url

var coverFlowView = Titanium.UI.iOS.createCoverFlowView({
           //backgroundColor:'blue',
           backgroundColor:'transparent',
           height:300,
           top:65,
           images:[],
        
		});

function myticketView (user_id){

    this.view2 = Ti.UI.createView({
	backgroundImage:'transparent',
	// color:'red',	
});

<<<<<<< HEAD
/*
var sbmit = Titanium.UI.createImageView({
  image:'images/sbt.png', 
  font: {fontSize: 16, fontWeight: 'bold',color:'#494a4a',},
  //left:10,
  top:7,
  height: 25,
  width:'95%',
  borderWidth: 2,
  borderColor:'black',
  
});

view2.add(sbmit);*/

     var coverFlowView = Titanium.UI.iOS.createCoverFlowView({
           //backgroundColor:'#000',
           backgroundColor:'transparent',
           height:325,
           top:20,
           images:[],
        
		});
  
 // this is the function to get tickets
 //#############################################################// 
 
    net.mytickets(user_id,'tickets',function(_data){
    	if (_data.length === 0){
            return;
        }
        
        var images = [];
        for (var c = 0; c < _data.length; c++){
        	// Ti.API.info ('image:'+_data[c].image+'\nsender_id:'+_data[c].sender_id+'\nstatus:'+_data[c].status);
          images[c] = {image:_data[c].image,width:230, height:325,id:_data[c].sender_id,imgname:_data[c].imgname,status:_data[c].status};// width:225, height:275
        }
        
        coverFlowView.images = images;
    });
  //#############################################################// 
  
=======
var sbmitView = Ti.UI.createView({
	top:0,
	height: 65,
	backgroundColor: 'transparent'
});

var sbmitBG = Ti.UI.createView({
	backgroundImage: '/images/processBarBG.png',
	height: 50,
	width: 300,
	backgroundLeftCap: 10,
	backgroundTopCap: 10,
	zIndex: 1
});

var sbmitFillView = Ti.UI.createView({
	left: 4,
	backgroundColor: '#3dd11e',
	width: 100,
	top: 4,
	bottom: 4,
	//height: '98%',
	zIndex: 2
})

var sbmitLabel = Ti.UI.createLabel({
	text: 'SUBMITTED > IN PROCESS > RESOLUTION',
	font: {fontSize: 14},
	
	textAlign: Ti.UI.TEXT_ALIGNMENT_CENTER,
	wordWrap: false,
	zIndex: 3
});



// var sbmit = Titanium.UI.createImageView({
  // image:'images/sbt.png', 
  // font: {fontSize: 16, fontWeight: 'bold',color:'#494a4a',},
  // //left:10,
  // top:7,
  // height: 25,
  // width:'95%',
  // borderWidth: 2,
  // borderColor:'black'
// });
sbmitBG.add(sbmitFillView);
sbmitBG.add(sbmitLabel);
sbmitView.add(sbmitBG);
this.view2.add(sbmitView);

 populateCF(user_id);
>>>>>>> made app login dynamic and added dynamic status view for each ticket
  // change image if submitted or in process
 /*  coverFlowView .addEventListener('change',function(e) {
   
   	var state = coverFlowView.images[e.index].status;
   		//alert(state);
   	 (state == 1)?sbmitFillView.width=200 :sbmitFillView.width=100;
   	
   }); //change image if submitted or in process ends 
<<<<<<< HEAD
   */
   //#############################################################// 
=======
   
  
>>>>>>> made app login dynamic and added dynamic status view for each ticket
   
    // click listener - when image is clicked
    coverFlowView .addEventListener('click',function(e) {
     
var imgWindow = Ti.UI.createWindow({ 
    modal: true,
    title:'Ticket Detail',
    barColor: '#050505',
    color:'#494a4a',
    backgroundColor: '#050505' 
});

//#############################################################// 

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

//#############################################################// 

// this call get the msgs and replies related to it.
var imgname = coverFlowView.images[e.index].imgname; 
net.msgs (imgname,user_id,'msg',function(array_resp){
	
	
            if(array_resp.length > 0) {
 
                var answers = [];
                for(var i = 0; i < array_resp.length; i++) {
                    //top += 120;
                    var type = array_resp[i].type;
                    
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
//#############################################################// 
			
			// Create a button to close the modal window
			var close_modal = Titanium.UI.createButton({title:'Close'});
			imgWindow.rightNavButton = close_modal;
			
			// Handle close_modal event
			close_modal.addEventListener('click', function() {
			    imgWindow.close();
			});
			// Add the views to the window and open it
			
			
			scrollView.add(detailView);
			imgWindow.add(scrollView);
			imgWindow.open();
			
			});

			// get tickets end here
			 this.view2.add(coverFlowView);
			//return this.view2;
	
};

// this is the function to get tickets
 function populateCF(uid){
    var images = [];
    //coverFlowView.selected=0;
    coverFlowView.images = images;
    
    if(uid==null)
    {
    	images = [{image:'/images/cross-out-hi.png',width:225, height:275}];
    	coverFlowView.images = images;
    	coverFlowView.selected = images.length-1;
    	coverFlowView.selected=0;
    }
    else
    {
    	
	    net.mytickets(uid,'tickets',function(_data){
	    	if (_data.length === 0){
	            return;
	        }
	        
	        for (var c = 0; c < _data.length; c++){
	        	// Ti.API.info ('image:'+_data[c].image+'\nsender_id:'+_data[c].sender_id+'\nstatus:'+_data[c].status);
	          images[c] = {image:_data[c].image,width:225, height:275,id:_data[c].sender_id,imgname:_data[c].imgname,status:_data[c].status};// width:225, height:275
	        }
	        coverFlowView.images = images;
	        //coverFlowView.selected = images.length-1;
	        coverFlowView.selected = 0;
	    });
	 }   
 }
  
  myticketView.prototype.getView = function(){
  	return this.view2;
  }
  
myticketView.prototype.refreshCF = function(_user_id){
	populateCF(_user_id);
};

module.exports = myticketView;

