if(UA.ANDIloadHelp){
			andiHelp = {};andiHelp.andiHelpArr = [{startdate:'2018-01-01',enddate:'2018-04-28',timetoswitch:10,andihelpSmalleLink:' http://gettecla.com',andihelpSmalleText:'take control of your device with your switches or wheelchair controls',andihelpSmalleSrcImg:'https://user-a.co.il/images/2018-01-15-22-59-10.tecla1.png',andihelpMediumLink:'https://user-a.co.il',andihelpMediumText:'bla bla 200',andihelpMediumSrcImg:'https://user-a.co.il/images/2017-12-30-15-40-07.Untitled320-200.png',},{startdate:'2018-01-01',enddate:'2018-03-31',timetoswitch:30,andihelpSmalleLink:'http://gettecla.com',andihelpSmalleText:'take control of your device with your switches or wheelchair controls',andihelpSmalleSrcImg:'https://user-a.co.il/images/2018-01-15-22-57-17.tecla2.png',andihelpMediumLink:'https://www.google.co.il/search?ei=_3pHWoysMsHVwQLY_Y24Dw&q=js+image+preview&oq=js+image+pre&gs_l=psy-ab.3.0.0i203k1l2j0j0i22i30k1l7.2647.7746.0.8831.8.7.1.0.0.0.222.940.0j4j1.5.0....0...1c.1.64.psy-ab..2.3.422....0.hwmVR9Ugl6Y',andihelpMediumText:'gfbfgbfgbfgb',andihelpMediumSrcImg:'https://user-a.co.il/images/2017-12-30-12-35-57.Untitled320-200.png',},{startdate:'2018-01-01',enddate:'2018-02-28',timetoswitch:60,andihelpSmalleLink:'https://user-a.co.il',andihelpSmalleText:'הידעת כי תוכל לשמור את הגדרות הנגישות כך שילוו אותך בכל אתר',andihelpSmalleSrcImg:'https://user-a.co.il/images/2018-01-15-23-03-06.Untitled320.png',},{startdate:'2018-01-01',enddate:'2018-03-31',timetoswitch:60,andihelpSmalleLink:'http://acc.org.il',andihelpSmalleText:'כל פתרונות בהנגשת  מסמכים',andihelpSmalleSrcImg:'https://user-a.co.il/images/2018-01-15-05-15-40.ACC_100x320px.jpg',},];  
	
	andiHelp.andiHelpTime = 15000;
    UAMpsuAAdh = function(UAvdOGbmYw, UAoUAZuHy) {
        UAvdOGbmYw = Math.ceil(UAvdOGbmYw);
        UAoUAZuHy = Math.floor(UAoUAZuHy);
        return Math.floor(Math.random() * (UAoUAZuHy - UAvdOGbmYw)) + UAvdOGbmYw;
    };
    if (localStorage.getItem("andiLoopHelpmiddlenumber") == undefined || localStorage.getItem("andiLoopHelpmiddlenumber") == "" || localStorage.getItem("andiLoopHelpmiddlenumber") == null) {
        localStorage.setItem("andiLoopHelpmiddlenumber", 0);
    }
    andiHelp.andiLoopHelpmiddlenumber = localStorage.getItem("andiLoopHelpmiddlenumber");
    if (localStorage.getItem("andiHelpmiddlenumberOfClicks") == undefined || localStorage.getItem("andiHelpmiddlenumberOfClicks") == "" || localStorage.getItem("andiHelpmiddlenumberOfClicks") == null) {
        localStorage.setItem("andiHelpmiddlenumberOfClicks", UAMpsuAAdh(10, 40));
    }
    if (localStorage.getItem("andiHelpmiddlenumberOfClicks") == undefined || localStorage.getItem("andiHelpmiddlenumberOfClicks") == "" || localStorage.getItem("andiHelpmiddlenumberOfClicks") == null) {
        localStorage.setItem("andiHelpmiddlenumberOfClicks", UAMpsuAAdh(3, 10));
    }
    if (localStorage.getItem("andiHelpmiddlenumberOfMins") == undefined || localStorage.getItem("andiHelpmiddlenumberOfMins") == "" || localStorage.getItem("andiHelpmiddlenumberOfMins") == null) {
        localStorage.setItem("andiHelpmiddlenumberOfMins", UAMpsuAAdh(20, 40));
    }
    // window.onbeforeunload = confirmExit;
}
confirmExit = function() {}
andiCloseLargeHelp = function() {
    if (UA.ANDIloadHelp) {
        andizxc("#UAeeSvitab1LargeHelp").css("display", "none");
        try {
            window.clearInterval(andiSetTimeOutHelpLarge);
        } catch (e) {
            if (UA.UAnMQzxTy.UAviliEOjq) {
                console.log("Error: " + e);
            }
        }
    }
};
andiCloseMiddleHelp = function() {
    if (UA.ANDIloadHelp) {
        andizxc("#UAeeSvitab1middleHelp").css("display", "none");
        try {
            window.clearInterval(andiSetTimeOutHelpMiddle);
        } catch (e) {
            if (UA.UAnMQzxTy.UAviliEOjq) {
                console.log("Error: " + e);
            }
        }
    }
};
andiCloseSmalleHelp = function() {
    if (UA.ANDIloadHelp) {
        andizxc("#UAeeSvitab1SmalleHelp").css("display", "none");
        try {
            window.clearInterval(andiSetTimeOutHelpSmalle);
        } catch (e) {
            if (UA.UAnMQzxTy.UAviliEOjq) {
                console.log("Error: " + e);
            }
        }
    }
};
andiOpenLargeHelp = function() {
    if (UA.ANDIloadHelp) {
        andizxc("#UAeeSvitab1LargeHelp").css("display", "block");
        if (localStorage.getItem("UAAkAuYc") == "on" && localStorage.getItem("UAlyqDBu") == "off" && andizxc("#UAndNxT").css("display") == "none") {
            andiLargeHelpHtml();
            UAeUuppAorrentLargeHelp(andiHelp.andiLoopHelpmiddlenumber);
        }
        andiRunLargeHelp();
        var andiActiveHelpLiveText = localStorage.getItem("andiActiveHelpLiveText");
        if (andiActiveHelpLiveText == "true") {
            andizxc("#UAeeSvitab1LargeHelp .UAaZklyVMjchangetolivetext").text(UA.UAZItJSbXp.UAQWGbufJd269);
            localStorage.setItem("andiActiveHelpLiveText", "true");
            andizxc("#UAeeSvitab1LargeHelp").css({
                "background-color": "#027DC0"
            });
        }
    }
};
andiOpenMiddleHelp = function() {
    if (UA.ANDIloadHelp) {
        andizxc("#UAeeSvitab1middleHelp").css("display", "block");
        var andiActiveHelpLiveText = localStorage.getItem("andiActiveHelpLiveText");
        for (var i = 0; i < andiHelp.andiHelpArr.length; i++) {
            if (andiActiveHelpLiveText == "true") {
                andizxc("#UAeeSvitab1middleHelp .UAaZklyVMjimg").append('<a style="display:none" target="_blank" UAaZklyVMjmiddlenumber="' + i + '" href="' + andiHelp.andiHelpArr[i].andihelpMediumLink + '"><div class="andiWrapHelpDesc"><div style="padding:10px 5px;background-color:#027DC0;color:#fff;font-size: 16px;">' + andiHelp.andiHelpArr[i].andihelpMediumText + "</div></div></a>");
            } else {
                andizxc("#UAeeSvitab1middleHelp .UAaZklyVMjimg").append('<a style="display:none" target="_blank" UAaZklyVMjmiddlenumber="' + i + '"  href="' + andiHelp.andiHelpArr[i].andihelpMediumLink + '"><img src="' + andiHelp.andiHelpArr[i].andihelpMediumSrcImg + '" alt="' + andiHelp.andiHelpArr[i].andihelpMediumText + '" /></a>');
            }
        }
        UAeUuppAorrentMiddleHelp(andiHelp.andiLoopHelpmiddlenumber);
        andiRunMiddleHelp();
        var andiActiveHelpLiveText = localStorage.getItem("andiActiveHelpLiveText");
        if (andiActiveHelpLiveText == "true") {
            andizxc("#UAeeSvitab1middleHelp .UAaZklyVMjchangetolivetext").text(UA.UAZItJSbXp.UAQWGbufJd269);
            localStorage.setItem("andiActiveHelpLiveText", "true");
            andizxc("#UAeeSvitab1middleHelp").css({
                "background-color": "#027DC0"
            });
        }
    }
};
andiOpenSmalleHelp = function() {
    if (UA.ANDIloadHelp) {
        andizxc("#UAeeSvitab1SmalleHelp").css("display", "block");
        UAeUuppAorrentSmalleHelp(andiHelp.andiLoopHelpmiddlenumber);
        andiRunSmalleHelp();
        var andiActiveHelpLiveText = localStorage.getItem("andiActiveHelpLiveText");
        if (andiActiveHelpLiveText == "true") {
            andizxc("#UAeeSvitab1SmalleHelp .UAaZklyVMjchangetolivetext").text(UA.UAZItJSbXp.UAQWGbufJd269);
            localStorage.setItem("andiActiveHelpLiveText", "true");
            andizxc("#UAeeSvitab1SmalleHelp").css({
                "background-color": "#027DC0",
				'color':'#fff',
				'font-size':'14px'
            });
        }
    }
};

function andiRunLargeHelp() {
    if (UA.ANDIloadHelp) {
        if (andiHelp.andiLoopHelpmiddlenumber >= andiHelp.andiHelpArr.length) {
            andiHelp.andiLoopHelpmiddlenumber = 0;
        }
        andiSetTimeOutHelpLarge = setInterval(function() {
            if (localStorage.getItem("UAAkAuYc") == "on" && localStorage.getItem("UAlyqDBu") == "off" && andizxc("#UAndNxT").css("display") == "none") {
                if (andizxc("#UAeeSvitab1LargeHelp").length == 0) {
                    andiLargeHelpHtml();
                }
                UAeUuppAorrentLargeHelp(andiHelp.andiLoopHelpmiddlenumber);
            }
        }, parseInt(localStorage.getItem("andiHelpmiddlenumberOfMins")) * 1000);
    }
}

function andiRunMiddleHelp() {
    if (UA.ANDIloadHelp) {
        if (andiHelp.andiLoopHelpmiddlenumber >= andiHelp.andiHelpArr.length) {
            andiHelp.andiLoopHelpmiddlenumber = 0;
        }
        andiSetTimeOutHelpMiddle = setInterval(function() {
            UAeUuppAorrentMiddleHelp(andiHelp.andiLoopHelpmiddlenumber);
        }, andiHelp.andiHelpTime);
    }
}

function andiRunSmalleHelp() {
    if (UA.ANDIloadHelp) {
        if (andiHelp.andiLoopHelpmiddlenumber >= andiHelp.andiHelpArr.length) {
            andiHelp.andiLoopHelpmiddlenumber = 0;
        }
        andiSetTimeOutHelpSmalle = setInterval(function checkIfToSkip() {
            if(checkIfCampainLegal()){
				UAeUuppAorrentSmalleHelp(andiHelp.andiLoopHelpmiddlenumber);
			} else {
				clearInterval(andiSetTimeOutHelpSmalle);
				andiHelp.andiLoopHelpmiddlenumber++;
				checkIfToSkip();
			}
        }, andiHelp.andiHelpTime);
    }
}

function checkIfCampainLegal(){
	var UABMgFPJOk = true;
	var timeNow = new Date();
	var startdate = new Date(andiHelp.andiHelpArr[andiHelp.andiLoopHelpmiddlenumber].startdate);
	var startdate1970 = startdate.getTime();
	var timeNow1970 = timeNow.getTime();
	var enddate = new Date(andiHelp.andiHelpArr[andiHelp.andiLoopHelpmiddlenumber].enddate);
	var enddate1970 = enddate.getTime();
	console.log(startdate)
	/*if(Invalid Date == 'Invalid Date'){//עדין לא התחיל קמפיין
		console.log(timeNow1970- startdate1970);
		console.log('עדין לא התחיל קמפיין');
	}*/
	if(timeNow1970 < startdate1970){//עדין לא התחיל קמפיין
		console.log(timeNow1970- startdate1970);
		console.log('עדין לא התחיל קמפיין');
		UABMgFPJOk = false;
	}
	if(timeNow1970 > startdate1970 && timeNow1970 < enddate1970){//הקמפיין התחיל ועדין לא נגמר
		console.log(timeNow1970- startdate1970);
		console.log('הקמפיין התחיל ועדין לא נגמר');
		UABMgFPJOk = true;
	}

	if(timeNow1970 > enddate1970){//הקמפיין נגמר
		console.log(timeNow1970- startdate1970);
		console.log('הקמפיין נגמר');
		UABMgFPJOk = true;
	}
	return UABMgFPJOk;
}




function countDownLargeHelp() {
    if (UA.ANDIloadHelp) {
        var UAaQxzxmeJ = 0;
        setTimeout(function() {
            andizxc("#UAeeSvitab1LargeHelp #UAeUuppAloseHelp").css("display", "block").attr({
                "role": "button",
                "tabindex": "0",
                "aria-label": UA.UAZItJSbXp.UAQWGbufJd264
            });
        }, andiHelp.andiHelpTime / 2);
    }
}

function countDownMiddleHelp() {
    if (UA.ANDIloadHelp) {
        var UAaQxzxmeJ = 0;
        setTimeout(function() {
            andizxc("#UAeeSvitab1middleHelp .UAaZklyVMjskipbtn").attr({
                "role": "button",
                "tabindex": "0"
            }).html(UA.UAZItJSbXp.UAQWGbufJd264 + "<span></span>");
        }, andiHelp.andiHelpTime / 2);
    }
}

function countDownSmalleHelp() {
    if (UA.ANDIloadHelp) {
        var UAaQxzxmeJ = 0;
        setTimeout(function() {
            andizxc("#UAeeSvitab1SmalleHelp .UAaZklyVMjskipbtn").attr({
                "role": "button",
                "tabindex": "0"
            }).html(UA.UAZItJSbXp.UAQWGbufJd264 + "<span></span>");
        }, andiHelp.andiHelpTime / 2);
    }
}
andizxc(document).on("click", "#UAeeSvitab1LargeHelp #UAeUuppAloseHelp", function() {
    if (UA.ANDIloadHelp) {
        andiCloseLargeHelp();
        localStorage.setItem("andiCloseLargeHelp", "true");
    }
});
andizxc(document).on("click", "#UAeeSvitab1middleHelp .UAaZklyVMjskipbtn", function() {
    if (UA.ANDIloadHelp) {
        andiCloseMiddleHelp();
        localStorage.setItem("andiCloseMiddleHelp", "true");
    }
});
andizxc(document).on("click", "#UAeeSvitab1SmalleHelp .UAaZklyVMjskipbtn", function() {
    if (UA.ANDIloadHelp) {
        andiCloseSmalleHelp();
        localStorage.setItem("andiCloseSmalleHelp", "true");
    }
});
andizxc(document).on("click", "#UAeeSvitab1LargeHelp .UAaZklyVMjchangetolivetext", function() {
    if (UA.ANDIloadHelp) {
        var andiActiveHelpLiveText = localStorage.getItem("andiActiveHelpLiveText");
        if (andiActiveHelpLiveText == "true") {
            localStorage.setItem("andiActiveHelpLiveText", "false");
            var UAaZklyVMjmiddlenumber = andiHelp.andiLoopHelpmiddlenumber - 1;
            if (UAaZklyVMjmiddlenumber < 0) {
                UAaZklyVMjmiddlenumber = andiHelp.andiHelpArr.length - 1;
            }
            andizxc("#UAeeSvitab1LargeHelp .UAaZklyVMjimg").html("").append('<a target="_blank" href="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpLargeLink + '"><img src="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpLargeSrcImg + '" alt="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpLargeText + '" /></a>');
        } else {
            localStorage.setItem("andiActiveHelpLiveText", "true");
            andizxc("#UAeeSvitab1LargeHelp").css({
                "background-color": "#027DC0"
            });
            var andiHelpDesc = andizxc("#UAeeSvitab1LargeHelp .UAaZklyVMjimg img").attr("alt");
            andizxc("#UAeeSvitab1LargeHelp .UAaZklyVMjimg a").html("").html('<div class="andiWrapHelpDesc"><div style="padding:10px 5px;background-color:#027DC0;color:#fff;font-size: 16px;">' + andiHelpDesc + "</div></div>");
        }
    }
});
andizxc(document).on("click", "#UAeeSvitab1middleHelp .UAaZklyVMjchangetolivetext", function() {
    if (UA.ANDIloadHelp) {
        var andiActiveHelpLiveText = localStorage.getItem("andiActiveHelpLiveText");
        if (andiActiveHelpLiveText == "true") {
            localStorage.setItem("andiActiveHelpLiveText", "false");
            var UAaZklyVMjmiddlenumber = andiHelp.andiLoopHelpmiddlenumber - 1;
            if (UAaZklyVMjmiddlenumber < 0) {
                UAaZklyVMjmiddlenumber = andiHelp.andiHelpArr.length - 1;
            }
            andizxc("#UAeeSvitab1middleHelp .UAaZklyVMjimg").html("").append('<a target="_blank" href="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpMediumLink + '"><img src="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpMediumSrcImg + '" alt="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpMediumText + '" /></a>');
            andizxc("#UAeeSvitab1middleHelp").attr("tabindex", "0").focus();
        } else {
            localStorage.setItem("andiActiveHelpLiveText", "true");
            andizxc("#UAeeSvitab1middleHelp").css({
                "background-color": "#027DC0"
            });
            var andiHelpDesc = andizxc("#UAeeSvitab1middleHelp .UAaZklyVMjimg img").attr("alt");
            andizxc("#UAeeSvitab1middleHelp .UAaZklyVMjimg a").html("").html('<div class="andiWrapHelpDesc"><div style="padding:10px 5px;background-color:#027DC0;color:#fff;font-size: 16px;">' + andiHelpDesc + "</div></div>");
        }
    }
});
andizxc(document).on("click", "#UAeeSvitab1SmalleHelp .UAaZklyVMjchangetolivetext", function() {
    if (UA.ANDIloadHelp) {
        var andiActiveHelpLiveText = localStorage.getItem("andiActiveHelpLiveText");
        if (andiActiveHelpLiveText == "true") {
            localStorage.setItem("andiActiveHelpLiveText", "false");
            var UAaZklyVMjmiddlenumber = andiHelp.andiLoopHelpmiddlenumber - 1;
            if (UAaZklyVMjmiddlenumber < 0) {
                UAaZklyVMjmiddlenumber = andiHelp.andiHelpArr.length - 1;
            }
            andizxc("#UAeeSvitab1SmalleHelp .UAaZklyVMjimg").html("").append('<a target="_blank" href="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpSmalleLink + '"><img src="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpSmalleSrcImg + '" alt="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpSmalleText + '" /></a>');
        } else {
            localStorage.setItem("andiActiveHelpLiveText", "true");
            andizxc("#UAeeSvitab1SmalleHelp").css({
                "background-color": "#027DC0"
            });
            var andiHelpDesc = andizxc("#UAeeSvitab1SmalleHelp .UAaZklyVMjimg img").attr("alt");
            andizxc("#UAeeSvitab1SmalleHelp .UAaZklyVMjimg a").html("").html('<div class="andiWrapHelpDesc"><div style="padding:10px 5px;background-color:#027DC0;color:#fff;font-size: 16px;">' + andiHelpDesc + "</div></div>");
        }
    }
});

function UAeUuppAorrentLargeHelp(UAaZklyVMjmiddlenumber) {
    if (UA.ANDIloadHelp) {
        andizxc("#UAeeSvitab1LargeHelp").css("display", "block");
        andizxc("#UAeeSvitab1LargeHelp #UAeUuppAloseHelp").css("display", "none");
        if (UAaZklyVMjmiddlenumber >= andiHelp.andiHelpArr.length) {
            UAaZklyVMjmiddlenumber = 0;
            andiHelp.andiLoopHelpmiddlenumber = 0;
        }
        andizxc("#UAeeSvitab1LargeHelp .UAaZklyVMjskipbtn").attr({
            "role": "",
            "tabindex": "-1"
        }).html("<span></span>");
        var UAepnKuxzX = document.activeElement;
        andizxc("#UAeeSvitab1LargeHelp .UAaZklyVMjimg").html("");
        var andiActiveHelpLiveText = localStorage.getItem("andiActiveHelpLiveText");
        if (andiActiveHelpLiveText == "true") {
            andizxc("#UAeeSvitab1LargeHelp .UAaZklyVMjimg").append('<a target="_blank" href="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpLargeLink + '"><div class="andiWrapHelpDesc"><div style="padding:10px 5px;background-color:#027DC0;color:#fff;font-size: 16px;>' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpLargeText + "</div></div></a>");
        } else {
            andizxc("#UAeeSvitab1LargeHelp .UAaZklyVMjimg").append('<a target="_blank" href="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpLargeLink + '"><img src="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpLargeSrcImg + '" alt="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpLargeText + '" /></a>');
        }
        if (UAaZklyVMjmiddlenumber >= andiHelp.andiHelpArr.length - 1) {
            andiHelp.andiLoopHelpmiddlenumber = 0;
        } else {
            andiHelp.andiLoopHelpmiddlenumber++;
        }
        if (andizxc(UAepnKuxzX).is("#UAeeSvitab1LargeHelp .UAaZklyVMjimg a")) {
            UAepnKuxzX.focus();
        }
        countDownLargeHelp();
        setTimeout(function() {
            andizxc("#UAeeSvitab1LargeHelp").css("display", "none");
        }, andiHelp.andiHelpTime);
    }
}

function UAeUuppAorrentMiddleHelp(UAaZklyVMjmiddlenumber) {
    if (UA.ANDIloadHelp) {
        if (UAaZklyVMjmiddlenumber >= andiHelp.andiHelpArr.length) {
            UAaZklyVMjmiddlenumber = 0;
            andiHelp.andiLoopHelpmiddlenumber = 0;
        }
        var UAepnKuxzX = document.activeElement;
        andizxc("#UAeeSvitab1middleHelp .UAaZklyVMjskipbtn").attr({
            "role": "",
            "tabindex": "-1"
        }).html("<span></span>");
        andizxc('[UAaZklyVMjmiddlenumber="' + UAaZklyVMjmiddlenumber + '"]').fadeIn(750);
        countDownMiddleHelp();
        andiSetTimeOutHelpSmalle = setInterval(function() {
            andizxc('[UAaZklyVMjmiddlenumber="' + UAaZklyVMjmiddlenumber + '"]').fadeOut(750);
            if (UAaZklyVMjmiddlenumber >= andiHelp.andiHelpArr.length - 1) {
                UAaZklyVMjmiddlenumber = 0;
                andiHelp.andiLoopHelpmiddlenumber = 0;
            } else {
                UAaZklyVMjmiddlenumber++;
                andiHelp.andiLoopHelpmiddlenumber++;
            }
            setTimeout(function() {
                andizxc('[UAaZklyVMjmiddlenumber="' + UAaZklyVMjmiddlenumber + '"]').fadeIn(750);
                setTimeout(function() {
                    if (andizxc(UAepnKuxzX).is('[UAaZklyVMjmiddlenumber="' + UAaZklyVMjmiddlenumber + '"]')) {
                        UAepnKuxzX.focus();
                    }
                }, 750);
                countDownMiddleHelp();
            }, 650);
        }, 10000);
    }
}

function UAeUuppAorrentSmalleHelp(UAaZklyVMjmiddlenumber) {
    if (UA.ANDIloadHelp) {
        if (UAaZklyVMjmiddlenumber >= andiHelp.andiHelpArr.length) {
            UAaZklyVMjmiddlenumber = 0;
            andiHelp.andiLoopHelpmiddlenumber = 0;
        }
        andizxc("#UAeeSvitab1SmalleHelp .UAaZklyVMjskipbtn").attr({
            "role": "",
            "tabindex": "-1"
        }).html("<span></span>");
        var UAepnKuxzX = document.activeElement;
        andizxc("#UAeeSvitab1SmalleHelp .UAaZklyVMjimg").html("");
        var andiActiveHelpLiveText = localStorage.getItem("andiActiveHelpLiveText");
        if (andiActiveHelpLiveText == "true") {
            andizxc("#UAeeSvitab1SmalleHelp .UAaZklyVMjimg").append('<a target="_blank" href="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpSmalleLink + '"><div class="andiWrapHelpDesc"><div style="padding:10px 5px;background-color:#027DC0;color:#fff;font-size: 16px;">' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpSmalleText + "</div></div></a>");
        } else {
            andizxc("#UAeeSvitab1SmalleHelp .UAaZklyVMjimg").append('<a target="_blank" href="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpSmalleLink + '"><img src="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpSmalleSrcImg + '" alt="' + andiHelp.andiHelpArr[UAaZklyVMjmiddlenumber].andihelpSmalleText + '" /></a>');
        }
        if (UAaZklyVMjmiddlenumber >= andiHelp.andiHelpArr.length - 1) {
            andiHelp.andiLoopHelpmiddlenumber = 0;
        } else {
            andiHelp.andiLoopHelpmiddlenumber++;
        }
        if (andizxc(UAepnKuxzX).is("#UAeeSvitab1SmalleHelp .UAaZklyVMjimg a")) {
            UAepnKuxzX.focus();
        }
        countDownSmalleHelp();
    }
}

function andiLargeHelpHtml() {
    if (UA.ANDIloadHelp) {
        andizxc("body").prepend('<div id="UAeeSvitab1LargeHelp"><div id="UAJrcWArHelp"><div id="UAeUuppAloseHelp"><input src="' + UA.UAVsTsXtF.UAJvdLMAb + '" type="image" alt="' + UA.UAZItJSbXp.UAtyuATBtn + '" /></div></div><div class="UAaZklyVMjimg"></div><div class="UAaZklyVMjchangetolivetext"  role="button" aria-label="' + UA.UAZItJSbXp.UAQWGbufJd270 + '" tabindex="0">' + UA.UAZItJSbXp.UAQWGbufJd268 + '</div><div id="UAsowAuHxFooter2"><a href="https://www.user-a.co.il" target="_blank">' +
            UA.UAZItJSbXp.UAKJVeua + "</a></div></div>    ");
        andizxc("#UAeeSvitab1LargeHelp").css("display", "block");
    }
};