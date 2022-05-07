var checkTime;

//Initialize function
var init = function () {
	var focuscolor='#0cb9f2';
	var backcounter=false;
	var scroll="200";
	var row;
	var getresponsedata='';
	if(localStorage.getItem("authtokenstr")!=null){
		var authtoken=localStorage.getItem("authtokenstr");
		var baseurl=localStorage.getItem("baseurl");
		var lang_code = localStorage.getItem("lang_code");

	}
	
	
	
	$(document).ready(function(){
	
		var section = new Array();
		var sectionObj={};
		var total_Section_id= new Array();

		var homexhttp = new XMLHttpRequest();
		homexhttp.open("POST", ""+baseurl+"getAppHomePage/", true);
		homexhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		homexhttp.onreadystatechange = function() {
			$('#spinner').show();

			if (this.readyState == 4 && this.status == 200) {
				$('#spinner').show();
				$('#navbarcontent').show();
				$('#contentdiv').show();
				var homepage_response = JSON.parse(this.responseText);
				console.log(homepage_response);

				//console.log(homepage_response.SectionName.length);
				
				
				
				var i =0;
				var strchildiv = "";
				var section_id="";
				var section_name="";
				for(i=0;i<homepage_response.SectionName.length;i++){
					
					section_name =homepage_response.SectionName[i]['title'];
					section_id =homepage_response.SectionName[i]['section_id'];
			
					callgetAppFeatureContent(section_id,section_name,i);

				}

			}
		};

		homexhttp.send("authToken="+authtoken+"&lang_code="+lang_code+"");

		
		
		function callgetAppFeatureContent(section_id,section_name,sectionindex) {  
			
			
			

			console.log(section_id);
			var feature_content_detail = '';
			var content_description='';
			var j=0;
			var section_count=0;
			
			var permalink='',content_types_id='',name='',story='',release_date='',genre = '',banner = '',video_duration='',posterForTv='',posterimage='';
			var appfeaturecontent = new XMLHttpRequest();
			//$('#spinner').show();
			appfeaturecontent.open("POST", ""+baseurl+"getAppFeaturedContent/", true); 
			appfeaturecontent.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
			appfeaturecontent.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					
					var appfeaturecontentresponse = JSON.parse(this.responseText);
					console.log(appfeaturecontentresponse);
					if (appfeaturecontentresponse.code==200) {
						// section[section_id]= appfeaturecontentresponse.section;
						sectionObj[section_id]=appfeaturecontentresponse.section;
						total_Section_id.push(section_id);
						console.log(sectionObj[section_id]);
						console.log(total_Section_id);
						//console.log(section[section_id]);
						
						var secton_length=appfeaturecontentresponse.section.length;
						
						

						for(j=0;j<secton_length;j++){
							
							
						
							//console.log(appfeaturecontentresponse.section[j]);
							//console.log('load');
							var section =[appfeaturecontentresponse.section[j]['permalink'],
							              appfeaturecontentresponse.section[j]['content_types_id'],
							              appfeaturecontentresponse.section[j]['name'],
							              appfeaturecontentresponse.section[j]['story'],
							              appfeaturecontentresponse.section[j]['video_duration'],
							              appfeaturecontentresponse.section[j]['genre'],
							              appfeaturecontentresponse.section[j]['banner'],
							              appfeaturecontentresponse.section[j]['release_date'],
							              appfeaturecontentresponse.section[j]['posterForTv'],
							              appfeaturecontentresponse.section[j]['video_duration']
							];
							permalink=[appfeaturecontentresponse.section[j]['permalink']];
							content_types_id=[appfeaturecontentresponse.section[j]['content_types_id']];
							name=[appfeaturecontentresponse.section[j]['name']];
							story=[appfeaturecontentresponse.section[j]['story']];
							genre = [appfeaturecontentresponse.section[j]['genre']];
							banner = [appfeaturecontentresponse.section[j]['banner']];
							release_date=[appfeaturecontentresponse.section[j]['release_date']];
							posterForTv=[appfeaturecontentresponse.section[j]['posterForTv']];
							video_duration=[appfeaturecontentresponse.section[j]['video_duration']];

						
							
						feature_content_detail=feature_content_detail+'<div class="col-3 card border-inside"  data-row="row'+sectionindex+'" data-contenttypes='+appfeaturecontentresponse.section[j]['content_types_id']+' data-perma='+appfeaturecontentresponse.section[j]['permalink']+' id="content_imag_div" data-id='+appfeaturecontentresponse.section[j]['content_types_id']+' data-sectionid='+section_id+' data-index='+j+'>'+
                        '<a href="#" data-sectionid='+section_id+' id="img_'+section_id+'_'+j+'">'+
                        '<div class="hmpageimg">'+
 	                     '<img id='+appfeaturecontentresponse.section[j]['permalink']+' src='+appfeaturecontentresponse.section[j]['posterForTv']+' data-id='+appfeaturecontentresponse.section[j]['content_types_id']+' data-sectionid='+section_id+' data-index='+j+' class="img-fluid" alt="">'+
			             '</div>'+
                        '</a>'+
                        '</div>'
					


					}	
						 
						var secNameWithoutSpace=section_name.replace(/\s/g, "");
						getresponsedata= getresponsedata+'<div class="row" style="margin-left:13px" id='+secNameWithoutSpace+'><div><h1>'+section_name+'</h1></div><div class="col-md-12 abc innerContainer" id="inerimg'+secNameWithoutSpace+'" >'+feature_content_detail+'</div></div>';
					
						$('.home-top').show();
						$('#content_row').empty().append(getresponsedata);
						$("#content_row").children('div').eq(0).children('div').eq(1).children('div').eq(0).children('a').addClass('active');
						var timer = setTimeout(function() {
	                    	
							$('#content_row').show();
							$('#seanson_div').show();
							
						    $('#spinner').hide();
							
                          }, 1000);
						
						
					}
						callgetcontentdetails(total_Section_id["0"],"0");
						
						
					
				}
			}

			console.log("langguage cide ================"+lang_code);
			appfeaturecontent.send("authToken="+authtoken+"&section_id="+section_id+"&lang_code="+lang_code+"&platform="+"tv"+"");

		}  
		
	
		//content click name everything change function
		//this part is done through hover so now i comment it

		$(document).on("mouseover","#content_imag_div",function(e){
			console.log(total_Section_id.length);
			var content_types_id = $(this).find("img").attr('data-id');
			var movie_permlink = $(this).find("img").attr('id');
			var sectionId = $(this).find("img").attr('data-sectionid');
			var sectionIndex = $(this).find("img").attr('data-index');

			callgetcontentdetails(sectionId,sectionIndex);


		});

		function callgetcontentdetails(sectionId,sectionIndex){

			var content_description='';

			if(sectionObj[sectionId][sectionIndex].story!=null){
				var story=truncate(sectionObj[sectionId][sectionIndex].story);
				var story=story;
			}else{
				var story="";
			}
			if(sectionObj[sectionId][sectionIndex].name!=null){
				var name=sectionObj[sectionId][sectionIndex].name;
			}else{
				var name='';
			}
			if(sectionObj[sectionId][sectionIndex].release_date!=null){
				var year=sectionObj[sectionId][sectionIndex].release_date;
				var release_date = year.split("-", 1);
			}
			else{
				var release_date='';
			}
			if(sectionObj[sectionId][sectionIndex].genre!=null){
				var genre=sectionObj[sectionId][sectionIndex].genre;
			}
			else{
				var genre='';
			}
			if(sectionObj[sectionId][sectionIndex].video_duration!=null){
				
				var videoduration=sectionObj[sectionId][sectionIndex].video_duration;
			}
			else{
				var videoduration='';
			}
			//alert(video_duration);
			console.log("genre value=="+genre);
			console.log("releasedate value=="+release_date);
			console.log("videoduration value=="+videoduration);
			var genreHtml = '';
			var releaseDateHtml = '';
			var durationHtml = '';
			var duration = videoduration;
//			alert(convertToText(duration));
			if(!genre == ""){
				genreHtml = ''+genre+'';
			}
			if(!release_date == ""){
				releaseDateHtml = release_date;
			}
			if(!videoduration == ""){
				durationHtml = convertToText(duration);
			}
			content_description +='<div class="col-lg-5 col-md-6 col-sm-6">'+
			'<h1 class="heading">'+name+'</h1>'+
			'<div class="title-bar"></div>'+
			'<div class="p-light mb-3 text-muted"><span>'+releaseDateHtml+'</span> <span>|</span> <span>'+genreHtml+'</span> <span>|<span> </span>'+durationHtml+'</span></div>'+
			'<p>'+story+'</p>';
			

			if (sectionObj[sectionId][sectionIndex].banner!=null) {
				
				var body = document.getElementsByClassName('banner-home')[0];
				
				body.style.backgroundImage = 'url(' + sectionObj[sectionId][sectionIndex].banner + ')';
							body.style.backgroundRepeat = 'no-repeat';
							body.style.backgroundPosition ='left top';
							body.style.backgroundAttachment = 'scroll';
							body.style.maxWidth='100%';
							body.style.backgroundSize = 'cover';
				
			}else {
				
				$('body').css('background-color','#000000');
				
			}
			
			
			 
            
				 
			 
			 
			 
			 
		
            
			//$('#content_description_on_banner').html(content_description);
            $('#name').html(name);
            $('#summary').html(story);
			$('#year').html(releaseDateHtml);
			$('#gen').html(genreHtml);
			$('#time').html(durationHtml);
			$('#titlebar').show();
			
			 if(!release_date == "" && genre == "" && videoduration == ""){
				$('#one').hide();
				$('#two').hide();
			 }else if(!genre == "" && release_date == "" && videoduration == ""){
				$('#one').hide();
				$('#two').hide();
			 }
			 else if(!videoduration == "" && release_date == "" && genre == ""){
				$('#one').hide();
				$('#two').hide();
			 }else if(!release_date == "" && !genre == "" && videoduration == ""){
				$('#two').hide();
				$('#one').show();
			 }else if(!release_date == "" && genre == "" && !videoduration == ""){
				 $('#two').show();
				 $('#one').hide();
				 
			 }else if(!release_date == "" && !genre == "" && !videoduration == ""){
				 $('#two').show();
				 $('#one').show();
				 
			 }else if(release_date == "" && genre == "" && videoduration == ""){
				 $('#two').hide();
				 $('#one').hide();
				 
			 }else{
				 
				 
			 }
           

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
			durationText = parseInt((hour * 60)) + parseInt(minute) + "m";
			console.log("duration text === " + durationText)
			return durationText;
		}

		/*$(document).on("click","#content_imag_div",function(e){
			var detailspermalink= $(event.currentTarget).attr('data-perma');
			var content_types_id=$(this).find('img').attr('data-id');
			//alert(content_types_id);
			if(content_types_id=="1" || content_types_id=="2" || content_types_id=="4"){

				var create_href = "Movidetails.html?permalink="+detailspermalink;
			}
			else{

				var create_href = "showwithepisode.html?permalink="+detailspermalink;
			}
			//alert(create_href);
			$(location).attr('href',create_href); 
		});*/

		function truncate(string){
			if (string.length > 150)
				return string.substring(0,150)+'...';
			else
				return string;
		};
		/*function replacespecialcharcter(string){
	if(string!=null){
	 var string=string.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g,'_');
	      return string;
	}else{
	return null;
	}

	};*/
		function quitBox(cmd)
		{   
			if (cmd=='quit')
			{
				open(location, '_self').close();
			}   
			return false;   
		}

		$(document).on("click", "a.logout", function() {
			if (confirm('Are you sure want to Logout?')) {
				//$(this).prev('span.text').remove();
				localStorage.removeItem("loginstr");
				$(location).attr('href',"prelogin.html");
			}
		});



/*		document.addEventListener('keydown', function(e) {
			switch(e.keyCode){
			case 37: //LEFT arrow
				break;
			case 38: //UP arrow
				$('html , body').animate({scrollTop:0}, 'slow');
				console.log("scroll value in up utton"+scroll);
				scroll=150;
			
				break;
			case 8: //Vewd back
			
			    //if (backcounter==false){
					
					//$('#nocontent').html("Again Press back to exit");
						 //$('#nocontent').show();
						 
						 //var timer = setTimeout(function() {
	                    	
							//backcounter=true;
							//$('#nocontent').hide();
	                    	
                          //}, 1000);
                       
                   
              // }else if (backcounter==true){
                 //  window.close();
                 //  }
			
                window.close();
				break;
			case 39: //RIGHT arrow
				break;
			case 40: //DOWN arrow
				console.log("scroll down")
				//	$('html, body').animate({scrollTop:20}, 'slow');
					return false;
				break;
			case 13: //OK button

				break;
			case 461: //LG BackButton
			
					window.close();
				
				break;
			case 10009: //RETURN button
				//tizen.application.getCurrentApplication().exit();
				window.close();
				if (confirm(localStorage.getItem("app_exit_message"))) {
	    			  tizen.application.getCurrentApplication().exit();
	    		}
				break;
			default:
				console.log('Key code : ' + e.keyCode);
			break;
	    	case tvKey.KEY_EXIT:
	    	    var widgetAPI = new Common.API.Widget(); 
	    	    widgetAPI.sendExitEvent();
	    	    break;

			}
		});*/

		function currentData(){
			var $current = $('.active');
			var nextElmId= $current.get()[0].id;
			var indexId=nextElmId.split("_");
			var sectionId=$("#"+nextElmId).attr("data-sectionid");
			callgetcontentdetails(sectionId,indexId[2]);
			
		}
		
		document.onkeydown = checkKey;
        function checkKey(e) {
        var position;
        e = e || window.event;

        if (e.keyCode == '38') {
			//console.log("up arrow");
			var $current = $('.active');
			if($current.parent().parent().parent().prev().hasClass("row")){
				$current.removeClass('active');
				$current.parent().parent().parent().prev().removeClass('d-none');
				$current.parent().parent().parent().prev().children('div').eq(1).children('div').eq(0).children('a').addClass('active');
				currentData();
			}else{
				
			}
			
			var content_types_id = $current.find("img").attr('data-id');
			var movie_permlink = $current.find("img").attr('id');
			var sectionId = $current.find("img").attr('data-sectionid');
			var sectionIndex = $current.find("img").attr('data-index');
			//alert(sectionId);
			//callgetcontentdetails(sectionId,sectionIndex);
			
			
        }
        else if (e.keyCode == '40') {
        	//console.log("down arrow");
        	var $current = $('.active');
			position = $current.parent().get()[0].id;
			if(position != "up"){
				if($current.parent().parent().parent().next().hasClass("row")){
					$current.removeClass('active');
					$current.parent().parent().parent().addClass('d-none');
					$current.parent().parent().parent().next().children('div').eq(1).children('div').eq(0).children('a').addClass('active');
					//alert($current.parent().parent().parent().next().children('div').eq(1).children('div').eq(0).children('a').get()[0].id);
					currentData();
				}
			}else{
				$current.removeClass('active');
				$("#content_row").children('div').eq(0).children('div').eq(1).children('div').eq(0).children('a').addClass('active');
			}
			
			var content_types_id = $current.find("img").attr('data-id');
			var movie_permlink = $current.find("img").attr('id');
			var sectionId = $current.find("img").attr('data-sectionid');
			var sectionIndex = $current.find("img").attr('data-index');
			
			//alert(sectionId);

			
        }
        else if (e.keyCode == '37') {
           //console.log("left");
        	
        	
        	
        	var $current = $('.active');        	
        	var crtparentId=$current.parent().parent().get()[0].id;
        	
    			 $("#"+crtparentId).prepend($("#"+crtparentId+"> div").last().get());
   	        	 if ($current.parent().prev().length > 0) {
   	        		 
   	        		 
   	        		alert($current.get()[0].id.split("_")[2]);
   	        		 
   	        		if( $current.get()[0].id.split("_")[2] == "0"){
   	        			
   	        			alert($current.get()[0].id.split("_")[2]);
	    				$current.removeClass('activeted');
	    				$("#content_row").children('div').eq(0).removeClass('active');
	    				$(".left-menu").children('p').eq(0).addClass('activeted');
	    				$(".image-container-category").removeClass('temp-right');
	    			} else {
	    				 $current.removeClass('active');
	   	                 $current.parent().prev().children('a').addClass('active');
	   	                 
	   	              var $current = $('.active');
	   	              var nextElmId= $current.get()[0].id;
	   	              var indexId=nextElmId.split("_");
	    			}
   	        		
   	        		
   	          
   			
    		}
   	        	
   				
        	var content_types_id = $current.find("img").attr('data-id');
			var movie_permlink = $current.find("img").attr('id');
			var sectionId = $current.find("img").attr('data-sectionid');
			var sectionIndex = $current.find("img").attr('data-index');
			var prevIndex = parseInt(sectionIndex)-1;
			//alert(prevIndex);
			
			callgetcontentdetails(sectionId,indexId[2]);
        }
        else if (e.keyCode == '39') {
	        //console.log("right arrow");
        	
        	$(".left-menu p").removeClass('activeted');
        	$("#content_row").children('div').eq(0).children('div').eq(1).children('div').eq(0).children('a').addClass('active');
    		$(".image-container-category").addClass('temp-right');
        	
	        var $current = $('.active');
	        var crtparentId=$current.parent().parent().get()[0].id;
	       
    			if ($current.parent().next().length > 0) {
    				
    				    				
        			$current.removeClass('active');
        			$current.parent().next().children('a').addClass('active');
        			$current.parent().remove();
        			$("#"+crtparentId).append($current.parent().get()[0]);
        			
        			var $current = $('.active');
        			var nextElmId= $current.get()[0].id;
        			var indexId=nextElmId.split("_");
        			
        		}
    			
    		
    	
    		var content_types_id = $current.find("img").attr('data-id');
			var movie_permlink = $current.find("img").attr('id');
			var sectionId = $current.find("img").attr('data-sectionid');
			var sectionIndex = $current.find("img").attr('data-index');
			var nextIndex = parseInt(sectionIndex)+1;			
			//alert(nextIndex);
			callgetcontentdetails(sectionId,indexId[2]);
			
			
			
			
        }
        else if (e.keyCode == '13') {
        	var $current = $('.active');
        	var currentId=$current.get()[0].id;
        	
        	//alert(currentId);
        	
        	var content_types_id = $current.find("img").attr('data-id');
			var movie_permlink = $current.find("img").attr('id');
			var sectionId = $current.find("img").attr('data-sectionid');
			var sectionIndex = $current.find("img").attr('data-index');
			
			

        }
        else if (e.keyCode == '10009') {
        	if (confirm(localStorage.getItem("app_exit_message"))) {
  			  tizen.application.getCurrentApplication().exit();
  		}
		}
    }
		

	});


};
//window.onload can work without <body onload="">
window.onload = init;