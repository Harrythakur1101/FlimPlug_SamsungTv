
//Initialize function
var init = function () {
	var focuscolor='#0cb9f2';
	var titlefocuscolor='#fff';
	var red='#FF0000';
	var black='#fff';
	var test="";
	var leftPos=0;
	var fisttime=false;
	var position=0;
	var category_list={};
   
	$("#mobiletv").text("Movies & TV");
	$("#Lifestyle").text("Lifestyle");
	$("#Food").text("Food");
	$("#Travel").text("Travel");
	$("#Sports").text("Sports");
	$("#Kids").text("Kids");
	$("#Tech").text("Tech & Sci");
	
	$("#categorytitle").text("");
	
	$('#sliderTV').hide();
	
	$(document).ready(function(){
		
		
		//$("#mobiletv").show();
		//$("#Lifestyle").show();
		//$("#Food").show();
		//$("#Travel").show();
		//$("#Sports").show();
		//$("#Kids").show();
		//$("#Tech").show();
		
		localStorage.removeItem("response");
		
		if(localStorage.getItem("index")==null || localStorage.getItem("index")==undefined || localStorage.getItem("index")==""){
			
			  position=0;
			  
		    }else{
				position=localStorage.getItem("index");
		    }
			
			
			
			if(position == 0){
				mobiletv();
			}else if(position == 1){
				lifestyle();
			}else if(position == 2){
				food();
			}else if(position == 3){
				travel();
			}else if(position == 4){			
				sports();
			}else if(position == 5){			
				kids();
			}else if(position == 6){			
				tech();
			}else{
				
			}
		

		 
		 function callCategortList(){
				var name="";
				
				var i=0;
				var category_banner='';
				
				for(i=0;i<category_list.length; i++){
					//alert("hello");
					if(i == 0){
						category_banner+='<a class="activeted" href="#" data-index=' + i + ' id=' + i + '><div class="centerd" style="top: 50%;position: absolute;text-align: center;left: 0;right: 0;line-height: 27px;margin-top: -12px;overflow: hidden;text-overflow: ellipsis;padding: 0 6px;"></div><img class="imgsec" src='+category_list[i].images[0].src+'> </a>';
					}else{
						category_banner+='<a href="#" data-index=' + i + ' id=' + i + '><div class="centerd" style="top: 50%;position: absolute;text-align: center;left: 0;right: 0;line-height: 27px;margin-top: -12px;overflow: hidden;text-overflow: ellipsis;padding: 0 6px;"></div><img class="imgsec" src='+category_list[i].images[0].src+'> </a>';
					}
					
					//category_banner+='<a focusable href="#" data-index=' + i + '><div class="centerd" style="top: 50%;position: absolute;text-align: center;left: 0;right: 0;line-height: 27px;margin-top: -12px;overflow: hidden;text-overflow: ellipsis;padding: 0 6px;"></div><img class="imgsec" src='+category_list[i].images[0].src+'> </a>'; 
					
				}
				//alert(viewmore_banner);
				test="down";
				$('#sliderTV').html(category_banner);
				$('.menu_sec ul li').removeClass('activeted');
				
				
				changeContentNameAndImage("0");
				var timer = setTimeout(function() {
	                  $('#categorytitle').text("Movies & TV");
				      $('#categorytitle').show();
					  $('#sliderTV').show();
					  $('#seanson_div').show();
					  $('#spinner').hide();
                          }, 1000);
				
				
//				 $('#content_description_on_banner').html(name);
		 }
		 
		 
		 function mobiletv(){

				var myPlanshr = new XMLHttpRequest();
				myPlanshr.onreadystatechange = function() {
					$('#spinner').show();
		            
					if (this.readyState == 4 && this.status == 200) {
						//$('#spinner').hide();
						$('#categ').show();
				    	$('#navbarcontent').show();
						$('#contentdiv').show();
						localStorage.setItem('response',this.responseText);
						myPlansresponse = JSON.parse(this.responseText);
						category_list=myPlansresponse.playlist;
						console.log(category_list.length);
						//alert("mobiletv"+category_list.length);
						callCategortList();
					}
				}
				myPlanshr.open("GET", "https://cdn.jwplayer.com/v2/playlists/2MGsOTqP", true);
				myPlanshr.send();
			}
		 
		 
		 function lifestyle(){
			

				var myPlanshr = new XMLHttpRequest();
				myPlanshr.onreadystatechange = function() {
					$('#spinner').show();
		            
					if (this.readyState == 4 && this.status == 200) {
						//$('#spinner').hide();	
						$('#categ').show();
				    	$('#navbarcontent').show();
						$('#contentdiv').show();
						localStorage.setItem('response',this.responseText);
						myPlansresponse = JSON.parse(this.responseText);
						category_list=myPlansresponse.playlist;
						console.log(category_list.length);
						callCategortList();
					}
				}
				myPlanshr.open("GET", "https://cdn.jwplayer.com/v2/playlists/JlrZivLB", true);
				myPlanshr.send();
			}
		 
		 
		 function food(){
			 
			

				var myPlanshr = new XMLHttpRequest();
				myPlanshr.onreadystatechange = function() {
					$('#spinner').show();
					
					if (this.readyState == 4 && this.status == 200) {
						//$('#spinner').hide();
						$('#categ').show();
				    	$('#navbarcontent').show();
						$('#contentdiv').show();
						localStorage.setItem('response',this.responseText);
						myPlansresponse = JSON.parse(this.responseText);						
						category_list=myPlansresponse.playlist;						
						console.log(category_list.length);
						//alert(category_url.length);
						callCategortList();
					}
				}
				myPlanshr.open("GET", "https://cdn.jwplayer.com/v2/playlists/e48mGrww", true);
				myPlanshr.send();
			}
		 
		 
		 
		 function travel(){

				var myPlanshr = new XMLHttpRequest();
				myPlanshr.onreadystatechange = function() {
					$('#spinner').show();
		            
					if (this.readyState == 4 && this.status == 200) {
						//$('#spinner').hide();
						$('#categ').show();
				    	$('#navbarcontent').show();
						$('#contentdiv').show();
						localStorage.setItem('response',this.responseText);
						myPlansresponse = JSON.parse(this.responseText);
						category_list=myPlansresponse.playlist;
						console.log(category_list.length);
						//alert(category_url.length);
						callCategortList();
					}
				}
				myPlanshr.open("GET", "https://cdn.jwplayer.com/v2/playlists/f8CHGSim", true);
				myPlanshr.send();
			}
		 
		 
		 function sports(){

				var myPlanshr = new XMLHttpRequest();
				myPlanshr.onreadystatechange = function() {
					$('#spinner').show();
		            
					if (this.readyState == 4 && this.status == 200) {
						//$('#spinner').hide();
						$('#categ').show();
				    	$('#navbarcontent').show();
						$('#contentdiv').show();
						localStorage.setItem('response',this.responseText);
						myPlansresponse = JSON.parse(this.responseText);
						category_list=myPlansresponse.playlist;
						console.log(category_list.length);
						//alert(category_url.length);
						callCategortList();
					}
				}
				myPlanshr.open("GET", "https://cdn.jwplayer.com/v2/playlists/Eig8VRz5", true);
				myPlanshr.send();
			}
		 
		 
		 function kids(){

				var myPlanshr = new XMLHttpRequest();
				myPlanshr.onreadystatechange = function() {
					$('#spinner').show();
		            
					if (this.readyState == 4 && this.status == 200) {
						//$('#spinner').hide();
						$('#categ').show();
				    	$('#navbarcontent').show();
						$('#contentdiv').show();
						localStorage.setItem('response',this.responseText);
						myPlansresponse = JSON.parse(this.responseText);
						category_list=myPlansresponse.playlist;
						console.log(category_list.length);
						//alert(category_url.length);
						callCategortList();
					}
				}
				myPlanshr.open("GET", "https://cdn.jwplayer.com/v2/playlists/qlqdccyI", true);
				myPlanshr.send();
			}
		 
		 
		 function tech(){

				var myPlanshr = new XMLHttpRequest();
				myPlanshr.onreadystatechange = function() {
					$('#spinner').show();
		            
					if (this.readyState == 4 && this.status == 200) {
						//$('#spinner').hide();
						$('#categ').show();
				    	$('#navbarcontent').show();
						$('#contentdiv').show();
						localStorage.setItem('response',this.responseText);
						myPlansresponse = JSON.parse(this.responseText);
						category_list=myPlansresponse.playlist;
						console.log(category_list.length);
						//alert(category_url.length);
						callCategortList();
					}
				}
				myPlanshr.open("GET", "https://cdn.jwplayer.com/v2/playlists/bu1PHCjq", true);
				myPlanshr.send();
			}
		 
		 
		 
		 function changeContentNameAndImage(categoryIndex){
			 
			 
			
			 
			 var title=category_list[categoryIndex]['title'];
			 
			 var desc=truncate(category_list[categoryIndex]['description']);
			
			 var duration=category_list[categoryIndex]['duration'];
			 
					
						 var body = document.getElementsByClassName('banner-home')[0];
				
				body.style.backgroundImage = 'url(' +category_list[categoryIndex]['image']+ ')';
							body.style.backgroundRepeat = 'no-repeat';
							body.style.backgroundPosition ='left top';
							body.style.backgroundAttachment = 'scroll';
							body.style.maxWidth='100%';
							body.style.backgroundSize = 'cover';
						
					
				
					 
					 
					 $('#name').html(title);
					 $('#year').html(duration);
					 $('#titlebar').show();					
                     $('#summary').html(desc);
			        
					 
				
					
				}
		 
		 
		 function convertToText(duration){
			  var durationText = '';
			     var splitTime = duration.split(':');
			     var hour = parseInt(splitTime[0]) >= 9 ? splitTime[0] : splitTime[0][1];
			     if(parseInt(hour) > 0){
			       durationText += hour+"h";
			     }
			     var minute = parseInt(splitTime[1]) >= 9 ? splitTime[1] : splitTime[1][1];
			     if(parseInt(minute) > 0){
			       durationText += minute+"m";
			     }
			    /* var second = parseInt(splitTime[2]) > 9 ? splitTime[2] : splitTime[2][1];
			     if(parseInt(second) > 0){
			       durationText += second+" Second";
			     }*/
			     return durationText;
			  }
		 
		 
		 function truncate(string){
				if (string.length > 150)
					return string.substring(0,150)+'...';
				else
					return string;
			};

		 
		 
		 // add eventListener for keydown
		    document.addEventListener('keydown', function(e) {
		    	switch(e.keyCode){
		    	case 37: //LEFT arrow	
		    	
		    		var $current = $('.scrollmenu a.activeted');
			    		var pId = $current.parent().get()[0].id;

					
			    		$("#" + pId + "> a").last();
			    		$(".scrollmenu").prepend($("#" + pId + "> a").last().get());
			    		
			    		var prevElmId=$current.prev().get()[0].id;
			    		if(prevElmId!=null){
			    			changeContentNameAndImage(prevElmId);
			    		}
			    		
			    		if ($current.prev().length > 0) {
			    			if( $current.get()[0].id == "0"){
			    				$current.removeClass('activeted');
			    				$(".left-menu").children('p').eq(0).addClass('activeted');
			    				$(".image-container-category").removeClass('temp-right');
			    			} else {
			    				$('.scrollmenu a.activeted').removeClass('activeted');
				    			$current.prev().addClass('activeted');
			    			}
			    			
			    		}
		    			
		    	
			    		break;
		    		
		    	case 38: //UP arrow
		    		
                       var $current = $('.left-menu p.activeted');
		    		
		    		if ($current.prev().length > 0) {
		    			
		    			$current.removeClass('activeted');
		    			
		    			$current.prev().addClass('activeted');
		    			
		    			
		    		}
		    	
		    		break;
		    	case 39: //RIGHT arrow
		    		//test="right";
		    		//break;
		    		
		    		//for menuitem
		    		
		    		$(".left-menu p").removeClass('activeted');
		    		$('.scrollmenu a:first-child').addClass('activeted');
		    		$(".image-container-category").addClass('temp-right');
		    	
		    		
		    			var $current = $('.scrollmenu a.activeted');
			    		console.log($current.get())
			    		//var pId = $current.parent().get()[0].id;
			    		//var crntId=$current.get()[0].id;
			    		
			    		
			    		var nextElmId=$current.next().get()[0].id;
			    		if(nextElmId!=null){
			    			changeContentNameAndImage(nextElmId);
			    		}

			    		
			    		if ($current.next().length > 0) {
			    			$('.scrollmenu a.activeted').removeClass('activeted');
			    			$current.next().addClass('activeted');
			    			$current.remove();
			    			$(".scrollmenu").append($current.get()[0]);
			    		}
			    		
			    	
			    		
			    		
			    		break;
		    	case 40: //DOWN arrow
		    		var $current = $('.left-menu p.activeted');
		    		
		    		if ($current.next().length > 0) {
		    			
		    			$current.removeClass('activeted');
		    			
		    			$current.next().addClass('activeted');
		    			
		    			
		    		}
		    		
		    		
		    		break;
		    	case 13: //OK button
		    		
		    		
		    		
		    			var $current = $('.activeted');
			    		var crntId=$current.get()[0].id;
			    		alert(crntId);
//			    		var player_href = "Jwplayer.html?conunter="+crntId;
//						$(location).attr('href',player_href); 
								    			
		    
		    		
		    		
		    		
		    		break;
		    	case 461: //LG BackButton
		    		window.history.back();
		    		break;
		    	case 27: //vizio BackButton
		    		window.VIZIO.exitApplication()
		    		break;
		    	case 8: //vizio BackButton
		    		window.VIZIO.exitApplication()
		    		break;
		    	case 10009: //RETURN button
				//tizen.application.getCurrentApplication().exit();
		    		window.close();
					if (confirm("exit_app")) {
		    			  tizen.application.getCurrentApplication().exit();
		    		}
		    		break;
		    	default:
		    		console.log('Key code : ' + e.keyCode);
		    		break;
		    	}
		    });
		 
		 
		 
		 
		});
		
//		document.addEventListener("contextmenu", function(e){
//      e.preventDefault();
//    }, false);
    
};
// window.onload can work without <body onload="">
window.onload = init;



