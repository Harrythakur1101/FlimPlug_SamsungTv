document.addEventListener('keydown',function(e){
    switch(e.keyCode){
        // case 40:  //Down key
        // $('#play').addClass('activeted')
        //     break;
        case 13: //ok key | Enter key
        var movie_url=localStorage.getItem("url");
        $('#play').removeClass('activeted')
        this.location.href='Avplayer.html';
        var player_href = "Avplayer.html?&" + movie_url; 
		 $(location).attr('href', player_href);
        break;
        case 8: //BackButton
					window.history.back()
		break;
        case 10009: //RETURN button
        //tizen.application.getCurrentApplication().exit();
        window.history.back();
        break;
    }
})

$(document).ready(function(){


    $('#play').addClass('activeted');
    var movie_title=localStorage.getItem("movie_title");
    var duration=localStorage.getItem("video_time");
    var desc=localStorage.getItem("discription");
    var movie_title=localStorage.getItem("movie_title");
    var bg_image = localStorage.getItem("background_img_url");
    var body = document.getElementsByClassName('banner-home')[0];
		
			body.style.backgroundImage = 'url(' + bg_image + ')';
            console.log(desc)
            $('#name').html(movie_title)
			// $('#year').html(duration);
			$('#titlebar').show();
			$('#summary').html(desc);
            $(".banner-home").attr("url",bg_image);
})  