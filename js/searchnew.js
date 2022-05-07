var mainfocus = 0;
var init = function () {
	var searchresponse=[] ;  	                                        
	var MovieDetails={};
	var section = new Array();
	var sectionObj = {};
	var row;
	var release_date = '';
	var scroll = "200";
	var focuscolor = '#0cb9f2';

	var genre = '';



	$('#navbarcontent').show();


	function searchapicall() {
		//searchvalue="a";
		searchvalue = document.getElementById('searchcontent').value;
		console.log("search value text==" + searchvalue);
		if (searchvalue != "") {
			var searchxhr = new XMLHttpRequest();
			//var data ="authToken="+authtoken+"&q="+searchvalue+"&lang_code="+lang_code+"&limit=500";
			var url = "http://trlxfr.com/admin/data/feeds/sdk/film_plug_prod_v1";
			searchxhr.onreadystatechange = function () {
				$('#spinner').show();
				$('.toast').hide();
				if (this.readyState == 4 && this.status == 200) {
					$('#spinner').hide();
					// searchresponse = JSON.parse(this.responseText);
				
					var homepage_response = JSON.parse(this.responseText);
					sectionObj = homepage_response;                                                                            														
					movieList=homepage_response.movies;	
						 MovieDetails = movieList.filter((element)=> {	
								if (element.title.includes(searchvalue)){			
									return true;									
								}												
							})	
				
							searchresponse.push({
							// "genre_id" :i,
							// "genre_name":section_name,	
							"contents": MovieDetails,
							
						});
							
					var secton_length = searchresponse[0].contents.length;
					console.log(secton_length)
					var curr_row_start_value = 0;
					var search_banner = '';
					//var content_row_length=1;					
					var total_row = Math.ceil(secton_length / 2);
					if (total_row == 1) {
						var content_row_length = 1;
					} else {
						var content_row_length = 2;
					}
					if (total_row == 0) {
						if (localStorage.getItem("no_content") != null) {
							$('#nocontent').html(localStorage.getItem("no_content"));
						} else {
							$('#nocontent').html("There is no content available");
						}
						$('#nocontent').show();

						var timer = setTimeout(function () {

							$('#nocontent').hide();

						}, 1000);
						//alert("There is no Content Available")
						$('#content_banner').hide();
					}
					console.log("Total row value==" + total_row);
					for (var j = 0; j < total_row; j++) {

						var row_index = "row" + j;
						for (var i = curr_row_start_value; i < content_row_length; i++) {

							if (searchresponse[0].contents.length != null && searchresponse[0].contents.length > 0) {

								// for(i=0;i<searchresponse.search.length;){

								if (searchresponse[0].contents[i]['title'] != null) {
									genre = searchresponse[0].contents[i]['title'];

								}
								else {
									var genre = '';
								}
								if (searchresponse[0].contents[i]['releaseYear'] != null) {
									var video_duration = searchresponse[0].contents[i]['releaseYear'];
								}
								else {
									var video_duration = '';
								}

								var genreHtml = '';
								// var releaseDateHtml = '';
								var durationHtml = '';

								if (!genre == "") {
									genreHtml = '' + genre + '';
								}

								// if (!release_date == "") {
								// 	releaseDateHtml = '' + release_date + '';
								// }
								if (!video_duration == "") {
									durationHtml = '' + video_duration + '';
								}



								if (searchresponse[0].contents[i]['hdPosterUrl'] != "null") {



									search_banner += '<div focusable class="col-6 mb-5 ' + row_index + '" data-row=' + row_index + ' id="searchclick_' + i + '" data-perma=' + searchresponse[0].contents[i]['url'] + '>' +
										'<div class="row">' +
										'<div class="col-5">' +
										'<img id="search_image" src=' + searchresponse[0].contents[i]['hdPosterUrl'] + ' class="imgsec" />' +
										'</div>' +
										'<div class="col-7 mt-4">' +
										'<h3>' + searchresponse[0].contents[i]['title'] + '</h3>' +
										'<div class="title-bar mt-2"></div>' +
										'<p class="text-muted elipsecl font-22"><span class="genreVal">' + genreHtml + '</span><span class="bar">   |   </span><span class="durationVal">' + durationHtml + '</span></p>' +
										'</div>' +
										'</div>' +
										'</div>';

									if (genreHtml !== null) {
										$('.bar').addClass('show');
									} else {
										$('.bar').removeClass('show').addClass('hide');
									}


								// }

								} else {

									search_banner += '<div focusable class="col-6 mb-5 ' + row_index + '" data-row=' + row_index + ' id="searchclick_' + i + '" data-perma=' + searchresponse.movie[i]['movie_url'] + '>' +
										'<div class="row">' +
										'<div class="col-5">' +
										'<img id="search_image" src="images/lang-bg.jpg" class="img-fluid border-inside" />' +
										'</div>' +
										'<div class="col-7 mt-4">' +
										'<h3>' + searchresponse[0].contents[i]['title'] + '</h3>' +
										'<div class="title-bar mt-2"></div>' +
										'<p class="text-muted elipsecl font-22"><span class="genreVal">' + genreHtml + '</span><span class="bar">   |   </span><span class="durationVal">' + durationHtml + '</span></p>' +
										'</div>' +
										'</div>' +
										'</div>';


								}



								$('.genreVal').each(function () {
									if ($(this).html() == "") {
										$(this).prev().css('display', 'none');
									}
								});

								$('.durationVal').each(function () {
									if ($(this).html() == "") {
										$(this).prev().css('display', 'none');
									}
								});


								$('#content_banner').show();



							} else {

								$('#nocontent').html("There is no Content Available");
								$('#nocontent').show();

								var timer = setTimeout(function () {

									$('#nocontent').hide();

								}, 1000);
								//alert("There is no Content Available")
								$('#content_banner').hide();
								//$('.toast').text("There is no Content Available").fadeIn(400).delay(3000).fadeOut(400);
							}




						}
						content_row_length = content_row_length + 2;
						if (content_row_length > secton_length) {
							content_row_length = secton_length;
						}
						curr_row_start_value = curr_row_start_value + 2;
					}

					$('#content_banner').html(search_banner);






				}//ready state if close
			}
			searchxhr.open("GET", url, true);
			searchxhr.send();
		} else {
			$('#nocontent').html("Enter text to search");
			$('#nocontent').show();

			var timer = setTimeout(function () {

				$('#nocontent').hide();

			}, 1000);
			//$('.toast').text("Enter text to search").fadeIn(400).delay(3000).fadeOut(400);

			$('#content_banner').hide();
		}

	}
	
	function homepage() {
		searchvalue = document.getElementById('searchcontent').value;
		console.log("search value text==" + searchvalue);
		var homexhttp = new XMLHttpRequest();
		homexhttp.onreadystatechange = function () {
			$('#spinner').show();
			if (this.readyState == 4 && this.status == 200) {
				$('#spinner').show();
				$('#navbarcontent').show();
				$('#contentdiv').show();
				var homepage_response = JSON.parse(this.responseText);
				// console.log(homepage_response)
				sectionObj = homepage_response;                                                                            // Api response
				section_name = homepage_response.categories														   // categories
				movieList=homepage_response.movies;
				// console.log(movieList)
				let num=0;
				// for (i=0; i<movieList.length;i++){
					// console.log("This is i"+" "+ i)
					// catnameList = homepage_response.categories[i].query;
					// // console.log(catnameList)
					// section_id="section_id"+[i];
					// section_name= homepage_response.movies[i].title;
					// console.log(section_name)
					
					 MovieDetails = movieList.filter((element)=> {
						//  console.log(element.title)	
						//  console.log("Seacrchvalue+==="+searchvalue)				
							if (element.title.includes(searchvalue)){			
								return true;									
							}												
						})	
						// console.log(MovieDetails)
						searchresponse.push({
						// "genre_id" :i,
						// "genre_name":section_name,	
						"contents": MovieDetails,
						
					});
						
				// }	
				// allDetails.forEach((info)=>{
				// 	var sectionId=info.genre_id
				// 	callgetAppFeatureContent(sectionId,info.genre_name,info.genre_id);

				// })			
				
			}			
	
				
		};
		homexhttp.open("GET", "http://trlxfr.com/admin/data/feeds/sdk/film_plug_prod_v1", true);
		homexhttp.send();
		
	}
	

	console.log(searchresponse)

	
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
		durationText = parseInt((hour * 60)) + parseInt(minute) + " m";
		return durationText;
	}


	$(document).on({
		mouseenter: function () {
			var $current = $('.active');
			$current.removeClass('active');
			$(this).addClass('active');
		},
		mouseleave: function () {
			console.log('mouseleave');
		}
	}, ".srchicon");

	$(document).on({
		mouseenter: function () {
			var $current = $('.active');
			$current.removeClass('active');
			$(this).addClass('active');
		},
		mouseleave: function () {
			console.log('mouseleave');
		}
	}, "#content_banner .col-6");


	$(document).on({
		mouseenter: function () {
			var $current = $('.active');
			$current.removeClass('active');
			$(this).addClass('active');
		},
		mouseleave: function () {
			console.log('mouseleave');
		}
	}, "#searchcontent");

	$(document).on("click", ".srchicon", function () {
		searchapicall();
	});

	$(document).on("click", "#content_banner .col-6", function () {
		var movie_permlink = $(this).attr("data-perma");
		var content_types_id = $(this).attr("data-contenttypes");

		if (movie_permlink == "" || movie_permlink == null || movie_permlink == undefined) {
			$('#nocontent').html("No video url available");
			$('#nocontent').show();
			var timer = setTimeout(function () {
				$('#nocontent').hide();
			}, 1000);
		} else {
			// var player_href = "hlsplayer.html?conunter=" + movie_permlink;
			// $(location).attr('href', player_href);

			var str = movie_permlink.split('.').pop().split(/\#|\?/)[0];
			if (str == "m3u8") {
				localStorage.setItem("video_type", "live")
			} else {
				localStorage.setItem("video_type", "VOD");
			}
			localStorage.setItem("videoidd", "videoid")
			localStorage.setItem("url", movie_permlink);
			//window.location = "player.html";
			// conunter
			var player_href = "Avplayer.html?&" + movie_permlink;
			$(location).attr('href', player_href);
		}
	});



	document.onkeydown = checkKey;
	function checkKey(e) {
		console.log(e.keyCode)
		e = e || window.event;

		if (e.keyCode == '38') {
			// up arrow
			var $current = $('.active');
			var currentId = $current.get()[0].id;
			if (currentId != "search_icon") {
				var imageBody = currentId.split('_');
				var index = parseInt(imageBody[1]);
				var nextId = index - 2;
				if ($('#searchclick_' + nextId).length > 0) {
					var rowData = $('#' + currentId).attr('data-row');
					var rowIndex = parseInt(rowData.substring(3));
					$('.row' + (rowIndex - 2)).removeClass('d-none');
					$current.removeClass('active')
					$('#searchclick_' + nextId).addClass('active');

				} else {
					$current.removeClass('active')
					$('#search_icon').addClass('active')
				}
			}


		} else if (e.keyCode == '40') {
			// down arrow
			var $current = $('.active');
			var currentId = $current.get()[0].id;
			//For search icon
			if (currentId == "search_icon") {
				if ($("#content_banner").children().length > 0) {
					$current.removeClass('active')
					$("#content_banner").children('div').eq(0).addClass('active');
				}
			} else {
				var imageBody = currentId.split('_');
				var index = parseInt(imageBody[1]);
				var nextId = index + 2;
				if ($('#searchclick_' + nextId).length > 0) {
					if (index > 1 && (index % 2) == 0 || (index % 2) == 1) {
						var rowData = $('#' + currentId).attr('data-row');
						var rowIndex = parseInt(rowData.substring(3));
						$('.row' + (rowIndex - 1)).addClass('d-none');
						$current.removeClass('active')
						$('#searchclick_' + nextId).addClass('active');
					} else {
						$current.removeClass('active')
						$('#searchclick_' + nextId).addClass('active');
					}

				}

			}


		} else if (e.keyCode == '37') {
			// left key arrow

			var $current = $('.active');
			var currentId = $current.get()[0].id;
			//For search icon
			if (currentId == "search_icon") {
				$current.removeClass('active')
				$('#searchcontent').addClass('active')
				$("#searchcontent").focus().val($("#searchcontent").val());
				//var SearchInput = $('#searchcontent');
				//var strLength= SearchInput.val().length;
				// SearchInput.focus();
				//document.getElementById('searchcontent').setSelectionRange(strLength, strLength);

				//document.getElementsByTagName("input")[0].focus();
				//document.getElementsByTagName("input")[0].setSelectionRange(document.getElementsByTagName("input")[0].value.length,document.getElementsByTagName("input")[0].value.length,"forward");
				//$('#searchcontent').focus();
				//searchvalue=document.getElementById('searchcontent').value;
				//document.getElementById('searchcontent').setSelectionRange(searchvalue.length, searchvalue.length+1);
			} else {
				if ($current.prev().length > 0) {
					var imageBody = currentId.split('_');
					var index = parseInt(imageBody[1]);
					if ((index % 2) == 1) {
						var rowData = $('#' + currentId).attr('data-row');
						var rowIndex = parseInt(rowData.substring(3));
						$('.row' + (rowIndex - 3)).removeClass('d-none');
						$current.removeClass('active')
						$current.prev().addClass('active')
					} else {
						$current.removeClass('active')
						$current.prev().addClass('active')
					}
				}
			}

		} else if (e.keyCode == '39') {
			// right arrow
			var $current = $('.active');
			var currentId = $current.get()[0].id;
			//For search icon
			if (currentId == "searchcontent") {
				$current.removeClass('active')
				$('#search_icon').addClass('active')
				$('#searchcontent').blur();
			} else {
				var imageBody = currentId.split('_');
				var index = parseInt(imageBody[1]);

				if ($current.next().length > 0) {
					if (index > 3 && (index % 2) == 1) {
						var rowData = $('#' + currentId).attr('data-row');
						var rowIndex = parseInt(rowData.substring(3));
						$('.row' + (rowIndex - 2)).addClass('d-none');
						$current.removeClass('active')
						$current.next().addClass('active')
					} else {
						$current.removeClass('active')
						$current.next().addClass('active')
					}

				}

			}


		} 
		else if(e.keyCode==461){
			window.history.back()
		}
		else if(e.keyCode==8){
			window.history.back()
		}
		else if (e.keyCode==10009){
			window.history.back()
		}
		else if (e.keyCode == '13') {
			var $current = $('.active');
			var currentId = $current.get()[0].id;



			if (currentId == "search_icon") {

				searchapicall();
				// homepage();
			} else if (currentId == "searchcontent") {

				$('#searchcontent').focus();
				searchapicall();
				// homepage();
			} else {
				var movie_permlink = $("#" + currentId).attr("data-perma");
				var content_types_id = $("#" + currentId).attr("data-contenttypes");

				if (movie_permlink == "" || movie_permlink == null || movie_permlink == undefined) {

					$('#nocontent').html("No video url available");
					$('#nocontent').show();

					var timer = setTimeout(function () {

						$('#nocontent').hide();

					}, 1000);
				} else {

					// var player_href = "hlsplayer.html?conunter=" + movie_permlink;
					// $(location).attr('href', player_href);

					var str = movie_permlink.split('.').pop().split(/\#|\?/)[0];
					if (str == "m3u8") {
						localStorage.setItem("video_type", "live")
					} else {
						localStorage.setItem("video_type", "VOD");
					}
					localStorage.setItem("videoidd", "videoid")
					localStorage.setItem("url", movie_permlink);
					//window.location = "player.html";

					var player_href = "Avplayer.html?&" + movie_permlink;
					$(location).attr('href', player_href);


				}

				//$('#searchcontent').focus()
			}


		} else if (e.keyCode == '10009') {

			window.history.back();

		} else if (e.keyCode == '461') {
			// left key arrow
			window.history.back();


		}
		else {

		}

	}//End checkKey





	/*document.addEventListener("keydown", function(ev) {
	 switch (ev.keyCode) {
	 case 37:
		 // Handle mandatory key
		 break;
		 case 38:
		 // Handle mandatory key
		 break;
		 case 39:
		 // Handle mandatory key
		 break;
		 case 40:
		 // Handle mandatory key
		 break;
		 case 13:
		 // Handle mandatory key Confirm / Select / OK
		 break;
		 case 461:
			 window.history.back();
			break;
		 case 10009:
			 window.history.back();
			 break;
	 case VK_BACK_SPACE:
			window.history.back();
	 break;
	 }
	 // Block the browser from handling the keydown event.
	 ev.preventDefault();
	}, false);*/


};
//window.onload can work without <body onload="">
window.onload = init;




