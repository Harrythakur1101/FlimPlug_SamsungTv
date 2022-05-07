//Initialize function
var init = function () {
	var focuscolor = '#0cb9f2';
	var titlefocuscolor = '#fff';
	var red = '#FF0000';
	var black = '#fff';
	var test = "";
	var leftPos = 0;
	var fisttime = false;
	var position = 0;
	var category_list = {};

	$("#mobiletv").text("Movies & TV");
	$("#Lifestyle").text("Lifestyle");
	$("#Food").text("Food");
	$("#Travel").text("Travel");
	$("#Sports").text("Sports");
	$("#Kids").text("Kids");
	$("#Tech").text("Tech & Sci");

	$("#categorytitle").text("");

	$('#sliderTV').hide();


	


	$(document).ready(function () {
		var allDetails=[] ;                                         
		var MovieDetails={};
		var section = new Array();
		var sectionObj = {};
		var sanjayObj = {};

		function getParameterByName(name, href) {
			name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
			var regexS = "[\\?&]" + name + "=([^&#]*)";
			var regex = new RegExp(regexS);
			var results = regex.exec(href);
			if (results == null)
				return "";
			else
				return decodeURIComponent(results[1].replace(/\+/g, " "));
		}
		var categoryid = getParameterByName("categoryid", window.location.href);
		var categoryname = getParameterByName("categoryname", window.location.href);
		

		var myPlanshr = new XMLHttpRequest();
		myPlanshr.onreadystatechange = function () {
			$('#spinner').show();

			if (this.readyState == 4 && this.status == 200) {
				//$('#spinner').hide();


				myPlansresponse = JSON.parse(this.responseText);
			
					movieList=myPlansresponse.movies;				
					allDetails = movieList.filter((element)=> {					
							if (element.tags.includes(categoryid)){			
								return true;									
							}												
						})	
				category_list = allDetails;


				// alert(category_list.length);

				if (category_list.length > 0) {

					callCategortList();

				} else {

					$('#nocontent').text("No content found");
					$('#nocontent').show();
					$('#spinner').hide();
				}

			}
		}
		myPlanshr.open("GET", "http://trlxfr.com/admin/data/feeds/sdk/film_plug_prod_v1", true);
		myPlanshr.send();



		function callCategortList() {

			$('#categ').show();
			$('#navbarcontent').show();
			$('#contentdiv').show();


			var name = "";

			var i = 0;
			var category_banner = '';

			// for (i = 0; i < category_list.length; i++) {
			// 	//alert("hello");
			// 	if (i == 0) {
			// 		category_banner += '<a class="activeted item" href="#" data-index=' + i + ' id=' + i + '><div class="centerd" style="top: 50%;position: absolute;text-align: center;left: 0;right: 0;line-height: 27px;margin-top: -12px;overflow: hidden;text-overflow: ellipsis;padding: 0 6px;"></div><img class="imgsec" src=' + category_list[i].movie_thumb + '> </a>';
			// 	} else {
			// 		category_banner += '<a href="#" class="item" data-index=' + i + ' id=' + i + '><div class="centerd" style="top: 50%;position: absolute;text-align: center;left: 0;right: 0;line-height: 27px;margin-top: -12px;overflow: hidden;text-overflow: ellipsis;padding: 0 6px;"></div><img class="imgsec" src=' + category_list[i].movie_thumb + '> </a>';
			// 	}

			// 	//category_banner+='<a focusable href="#" data-index=' + i + '><div class="centerd" style="top: 50%;position: absolute;text-align: center;left: 0;right: 0;line-height: 27px;margin-top: -12px;overflow: hidden;text-overflow: ellipsis;padding: 0 6px;"></div><img class="imgsec" src='+category_list[i].images[0].src+'> </a>'; 

			// }

			category_list.forEach(function(element,index){
			
				var news =  "<div class='card-sec'>"+ "<a  class='cart "+(index==0?"activeted":"")+"' href='#' tabindex='0' id='"+ (index)+"'>"+" <div class='centerd'>"
				+"<img  class imgsec src='"+element.hdPosterUrl+"' alt='' style='width:172px; height: 200px;' >"
			+"</div>" +"</a>" +"</div>" 
				
				
				// var news= "<div class='cart' id='"+ (index+1)+"'  tabindex='0'>"
				// 			+"<img class imgsec src='"+element.movie_thumb+"' alt=''>"
				// 		+"</div>";
				category_banner+= news;
				
			})



			$('#sliderTV').html(category_banner);
			$('.menu_sec ul li').removeClass('activeted');


			changeContentNameAndImage("0");
			var timer = setTimeout(function () {
				$('#categorytitle').text(categoryname);
				$('#categorytitle').show();
				$('#sliderTV').show();
				$('#seanson_div').show();
				$('#spinner').hide();
			}, 1000);



		}



		function changeContentNameAndImage(categoryIndex) {
	
			var title = category_list[categoryIndex]['title'];
			var desc = truncate(category_list[categoryIndex]['description']);

			// var duration = category_list[categoryIndex]['video_duration'];


			var body = document.getElementsByClassName('banner-home')[0];

			body.style.backgroundImage = 'url(' + category_list[categoryIndex]['hdPosterUrl'] + ')';
			body.style.backgroundRepeat = 'no-repeat';
			body.style.backgroundPosition = 'left top';
			body.style.backgroundAttachment = 'scroll';
			body.style.maxWidth = '100%';
			body.style.backgroundSize = 'cover';





			$('#name').html(title);
			// $('#year').html(duration);
			$('#titlebar').show();
			$('#summary').html(desc);




		}


		function convertToText(duration) {
			var durationText = '';
			var splitTime = duration.split(':');
			var hour = parseInt(splitTime[0]) >= 9 ? splitTime[0] : splitTime[0][1];
			if (parseInt(hour) > 0) {
				durationText += hour + "h";
			}
			var minute = parseInt(splitTime[1]) >= 9 ? splitTime[1] : splitTime[1][1];
			if (parseInt(minute) > 0) {
				durationText += minute + "m";
			}
			/* var second = parseInt(splitTime[2]) > 9 ? splitTime[2] : splitTime[2][1];
			 if(parseInt(second) > 0){
			   durationText += second+" Second";
			 }*/
			return durationText;
		}


		function truncate(string) {
			if (string.length > 150)
				return string.substring(0, 150) + '...';
			else
				return string;
		};

		$(document).on({
			mouseenter: function () {
				// console.log("hiii");
				var $current = $('.activeted');
				$current.removeClass('activeted');
				$(this).addClass('activeted');
				var currentId = $(this).attr("id");
				changeContentNameAndImage(currentId);
			},
			mouseleave: function () {
			
			}
		}, "div.scrollmenu a");



		$(document).on("click", "div.scrollmenu a", function () {
			var currentId = $(this).attr("id");
			// console.log(currentId);
			var muviurl = category_list[currentId].url;
			// var srt_url = category_list[currentId].srt_url;
			// var time = category_list[crntId].video_duration;
			var descr = category_list[crntId].description;
			var title = category_list[crntId].title;
			var bg_image = category_list[crntId].hdPosterUrl;


			if (muviurl == "" || muviurl == null || muviurl == undefined) {
				$('#nocontent').html("No video url available");
				$('#nocontent').show();
				var timer = setTimeout(function () {
					$('#nocontent').hide();
				}, 1000);
			} else {

				var str = muviurl.split('.').pop().split(/\#|\?/)[0];
				if (str == "m3u8") {
					localStorage.setItem("video_type", "live")
				} else {
					localStorage.setItem("video_type", "VOD");
				}
				localStorage.setItem("videoidd", "videoid")
				localStorage.setItem("url", muviurl);
				localStorage.setItem("video_time", time);
				localStorage.setItem("discription", descr);
				localStorage.setItem("movie_title", title);
				localStorage.setItem("srt_url",srt_url);
				localStorage.setItem("background_img_url",bg_image)
			

				location.href="preview.html";
				//window.location = "player.html";

				// var player_href = "hlsplayer.html?conunter=" + muviurl;
				// $(location).attr('href', player_href);

				// var player_href = "LatestJwplayer.html?&" + muviurl+"&"+srt_url;
				// $(location).attr('href', player_href);
			}

		});



		// add eventListener for keydown
		document.addEventListener('keydown', function (e) {
			switch (e.keyCode) {
				case 37: //LEFT arrow	

					var $current = $('.scrollmenu a.activeted');
					var pId = $current.parent().attr("id");


					$("#" + pId + "> a").last();
					$(".scrollmenu").prepend($("#" + pId + "> a").last().get());
					var prevElmId = $current.parent().prev().find("a").attr("id");
					// var prevElmId = $current.parent().prev().attr("id");
					console.log(prevElmId)
					if (prevElmId != null) {
						changeContentNameAndImage(prevElmId);
					
					}

					if ($current.parent().prev().length > 0) {
						$('.scrollmenu a.activeted').removeClass('activeted');
						$current.parent().prev().find("a").addClass('activeted');

					}
					var dataIndex=parseInt(document.querySelector(".activeted").getAttribute("id"));
					console.log(dataIndex);
	
		
					// if(dataIndex>7){
						document.querySelector(".activeted").parentNode.parentNode.style.transform="translate("+-275*(dataIndex)+"px,0)";


					break;

				case 38: //UP arrow

					break;
				case 461:
					window.history.back()
					break;
				case 8:
						window.history.back()
						break;

				case 39: //RIGHT arrow
					//test="right";
					//break;


					console.log("first");

					var $current = $('.scrollmenu a.activeted');
					var lastRow=$current.parent().parent().find("div.card-sec:last-child").find("a").attr("id");
					console.log(lastRow);
					//var pId = $current.parent().get()[0].id;
					//var crntId=$current.get()[0].id;
					var dataIndex=parseInt(document.querySelector(".activeted").getAttribute("id"));

					if (parseInt(lastRow)-6>=dataIndex) {
						document.querySelector(".activeted").parentNode.parentNode.style.transform="translate("+-275*(dataIndex+1)+"px,0)";
					}

					
	
		
					// if(dataIndex>7){
					// }else{
					// 	document.querySelector(".active").parentNode.parentNode.style.transform="translate("+-0*(dataIndex)+"px,0)"
					// }

					var nextElmId = $current.parent().next().find("a").attr("id");
					
					if (nextElmId != null) {
						changeContentNameAndImage(nextElmId);
					}


					if ($current.parent().next().length > 0) {
						$('.scrollmenu a.activeted').removeClass('activeted');
						$current.parent().next().find("a").addClass('activeted');
						// $current.parent().remove();
						// $(".scrollmenu").append($current.parent().get()[0]);
					}




					break;
				case 40: //DOWN arrow


					break;
				case 13: //OK button



					var $current = $('.activeted');
					var crntId = $current.get()[0].id;

					var muviurl = category_list[crntId].url;
					// var srt_url = category_list[crntId].srt_url;
					// var time = category_list[crntId].video_duration;
					var descr = category_list[crntId].description;
					var title = category_list[crntId].title;
					var bg_image = category_list[crntId].hdPosterUrl;


					if (muviurl == "" || muviurl == null || muviurl == undefined) {

						$('#nocontent').html("No video url available");
						$('#nocontent').show();

						var timer = setTimeout(function () {

							$('#nocontent').hide();

						}, 1000);
					} else {
						// var player_href = "hlsplayer.html?conunter=" + muviurl;
						// $(location).attr('href', player_href);

						// var str = muviurl.split('.').pop().split(/\#|\?/)[0];
						// if (str == "m3u8") {
						// 	localStorage.setItem("video_type", "live")
						// } else {
						// 	localStorage.setItem("video_type", "VOD");
						// }
						// localStorage.setItem("videoidd", "videoid")
						localStorage.setItem("url", muviurl);
						// localStorage.setItem("video_time", time);
						localStorage.setItem("discription", descr);
						localStorage.setItem("movie_title", title);
						// localStorage.setItem("srt_url",srt_url);
						localStorage.setItem("background_img_url",bg_image)
					
	
						location.href="preview.html";
						//window.location = "player.html";

						// var player_href = "LatestJwplayer.html?&" + muviurl+"&"+srt_url;								// -------------playing vedio player
						// $(location).attr('href', player_href);
						console.log(player_href)
					}





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



