(function () {
    'use strict';

    /**
     * Displays logging information on the screen and in the console.
     * @param {string} msg - Message to log.
     */
   
  
    var player;
   
   
    var focuscolor='#0cb9f2';
    //var name="PLAYREADY";
    var name='No DRM'
    var url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4';
    //var url="https://muvi-dev.s3.amazonaws.com/8916/EncodedVideo/uploads/movie_stream/full_movie/69149/stream.mpd";
    var licenseServer="http://pr.test.expressplay.com/playready/RightsManager.asmx?ExpressPlayToken=AgAAAxEcWuYAAABwkE-A-I-KkrozvqW2lG9aMmw09ghBr6BQU-tYV6JyHR3HXMfmEiFxQkX4BdY3naqTZOAwMt8GGCZI3QN3NOFa3JUcPwScRK7jXOydc5jt1zHiLssASou6pI1sRqtiKgC0NvXizF-Q6gLLu6FsssEilrJeQ8tBxUAtZ9-PBz_-lkOiweEP";
    var customData="";
    // flag to monitor UHD toggling
    var uhdStatus = false;
    /**
     * Register keys used in this application
     */
   
    registerKeys();
    registerKeyHandler();
   
    function registerKeys() {
        var usedKeys = [
            'MediaPause',
            'MediaPlay',
            'MediaPlayPause',
            'MediaFastForward',
            'MediaRewind',
            'MediaStop',
            '0',
            '1',
            '2',
            '3'
        ];

        usedKeys.forEach(
            function (keyName) {
                tizen.tvinputdevice.registerKey(keyName);
            }
        );
    }


    /**
     * Handle input from remote
     */
    function registerKeyHandler() {
        document.addEventListener('keydown', function (e) {
            switch (e.keyCode) {
                case 13:    // Enter
                    //player.toggleFullscreen();
                    break;
                case 38:    // Enter
                	
                    break;
                case 37:
                	
                	break;
                case 40:    //DOWN arrow
                    
                	
                	
             			break;
                case 10252: // MediaPlayPause
                case 415:   // MediaPlay
                case 19:    // MediaPause
                    player.playPause();
                    $('#play').hide();
					$('#pause').show();
                    break;
                case 413:   // MediaStop
                    player.stop();
                    $('#play').show();
					$('#pause').hide();
                    break;
                case 417:   // MediaFastForward
                	//alert("HELLO");
                    player.ff();
                    break;
                case 412:   // MediaRewind
                	//alert("HI");
                    player.rew();
                    break;
                case 39: //RIGHT arrow
                	//player.ff();
		    		break;
                case 37: //LEFT arrow
                	//player.rew();
		    		break;
                case 48: //key 0
                    //log();
                    break;
                case 49: //Key 1
                   // setUhd();
                    break;
                case 50: //Key 2
                    player.getTracks();
                    break;
                case 51: //Key 3
                    player.getProperties();
                    break;
                case 10009: // Return
                    //alert("page=="+page);
                	
                	//alert("hi");
                		window.history.back();
                    	
                    
                    break;
                default:
                   // log("Unhandled key");
            }
        });
    }

   

    function registerMouseEvents() {
        document.querySelector('.video-controls .play').addEventListener(
            'click',
            function () {
                player.playPause();
                document.getElementById('streamParams').style.visibility = 'visible';
            }
        );
       
        document.querySelector('.video-controls .pause').addEventListener(
            'click',
            player.playPause
        );
        document.querySelector('.video-controls .ff').addEventListener(
            'click',
            player.ff
        );
        document.querySelector('.video-controls .rew').addEventListener(
            'click',
            player.rew
        );
        document.querySelector('.video-controls .fullscreen').addEventListener(
            'click',
            player.toggleFullscreen
        );
    }

  

    /**
     * Changes drm settings according to user's action
     * @param {String} direction - 'up' or 'down'
     */
   
    /**
     * Function initialising application.
     */
    window.onload = function () {
    	
    	
    	$.caph.focus.activate(function(nearestFocusableFinderProvider, controllerProvider) {
			console.log(controllerProvider);
	    	console.log(nearestFocusableFinderProvider);
	        
	    	controllerProvider.onFocused(function(event, originalEvent) {
	        	var id=$(event.currentTarget).attr("id");
	        	
	        	$(event.currentTarget).css({
	        		//color:focuscolor
	        		background: '#00abea'
				});
	        	
	        	
	        });
	   
	        controllerProvider.onBlurred(function(event, originalEvent) {
	        	
	        	$(event.currentTarget).css({
	        		//color:'white'
	        		background: 'transparent'
				});
	        	
	        });
	        
	        
               controllerProvider.onSelected(function(event, originalEvent) {
            	   $(event.currentTarget).toggleClass("selected");
   				var detailspermalink= $(event.currentTarget).attr('id');
	             
	                   if(detailspermalink == "play"){
	                	   
	                	   //alert("hi");
	                	   player.playPause();
	                	   $('#play').hide();
							$('#pause').show();
	                	   
	                   }else if (detailspermalink == "pause") {
	                	  // alert("hello");
						player.playPause();
						$('#play').show();
						$('#pause').hide();
					}else if (detailspermalink == "ff") {
						player.ff();
					}else if (detailspermalink == "rew") {
						player.rew();
					}
					
	             
               });
	        
		});
    	
    	

        if (window.tizen === undefined) {
            //log('This application needs to be run on Tizen device');
            return;
        }

        /**
         * Player configuration object.
         *
         * @property {Object}           drms            - object containing drm configurations
         * @property {HTML Element}     player          - application/avplayer object
         * @property {HTML Div Element} controls        - player controls
         * @property {HTLM Div Element} info            - place to display stream info
         * @property {Function}         logger          - function to use for logging within player component
         *
         */
         var DRM=localStorage.getItem("DRM");
         var url=localStorage.getItem("url");
		 var licenseurl=localStorage.getItem("licenseurl");
		 var customData = localStorage.getItem("customdata");
		 //var url='http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4';
		 //alert(DRM);
		 //alert(url);
		 //alert(licenseurl);
		 
        
        var config = {
          
            name:DRM,
            url:url,
            licenseServer:licenseurl,
            customData:customData,
            player: document.getElementById('av-player'),
            controls: document.querySelector('.video-controls'),
           
        };

        /*registerKeys();
        registerKeyHandler();*/

        //Check the screen width so that the AVPlay can be scaled accordingly
        tizen.systeminfo.getPropertyValue(
            "DISPLAY",
            function (display) {
                //log("The display width is " + display.resolutionWidth);
                config.resolutionWidth = display.resolutionWidth;

                // initialize player - loaded from videoPlayer.js
                player = new VideoPlayer(config);
                registerMouseEvents();
                player.playPause();
            },
            function(error) {
                //log("An error occurred " + error.message);
            }
        );
    };
}());
