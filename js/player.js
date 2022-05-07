let player = '';
let videoUrl = '';
let licenseUrl = '';
let videoExtension = '';
let videoSrc = '';
let subtileArray = [];
var timer;
let subtitles = "SUBTITLES";
let audio = "AUDIO";
let quality = "QUALITY";
let secondTime = false;
var errorTimeout = ''
let checkInternet = false;
let options = "OPTIONS";
let start = 'Start Over';
let liveText = "LIVE"
let historyApiCalled = true;


var playlength = 0;
// subtile and multi audio
let subtileBtnShow = false;
let subtileList = '';
let subTitleCount = 0;
//multi audio
let audioBtnShow = false;
let audioList = '';
let audioCount = 0;

// video quality
let qualityList = '';
let qualityCount = 0;
let qualityBtnShow = false;

// default config
let defaultPlaybackId = 'speed_2';
let defaultSubtile = 'subtitle_0';
let defaultAudio = 'audio_0';
let defaultQuality = 'video_0';

// video type & content id
let video_type = '';
let content_id = '';

let alreadyWatched = true;
// rightOptionList
let rightOptList = '<div class="option-list" id="option-list" style="margin-top:23rem"><div class="menu-item" id="subtitle"><i class="fa fa-cc" aria-hidden="true"></i> SUBTITLES</div><div class="menu-item" id="audio"><i class="fa fa-headphones" aria-hidden="true"></i> AUDIO</div><div class="menu-item" id="video"><i class="fa fa-file-video-o" aria-hidden="true"></i> VIDEO QUALITY</div><div class="menu-item" id="playback"><i class="fa fa-tachometer" aria-hidden="true"></i> PLAYBACK SPEED</div></div>';

function _fillNumber(num) {
    return (num < 10) ? '0' + num : num;
}

function foramtTheString(time) {
    if (time > 3600) {
        return 'hh:mm:ss';
    } else {
        return 'mm:ss';
    }
}

function timeFormat(time) {
    let format = foramtTheString(time),
        isNegative = time < 0,
        neutralisedTime = Math.abs(time);
    return format.replace('-', isNegative ? '-' : '')
        .replace('hh', Math.floor(neutralisedTime / 3600) + '')
        .replace('mm', _fillNumber(Math.floor(neutralisedTime / 60) % 60)) // remove _fillNumber-method if you don't want 9 to be displayed as 09
        .replace('ss', _fillNumber(Math.floor(neutralisedTime % 60)));
}
window.onload = () => {
    $("#start").text(start);
    $("#optiontext").text(options);
    $('.LiveText').text(liveText);
    $("#playerTitle").text(localStorage.getItem("content_title"));
    video_type = localStorage.getItem("video_type");
    content_id = localStorage.getItem("content_id");

    videoUrl = localStorage.getItem("url");
    licenseUrl = localStorage.getItem("licenseurl");
    videoExtension = videoUrl.split('.').pop().split(/\#|\?/)[0];
    if ("playlength" in localStorage) {
        playlength = localStorage.getItem("playlength");

    }
    let element = document.querySelector('.video-container');

    // create video source accoding to extension
    if (videoExtension == 'm3u8') {
        videoSrc = {
            src: videoUrl,
            type: 'application/x-mpegurl'
        }
    } else if (videoExtension == 'mpd') {
        videoSrc = {
            src: videoUrl,
            type: 'application/dash+xml',
            drm: {
                widevine: {
                    licenseAcquisitionURL: licenseUrl,
                }
            },
        }
    } else {
        videoSrc = {
            src: videoUrl,
            type: 'video/mp4'
        }
    }
    if ("subtitleArr" in localStorage) {
        subtileArray = JSON.parse(localStorage.getItem("subtitleArr"));
    }

    player = new THEOplayer.ChromelessPlayer(element, {
        fluid: true,
        libraryLocation: 'libs/',
        license: 'sZP7IYe6T6frIK36Cofk0OzoIl3eFSxlIl5-TSek0mzkIu41IuhiTSaZCoa6FOPlUY3zWokgbgjNIOf9fK0_IS4K3oX6FDXgISR-3Qfk3Ok6IDXKFS1KCKXe0lI1Il463OfVfK4_bQgZCYxNWoryIQXzImf90SCZTSBiTu5i0u5i0Oi6Io4pIYP1UQgqWgjeCYxgflEc3lfLTufZ0uC_0LC_FOPeWok1dDrLYtA1Ioh6TgV6UQ1gWtAVCYggb6rlWoz6FOPVWo31WQ1qbta6FOfJfgzVfKxqWDXNWG3ybojkbK3gflNWfGxEIDjiWQXrIYfpCoj-f6i6WQjlCDcEWt3zf6i6v6PUFOPLIQ-LflNWfGUgCKjLfgzVfG3gWKxydDkibK4LbogqW6f9UwPkIYz'
    });

    let playerSource = {
        sources: [videoSrc],
        textTracks: subtileArray
    };

    player.source = playerSource;
    //player.preload = 'auto';
    player.autoplay = true;
    player.playbackRate = 1;
    player.currentTime += playlength;
    player.play();
    if (video_type == "live") {
        $(".live_sec").show();
    }
    let keyCodes = {
        LEFT: 37,
        UP: 38,
        RIGHT: 39,
        DOWN: 40,
        CONFIRM: 13,
        RETURN: 461,
        MEDIAPLAYPAUSE: 10252,
        MEDIAFASTFORWARD: 417,
        MEDIAREWIND: 412,
        MediaPlay: 415,
        MediaPause: 19,
        MediaStop: 413,
    };
    document.addEventListener('keydown', function (event) {
        switch (event.keyCode) {
            case keyCodes.CONFIRM:
                enterKey();
                break;
            case keyCodes.MEDIAPLAYPAUSE:
                if (player.paused) {
                    player.play();
                } else {
                    player.pause();
                }
                cancelTimeout(15000);
                break;
            case keyCodes.MediaPlay:
                player.play();
                cancelTimeout(15000);
                break;
            case keyCodes.MediaPause:
                player.pause();
                cancelTimeout(15000);
                break;
            case keyCodes.UP:
                if (video_type != "live") {
                    window.clearTimeout(timer);
                    upKey();
                }
                break;
            case keyCodes.DOWN:
                if (video_type != "live") {
                    window.clearTimeout(timer);
                    downKey();
                }
                break;
            case keyCodes.LEFT:
                //player.currentTime -= 10;
                if (video_type != "live") {
                    window.clearTimeout(timer);
                    leftKey();
                }
                break;
            case keyCodes.RIGHT:
                //player.currentTime += 10;
                if (video_type != "live") {
                    window.clearTimeout(timer);
                    rightKey();
                }
                break;
            case keyCodes.MEDIAFASTFORWARD:
                if (video_type != "live") {
                    $(".right-arrow").show();
                    player.currentTime += 10;
                    let percentage = (player.currentTime / player.duration) * 100;
                    document.getElementById('bar-width').style.width = percentage + "%";
                    $(".bar-btn").css("left", "calc(" + percentage + "% - 23.5px)");
                    $(".right-arrow").delay(1000).fadeOut();
                    cancelTimeout(15000);
                }
                break;
            case keyCodes.MEDIAREWIND:
                if (video_type != "live") {
                    $(".left-arrow").show();
                    player.currentTime -= 10;
                    let percentage = (player.currentTime / player.duration) * 100;
                    document.getElementById('bar-width').style.width = percentage + "%";
                    $(".bar-btn").css("left", "calc(" + percentage + "% - 23.5px)");
                    $(".left-arrow").delay(1000).fadeOut();
                    cancelTimeout(15000);
                }
                break;
            case keyCodes.MediaStop:
                player.stop();
                break;
            case keyCodes.RETURN:
                backKey();
                break;
        }
    });

    player.addEventListener(['play', 'pause'], function () {
        if (player.paused) {
            let myEle = document.getElementById("play");
            let img_src = document.getElementById("playPauseIcon");
            if (myEle != null) {
                myEle.style.display = "block";
                img_src.src = "images/play.png"
                document.getElementById("play").id = 'pause';
                $('#pause').delay(2000).fadeOut();
            }
        } else {
            let myEle = document.getElementById("pause");
            let img_src = document.getElementById("playPauseIcon");
            if (secondTime) {
                if (myEle != null) {
                    myEle.style.display = "block";
                    if (video_type == "live") {
                        $(".live_sec").show();
                    }
                }
            }
            if (myEle != null) {
                img_src.src = "images/pause.png"
                document.getElementById("pause").id = 'play';
                $('#play').delay(2000).fadeOut();
                secondTime = true;
            }
        }
    });

    player.addEventListener('playing', function () {
        console.log('player starts playing after unpause');
        $("#loader").hide();
        //player.textTracks[0].mode = "showing";
        if (video_type != "live") {
            toggleSeekbar(10000);
        } else {
            $(".live_sec").show();
        }

    });

    player.addEventListener('seeking', 'seeked', function () {
        if (player.seeking) {
            console.log('player is seeking to', player.currentTime);

            $("#loader").show();
        } else {
            // (hide spinner)
            console.log('playing is done seeking to', player.currentTime);

            $("#loader").hide();
        }
    });
    function checkOnlineConnection() {
        var ipaddress = new XMLHttpRequest();
        ipaddress.onreadystatechange = function () {
            if (this.readyState == 4) {
                if (this.status >= 200 && this.status < 304) {
                    var ipaddress_response = JSON.parse(this.responseText);
                    console.log(ipaddress_response);
                    console.log("connection exists!");
                    checkInternet = true;
                } else {
                    console.log('kkkk')
                    $("#playerModal").modal('show');
                }
            }
        }
        ipaddress.open("GET", "https://api.ipify.org/?format=json", true);
        ipaddress.send();
    }
    player.addEventListener('waiting', function () {
        //document.getElementsByClassName("loader")[0].style.display = "block";
        $("#loader").show();
        // if (checkInternet) {
        //     errorTimeout = setTimeout(function () {
        //     checkOnlineConnection();
        //     }, 5000)
        // }
    });

    function handleErrors(response) {
        if (!response.ok) {
            return response.text().then(text => {
                throw new Error(text)
            })
        }
        return response.json();
    }

    player.addEventListener('timeupdate', function () {
        document.getElementById('currentTime').innerHTML = timeFormat(player.currentTime);
        let percentage = (player.currentTime / player.duration) * 100;
        document.getElementById('bar-width').style.width = percentage + "%";
        $(".bar-btn").css("left", "calc(" + percentage + "% - 23.5px)");
    });

    player.addEventListener('durationchange', function () {
        console.log('duration is changed to', player.duration);
        if (isNaN(player.duration)) {
            console.log('NaN')
        } else if (player.duration === Infinity) {
            // durationDisplay.textContent = 'Live';
            // player.element.classList.add('theo-live');
        } else {
            document.getElementById("range").max = player.duration;
            document.getElementById('totalTime').innerHTML = timeFormat(player.duration);
        }
    });
    player.addEventListener('ended', function () {
        console.log('video ended');
        window.history.go(-2);
    });

    function getLanguageByLnagCode(langCode, type) {
        var reurnLanguage = storeLanguage.find(lang => lang.code === langCode);
        if (reurnLanguage === undefined) {
            reurnLanguage = type + " (" + langCode + ")";
        } else {
            reurnLanguage = reurnLanguage.name;
        }
        return reurnLanguage;
    }
    var subtitle = ' <div class="menu-item" id="subtitle_off">Off</div>';
    var audio = '';

    function createElementInRightMenu(track, menuType) {
        if (menuType === "AUDIO") {
            var show_language = '';
            if (track.label != "") {
                show_language = track.label;
            } else {
                var langCode = track["language"];
                show_language = getLanguageByLnagCode(langCode, "Audio")
            }
            audio += '<div class="menu-item" id="audio_' + player.audioTracks.indexOf(track) + '">' + show_language + '</div>';
            return audio;
        } else if (menuType == "SUBTILE") {
            var show_language = '';
            if (track.label != "") {
                show_language = track.label;
            } else {
                var langCode = track["language"];
                show_language = getLanguageByLnagCode(langCode, "Subtitle")
            }
            subtitle += '<div class="menu-item" id="subtitle_' + player.textTracks.indexOf(track) + '">' + show_language + '</div>'
            return subtitle;
        }
    }
    player.textTracks.addEventListener('addtrack', function (addTrackEvent) {
        var track = addTrackEvent.track;
        var _subtileTrackLength = player.textTracks.length;
        subtileList = createElementInRightMenu(track, "SUBTILE");
        subTitleCount++;
        if (subTitleCount == _subtileTrackLength) {
            subtileBtnShow = false;
        }
        track.addEventListener('addcue', function (addCueEvent) {
            var cue = addCueEvent.cue;
        });
    });
    player.audioTracks.addEventListener('addtrack', function (addTrackEvent) {
        var track = addTrackEvent.track;
        var trackCount = player.audioTracks.length;
        //console.log(trackCount);
        audioList = createElementInRightMenu(track, "AUDIO");
        audioCount++;
        //console.log('audioCount'+audioCount);
        if (audioCount >= 2) {
            console.log('audio present');
            audioBtnShow = false;
        }
        track.addEventListener('addcue', function (addCueEvent) {
            var cue = addCueEvent.cue;
        });
    });
    player.videoTracks.addEventListener('addtrack', function (e) {
        console.log(e);
        e.track.qualities.forEach(function (quality, index) {
            console.log(quality.height);
            qualityCount++;
            if (qualityCount >= 2) {
                qualityBtnShow = false;
            }
            qualityList += '<div class="menu-item" id="video_' + index + '">' + quality.height + '</div>'
        });

    });
    player.addEventListener('canplay', function (e) {
        //clearTimeout(errorTimeout);
        //$("#playerModal").modal('hide');
    });
}

function upKey() {
    let $current = $('.current');
    let currentId = $current.get()[0].id;
    let currentParentId = $current.parent().get()[0].id;
    if (currentParentId === "video-controls") {
        // $current.removeClass('current');
        // $("#option").addClass('current');
        cancelTimeout(10000);
    } else if (currentParentId === "option-list") {
        if ($current.prev().length > 0) {
            $current.removeClass('current');
            $current.prev().addClass("current");
        }
    } else if (currentParentId === "subtile-list") {
        if ($current.prev().length > 0) {
            $current.removeClass('current');
            $current.prev().addClass("current");
        }
    } else if (currentParentId === "audio-list") {
        if ($current.prev().length > 0) {
            $current.removeClass('current');
            $current.prev().addClass("current");
        }
    } else if (currentParentId === "video-list") {
        if ($current.prev().length > 0) {
            $current.removeClass('current');
            $current.prev().addClass("current");
        }
    }
    // else if (currentParentId === "speed-list") {
    //     if ($current.prev().length > 0) {
    //         $current.removeClass('current');
    //         $current.prev().addClass("current");
    //     }
    // }
}

function enterKey() {
    let $current = $('.current');
    let currentId = $current.get()[0].id;
    let currentParentId = $current.parent().get()[0].id;
    if (currentParentId === "video-controls") {
        cancelTimeout(10000);
        if (player.paused) {
            player.play();
        } else {
            player.pause();
        }
    } else if (currentParentId === "rightOpt") {
        // if (currentId === "startover") {
        //     localStorage.setItem("playlength", 0);
        //     location.reload();
        // } else {
        //     $current.removeClass('current');
        //     //$("#top-player").hide();
        //     $(".video-controls").hide();
        //     $(".menu-right").empty().append(createRightOpt());
        //     $(".option-list").children().eq(0).addClass("current")
        //     $(".menu-right").addClass('opened');
        //     defaultClearTimeout();
        // }

    } else if (currentParentId === "option-list") {
        if (currentId == "subtitle") {
            $(".menu-right").empty().append('<div class="subtile-list lst" id="subtile-list" style="margin-top:23rem">' + subtileList + '</div>');
            $current.removeClass('current');
            $("#" + defaultSubtile).addClass("current");
        } else if (currentId == "audio") {
            $(".menu-right").empty().append('<div class="audio-list lst" id="audio-list" style="margin-top:23rem">' + audioList + '</div>');
            $current.removeClass('current');
            $("#" + defaultAudio).addClass("current");
        } else if (currentId == "video") {
            $(".menu-right").empty().append('<div class="video-list lst" id="video-list" style="margin-top:23rem">' + qualityList + '</div>');
            $current.removeClass('current');
            $("#" + defaultQuality).addClass("current");

        }
        // else if (currentId == "playback") {
        //     speedCreate();
        //     $current.removeClass('current');
        //     $("#" + defaultPlaybackId).addClass("current");
        // }
        defaultClearTimeout();
    } else if (currentParentId === "subtile-list") {
        //defaultClearTimeout();
        if (currentId == "subtitle_off") {
            player.textTracks.forEach(function (track) {
                track.mode = "disabled";
            });
            defaultSubtile = "subtitle_off";
        } else {
            var currentPos = parseInt(currentId.split("_")[1]);
            player.textTracks.forEach(function (track) {
                track.mode = "disabled";
            });
            player.textTracks[currentPos].mode = "showing";
            defaultSubtile = currentId;
        }
        $current.removeClass('current');
        $(".menu-right").removeClass('opened');
        $(".video-controls").show();
        $(".slide-div").addClass("current");
    } else if (currentParentId === "audio-list") {
        //defaultClearTimeout();
        var currentPos = parseInt(currentId.split("_")[1]);
        player.audioTracks.forEach(function (track) {
            track.enabled = false;
        });
        if (currentPos == '') {
            player.audioTracks[0].enabled = true;
        } else {
            player.audioTracks[currentPos].enabled = true;
        }
        defaultAudio = currentId;
        $current.removeClass('current');
        $(".menu-right").removeClass('opened');
        $(".video-controls").show();
        $(".slide-div").addClass("current");
    } else if (currentParentId === "video-list") {
        //defaultClearTimeout();
        var currentPos = parseInt(currentId.split("_")[1]);
        defaultQuality = currentId;
        player.videoTracks[0].targetQuality = null;
        player.videoTracks[0].targetQuality = player.videoTracks[0].qualities[currentPos];
        $current.removeClass('current');
        $(".menu-right").removeClass('opened');
        $(".video-controls").show();
        $(".slide-div").addClass("current");
    }
    // else if (currentParentId === "speed-list") {
    //     //defaultClearTimeout();
    //     var speed = [0.25, 0.5, 1, 1.5, 2];
    //     var currentPos = parseInt(currentId.split("_")[1]);
    //     defaultPlaybackId = currentId;
    //     player.playbackRate = speed[currentPos];
    //     $current.removeClass('current');
    //     $(".menu-right").removeClass('opened');
    //     $(".video-controls").show();
    //     $(".slide-div").addClass("current");
    // }
}

function downKey() {
    let $current = $('.current');
    let currentId = $current.get()[0].id;
    let currentParentId = $current.parent().get()[0].id;
    if (currentParentId === "rightOpt") {
        $current.removeClass('current');
        $(".slide-div").addClass("current");
    } else if (currentParentId === "option-list") {
        if ($current.next().length > 0) {
            $current.removeClass('current');
            $current.next().addClass("current");
        } /*else {
            $current.removeClass('current');
            $(".menu-right").removeClass('opened');
            $(".video-controls").show();
            $(".slide-div").addClass("current");
        }*/
    } else if (currentParentId === "subtile-list") {
        if ($current.next().length > 0) {
            $current.removeClass('current');
            $current.next().addClass("current");
        }
    } else if (currentParentId === "audio-list") {
        if ($current.next().length > 0) {
            $current.removeClass('current');
            $current.next().addClass("current");
        }
    } else if (currentParentId === "video-list") {
        if ($current.next().length > 0) {
            $current.removeClass('current');
            $current.next().addClass("current");
        }
    }
    // else if (currentParentId === "speed-list") {
    //     if ($current.next().length > 0) {
    //         $current.removeClass('current');
    //         $current.next().addClass("current");
    //     }
    // }
    cancelTimeout(10000);
}

function leftKey() {
    let $current = $('.current');
    let currentId = $current.get()[0].id;
    let currentParentId = $current.parent().get()[0].id;
    if (currentParentId === "rightOpt") {
        if ($current.prev().length > 0) {
            $current.removeClass('current');
            $current.prev().addClass("current");
        }
    } else if (currentParentId === "video-controls") {
        $(".left-arrow").show();
        player.currentTime -= 10;
        document.getElementById('currentTime').innerHTML = timeFormat(player.currentTime);
        let percentage = (player.currentTime / player.duration) * 100;
        document.getElementById('bar-width').style.width = percentage + "%";
        $(".bar-btn").css("left", "calc(" + percentage + "% - 23.5px)");
        $(".left-arrow").delay(1000).fadeOut();
    }
}

function rightKey() {
    let $current = $('.current');
    let currentId = $current.get()[0].id;
    let currentParentId = $current.parent().get()[0].id;
    if (currentParentId === "rightOpt") {
        if ($current.next().length > 0) {
            $current.removeClass('current');
            $current.next().addClass("current");
        }
    } else if (currentParentId === "video-controls") {
        $(".right-arrow").show();
        player.currentTime += 10;
        document.getElementById('currentTime').innerHTML = timeFormat(player.currentTime);
        let percentage = (player.currentTime / player.duration) * 100;
        document.getElementById('bar-width').style.width = percentage + "%";
        $(".bar-btn").css("left", "calc(" + percentage + "% - 23.5px)");
        $(".right-arrow").delay(1000).fadeOut();
    }
}

function backKey() {
    let $current = $('.current');
    let currentId = $current.get()[0].id;
    let currentParentId = $current.parent().get()[0].id;
    if (currentParentId === "subtile-list" || currentParentId === "audio-list" || currentParentId === "video-list" || currentParentId === "speed-list") {
        $current.removeClass('current');
        //$("#top-player").hide();
        $(".menu-right").empty().append(createRightOpt());
        $(".option-list").children().eq(0).addClass("current")
    } else if (currentParentId === "option-list") {
        $current.removeClass('current');
        $(".menu-right").removeClass('opened');
        $("#option").addClass('current');
        //$("#top-player").show();
    } else {
        window.history.go(-2);
    }
}

function speedCreate() {
    var speed = [0.25, 0.5, 1, 1.5, 2];
    var _speed_div = '';
    for (var index = 0; index < speed.length; index++) {
        if (speed[index] === 1) {
            _speed_div += '<div class="menu-item" id="speed_' + index + '">Normal</div>';
        } else {
            _speed_div += '<div class="menu-item" id="speed_' + index + '">' + speed[index] + '</div>';
        }
    }
    //console.log(_speed_div);
    $(".menu-right").empty().append('<div class="speed-list lst" id="speed-list" style="margin-top:23rem">' + _speed_div + '</div>');
}

function createRightOpt() {
    let rightOptList = '';
    if (subtileBtnShow) {
        rightOptList += '<div class="menu-item" id="subtitle"><img src="images/message-square.png" />' + subtitles + '</div>';
    }
    if (audioBtnShow) {
        rightOptList += '<div class="menu-item" id="audio"><img src="images/headphones.png" />' + audio + '</div>';
    }
    if (qualityBtnShow) {
        rightOptList += '<div class="menu-item" id="video"><img src="images/settings.png" />' + quality + '</div>';
    }
    //rightOptList += '<div class="menu-item" id="playback"><img src="../assets/images/slow-motion.png" />SPEED</div>';
    return '<div class="option-list" id="option-list" style="margin-top:23rem">' + rightOptList + '</div>';
}

function hideWithDefaultFocus() {
    let $current = $('.current');
    let currentId = $current.get()[0].id;
    let currentParentId = $current.parent().get()[0].id;
    timer = setTimeout(function () {
        $current.removeClass('current');
        //$("#top-player").hide();
        $(".video-controls").hide();
        $(".menu-right").removeClass('opened');
        $(".slide-div").addClass("current");
    }, 10000)
}

function toggleSeekbar(time) {
    let $current = $('.current');
    let currentId = $current.get()[0].id;
    let currentParentId = $current.parent().get()[0].id;
    if (currentParentId == "video-controls" || currentParentId == "rightOpt") {
        //$("#top-player").show();
        $(".video-controls").show();
    }
    timer = setTimeout(function () {
        $current.removeClass('current');
        //$("#top-player").hide();
        $(".video-controls").hide();
        $(".menu-right").removeClass('opened');
        $(".slide-div").addClass("current");
    }, time)
}

function cancelTimeout(time) {
    window.clearTimeout(timer);
    if (video_type != "live") {
        toggleSeekbar(time);
    }
}

function defaultClearTimeout() {
    window.clearTimeout(timer);
    hideWithDefaultFocus();
}


function updateSlider(playerVal) {
    console.log(playerVal)
    player.currentTime = playerVal;
    document.getElementById('currentTime').innerHTML = timeFormat(player.currentTime);
    let percentage = (player.currentTime / player.duration) * 100;
    document.getElementById('bar-width').style.width = percentage + "%";
    $(".bar-btn").css("left", "calc(" + percentage + "% - 23.5px)");
}

$(document).on("click", ".menu-item", function () {
    let $current = $('.current');
    let currentId = $current.get()[0].id;
    let currentParentId = $current.parent().get()[0].id;
    let menuId = $(this).attr("id");
    if (currentParentId === "subtile-list") {
        if (menuId == "subtitle_off") {
            player.textTracks.forEach(function (track) {
                track.mode = "disabled";
            });
            defaultSubtile = "subtitle_off";
        } else {
            var currentPos = parseInt(menuId.split("_")[1]);
            player.textTracks.forEach(function (track) {
                track.mode = "disabled";
            });
            player.textTracks[currentPos].mode = "showing";
            defaultSubtile = menuId;
        }
        $current.removeClass('current');
        $(".menu-right").removeClass('opened');
        $(".video-controls").show();
        $(".slide-div").addClass("current");
    } else if (currentParentId === "audio-list") {
        var currentPos = parseInt(menuId.split("_")[1]);
        player.audioTracks.forEach(function (track) {
            track.enabled = false;
        });
        if (currentPos == '') {
            player.audioTracks[0].enabled = true;
        } else {
            player.audioTracks[currentPos].enabled = true;
        }
        defaultAudio = menuId;
        $current.removeClass('current');
        $(".menu-right").removeClass('opened');
        $(".video-controls").show();
        $(".slide-div").addClass("current");
    } else if (currentParentId === "video-list") {
        var currentPos = parseInt(menuId.split("_")[1]);
        defaultQuality = menuId;
        player.videoTracks[0].targetQuality = null;
        player.videoTracks[0].targetQuality = player.videoTracks[0].qualities[currentPos];
        $current.removeClass('current');
        $(".menu-right").removeClass('opened');
        $(".video-controls").show();
        $(".slide-div").addClass("current");
    } else if (currentParentId === "option-list") {
        if (menuId == "subtitle") {
            $(".menu-right").empty().append('<div class="subtile-list lst" id="subtile-list" style="margin-top:23rem">' + subtileList + '</div>');
            $current.removeClass('current');
            $("#" + defaultSubtile).addClass("current");
        } else if (menuId == "audio") {
            $(".menu-right").empty().append('<div class="audio-list lst" id="audio-list" style="margin-top:23rem">' + audioList + '</div>');
            $current.removeClass('current');
            $("#" + defaultAudio).addClass("current");
        } else if (menuId == "video") {
            $(".menu-right").empty().append('<div class="video-list lst" id="video-list" style="margin-top:23rem">' + qualityList + '</div>');
            $current.removeClass('current');
            $("#" + defaultQuality).addClass("current");
        }
    }
    defaultClearTimeout();
});


// $(document).on("click", "#option", function () {
//     let $current = $('.current');
//     $current.removeClass('current');
//$("#top-player").hide();
//     $(".video-controls").hide();
//     $(".menu-right").empty().append(createRightOpt());
//     $(".option-list").children().eq(0).addClass("current")
//     $(".menu-right").addClass('opened');
//     defaultClearTimeout();
// });

// $(document).on("click", "#startover", function () {
//     localStorage.setItem("playlength", 0);
//     location.reload();
// });


$(document).on("click", ".video-container", function () {
    if (player.paused) {
        player.play();
    } else {
        player.pause();
    }
});

