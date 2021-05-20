var host = "https://cmpm.pylonglobal.com/api/";
var host_non_api = "https://cmpm.pylonglobal.com/";

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return typeof sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
    return false;
};

var pStart = {x: 0, y:0};
var pStop = {x:0, y:0};

$(document).ready(function(){
    $("#logout-btn").click(function(){
        localStorage.removeItem("user");
        window.location.replace("../index.html");
    });
    $("#projects-btn").click(function(){
        window.location.replace("allprojects.html");
    });
    
    $("#profile-btn").click(function(){
        window.location.replace("profile.html");
    });
    
});


function swipeStart(e) {
    if (typeof e['targetTouches'] !== "undefined"){
        var touch = e.targetTouches[0];
        pStart.x = touch.screenX;
        pStart.y = touch.screenY;
    } else {
        pStart.x = e.screenX;
        pStart.y = e.screenY;
    }
}

function swipeEnd(e){
    if (typeof e['changedTouches'] !== "undefined"){
        var touch = e.changedTouches[0];
        pStop.x = touch.screenX;
        pStop.y = touch.screenY;
    } else {
        pStop.x = e.screenX;
        pStop.y = e.screenY;
    }
    swipeCheck();
}

function swipeCheck(){
    var changeY = pStart.y - pStop.y;
    var changeX = pStart.x - pStop.x;
    if (isPullDown(changeY, changeX) ) {
        $('body').prepend("<div class='d-flex justify-content-center'><img height='50px' id='load' src='https://c.tenor.com/I6kN-6X7nhAAAAAj/loading-buffering.gif'></div>");
        window.location.reload();
    }
}

function isPullDown(dY, dX) {
    // methods of checking slope, length, direction of line created by swipe action 
    return dY < 0 && (
        (Math.abs(dX) <= 100 && Math.abs(dY) >= 300)
        || (Math.abs(dX)/Math.abs(dY) <= 0.3 && dY >= 60)
    );
}

document.addEventListener('touchstart', function(e){ swipeStart(e); }, false);
document.addEventListener('touchend', function(e){ swipeEnd(e); }, false);
