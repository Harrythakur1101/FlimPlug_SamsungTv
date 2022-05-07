var playButton;
var videoContent;
var adDisplayContainer;
var adsLoader;
var adsManager;
var playClicked;
var Adsstarted = false;
var contentCompleteCalled = false;
var category_list = {};
var sanjayObj = {};
var muviurl = "";

function init() {
	videoContent = document.getElementById('contentElement');
	playButton = document.getElementById('playButton');
	playButton.addEventListener('click', onPlayClicked);
	videoContent.addEventListener("playing", Playingg);
	videoContent.addEventListener("ended", Ended);
	setUpIMA();

	document.getElementById("playButton").click();

	function getParameterByName(name, href) {
		name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
		var regexS = "[\\?&]" + name + "=([^&#]*)";
		var regex = new RegExp(regexS);
		var results = regex.exec(href);
		if (results == null)

			return 0;

		else

			return decodeURIComponent(results[1].replace(/\+/g, " "));

	}

	muviurl = getParameterByName("conunter", window.location.href);


	videoContent.onwaiting = function () {

		document.getElementById("spinner").style.display = "block";

	};


	videoContent.addEventListener('loadedmetadata', function () {

		function formatTime(seconds) {
			var minutes = Math.floor(seconds / 60);
			minutes = (minutes >= 10) ? minutes : minutes;
			var hours = Math.floor(minutes / 60);
			hours = (minutes >= 10) ? hours : hours;
			var seconds = Math.floor(seconds % 60);
			seconds = (seconds >= 10) ? seconds : seconds;
			return hours + ":" + minutes + ":" + seconds;
		}

		var totaltimee = videoContent.duration;
		totalTime.innerHTML = formatTime(totaltimee);
	});


	videoContent.addEventListener("timeupdate", function () {

		function formatTime(seconds) {
			var minutes = Math.floor(seconds / 60);
			minutes = (minutes >= 10) ? minutes : minutes;
			var hours = Math.floor(minutes / 60);
			hours = (minutes >= 10) ? hours : hours;
			var seconds = Math.floor(seconds % 60);
			seconds = (seconds >= 10) ? seconds : seconds;
			return hours + ":" + minutes + ":" + seconds;
		}


		var seconds = videoContent.currentTime;
		var totaltimee = videoContent.duration;
		currentTime.innerHTML = formatTime(seconds);


		var percentage = (seconds / totaltimee) * 100;

		$('.widthspan').css('width', percentage + "%");

	});



	document.addEventListener('keydown', function (e) {
		console.log("Button clicked: " + e.keyCode);
		switch (e.keyCode) {
			case 37: //LEFT arrow

				if (Adsstarted == false) {

					//forwardRewind(30)
				}

				break;
			case 39: //RIGHT arrow

				if (Adsstarted == false) {

					//forwardRewind(30)
				}

				break;
			case 40: //RIGHT arrow

				break;
			case 13: //OK

				if (Adsstarted == false) {
					// if (videoContent.paused == false) {
					// 	videoContent.pause();
					// 	$('#play').show();
					// 	$('#pause').hide();
					// 	videoContent.firstChild.nodeValue = 'Play';
					// } else {
					// 	videoContent.play();
					// 	$('#play').hide();
					// 	$('#pause').show();
					// 	videoContent.firstChild.nodeValue = 'Pause';
					// }
				}



				break;

			case 461: //OK
				window.history.back();
				break;
			case 10009: //RETURN button


				window.history.back();

				break;
		}
	});

	function forwardRewind(param) {

		videoContent.currentTime += param;

	}
}

function setUpIMA() {
	adDisplayContainer = new google.ima.AdDisplayContainer(
		document.getElementById('adContainer'), videoContent);

	const adsRequest = new google.ima.AdsRequest();
	//adsRequest.adTagUrl = 'https://adserver.gtvads.com/video/b/1be80f8557d640d542da89eb80e05b3b?appName=glewedtv&bundleId=com.release.glewedtv&storeUrl=https://seller.lgappstv.com&ifa=LG178&width=1920&height=1080&cb=100';
	// adsRequest.adTagUrl = 'https://adserver.gtvads.com/video/b/5978847fc504310edccb289f30ecd367?appName=glewedtv&bundleId=G19311013979&ifa={ifa}&width=1920&height=1080&cb={cb}';
	adsRequest.adTagUrl='https://adserver.gtvads.com/video/b/1be80f8557d640d542da89eb80e05b3b?appName={appName}&bundleId={bundleId}&storeUrl={storeUrl}&ifa={ifa}&width=1920&height=1080&cb={cb}' 
	//adsRequest.adTagUrl = '';
	adsRequest.setAdWillAutoPlay(false);
	adsRequest.setAdWillPlayMuted(false);
	adsRequest.linearAdSlotWidth = 640;
	adsRequest.linearAdSlotHeight = 360;
	adsRequest.nonLinearAdSlotWidth = 640;
	adsRequest.nonLinearAdSlotHeight = 150;

	adsLoader = new google.ima.AdsLoader(adDisplayContainer);

	adsLoader.addEventListener(
		google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
		onAdsManagerLoaded,
		false);
	adsLoader.addEventListener(
		google.ima.AdErrorEvent.Type.AD_ERROR,
		onAdError,
		false);
	adsLoader.requestAds(adsRequest);
	Adsstarted = true;
	//videoContent.onended = contentEndedListener;

	// document.getElementById("custom-seekbar").style.display = "none";
	// document.getElementById("rew").style.display = "none";
	// document.getElementById("play").style.display = "none";
	// document.getElementById("pause").style.display = "none";
	// document.getElementById("ff").style.display = "none";
	// document.getElementById("timee").style.display = "block";

}

function contentEndedListener() {



	adsLoader.contentComplete();


}


function Ended() {



	if (Adsstarted == false) {
		Adsstarted = true;
		setUpIMA();
		playAds();

	} else {


	}



}


function onPlayClicked() {
	// videoContent.play();
	playClicked = true;
	if (adsManager) {
		playAds();
	}
}

function Playingg(e) {


	document.getElementById("spinner").style.display = "none";

}

function playAds() {

	adDisplayContainer.initialize();
	adsManager.init(640, 340, google.ima.ViewMode.NORMAL);
	adsManager.start();
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
	const adsRenderingSettings = new google.ima.AdsRenderingSettings();
	adsRenderingSettings.restoreCustomPlaybackStateOnAdBreakComplete = true;

	adsManager = adsManagerLoadedEvent.getAdsManager(
		videoContent, adsRenderingSettings);
	adsManager.addEventListener(
		google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
		onContentPauseRequested);
	adsManager.addEventListener(
		google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
		onContentResumeRequested);
	adsManager.addEventListener(
		google.ima.AdEvent.Type.LOADED,
		onAdLoaded);
	adsManager.addEventListener(
		google.ima.AdErrorEvent.Type.AD_ERROR,
		onAdError);

	var events = [google.ima.AdEvent.Type.ALL_ADS_COMPLETED,
	google.ima.AdEvent.Type.CLICK,
	google.ima.AdEvent.Type.COMPLETE,
	google.ima.AdEvent.Type.FIRST_QUARTILE,
	google.ima.AdEvent.Type.LOADED,
	google.ima.AdEvent.Type.MIDPOINT,
	google.ima.AdEvent.Type.PAUSED,
	google.ima.AdEvent.Type.STARTED,
	google.ima.AdEvent.Type.THIRD_QUARTILE];
	for (var index in events) {
		adsManager.addEventListener(
			events[index],
			onAdfinished,
			false,
			this);
	}

	if (playClicked) {
		playAds();
	}
}


function onContentPauseRequested() {

	videoContent.pause();
}

function onContentResumeRequested() {



}

function onAdLoaded(adEvent) {


	if (adEvent.type == google.ima.AdEvent.Type.LOADED &&
		!adEvent.getAd().isLinear()) {


		videoContent.play();


	}
}


function onAdfinished(adEvent) {

	if (adEvent.type == google.ima.AdEvent.Type.ALL_ADS_COMPLETED) {

		adsManager.destroy();
		adsManager = null;
		adsLoader.contentComplete();
		allAdsCompleted = true;

		Adsstarted = false;



		var url = muviurl;


		// videoContent.src = url;
		// videoContent.load();
		// videoContent.play();

		localStorage.setItem("url", muviurl);
		window.location = "player.html";


		// document.getElementById("custom-seekbar").style.display = "block";
		// document.getElementById("rew").style.display = "block";
		// //document.getElementById("play").style.display = "block";
		// document.getElementById("pause").style.display = "block";
		// document.getElementById("ff").style.display = "block";


	}
}



function onAdError(adErrorEvent) {

	console.log(adErrorEvent.getError());
	//adsManager.destroy();
	adsManager = null;
	adsLoader.contentComplete();
	allAdsCompleted = true;

	Adsstarted = false;

	//$('#nocontent').html("Ads Loading error");
	//$('#nocontent').show();

	var timer = setTimeout(function () {

		$('#nocontent').hide();

	}, 2000);


	var url = muviurl;


	// videoContent.src = url;
	// videoContent.load();
	// videoContent.play();

	localStorage.setItem("url", muviurl);
	window.location = "player.html";

	// document.getElementById("custom-seekbar").style.display = "block";
	// document.getElementById("rew").style.display = "block";
	// //document.getElementById("play").style.display = "block";
	// document.getElementById("pause").style.display = "block";
	// document.getElementById("ff").style.display = "block";



}




// theo player code
this._player.source = source;
this._player.addEventListener('play', onPlay);
var player=this._player
player.preload = 'auto';
player.play()
console.log(player.presentation.currentMode)
// player.presentation.currentMode ="fullscreen"
if (player.presentation.currentMode != 'fullscreen') {
	player.presentation.requestMode('fullscreen');
	}
function togglePlay() {
	if (player.paused) {
		player.play();
		setPlay(true)
	} else {
		player.pause();
		setPlay(false)
	}
}
function toggleFullScreen() {
	if (player.presentation.currentMode === 'fullscreen') {
		 player.presentation.requestMode('inline');
	} else {
		player.presentation.requestMode('fullscreen');
	}
}
function rewind() {
	player.currentTime -= 10; //Subtracts 5 seconds
}
function forward() {
	player.currentTime += 10; //Adds 5 seconds
}
function fastForward() {
	player.currentTime += 30; //Adds 5 seconds
}
function fastbackward() {
	player.currentTime += 30; //Adds 5 seconds
}
// function increaseVolume() {
//     player.volume = Math.min(player.volume + 0.05, 1);
// }
// function decreaseVolume() {
//     player.volume = Math.max(player.volume - 0.05, 1);
// }
function getPressedKey(event) {
	const pressedKey = event.keyCode;
	let action;
	if (pressedKey===13) {
		if (document.querySelector(".active")) {
			document.querySelector(".active").click()
		}
		else{
			action = togglePlay();
		}
	}
	if (pressedKey===37) {
		action = rewind();
		document.querySelector(".backward").style.opacity="1"
		setTimeout(()=>(document.querySelector(".backward").style.opacity="0"),2000)
	}
	if (pressedKey===39) {
		action = forward();  
		document.querySelector(".forward").style.opacity="1"
		setTimeout(()=>(document.querySelector(".forward").style.opacity="0"),2000)
	}
	if (pressedKey==19) {
		player.pause();
	}
	if (pressedKey==415) {
		player.play();
	}
	if (pressedKey==417) {
		action = fastForward();
	}
	if (pressedKey==412) {
		action=fastbackward();
	}
	if (pressedKey==38) {
		// document.querySelector(".vjs-mute-control").classList.add("active")
		document.querySelector(".vjs-play-control").classList.add("active")  
	}
	if (pressedKey==40) {
		document.querySelector(".vjs-play-control").classList.add("active")
		// document.querySelector(".vjs-mute-control").classList.remove("active")
	}
}
function playerFocused() {
		// document.addEventListener('keydown', getPressedKey);
		document.querySelector('.theoplayer-container').focus()
		document.querySelector(".theoplayer-container").addEventListener('keydown', getPressedKey);
}
setTimeout(playerFocused(),10)
// playerFocused()


init();
