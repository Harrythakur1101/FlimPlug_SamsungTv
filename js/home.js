  var checkTime;

//Initialize function
var init = function () {
	var focuscolor = '#0cb9f2';
	var backcounter = false;
	var scroll = "200";
	var row;
	var click = false;
	var backpress = false;

	if (localStorage.getItem("authtokenstr") != null) {
		var authtoken = localStorage.getItem("authtokenstr");
		var baseurl = localStorage.getItem("baseurl");
		var lang_code = localStorage.getItem("lang_code");

	}

	var test = '<p class="delete" id="termsandcondition" style="margin-left:70px;"><span>term</span></p><p class="delete" id="aboutus" style="margin-left:70px;"><span>about</span></p><p class="delete" id="privacypolicy" style="margin-left:70px;"><span>privacy</span></p>';

	$(document).ready(function () {
		var allDetails=[] ;                                             // category Name Then Movies Details
		var MovieDetails={};
		var section = new Array();
		var sectionObj = {};
		var sanjayObj = {};
		var total_Section_id = new Array();
		var getresponsedata = '';	
		// var section_name;

	
		function homepage() {
			var homexhttp = new XMLHttpRequest();
			homexhttp.onreadystatechange = function () {
				$('#spinner').show();
				if (this.readyState == 4 && this.status == 200) {
					$('#spinner').show();
					$('#navbarcontent').show();
					$('#contentdiv').show();
					var homepage_response = JSON.parse(this.responseText);
					sectionObj = homepage_response;                                                                            // Api response
					section_name = homepage_response.categories														   // categories
					movieList=homepage_response.movies;
					let num=0;
					for (i=0; i<homepage_response.categories.length;i++){
						catnameList = homepage_response.categories[i].query;
						section_id="section_id"+[i];
						section_name= homepage_response.categories[i].name;
					
						 MovieDetails = movieList.filter((element)=> {					
								if (element.tags.includes(catnameList)){			
									return true;									
								}												
							})	

							allDetails.push({
							"genre_id" :i,
							"genre_name":section_name,	
							"contents": MovieDetails,
							
						});
							
					}	
					allDetails.forEach((info)=>{
						var sectionId=info.genre_id
						callgetAppFeatureContent(sectionId,info.genre_name,info.genre_id);

					})			
					
				}			
		
					
			};
			homexhttp.open("GET", "http://trlxfr.com/admin/data/feeds/sdk/film_plug_prod_v1", true);
			homexhttp.send();
			
		}
		


		// homepageFirst();
		homepage();
	console.log(allDetails)

		function callgetAppFeatureContent(section_id,section_name,sectionindex) {
			var name=[]
			var feature_content_detail = '';
			var content_description = '';
			var j = 0;
			var section_count = 0;
			var id = '', title = '', description_long = '', movie_url = '', movie_thumb = '', video_duration = '';
		
			sanjayObj[section_id] = allDetails[sectionindex].contents;
			total_Section_id.push(section_id);
		
			if(allDetails[sectionindex].contents.length==0){
				return null
			}
		
			for (j = 0; j < allDetails[sectionindex].contents.length; j++) {
				feature_content_detail = feature_content_detail + '<div class="card border-inside" id="featuresection"  data-row="row' + sectionindex + '" data-sectionid=' + section_id + ' data-index=' + j + '>' +
					'<a href="#" class="cardDetails" data-sectionid=' + section_id + ' id="img_' + section_id + '_' + j + '">' +
					'<div class="">' +
					'<img src=' + allDetails[sectionindex].contents[j]['hdPosterUrl'] + ' data-index=' + j + ' class="imgsec" alt="">' +
					'</div>' +
					'</a>' +
					'</div>'
			}

			var secNameWithoutSpace = section_name.replace(/\s/g, "");
			getresponsedata = getresponsedata + '<div class="row rowsec" style="margin-left:13px" id=' + secNameWithoutSpace + '><div><h1 class="sectionname">' + section_name + '</h1></div><div class="col-md-12 abc innerContainer" id="inerimg' + secNameWithoutSpace + '" >' + feature_content_detail + '</div></div>';

			$('.home-top').show();
			$('#content_row').html(getresponsedata);
			$("#content_row").children('div').eq(0).children('div').eq(1).children('div').eq(0).children('a').addClass('active');
			var timer = setTimeout(function () {

				$('#content_row').show();
				$('#seanson_div').show();
				$('#spinner').hide();

			}, 1000);



			callgetcontentdetails(total_Section_id["2"], "0");
		}
	

		$(document).on("mouseover", "#content_imag_div", function (e) {
			console.log(total_Section_id.length);
			var content_types_id = $(this).find("img").attr('data-id');
			var movie_permlink = $(this).find("img").attr('id');
			var sectionId = $(this).find("img").attr('data-sectionid');
			var sectionIndex = $(this).find("img").attr('data-index');
			// callgetcontentdetails(sectionId,sectionIndex);
		});
		function callgetcontentdetails(sectionId,sectionIndex) {
			// console.log("sectionId lll"+[sectionId])
			console.log("this is section_id" +" "+ sanjayObj)
			var content_description = '';
			console.log("sectionIndex="+sectionIndex);
			console.log(sanjayObj[sectionId][sectionIndex]);
			if ( sanjayObj[sectionId][sectionIndex]['description'] != null) {
				var story = truncate(sanjayObj[sectionId][sectionIndex]['description']);
				var story = story;
			} else {
				var story = "";
			}

			if (sanjayObj[sectionId][sectionIndex].title != null) {
				var name = sanjayObj[sectionId][sectionIndex].title;
			} else {
				var name = '';
			}

			// if (sanjayObj[sectionId][sectionIndex].video_duration != null) {

			// 	var videoduration = sanjayObj[sectionId][sectionIndex].video_duration;
			// }
			// else {
			// 	var videoduration = '';
			// }

			// var genreHtml = '';
			// var releaseDateHtml = '';
			// var durationHtml = '';
			// var duration = videoduration;

			// content_description += '<div class="col-lg-5 col-md-6 col-sm-6">' +
			// 	'<h1 class="heading">' + name + '</h1>' +
			// 	'<div class="title-bar"></div>' +
			// 	'<div class="p-light mb-3 text-muted"><span>' + releaseDateHtml + '</span> <span>|</span> <span>' + genreHtml + '</span> <span>|<span> </span>' + duration + '</span></div>' +
			// 	'<p>' + story + '</p>';
			// console.log("this is bannar" + " "+sanjayObj[sectionId][J].hdPosterUrl)

			if (sanjayObj[sectionId][sectionIndex].hdPosterUrl != null) {

				var body = document.getElementsByClassName('banner-home')[0];

				body.style.backgroundImage = 'url(' + sanjayObj[sectionId][sectionIndex].hdPosterUrl + ')';
				body.style.backgroundRepeat = 'no-repeat';
				body.style.backgroundPosition = 'left top';
				body.style.backgroundAttachment = 'scroll';
				body.style.maxWidth = '100%';
				body.style.backgroundSize = 'cover';

			} else {

				$('body').css('background-color', '#000000');

			}

			$('#content_description_on_banner').html(content_description);
			$('#name').html(name);
			$('#summary').html(story);
			// $('#year').html(releaseDateHtml);
			// $('#gen').html(genreHtml);
			// $('#time').html(videoduration);
			$('#titlebar').show();

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
			durationText = parseInt((hour * 60)) + parseInt(minute) + "m";
			// console.log("duration text === " + durationText)
			return durationText;
		}

		function truncate(string) {
			if (string.length > 150)
				return string.substring(0, 150) + '...';
			else
				return string;
		};
	
		function quitBox(cmd) {
			if (cmd == 'quit') {
				open(location, '_self').close();
			}
			return false;
		}

		$(document).on("click", "a.logout", function () {
			if (confirm('Are you sure want to Logout?')) {
				//$(this).prev('span.text').remove();
				localStorage.removeItem("loginstr");
				$(location).attr('href', "prelogin.html");
			}
		});



	

		$(document).on("click", ".left-menu p", function () {
			var currentId = $(this).attr("id");
			
			if (currentId == "searchcontent") {
				var player_href = "search.html";
				$(location).attr('href', player_href);
			} else if (currentId == "homepage") {
				var player_href = "home.html";
				$(location).attr('href', player_href);
			} 
			// else if (currentId == "kidddy") {
			// 	var player_href = "kids.html";
			// 	$(location).attr('href', player_href);
			// } 
			else if (currentId == "categorylisting") {
				var player_href = "categorieslist.html";
				$(location).attr('href', player_href);
			} else if (currentId == "channels") {
				window.close();
			} else if (currentId == "set") {
				if (click == false) {
					click = true
					$(test).insertAfter('#set');
				} else {
					click = false
					$('.delete').remove();
				}
			} else if (currentId == "termsandcondition") {
				var commonvalue = "TERMS AND CONDITION";
				var player_href = "privacy.html?commonkey=" + commonvalue + "";
				$(location).attr('href', player_href);

			} else if (currentId == "aboutus") {
				var player_href = "aboutus.html";
				$(location).attr('href', player_href);
			} else if (currentId == "privacypolicy") {
				var commonvalue = "PRIVACY POLICY";
				var player_href = "privacy.html?commonkey=" + commonvalue + "";
				$(location).attr('href', player_href);
			}
		});

		$(".left-menu p").mouseover(function () {
			$(".left-menu p").css('cursor', 'pointer');
			var $current = $('.active');
			$current.removeClass('active');
			$(this).addClass('active');
			$(".image-container-category").removeClass('temp-right');
			$(".container-fluid").addClass('right-padding');

			var id = $(this).attr("id");
			console.log(id);
		});



		$(document).on("click", ".card a", function () {
			var currentId = $(this).attr("id");
			// console.log(currentId);
			var indexId = currentId.split("_");
			var sectionId = $(this).attr("data-sectionid");
			var muviurl = sanjayObj[sectionId][indexId[2]].url;
			// var srt_url = sanjayObj[sectionId][indexId[2]].srt_url;
			console.log(muviurl);
			if (muviurl == "" || muviurl == null || muviurl == undefined) {
				$('#nocontent').html("No video url available");
				$('#nocontent').show();
				var timer = setTimeout(function () {
					$('#nocontent').hide();
				}, 1000);
			} else {
				// var player_href = "hlsplayer.html?conunter=" + muviurl;
				// $(location).attr('href', player_href);

					localStorage.setItem("url", muviurl);
					var player_href = "LatestJwplayer.html?&" + muviurl;
					$(location).attr('href', player_href);

			}
		});

		$(document).on({
			mouseenter: function () {
				// console.log("hiii");
				if ($('.exit').is(':visible') == false) {
					var $current = $('.active');
					$current.removeClass('active');
					$(this).addClass('active');
					$(".image-container-category").addClass('temp-right');
					$(".container-fluid").removeClass('right-padding');

					var id = $(this).attr("id");
					console.log('id='+id);
					var indexId = id.split("_");
					var sectionId = $(this).attr("data-sectionid");
					callgetcontentdetails(sectionId, indexId[2]);
				}
			},
			mouseleave: function () {
				// console.log('mouseleave');
			}
		}, "div.border-inside .cardDetails");


		$(document).on({
			mouseenter: function () {
				var $current = $('.active');
				$current.removeClass('active');
				$(this).addClass('active');
			},
			mouseleave: function () {
				// console.log('mouseleave');
			}
		}, "#exit_noBtn , #exit_yesBtn");


		function currentData() {
			var $current = $('.active');
			var nextElmId = $current.get()[0].id;
			console.log("nextElmId"+nextElmId)
			var indexId = nextElmId.split("_");
			var sectionId = $("#" + nextElmId).attr("data-sectionid");
			callgetcontentdetails(sectionId, indexId[2]);

		}

		document.onkeydown = checkKey;
		function checkKey(e) {
			var position;
			e = e || window.event;
			
			console.log(e.keyCode)

			if (e.keyCode == '38') {
				//console.log("up arrow");
				var $current = $('.active');
				position = $current.parent().get()[0].id;
				if (position == "seanson_div") {
					if ($current.prev().length > 0) {
						$current.removeClass('active');
						$current.prev().addClass('active');
					}
				} else {
					if ($current.parent().parent().parent().prev().hasClass("row")) {
						$current.removeClass('active');
						$current.parent().parent().parent().prev().removeClass('d-none');
						$current.parent().parent().parent().prev().children('div').eq(1).children('div').eq(0).children('a').addClass('active');
						currentData();
					} 
					else {

					}
				}

				document.querySelector(".active").parentNode.parentNode.style.transform="translate(0,0)"


			}
			else if (e.keyCode == '40') {
				//console.log("down arrow");
				var $current = $('.active');
				position = $current.parent().get()[0].id;

				if (position == "seanson_div") {
					if ($current.next().length > 0) {
						$current.removeClass('active');
						$current.next().addClass('active');

					}
				} else {
					if (position != "up") {
						if ($current.parent().parent().parent().next().hasClass("row")) {
							$current.removeClass('active');
							$current.parent().parent().parent().addClass('d-none');
							$current.parent().parent().parent().next().children('div').eq(1).children('div').eq(0).children('a').addClass('active');
							//alert($current.parent().parent().parent().next().children('div').eq(1).children('div').eq(0).children('a').get()[0].id);
							currentData();
						}
					} else {
						$current.removeClass('active');
						$("#content_row").children('div').eq(0).children('div').eq(1).children('div').eq(0).children('a').addClass('active');
					}
				}



				document.querySelector(".active").parentNode.parentNode.style.transform="translate(0,0)"

			}
			else if (e.keyCode == '37') {
				//console.log("left");

				console.log(document.querySelector(".active").parentElement.getAttribute("id"))
				if (document.querySelector(".active").parentElement.getAttribute("id")=="seanson_div") {
					return false
				}

				var $current = $('.active');
				var crtparentId = $current.parent().parent().attr("id");
				
				var dataIndex=parseInt(document.querySelector(".active").parentNode.getAttribute("data-index"));
				// console.log(181*(dataIndex-1));

	
				if(dataIndex>7){
					document.querySelector(".active").parentNode.parentNode.style.transform="translate("+-181*(dataIndex-8)+"px,0)";
				}else{
					document.querySelector(".active").parentNode.parentNode.style.transform="translate("+-0*(dataIndex)+"px,0)"
				}

				var nextElmId = $current.get()[0].id;
				var indexId = nextElmId.split("_");
				if (indexId[2] == '0') {
					$current.removeClass('active');
					$(".left-menu").children('p').eq(0).addClass('active');
					$(".image-container-category").removeClass('temp-right');
					$(".container-fluid").addClass('right-padding');

				} else {
					if (crtparentId == "exitParentId") {
						if ($current.prev().length > 0) {
							$current.removeClass('active');
							$current.prev().addClass("active");
						}
					}


					else {
						console.log(crtparentId)
						//$("#" + crtparentId).prepend($("#" + crtparentId + "> div").last().get()[0]);
						// console.log($current.parent().prev().length);
						if ($current.parent().prev().length > 0) {
							$current.removeClass('active');
							$current.parent().prev().children('a').addClass('active');
							currentData();
						}
					}
				}




			}
			else if (e.keyCode == '39') {
				//console.log("right arrow");


				var $current = $('.active');

				var dataIndex=parseInt(document.querySelector(".active").parentNode.getAttribute("data-index"));
				var lastRow=$current.parent().parent().find("div.card:last-child").attr("data-index");
				// console.log(-181*(dataIndex+1));
				if(dataIndex>4 ){
					if ( parseInt(lastRow)<=(dataIndex+4)) {
						
					}
					else{
						document.querySelector(".active").parentNode.parentNode.style.transform="translate("+-181*(dataIndex-3)+"px,0)";

					}
				}

				var tempParentId = $current.parent().get()[0].id;
				// console.log(currRow+"=="+dataIndex);
				if (tempParentId == "seanson_div") {
					$current.removeClass('active');
					$("#content_row").children().removeClass("d-none");
					$('#content_row').children('div').eq(0).children('div').eq(1).children('div').eq(0).children('a').addClass('active');
					$(".image-container-category").addClass('temp-right');
					$(".container-fluid").removeClass('right-padding');


				} else if (tempParentId == "exitBtn-container") {
					if ($current.next().length > 0) {
						$current.removeClass('active');
						$current.next().addClass("active");
					}
				} else {
					//var crtparentId = $current.parent().parent().get()[0].id;

					if ($current.parent().next().length > 0) {
						
						$current.removeClass('active');
						$current.parent().next().children('a').addClass('active');
						//$current.parent().remove();
						//$("#" + crtparentId).append($current.parent().get()[0]);

						var $current = $('.active');
						var nextElmId = $current.get()[0].id;
						var indexId = nextElmId.split("_");
						currentData();
					}
				}




			}

			else if(e.keyCode=="1009"){
				webOS.platformBack();
				document.querySelector(".active").classList.remove("active")
				// document.querySelectorAll(".btn-lg")[0].classList.add("active")
				document.querySelector(".logout").style.display="block"
				console.log(document.querySelector(".exitModalBtn"))
				document.querySelectorAll(".exitModalBtn")[0].classList.add("active")

				// var $current = $('.active');



			}
			else if(e.keyCode=="461"){
				webOS.platformBack();
		

			}
			else if(e.keyCode=="8"){
				webOS.platformBack();
				document.querySelector(".active").classList.remove("active")
				// document.querySelectorAll(".btn-lg")[0].classList.add("active")
				document.querySelector(".logout").style.display="block"
				// console.log(document.querySelector(".exitModalBtn"))
				document.querySelectorAll(".exitModalBtn")[0].classList.add("active")

				// var $current = $('.active');



			}
			else if (e.keyCode == '13') {
				var $current = $('.active');
				var currentId = $current.get()[0].id;
                                                                   

				if (currentId == "searchcontent") {

					var player_href = "search.html";
					$(location).attr('href', player_href);

				} else if (currentId == "homepage") {
					var player_href = "home.html";
					$(location).attr('href', player_href);
				} else if (currentId == "kidddy") {
					var player_href = "kids.html";
					$(location).attr('href', player_href);
				} else if (currentId == "categorylisting") {
					var player_href = "categorieslist.html";
					$(location).attr('href', player_href);
				} else if (currentId == "channels") {

				
					window.close();


				} else if (currentId == "set") {

					if (click == false) {
						click = true
						$(test).insertAfter('#set');
					} else {
						click = false
						$('.delete').remove();
					}




				} else if (currentId == "termsandcondition") {

					var commonvalue = "TERMS AND CONDITION";
					var player_href = "privacy.html?commonkey=" + commonvalue + "";
					$(location).attr('href', player_href);

				} else if (currentId == "aboutus") {

					var player_href = "aboutus.html";
					$(location).attr('href', player_href);

				} else if (currentId == "privacypolicy") {

					var commonvalue = "PRIVACY POLICY";
					var player_href = "privacy.html?commonkey=" + commonvalue + "";
					$(location).attr('href', player_href);

				} else if (currentId == "exit_noBtn") {
					$("#content_row").children().removeClass("d-none");
					$("#content_row").children('div').eq(0).children('div').eq(1).children('div').eq(0).children('a').addClass('active');
					currentData();
					$('.exit').hide();
				} else if (currentId == "exit_yesBtn") {
					window.close();
				} else {
					var sectionIndex = $current.find("img").attr('data-index');
					var $current = $('.active');
					var nextElmId = $current.get()[0].id;
					var indexId = nextElmId.split("_");
					var sectionId = $("#" + nextElmId).attr("data-sectionid");
					// console.log(sanjayObj[sectionId][indexId[2]])
					var muviurl = sanjayObj[sectionId][indexId[2]].url;
					// console.log(muviurl)
					// var movieSRT=sanjayObj[sectionId][indexId[2]].srt_url
					var title = sanjayObj[sectionId][indexId[2]].title;
					// var time = sanjayObj[sectionId][indexId[2]].video_duration;
					var videoid = sanjayObj[sectionId][indexId[2]].id;
					var bg_image = sanjayObj[sectionId][indexId[2]].hdPosterUrl;
					var descr = sanjayObj[sectionId][indexId[2]].description;


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
							localStorage.setItem("video_type", "VOD");
							
							
						} else {
							localStorage.setItem("video_type", "VOD");
						}
						localStorage.setItem("videoidd", videoid)
						localStorage.setItem("url", muviurl);
						// localStorage.setItem("video_time", time);
						localStorage.setItem("discription", descr);
						localStorage.setItem("movie_title", title);
						// localStorage.setItem("srt_url",movieSRT);
						localStorage.setItem("background_img_url",bg_image)
					
	
						location.href="preview.html";
						// window.location = "player.html";

						// var player_href = "hlsplayer.html?conunter=" + muviurl;
						// $(location).attr('href', player_href);

						// var player_href = "LatestJwplayer.html?&" + muviurl+"&"+movieSRT;                                             //--------playing vedio player
						// $(location).attr('href', player_href);
					}
				}

			} 
		
		}
	document.querySelector(".image-container-category").addEventListener("mousemove",function(){
		// console.log("first")
		document.querySelectorAll(".iconNavigation")[0].style.opacity=1
		document.querySelectorAll(".iconNavigation")[1].style.opacity=1
		setTimeout(function(){
		document.querySelectorAll(".iconNavigation")[0].style.opacity=0
		document.querySelectorAll(".iconNavigation")[1].style.opacity=0

		},2000)
	})
	document.querySelector(".rightIcon").addEventListener("click",function(){
		var $current = $('.active');

				var dataIndex=parseInt(document.querySelector(".active").parentNode.getAttribute("data-index"));
				var lastRow=$current.parent().parent().find("div.card:last-child").attr("data-index");
				// console.log(-181*(dataIndex+1));
				if(dataIndex>4 ){
					if ( parseInt(lastRow)<=(dataIndex+4)) {
						
					}
					else{
						document.querySelector(".active").parentNode.parentNode.style.transform="translate("+-181*(dataIndex-3)+"px,0)";

					}
				}

				var tempParentId = $current.parent().get()[0].id;
				// console.log(currRow+"=="+dataIndex);
				if (tempParentId == "seanson_div") {
					$current.removeClass('active');
					$("#content_row").children().removeClass("d-none");
					$('#content_row').children('div').eq(0).children('div').eq(1).children('div').eq(0).children('a').addClass('active');
					$(".image-container-category").addClass('temp-right');
					$(".container-fluid").removeClass('right-padding');


				} else if (tempParentId == "exitBtn-container") {
					if ($current.next().length > 0) {
						$current.removeClass('active');
						$current.next().addClass("active");
					}
				} else {
					//var crtparentId = $current.parent().parent().get()[0].id;

					if ($current.parent().next().length > 0) {
						
						$current.removeClass('active');
						$current.parent().next().children('a').addClass('active');
						//$current.parent().remove();
						//$("#" + crtparentId).append($current.parent().get()[0]);

						var $current = $('.active');
						var nextElmId = $current.get()[0].id;
						var indexId = nextElmId.split("_");
						currentData();
					}
				}

	})
	document.querySelector(".leftIcon").addEventListener("click",function(){
		var $current = $('.active');
				var crtparentId = $current.parent().parent().attr("id");
				var dataIndex=parseInt(document.querySelector(".active").parentNode.getAttribute("data-index"));
				// console.log(181*(dataIndex-1));

	
				if(dataIndex>7){
					document.querySelector(".active").parentNode.parentNode.style.transform="translate("+-181*(dataIndex-8)+"px,0)";
				}else{
					document.querySelector(".active").parentNode.parentNode.style.transform="translate("+-0*(dataIndex)+"px,0)"
				}

				var nextElmId = $current.get()[0].id;
				var indexId = nextElmId.split("_");
				if (indexId[2] == '0') {
					$current.removeClass('active');
					$(".left-menu").children('p').eq(0).addClass('active');
					$(".image-container-category").removeClass('temp-right');
					$(".container-fluid").addClass('right-padding');

				} else {
					if (crtparentId == "exitParentId") {
						if ($current.prev().length > 0) {
							$current.removeClass('active');
							$current.prev().addClass("active");
						}
					} else {
						//$("#" + crtparentId).prepend($("#" + crtparentId + "> div").last().get()[0]);
						// console.log($current.parent().prev().length);
						if ($current.parent().prev().length > 0) {
							$current.removeClass('active');
							$current.parent().prev().children('a').addClass('active');
							currentData();
						}
					}
				}

	})

	});

};
//window.onload can work without <body onload="">


window.onload = init;


function cancel() {
	$('.logout').hide();
	$("#content_row").children().removeClass("d-none");
	$("#content_row").children('div').eq(0).children('div').eq(1).children('div').eq(0).children('a').addClass('active');
	currentData();

}

function exit() {
	window.close();
}

