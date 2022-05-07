
var objElem = document.createElement('object');
objElem.type = 'application/avplayer';
document.body.appendChild(objElem);

var url = new URL(window.location.href);
console.log("Here is Url" +url );
var videoUrl = url.search.split("&")[1];
console.log("here is videourl " + videoUrl)
// var srt_url = url.search.split("&")[2];
// console.log("Here is STR_URL " +srt_url)
let adIsPlaying=false;
var adURl= " ";
var timer=" ";
var adStatus = [];
    let adDuration;
    let adTimeStamp;
// Base resolution of avplay
// var avplayBaseWidth = 1920;
 console.log("Loaded")
  async function fetchData() {
    var xmlDoc;
    const xhr=new XMLHttpRequest();
    xhr.open("GET","https://adserver.gtvads.com/video/b/1be80f8557d640d542da89eb80e05b3b?appName=glewedtv&bundleId={bundleId}&storeUrl={storeUrl}&ifa={ifa}&width=1920&height=1080&cb={cb}")
    xhr.onload=()=>{
      let parser = new DOMParser();
      xmlDoc = parser.parseFromString(xhr.response, "text/xml").documentElement;
      
      console.log("second");
      for (
        let index = 0;
        index < Number(xmlDoc.getElementsByTagName("Tracking").length);
        index++
      ) {
        adStatus.push(
          xmlDoc.getElementsByTagName("Tracking")[index].textContent
        );
      }
      console.log(adStatus + "ad status line 32") 
      {(adURl= xmlDoc.getElementsByTagName("MediaFile")[0].childNodes[1].data,
      timer=xmlDoc.getElementsByTagName("Linear")[0].childNodes[1].textContent,
      adStatus= adStatus)}
      adDuration = Number(timer.split(":")[2])
      adTimeStamp = [
        0,
        Math.round(adDuration / 4),
        adDuration / 2,
        Math.round((3 * adDuration) / 4),
        adDuration,
      ];
      // console.log("The url is " + adURl) 
    }
    xhr.send();
       };
       
        fetchData();

var isPlaying=true;
var movieCurrentTime=0;
console.log("The Current Movie time is " + movieCurrentTime)
let callArray = [
      {
        timeStamp: 0,
        adPlayed: false,
      },
      {
        timeStamp: 12*60,
        adPlayed: false,
      },
      {
        timeStamp: 24*60,
        adPlayed: false,
      },
      {
        timeStamp: 36*60,
        adPlayed: false,
      },
      {
        timeStamp: 48*60,
        adPlayed: false,
      },
      {
        timeStamp: 60*60,
        adPlayed: false,
      },
      {
        timeStamp: 72*60,
        adPlayed: false,
      },
      {
        timeStamp: 84*60,
        adPlayed: false,
      },
      {
        timeStamp: 96*60,
        adPlayed: false,
      },
      {
        timeStamp: 108*60,
        adPlayed: false,
      },
      {
        timeStamp: 120*60,
        adPlayed: false,
      },
      {
        timeStamp: 132*60,
        adPlayed: false,
      },
      {
        timeStamp: 144*60,
        adPlayed: false,
      },
      {
        timeStamp: 156*60,
        adPlayed: false,
      }
     
   
    
    ];

   

        var listener = {
onbufferingstart: function() {
  $('#spinner').css('display','inline-block')
},

onbufferingprogress: function(percent) {
 
},

onbufferingcomplete: function() {
  // console.log("Buffering complete.");
  $('#spinner').css('display','none')
},
onstreamcompleted: function() {
  // console.log("Stream Completed");
  // console.log("Ads is complete Now you can Play Movie")
  webapis.avplay.stop();
  adIsPlaying=false;
  movieStart()
  webapis.avplay.seekTo(movieCurrentTime);
},

oncurrentplaytime: function(currentTime) {

  if (adIsPlaying==true) {

    // console.log(adTimeStamp)
    // console.log(adStatus + "adstatus array")


    adStatus.forEach((element) => {
      // console.log("ad request is running")

      if (Math.round(currentTime / 1000) == adTimeStamp[0]) {
        async function fetchData() {
          // const request = await axios.get(element);
          const xhr=new XMLHttpRequest();
          xhr.open("GET",element)
          xhr.send();
          xhr.onload=()=>{
            console.log(xhr.response)
          }
        }

        fetchData();

        adTimeStamp.shift();
      }
    });
    
  }


    
    $('#status').text(callArray[0].adPlayed)
   
    for (i=0; i<callArray.length; i++){
      if(Math.round(currentTime / 1000)>=callArray[i].timeStamp && callArray[i].adPlayed == false)
      {
        $('#status').text(callArray[i].adPlayed)
        callArray[i].adPlayed =true;
        // webapis.avplay.close();
        // webapis.avplay.open('https://adserver.gtvads.com/sc2/e4/e43c87293a5366c7a20b2c83dacbb6d7.mp4');
        // webapis.avplay.prepare();
        // webapis.avplay.play(); 
        $('#status').text(callArray[i].adPlayed)
      $('#timingTT').text("Add is playing at " + callArray[i].timeStamp )
   
      var movieCurrentDuration=  webapis.avplay.getCurrentTime();;
      movieCurrentTime=movieCurrentDuration
     
      adIsPlaying=true
      addStart()
   
      }
    
    }

    // $('#timingTT').text(currentTime)
    $('#timing').text(currentTime)
   
    // $('#hello').text(currentTime)
    // var currentTime = webapis.avplay.getCurrentTime();
    var duration = webapis.avplay.getDuration();
    // $('#trackinfo').text(duration)
    document.querySelector(".progress").style.width = `${
      (currentTime / duration) * 100
    }%`;
  },
onerror: function(eventType) {
  // console.log("event type error : " + eventType);
},



// onsubtitlechange: function(duration, text, data3, data4) {
//   console.log("subtitleText: " + text);
// }

};

 

webapis.avplay.setListener(listener);      
      $(document).ready(function(){
        $('#hello').text(isPlaying)
      })











function movieStart (){
  webapis.avplay.open(videoUrl);
  webapis.avplay.prepare();
  webapis.avplay.play(); 

}



        $(document).ready(function(){
          movieStart()
            $('#bar').css('display','inline-block');
           
           setTimeout(function(){
                $('#bar').css('display','none');
                // webapis.avplay.close();
                // webapis.avplay.open('https://adserver.gtvads.com/sc2/e4/e43c87293a5366c7a20b2c83dacbb6d7.mp4');
                // webapis.avplay.prepare();
                // webapis.avplay.play(); 
            },8000)
        });

     
       function addStart (){
        webapis.avplay.close();
        webapis.avplay.open(adURl);
        webapis.avplay.prepare();
        webapis.avplay.play(); 
       }


 document.addEventListener('keydown',function(e){
 
     switch(e.keyCode){

        case 13: //OK button 
        //  webapis.avplay.pause();
         $(document).ready(function(){  
           if( isPlaying==true){
            webapis.avplay.pause();
            $('#bar').css('display','inline-block');
            $('.menu_middle_pause').css('display','inline-block');
            isPlaying=false;
            $('#hello').text(isPlaying)
           }else{
            webapis.avplay.play();
            isPlaying=true;
            $('.menu_middle_pause').css('display','none');
            setTimeout (function(){
            $('#bar').css('display','none');
            }, 4000)
            $('#hello').text(isPlaying)
           }
         })
        // console.log("Enter Key Press")
        break;
        
        case 37: //LEFT arrow	
        if(adIsPlaying==true) return;
        $('#bar').css('display','inline-block');
        $('.menu_left').css('display','inline-block');
        var currentTime = webapis.avplay.getCurrentTime();
        var newTime = currentTime - 10000;
        webapis.avplay.seekTo(newTime);
        setTimeout (function(){
          $('.menu_left').css('display','none');
          $('#bar').css('display','none');
        }, 1800)
       
        break;
        case 39: //RIGHT arrow
        if(adIsPlaying==true) return;
        
        $(document).ready(function(){
         
          $('#bar').css('display','inline-block');
          $('.menu_right').css('display','inline-block');
            var currentTime = webapis.avplay.getCurrentTime();
            var newTime = currentTime + 30000;
            webapis.avplay.seekTo(newTime);
            setTimeout (function(){
                $('.menu_right').css('display','none');
                $('#bar').css('display','none');
                }, 1800)
         
        })
        break;
        
        case 38: //UP arrow

        $('#bar').css('display','inline-block');
        setTimeout (function(){
          $('#bar').css('display','none');
          }, 2000)
    		break;
        case 40: //DOWN arrow
        $('#bar').css('display','inline-block');
        setTimeout (function(){
          $('#bar').css('display','none');
          }, 2000)
    		break;
        case 19: // Media Pause button
        webapis.avplay.pause();
        break;
        case 417: //  Media Fast-Forward button
        webapis.avplay.setSpeed(3);
        break;
        case 412: //Media Rewind button
        // webapis.avplay.play();
        break;
        case 413: //Media stop button
        webapis.avplay.stop();
        break;
        case 10009: //Back button
        window.history.back();
        break;
     }
 }) 