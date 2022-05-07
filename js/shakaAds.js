var videoElement;
var adsLoaded = false;
var adContainer;
var adDisplayContainer;
var adsLoader;
var adsManager;
// On window load, attach an event to the play button click
// that triggers playback on the video element
window.addEventListener("load", function (event) {
  
  videoElement = document.getElementById("video-element");
  initializeIMA();
  console.log("--- 13 ---")
  console.log(videoElement)
  videoElement.addEventListener("play", function (event) {
  console.log("--- 15 ---")

    loadAds(event);
  });

  

  console.log('---- e13 ')
  var playButton = document.getElementById("play-button");
  console.log(' ----- 19' )
  playButton.addEventListener("click", function (event) {
    videoElement.play();
  });
  console.log('---- e19')
});

window.addEventListener("resize", function (event) {
  console.log("window resized");
  if (adsManager) {
    var width = videoElement.clientWidth;
    var height = videoElement.clientHeight;
    adsManager.resize(width, height, google.ima.ViewMode.NORMAL);
  }
});

function initializeIMA() {
  console.log("initializing IMA");
  console.log("---- 33 ---");
  adContainer.addEventListener("click", adContainerClick);
  console.log("------ e33-----");
}

function loadAds(event) {

  // Prevent this function from running on if there are already ads loaded
  if (adsLoaded) {
    return;
  }
  adsLoaded = true;

  // Prevent triggering immediate playback when ads are loading
  event.preventDefault();

  console.log("loading ads");

  // Initialize the container. Must be done via a user action on mobile devices.
  videoElement.load();
  adDisplayContainer.initialize();

  var width = videoElement.clientWidth;
  var height = videoElement.clientHeight;
  try {
    adsManager.init(width, height, google.ima.ViewMode.NORMAL);
    console.log("ads manager start")
    adsManager.start();
  } catch (adError) {
    // Play the video without ads, if an error occurs
    console.log("AdsManager could not be started");
    videoElement.play();
  }
}

function initializeIMA() {
  console.log("initializing IMA");
  adContainer = document.getElementById("ad-container");
  adDisplayContainer = new google.ima.AdDisplayContainer(
    adContainer,
    videoElement
  );
  adsLoader = new google.ima.AdsLoader(adDisplayContainer);

  console.log("Loading ads loader", adsLoader, videoElement);
  adsLoader.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false
  );
  adsLoader.addEventListener(
    google.ima.AdErrorEvent.Type.AD_ERROR,
    onAdError,
    false
  );

  videoElement.addEventListener("ended", function () {
    adsLoader.contentComplete();
  });
  console.log("ads loaded");

  var adsRequest = new google.ima.AdsRequest();
  adsRequest.adTagUrl =
  "https://adserver.gtvads.com/video/b/1be80f8557d640d542da89eb80e05b3b";
  console.log("adsRequest")
  console.log(adsRequest)

  // Specify the linear and nonlinear slot sizes. This helps the SDK to
  // select the correct creative if multiple are returned.
  adsRequest.linearAdSlotWidth = videoElement.clientWidth;
  adsRequest.linearAdSlotHeight = videoElement.clientHeight;
  adsRequest.nonLinearAdSlotWidth = videoElement.clientWidth;
  adsRequest.nonLinearAdSlotHeight = videoElement.clientHeight / 3;

  // Pass the request to the adsLoader to request ads
  adsLoader.requestAds(adsRequest);
  console.log(adsLoader)
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
  // Instantiate the AdsManager from the adsLoader response and pass it the video element
  adsManager = adsManagerLoadedEvent.getAdsManager(videoElement);
  console.log("---- 133---");
  adsManager.addEventListener(google.ima.AdErrorEvent.Type.AD_ERROR, onAdError);
  adsManager.addEventListener(
    google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
    onContentPauseRequested
  );
  adsManager.addEventListener(
    google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
    onContentResumeRequested
  );

  
  adsManager.addEventListener(google.ima.AdEvent.Type.LOADED, onAdLoaded);
  console.log("---- e133 ----");
}

function onAdError(adErrorEvent) {
  // Handle the error logging.
  console.log(adErrorEvent.getError());
  if (adsManager) {
    adsManager.destroy();
  }
}

function onContentPauseRequested() {
  videoElement.pause();
}

function onContentResumeRequested() {
  videoElement.play();
}

function adContainerClick(event) {
  console.log("ad container clicked");
  if (videoElement.paused) {
    videoElement.play();
  } else {
    videoElement.pause();
  }
}

function onAdLoaded(adEvent) {
  var ad = adEvent.getAd();
  if (!ad.isLinear()) {
    videoElement.play();
  }
}
