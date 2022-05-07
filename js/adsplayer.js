var playButton;
var videoContent;
var adDisplayContainer;
var adsLoader;
var adsManager;
var playClicked;
var Adsstarted = false;
var contentCompleteCalled = false;
var category_list={};
var sanjayObj={};
var muviurl="";

function init() {
  videoContent = document.getElementById('contentElement');
  playButton = document.getElementById('playButton');
  playButton.addEventListener('click', onPlayClicked);
  videoContent.addEventListener("playing", Playingg);
  videoContent.addEventListener("ended", Ended);
  setUpIMA();
 
  document.getElementById("playButton").click();
  
  function getParameterByName(name, href)
	{
		name = name.replace(/[\[]/,"\\\[").replace(/[\]]/,"\\\]");
		var regexS = "[\\?&]"+name+"=([^&#]*)";
		var regex = new RegExp( regexS );
		var results = regex.exec( href );
		if( results == null )
			
			return 0;		
		
		else
			
			return decodeURIComponent(results[1].replace(/\+/g, " "));
	
	}
  
  muviurl = getParameterByName("conunter",window.location.href);
  
  
  videoContent.onwaiting = function(){   
	  
	  document.getElementById("spinner").style.display = "block";
	    
	  };
  
  
  videoContent.addEventListener('loadedmetadata', function() {
	    
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
	  
	  
  videoContent.addEventListener("timeupdate", function() {
	  
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
	   
	  
	   var percentage = ( seconds / totaltimee ) * 100; 
	  
	   $('.widthspan').css('width', percentage+"%");
	  
	  });
	  
  
  
  document.addEventListener('keydown', function(e) {
	    console.log("Button clicked: " + e.keyCode);
	    switch (e.keyCode) {
	    case 37: //LEFT arrow
	    	
	    	if(Adsstarted == false){
	    		
	    		forwardRewind(30)
	    	}
			
			break;
	    case 39: //RIGHT arrow
	    	
	    	if(Adsstarted == false){
	    		
	    		forwardRewind(30)
	    	}
	        
			break;
		case 40: //RIGHT arrow
	       
			break;
	   case 13: //OK
		   
		   if(Adsstarted == false){
			   if (videoContent.paused == false) {
				   videoContent.pause();
			  		 $('#play').show();
							$('#pause').hide();
							videoContent.firstChild.nodeValue = 'Play';
			          } else {
			        	  videoContent.play();
			          	$('#play').hide();
							$('#pause').show();
							videoContent.firstChild.nodeValue = 'Pause';
			          }
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
  adsRequest.adTagUrl = 'https://adserver.gtvads.com/video/b/1be80f8557d640d542da89eb80e05b3b?appName=glewedtv&bundleId=com.release.glewedtv&storeUrl=https://seller.lgappstv.com&ifa=LG178&width=1920&height=1080&cb=100';
  //adsRequest.adTagUrl = 'https://vast1.mars.video/ssp/vast/5b0a6d2dcbb6290002000001/5d4bf2a199ecf70001a8c63a?cb=ROKU_ADS_CACHE_BUSTER&width=ROKU_ADS_DISPLAY_WIDTH&height=ROKU_ADS_DISPLAY_HEIGHT&dnt=ROKU_ADS_LIMIT_TRACKING&sub_id=ROKU_ADS_LOCALE&app_name=K-Pop+TV&bundle_id=com.roku.kpoptv&ifa=ROKU_ADS_TRACKING_ID&app_store_url=https%3A%2F%2Fchannelstore.roku.com%2Fdetails%2F560901%2Fk-pop-tv&app_category=ROKU_ADS_CONTENT_GENRE&ip=ROKU_ADS_EXTERNAL_IP&ua=ROKU_ADS_USER_AGENT';
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
  Adsstarted=true;
  //videoContent.onended = contentEndedListener;
 
  document.getElementById("custom-seekbar").style.display = "none";
  document.getElementById("rew").style.display = "none";
  document.getElementById("play").style.display = "none";
  document.getElementById("pause").style.display = "none";
  document.getElementById("ff").style.display = "none";
  document.getElementById("timee").style.display = "block";
  
}

function contentEndedListener() {	
	
		 
		 
	    adsLoader.contentComplete();
	    
	    
	}


function Ended() {
	
	//alert(Adsstarted);
	
	
	if(Adsstarted == false){
		Adsstarted=true;
		setUpIMA();
		playAds();
		
	}else{
		
		
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
	
	if(adEvent.type == google.ima.AdEvent.Type.ALL_ADS_COMPLETED){
	 
		adsManager.destroy();
		adsManager= null;
		adsLoader.contentComplete();
	    allAdsCompleted = true;
		
		Adsstarted=false;
		
	
		
		var url=muviurl;
		
		
	 
		videoContent.src = url;
	    videoContent.load();
		videoContent.play();
		
		
		document.getElementById("custom-seekbar").style.display = "block";
		document.getElementById("rew").style.display = "block";
		//document.getElementById("play").style.display = "block";
		document.getElementById("pause").style.display = "block";
		document.getElementById("ff").style.display = "block";
		
	}
  }
  
 

function onAdError(adErrorEvent) {
	
  console.log(adErrorEvent.getError());
    adsManager.destroy();
	adsManager= null;
	adsLoader.contentComplete();
    allAdsCompleted = true;
	
	Adsstarted=false;
	

	
	var url=muviurl;
	
	

	videoContent.src = url;
    videoContent.load();
	videoContent.play();
	
	
	document.getElementById("custom-seekbar").style.display = "block";
	document.getElementById("rew").style.display = "block";
	//document.getElementById("play").style.display = "block";
	document.getElementById("pause").style.display = "block";
	document.getElementById("ff").style.display = "block";
}

init();
