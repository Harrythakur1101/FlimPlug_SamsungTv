
//Initialize function
var init = function () {
	var focuscolor='#0cb9f2';
	var titlefocuscolor='#fff';
	var red='#FF0000';
	var black='#fff';
	var test="";
	var position=0
	var leftPos=0;
	var categoryid=""
	var fisttime=false;
	var position=0;
	var category_list={};
	var removeDesc;
   
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



		$(document).on({
			mouseenter: function () {
				$("#sliderTV a").removeClass("activeted");
				$(this).addClass("activeted");
				
				changeContentNameAndImage($(this).attr("id"));

			},
			mouseleave: function () {
				console.log('mouseleave');
			}
		}, "div#sliderTV a");

		// $(document).on("click", "#sliderTV a.activeted", function () {
		// 	if ((document.querySelector(".example").classList[1]=="activeted")) {
		// 		return
		// 	}
		
		// 	var currentId = $(this).attr("id");
		// 	console.log(currentId);
		// 	var series_id=category_list[position].series_content[currentId].series_id;
			    	
		// 	var player_href = "kidscontentlist.html?series_id="+series_id;
		// 	$(location).attr('href',player_href); 
		// 	console.log(player_href)
		// });


	
		function getParameterByName( name,href )
		{
		  name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		  var regexS = "[\\?&]"+name+"=([^&#]*)";
		  var regex = new RegExp( regexS );
		  var results = regex.exec( href );
		  if( results == null )
		    return "";
		  else
		    return decodeURIComponent(results[1].replace(/\+/g, " "));
		}
		categoryid = getParameterByName("categoryid",window.location.href);
		var categoryname = getParameterByName("categoryname",window.location.href);
		
		
			
		var myPlanshr = new XMLHttpRequest();
		myPlanshr.onreadystatechange = function() {
			$('#spinner').show();
            
			if (this.readyState == 4 && this.status == 200) {
				//$('#spinner').hide();
				$('#categ').show();
		    	$('#navbarcontent').show();
				$('#contentdiv').show();
				
				myPlansresponse = JSON.parse(this.responseText);
				category_list=myPlansresponse.contents;
				//console.log(category_list.length);
				//alert(category_list.length);
				
				if (category_list.length>0) {
					
					
					for(i=0;i<category_list.length;i++){
						
						if (category_list[i].genre_id == categoryid){
							
							position=i;
													
							callCategortList(position);
							
						}
						
						
					}
					
					
					//callCategortList();
				
				}else{
					
					$('#nocontent').text("No content found");
				      $('#nocontent').show();
				      $('#spinner').hide();
				}
				
			}
		}
		myPlanshr.open("GET", "https://glewedtv.com/index.php?api/get_series/1", true);
		myPlanshr.send();
			

		 
		 function callCategortList(position){
				var name="";
				var i=0;
				var category_banner='';
				
				for(i=0;i<category_list[position].series_content.length; i++){
					//alert("hello");
					if(i == 0){
						
						category_banner+= '<a class="cart activeted" href="#" data-index=' + i + ' id=' + i + '><div class="centerd" style="top: 50%;position: absolute;text-align: center;left: 0;right: 0;line-height: 27px;margin-top: -12px;overflow: hidden;text-overflow: ellipsis;padding: 0 6px;"></div><img class="imgsec" src='+category_list[position].series_content[i]['series_thumb']+'> </a>';
					}
					else{
						
						category_banner+='<a href="#" data-index=' + i + ' id=' + i + '><div class="centerd" style="top: 50%;position: absolute;text-align: center;left: 0;right: 0;line-height: 27px;margin-top: -12px;overflow: hidden;text-overflow: ellipsis;padding: 0 6px;"></div><img class="imgsec" src='+category_list[position].series_content[i]['series_thumb']+'> </a>';
					}
					
					//category_banner+='<a focusable href="#" data-index=' + i + '><div class="centerd" style="top: 50%;position: absolute;text-align: center;left: 0;right: 0;line-height: 27px;margin-top: -12px;overflow: hidden;text-overflow: ellipsis;padding: 0 6px;"></div><img class="imgsec" src='+category_list[i].images[0].src+'> </a>'; 
					
				}

				// category_list[position].series_content.forEach(function(element,index){
				
				
				// 	var news =  "<div class='card-sec'>"+ "<a  class=' cart' href='#' tabindex='0' id='"+ (index+1)+"'>"+" <div class='centerd'>"
				// 	+"<img class imgsec src='"+element.series_thumb+"' alt=''>"
				// +"</div>" +"</a>" +"</div>" 
					
					
				// 	// var news= "<div class='cart' id='"+ (index+1)+"'  tabindex='0'>"
				// 	// 			+"<img class imgsec src='"+element.movie_thumb+"' alt=''>"
				// 	// 		+"</div>";
				// 	category_banner+= news;
					
				// })
				
				$('#sliderTV').html(category_banner);
				$('.menu_sec ul li').removeClass('activeted');
				
				
				changeContentNameAndImage("0");
				var timer = setTimeout(function() {
	                  $('#categorytitle').text(categoryname);
				      $('#categorytitle').show();
					  $('#sliderTV').show();
					  $('#seanson_div').show();
					  $('#spinner').hide();
                          }, 1000);
				
				

		 }
		 
	
		 
		 function changeContentNameAndImage(categoryIndex){
			 
			 			
			 
			 var title=category_list[position].series_content[categoryIndex]['title'];
			 
			 var desc=truncate(category_list[position].series_content[categoryIndex]['description_long']);
			 removeDesc=(category_list[position].series_content[categoryIndex]['description_long']);
			 var duration=category_list[position].series_content[categoryIndex]['rating'];
			 
					
				// 		 var body = document.getElementsByClassName('banner-home')[0];
				
				// body.style.backgroundImage = 'url(' +category_list[position].series_content[categoryIndex]['series_thumb']+ ')';
				// 			body.style.backgroundRepeat = 'no-repeat';
				// 			body.style.backgroundPosition ='left top';
				// 			body.style.backgroundAttachment = 'scroll';
				// 			body.style.maxWidth='100%';
				// 			body.style.backgroundSize = 'cover';
						
					
				
					 
					 
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
				if (string.length > 150){
					$('#button').css('display','block')
					return string.substring(0,150)+'...';
				}
				else {
					$('#button').css('display','none')
					return string;
				}
			};

		 $(document).ready(function(){
			 $('#button').click(function(){
				$('#summary').html(removeDesc);
				$('#button').css('display','none')
			 })
		 })
		 
		 // add eventListener for keydown
		    document.addEventListener('keydown', function(e) {
		    	switch(e.keyCode){
				case 461:window.history.back()
					break;
				case 8: window.history.back()
					break;
		    	case 37: //LEFT arrow	
				var $current = $('.scrollmenu a.activeted');
				var lastRow=$current.parent().find("a:last-child").attr("id");
				console.log(lastRow);
				
				var dataIndex=parseInt(document.querySelector(".activeted").getAttribute("id"));

				if (parseInt(lastRow)-6>=dataIndex) {
					dataIndex>0?document.querySelector(".activeted").parentNode.style.transform="translate("+-165*(dataIndex-1)+"px,0)":"";
				}
		    	
			    		var pId = $current.parent().get()[0].id;

					
			    		$("#" + pId + "> a").last();
			    		// $(".scrollmenu").prepend($("#" + pId + "> a").last().get());
			    		
			    		var prevElmId=$current.prev().get()[0].id;
			    		if(prevElmId!=null){
			    			changeContentNameAndImage(prevElmId);
			    		}
			    		
			    		if ($current.prev().length > 0) {
			    			$('.scrollmenu a.activeted').removeClass('activeted');
			    			$current.prev().addClass('activeted');
			    			
			    		}
		    		// ----------------------------
					var $currentAct = $('.scrollmenu a.activetedClass');
					$currentAct.removeClass('activetedClass')
		    	
			    		break;
		    		
		    	case 38: $(document).ready()//UP arrow
					$('.scrollmenu a.activeted').addClass('activetedClass');
					$('.scrollmenu a.activeted').removeClass('activeted');

					$('#button').addClass('activeted');
					console.log('Up is working...')
				
		    		
		    		break;
		    	case 39: //RIGHT arrow
		    		//test="right";
		    		//break;
		    		
					var $current = $('.scrollmenu a.activeted');
					var lastRow=$current.parent().find("a:last-child").attr("id");
					console.log(lastRow);
		    		
					var dataIndex=parseInt(document.querySelector(".activeted").getAttribute("id"));

					if (parseInt(lastRow)-6>=dataIndex) {
						document.querySelector(".activeted").parentNode.style.transform="translate("+-165*(dataIndex+1)+"px,0)";
					}
			    		//var pId = $current.parent().get()[0].id;
			    		//var crntId=$current.get()[0].id;
			    		
			    		
			    		var nextElmId=$current.next().get()[0].id;
			    		if(nextElmId!=null){
			    			changeContentNameAndImage(nextElmId);
			    		}

			    		
			    		if ($current.next().length > 0) {
			    			$('.scrollmenu a.activeted').removeClass('activeted');
			    			$current.next().addClass('activeted');

			    			// $current.remove();
			    			// $(".scrollmenu").append($current.get()[0]);
			    		}
						var $currentAct = $('.scrollmenu a.activetedClass');
						$currentAct.removeClass('activetedClass')
			    	
			    		
			    		
			    		break;
		    	case 40: //DOWN arrow
				var $current = $('.scrollmenu a.activetedClass');
				$current.addClass('activeted');
				$current.removeClass('activetedClass');
				$('#button').removeClass('activeted');
		    		
		    		break;
		    	case 13: //OK button
		    		
				$(document).ready(function(){
					if ($('#button').is('.activeted')){
						console.log("Everything is Alright ")
						$('#summary').html(removeDesc);
						$('#button').removeClass('activeted');
						$('#button').css('display','none')
						var $current = $('.scrollmenu a.activetedClass');
						$current.addClass('activeted');
					}

				})
		    		
		    			var $current = $('.activeted');
			    		var crntId=$current.get()[0].id;
			    		
			    		var series_id=category_list[position].series_content[crntId].series_id;
			    	
			    		var player_href = "kidscontentlist.html?series_id="+series_id;
						$(location).attr('href',player_href); 

								    			
		    
		    		
		    		
		    		
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
		    		window.history.back();
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



