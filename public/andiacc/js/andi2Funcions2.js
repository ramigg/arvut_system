UAGtGXb = function() {
	UA.UAPAtCiTH = function(UABJteddi) {
		andizxc('.UAbjhhT, .UAMbAgsHo').remove();
		if (UABJteddi !== undefined && UABJteddi.length > 0) {
		for (var UAOUApMqar = 0; UAOUApMqar < UABJteddi.length; UAOUApMqar++) {
        var UAaXRgxU = UABJteddi[UAOUApMqar].UACwcTRfbb;
        if (andizxc(UAaXRgxU).children().length > 0 && UAaXRgxU.length > 0 && andizxc(UAaXRgxU).css("display") != "none" && andizxc(UAaXRgxU).css("visibility") != "hidden" && andizxc(UAaXRgxU).css("opacity") != "0" && andizxc.trim(andizxc(UABJteddi[UAOUApMqar].UACwcTRfbb).text()) != "") {
          andizxc(UABJteddi[UAOUApMqar].UACwcTRfbb).prepend('<a class="UAyYGkAUskipArea" name="UASGXOfb' + UAOUApMqar + '"  tabindex="0" >' + UABJteddi[UAOUApMqar].UAvextpKAG + ",<br />" + UA.UAZItJSbXp.UAtPgoF + "</a>");
        }
        if (UABJteddi[UAOUApMqar].UAKkohymTk && UABJteddi[UAOUApMqar].UACwcTRfbb != "undefined" && UABJteddi[UAOUApMqar].UACwcTRfbb != undefined && andizxc.trim(andizxc(UABJteddi[UAOUApMqar].UACwcTRfbb).text() != "")) {
          andizxc("body").prepend('<a id="UAzlSFwp" class="UAGvIbFH" name="UAzlSFwp" href="#UAMainContent" tabindex="0" > ' + UA.UAZItJSbXp.UALKafb + "</a>");
          andizxc(UABJteddi[UAOUApMqar].UACwcTRfbb).attr({"role":"main"});
        }
      }
      var UAyThenM = andizxc("title").text();
      andizxc("body").append('<a id="UAtLeprJhT" class="UAyYGkAUskipArea" name="UAtLeprJhT" href="#UAzlSFwp" tabindex="0" >' + UA.UAZItJSbXp.UAJAqFAq + UAyThenM + " " + UA.UAZItJSbXp.UAWSdxqzh + " </a>");
      andizxc(".UAGvIbFH").click(function(event) {
        event.preventDefault();
        var UAJqvvQYw = andizxc('[role="main"]');
        if (UAJqvvQYw != undefined && UAJqvvQYw.length == 1) {
          andizxc(UAJqvvQYw).attr("tabindex", "0").focus();
        }
      });
	  
	    andizxc(document).on("click", "#UAtLeprJhT", function(ANDIevent) {
    andizxc("body").attr("tabindex", "0").focus().scrollTop(0);
    andizxc("body").attr("tabindex", "");
  });
  andizxc(document).on("focus", ".UA2skipAreaAutomate", function(ANDIevent) {
    //andizxc(this).parent().css({"outline":"5px solid #49C0EB"});
    andizxc(this).parent().css({"box-shadow":"0px 0px 3px 5px rgba(73,192,235,1)"});
	

	
  });
  andizxc(document).on("blur", ".UA2skipAreaAutomate", function(ANDIevent) {
    andizxc(this).parent().css({"outline":""});
    andizxc(this).parent().css({"box-shadow":""});
  });
  
			var UAyThenM = andizxc("title").text();
			andizxc(".UAyYGkAUskipArea").each(function(UAOUApMqar) {
				 var UArocgeQ = andizxc(".UAyYGkAUskipArea");
				 if ((UArocgeQ.length - 1) == UAOUApMqar) {
					 andizxc(this).attr({
						 "href": "#UAzlSFwp",
						 "name": "UASGXOfb" + UAOUApMqar
					 });
				 } else {
					 andizxc(this).attr({
						 "href": "#UASGXOfb" + (UAOUApMqar + 1),
						 "name": "UASGXOfb" + UAOUApMqar,
						 "id": "UASGXOfb" + UAOUApMqar
					 });
				 }
			});
			andizxc(".UAyYGkAUskipArea").click(function(ANDIevent) {
				 ANDIevent.preventDefault();
				 var UArocgeQUAskipArea = andizxc(".UAyYGkAUskipArea");
				 var UALxltSA = andizxc.inArray(this, UArocgeQUAskipArea);
				 var offSetTop = andizxc(UArocgeQUAskipArea[UALxltSA + 1]).scrollTop();
				 if ((UALxltSA + 1) == UArocgeQUAskipArea.length) {
					 andizxc('#UAzlSFwp').attr('tabindex', '0').focus().scrollTop(0);
				 } else {
					 andizxc(UArocgeQUAskipArea[UALxltSA + 1]).attr('tabindex', '0').focus().scrollTop(offSetTop + 50);
				 }
			});
			andizxc(".UAyYGkAUskipArea").focus(function() {
				 andizxc(this).parent().css({
					 'font-size': '16px'
				 });
				 }).blur(function() {
					 andizxc(this).parent().css({
						 'font-size': ''
					 });
				 });
				 andizxc(".UAMbAgsHo, .UAbjhhT").keydown(function(ANDIevent) {
					 if (ANDIevent.keyCode == 13) {
						 andizxc(this).find('a').first().click();
				}
			});
		}
	};


	 UA.markTextLagn = function(){
		 if(false){
			 if(UA.UAoxHBWTi != 'he'){
				 for(var UAOUApMqar = 0; UAOUApMqar < UA.UAHpYfBri.length; UAOUApMqar++){
					UAKzDBOgB(document.body,UA.UAHpYfBri[UAOUApMqar],'','he');
				 }
			 }
			 if(UA.UAoxHBWTi != 'ar'){
				 for(var UAOUApMqar = 0; UAOUApMqar < UA.UAZOYQi.length; UAOUApMqar++){
					UAKzDBOgB(document.body,UA.UAZOYQi[UAOUApMqar],'','ar');
				 }
			 }
			 if(UA.UAoxHBWTi != 'en'){
				 for(var UAOUApMqar = 0; UAOUApMqar < UA.UAHPjrd.length; UAOUApMqar++){
					UAKzDBOgB(document.body,UA.UAHPjrd[UAOUApMqar],'','en');
				 }
			 }
			 if(UA.UAoxHBWTi != 'ru'){
				 for(var UAOUApMqar = 0; UAOUApMqar < UA.UALhzEP.length; UAOUApMqar++){
					UAKzDBOgB(document.body,UA.UALhzEP[UAOUApMqar],'','ru');
				 }
			 }
		 }
	 }


	 UA.UAJIRvqB = function (UAkcQRC) {
        if (UAkcQRC !=undefined &&  UAkcQRC) {
			if(andizxc('#UAdyatPaGndiInputdiscrp').length == 0){
				andizxc('head').append('<style id="UAdyatPaGndiInputdiscrp">body [andiAllElmWithText][title]{display: inline-block;}body [andiAllElmWithText][title]:focus:after{content: "  ("  attr(title) ") ";padding: 5px;z-index: 98;background-color:#000;color:#fff;min-width:50px;display: block;}body [andiAllElmWithText][title]:focus:before{content: "";z-index: 99;}</style>');
			}
			andizxc('[andiAllElmWithText][title]').attr('tabIndex','0');
			andizxc('iframe').each(function(){
				try{
					if(andizxc(this).contents().find('#UAdyatPaGndiInputdiscrp').length == 0){
						andizxc(this).contents().find('head').append('<style id="UAdyatPaGndiInputdiscrp">body [andiAllElmWithText][title]{display: inline-block;}body [andiAllElmWithText][title]:focus:after{content: "  ("  attr(title) ") ";padding: 5px;z-index: 98;background-color:#000;color:#fff;min-width:50px;display: block;}body [andiAllElmWithText][title]:focus:before{content: "";z-index: 99;}</style>');
					}
					andizxc(this).contents().find('[andiAllElmWithText][title]').attr('tabIndex','0');
				} catch(ANDIerr) {
					if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
				}
			});
			
		}
	 }
	 
	 
    UA.UAYpAdsAZn = function (UAMfFQfWTh) {
		if(UAMfFQfWTh != undefined ){
            var UAacKcI = UA.UAqFHmLNR();
            if (UAMfFQfWTh !== undefined && UAMfFQfWTh.length > 0) {
				andizxc(UAMfFQfWTh).each(function (UAOUApMqar) {
					if(UA.UAhjjHhP(UAMfFQfWTh[UAOUApMqar].UACMjza,UAMfFQfWTh[UAOUApMqar].UAagmeN)){
                    if ((UAMfFQfWTh[UAOUApMqar].UAbYNEYU).length > 0) {
                        setTimeout(function () {
                            andizxc(UAMfFQfWTh[UAOUApMqar].UAYVpstw).each(function (TUAj) {
                                UA.UAlXwTPTqD(UAMfFQfWTh[UAOUApMqar].UAYVpstw[TUAj]);
                            });
							if(UAMfFQfWTh[UAOUApMqar].UAfJlalrb != ''){
								andizxc('head').append('<style id="sliderStyle'+UAOUApMqar+'">'+UAMfFQfWTh[UAOUApMqar].UAfJlalrb+'</style>');
							}
                            if (UAMfFQfWTh[UAOUApMqar].UAjuIPpVpZ == null || UAMfFQfWTh[UAOUApMqar].UAjuIPpVpZ == undefined || UAMfFQfWTh[UAOUApMqar].UAjuIPpVpZ == 'null' || UAMfFQfWTh[UAOUApMqar].UAjuIPpVpZ == 'undefined' || UAMfFQfWTh[UAOUApMqar].UAjuIPpVpZ == '') { UAMfFQfWTh[UAOUApMqar].UAjuIPpVpZ = UAMfFQfWTh[UAOUApMqar].UAlcUbcVQc; }
                            if (UAMfFQfWTh[UAOUApMqar].UAByLIH || UAMfFQfWTh[UAOUApMqar].UAByLIH == undefined) {
                                andizxc(UAMfFQfWTh[UAOUApMqar].UAjuIPpVpZ).css({ 'position': 'relative' }).prepend('<input type="image" class="UAbmwvwiS" src="' + UAacKcI.stop + ' "id="UArTVgbe' + UAOUApMqar + '" alt="' + UA.UAZItJSbXp.UAvStCFCmm + '"/>');
                            } else {
                                andizxc(UAMfFQfWTh[UAOUApMqar].UAjuIPpVpZ).css({ 'position': 'relative' }).prepend('<input type="image" class="UAIHcrY" src="' + UAacKcI.stop + ' "id="UArTVgbe' + UAOUApMqar + '" alt="' + UA.UAZItJSbXp.UAZSGaU + '"/>');
                            }
                            if (UAMfFQfWTh[UAOUApMqar].UAYkPFoa != 'left' && UAMfFQfWTh[UAOUApMqar].UAYkPFoa != 'right') { UAMfFQfWTh[UAOUApMqar].UAYkPFoa = 'left'; }
                            if (UAMfFQfWTh[UAOUApMqar].UAYkPFoa == 'left') {
                                if (!andizxc.isNumeric(UAMfFQfWTh[UAOUApMqar].UAQypinCwd)) { UAMfFQfWTh[UAOUApMqar].UAQypinCwd = 5; }
                                if (!andizxc.isNumeric(UAMfFQfWTh[UAOUApMqar].UAEUSBPgL)) { UAMfFQfWTh[UAOUApMqar].UAEUSBPgL = 5; }
                                andizxc('#UArTVgbe' + UAOUApMqar).css({ 'top': UAMfFQfWTh[UAOUApMqar].UAQypinCwd, 'left': UAMfFQfWTh[UAOUApMqar].UAEUSBPgL });
                            } else {
                                if (!andizxc.isNumeric(UAMfFQfWTh[UAOUApMqar].UAQypinCwd)) { UAMfFQfWTh[UAOUApMqar].UAQypinCwd = 5; }
                                if (!andizxc.isNumeric(UAMfFQfWTh[UAOUApMqar].UAEUSBPgL)) { UAMfFQfWTh[UAOUApMqar].UAEUSBPgL = 5; }
                                andizxc('#UArTVgbe' + UAOUApMqar).css({ 'top': UAMfFQfWTh[UAOUApMqar].UAQypinCwd, 'right': UAMfFQfWTh[UAOUApMqar].UAEUSBPgL });
                            }
                        }, UAMfFQfWTh[UAOUApMqar].UAANytVslO);
                    }
					}
                });
                andizxc(UAMfFQfWTh).each(function (UAOUApMqar) {
                    setTimeout(function () {
                        var UAbYNEYU = UAMfFQfWTh[UAOUApMqar].UAbYNEYU, UAdyatPaG = [], UAAbGsmiXR = UAOUApMqar;
                        andizxc(UAbYNEYU).each(function (index) {
                            UAbIhIapNv = andizxc(UAbYNEYU).first().height();
                            if (UAbIhIapNv < 60) {
                                UAbIhIapNv = 60;
                            }
                            var UAOGBBrKSb = UAbIhIapNv * index;
                            UAwouVWwlv = andizxc(UAbYNEYU).first().width();
                            UAdyatPaG.push(andizxc(this).clone().css({'height': UAbIhIapNv, 'width': UAwouVWwlv, 'display': 'inline-block', 'opacity': '1', 'visibility': 'visible', 'position': 'relative', 'top': '', 'left': '', 'right': '' }).attr('tabindex', '0').addClass('UArDAiakxp' + UAAbGsmiXR));
                        });
                        andizxc('#UArTVgbe' + UAOUApMqar).bind('click', function (ANDIevent) {
                            ANDIevent.preventDefault();
                            UA.UAGjfbBeV(UAMfFQfWTh, UAOUApMqar, UAdyatPaG);

                            UA.UAhDDCFL(UA.UAZItJSbXp.UAWKynEQxl);
                        });
                    }, (UAMfFQfWTh[UAOUApMqar].time + 50));
                });
            }
        }
    };

    UA.UAGjfbBeV = function (UAMfFQfWTh, UAOUApMqar, UAdyatPaG) {
            var  UAacKcI = UA.UAqFHmLNR();
            andizxc('#UArTVgbe' + UAOUApMqar).removeAttr('role').removeAttr('aria-label');
            var state = null;
            if (andizxc('#UArTVgbe' + UAOUApMqar).hasClass('UAFyzTwvlL')) {
                state = false;
                UA.UArPbqT(UAMfFQfWTh[UAOUApMqar], false, UAOUApMqar, UAdyatPaG);
                andizxc('#UArTVgbe' + UAOUApMqar).attr('src', UAacKcI.stop);
                if (UAMfFQfWTh[UAOUApMqar].UAByLIH || UAMfFQfWTh[UAOUApMqar].UAByLIH == undefined) {
                    andizxc('#UArTVgbe' + UAOUApMqar).removeClass('UAFyzTwvlL').addClass('UAIHcrY').attr({ 'role': 'alert', 'aria-label': UA.UAZItJSbXp.UAIHcrY });
                } else {
                    andizxc('#UArTVgbe' + UAOUApMqar).removeClass('UAFyzTwvlL').addClass('UAIHcrY').attr({ 'role': 'alert', 'aria-label': UA.UAZItJSbXp.UAUBoINZ });
                }
                setTimeout(function () { andizxc('#UArTVgbe' + UAOUApMqar).removeAttr('role').removeAttr('aria-label'); }, 500);
                andizxc(UAMfFQfWTh[UAOUApMqar].UAlcUbcVQc).css({ 'position': 'relative' });
                andizxc(UAMfFQfWTh[UAOUApMqar].UAbYNEYU).css({ 'opacity': '1' });
            } else {
                state = true;
                UA.UArPbqT(UAMfFQfWTh[UAOUApMqar], true, UAOUApMqar, UAdyatPaG);
                andizxc('#UArTVgbe' + UAOUApMqar).attr({ 'src': UAacKcI.UAWmKUGs });
                if (UAMfFQfWTh[UAOUApMqar].UAByLIH || UAMfFQfWTh[UAOUApMqar].UAByLIH == undefined) {
                    andizxc('#UArTVgbe' + UAOUApMqar).removeClass('UAIHcrY').addClass('UAFyzTwvlL').attr({ 'role': 'alert', 'aria-label': UA.UAZItJSbXp.UAFyzTwvlL });
                } else {
                    andizxc('#UArTVgbe' + UAOUApMqar).removeClass('UAIHcrY').addClass('UAFyzTwvlL').attr({ 'role': 'alert', 'aria-label': UA.UAZItJSbXp.UALESrAsXV });
                }
                setTimeout(function () { andizxc('#UArTVgbe' + UAOUApMqar).removeAttr('role').removeAttr('aria-label'); }, 500);
            }
        
    };

    UA.UArPbqT = function (slider, state, UAAbGsmiXR, UAdyatPaG) {
            var UAbYNEYU = slider.UAbYNEYU, UAlcUbcVQc = slider.UAlcUbcVQc, UAYVpstw = slider.UAYVpstw;
            if (state) {
                andizxc(UAYVpstw).each(function (UAOUApMqar) {
                    andizxc(UAYVpstw[UAOUApMqar].UAJqvvQYw).css({ 'opacity': '0' }).attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                });
                var UAneBHzu = (andizxc(UAlcUbcVQc).width());
                var UATHKHEyl = (andizxc(UAlcUbcVQc).height());
                if (UATHKHEyl < 60) {
                    UATHKHEyl = 60;
                }

                andizxc(UAlcUbcVQc).css({ 'position': 'relative' }).append('<div id="UAyYcCJ' + UAAbGsmiXR + '" style="overflow:hidden"><span id="UAvhUux" role="tooltip" style="background-color:#000;color:#fff;text-align:center;display:block;height:20px;font-size:16px;z-index:999999">' + UA.UAZItJSbXp.UAvhUux + '</span><div class="UAXNdAaa' + UAAbGsmiXR + '" ></div></div>');
                andizxc('#UAyYcCJ' + UAAbGsmiXR).css({ 'opacity': '1', 'z-index': '99998', height: UATHKHEyl + 20, 'width': UAneBHzu, 'position': 'absolute', 'top': '0', 'overflow': 'hidden' });
                andizxc(UAbYNEYU).each(function () {
                    andizxc(this).css({ 'opacity': '0' }).children().attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                });
                andizxc('.UAXNdAaa' + UAAbGsmiXR).css({ 'width': (UAneBHzu + 20), 'height': UATHKHEyl, 'z-index': '99999989', 'position': 'relative', 'top': '0', 'overflow-y': 'scroll', 'overflow-x': 'hidden' }).append(UAdyatPaG);
                andizxc('.UAXNdAaa' + UAAbGsmiXR).attr({ 'tabindex': '0' }).focus();
                andizxc('.UAXNdAaa' + UAAbGsmiXR).scroll(function () {
                    andizxc('#UAvhUux').css('display', 'none');
                });
                UA.UAJIRvqB(UA.UAnMQzxTy.UAkcQRC);
                andizxc('#UAyYcCJ' + UAAbGsmiXR).find('*').each(function () {
                    andizxc(this).stop(true, true).clearQueue();
                });
            } else {
                andizxc('#UAyYcCJ' + UAAbGsmiXR).remove();
                andizxc(UAYVpstw).each(function (UAOUApMqar) {
                    andizxc(UAYVpstw[UAOUApMqar].UAJqvvQYw).css({ 'opacity': '1' }).attr({ 'tabindex': '0', 'aria-hidden': 'false' });
                });
            }
        
    };

    UA.UABBbcy = function () {
        var UACrBKAz = UA.UAnMQzxTy.UASIzhST;
		if(UACrBKAz != undefined){
        var UAacKcI = UA.UAqFHmLNR();
        andizxc(UACrBKAz).each(function (UAOUApMqar) {
		if(UA.UAhjjHhP(UACrBKAz[UAOUApMqar].UACMjza,UACrBKAz[UAOUApMqar].UAagmeN)){	
		andizxc('head').append('<style id="UAdyatPaGndiMenus">UAdyatPaGndiSubMenuLevel3 *:focus{outline:2px solid #000} .UAdyatPaGndiSubMenu *:focus{outline:2px solid #000}</style>');
            if(UACrBKAz[UAOUApMqar].UAsLFnWaB != ''){
				andizxc('head').append('<style id="sliderStyle'+UAOUApMqar+'">'+UACrBKAz[UAOUApMqar].UAsLFnWaB+'</style>');
			}
			
			if ((UACrBKAz[UAOUApMqar].UAJhmboQ != '')) {
                andizxc(UACrBKAz[UAOUApMqar].UAJhmboQ).attr({ 'role': 'navigation' });
            }
            if ((UACrBKAz[UAOUApMqar].UAYrtxYPV != '')) {
				andizxc(UACrBKAz[UAOUApMqar].UAJhmboQ).find('a').each(function(){
					andizxc(this).parent().attr({ 'role': 'menuitem', 'tabindex': '-1'});
				});
                andizxc(UACrBKAz[UAOUApMqar].UAYrtxYPV).each(function () {
                    andizxc(this).attr({ 'tabindex': '0' });
                });
                andizxc(UACrBKAz[UAOUApMqar].UAYrtxYPV).closest(UACrBKAz[UAOUApMqar].UAJhmboQ).each(function () {
                    if (andizxc(this).find(UACrBKAz[UAOUApMqar].UAPoXRASb).length > 0) {
                        andizxc(this).attr({ 'aria-haspopup': 'true' });
                    }
                    andizxc(this).find('a').last().addClass('UAdyatPaGndiUAtLeprJhTMenu');
                });
            } else {
				andizxc(UACrBKAz[UAOUApMqar].UAJhmboQ).find('a').each(function(){
					andizxc(this).parent().attr({ 'role': 'menuitem'});
				});
			}

			andizxc(UACrBKAz[UAOUApMqar].UAYrtxYPV).keydown(function (ANDIevent) {
				if(ANDIevent.keyCode == 9){
                if (andizxc('.UAdyatPaGndiOpenSubMenuBtn') != undefined && andizxc('.UAdyatPaGndiOpenSubMenuBtn').length > 0) {
                    andizxc('.UAdyatPaGndiOpenSubMenuBtn').remove();
                }
                if (andizxc('.UAdyatPaGndiSubMenu') != undefined && andizxc('.UAdyatPaGndiSubMenu').length > 0) {
                    andizxc('.UAdyatPaGndiSubMenu').remove();
                }

                var D = andizxc(this).closest(UACrBKAz[UAOUApMqar].UAlGGqMZF).find(UACrBKAz[UAOUApMqar].UAPoXRASb).first();

                if (D != undefined && D.length > 0) {
                    andizxc(this).closest(UACrBKAz[UAOUApMqar].UAlGGqMZF).css({ 'position': 'relative' });
                    andizxc(this).after('<button title="' + UA.UAZItJSbXp.UAFHHxoHv + '" class="UAdyatPaGndiOpenSubMenuBtn"></button>');
                    andizxc('.UAdyatPaGndiOpenSubMenuBtn').css({ 'padding': '0', 'margin': '0', 'z-index': '999', 'width': '25px', 'height': '25px', 'background-color': 'transparent', 'border': 'none', 'background-repeat': 'no-repeat', 'background-position': '50% 50%', 'background-size': '75% 75%', 'background-image': 'url(' + UAacKcI.UANlZdm + ')', 'position': 'absolute', 'top': UACrBKAz[UAOUApMqar].UAorYEcO +'px', UALXKbH: UACrBKAz[UAOUApMqar].UARhKdQLSo +'px'});
                    if (UACrBKAz[UAOUApMqar].UAYkPFoa == 'left') {
                        andizxc('.UAdyatPaGndiOpenSubMenuBtn').css({ 'left': UACrBKAz[UAOUApMqar].UARhKdQLSo +'px'});
                    } else {
                        andizxc('.UAdyatPaGndiOpenSubMenuBtn').css({ 'right': UACrBKAz[UAOUApMqar].UARhKdQLSo+'px' });
                    }

                   andizxc('.UAdyatPaGndiOpenSubMenuBtn').bind('click', function (ANDIevent) {
                        if (andizxc('.UAdyatPaGndiSubMenu') != undefined && andizxc('.UAdyatPaGndiSubMenu').length > 0) {
                            andizxc('.UAdyatPaGndiSubMenu').remove();
                            UA.UAhDDCFL(UA.UAZItJSbXp.UAyJOBjoNi);
                        } else {
                            UA.UAhDDCFL(UA.UAZItJSbXp.UAVOeBYp);
                            ANDIevent.preventDefault();
                            var UAdyatPaG = andizxc(this).closest(UACrBKAz[UAOUApMqar].UAlGGqMZF).find(UACrBKAz[UAOUApMqar].UAPoXRASb).first();
                            var ANDIb = andizxc(UAdyatPaG).clone().css({ 'max-height': '100%', 'aria-hidden': 'false', 'left': 'auto', 'right': 'auto', 'display': 'block', 'opacity': '1', 'visibility': 'visible' }).addClass('UAdyatPaGndiSubMenu');
                            andizxc(this).closest(UACrBKAz[UAOUApMqar].UAlGGqMZF).append(ANDIb);
                            andizxc(UAdyatPaG).find('*').attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                            andizxc(ANDIb).find('*').attr({ 'tabindex': '', 'aria-hidden': '' });
                            andizxc(ANDIb).find('a').focus(function () {
                                var UAJqvvQYw = this;
                                var ANDIf = (andizxc(this).closest(UACrBKAz[UAOUApMqar].UAuQlIs).find(UACrBKAz[UAOUApMqar].UARCJJx).first());
                                if (andizxc('.UAdyatPaGndiOpenSubMenuLevel3Btn') != undefined && andizxc('.UAdyatPaGndiOpenSubMenuLevel3Btn').length > 0) {
                                    andizxc('.UAdyatPaGndiOpenSubMenuLevel3Btn').remove();
                                }
                                if (andizxc('.UAdyatPaGndiSubMenuLevel3') != undefined && andizxc('.UAdyatPaGndiSubMenuLevel3').length > 0) {
                                    andizxc('.UAdyatPaGndiSubMenuLevel3').remove();
                                }
                                if (ANDIf != undefined && andizxc(ANDIf).length > 0) {
                                    andizxc(ANDIf).find('*').attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                                    andizxc(this).after('<button title="' + UA.UAZItJSbXp.UAFHHxoHv + '" class="UAdyatPaGndiOpenSubMenuLevel3Btn"></button>');
                                    andizxc('.UAdyatPaGndiOpenSubMenuLevel3Btn').css({ 'z-index': '999', 'width': '40px', 'height': '15px', 'background-color': 'transparent', 'border': 'none', 'background-repeat': 'no-repeat', 'background-size': '100% 100%', 'background-image': 'url(' + UAacKcI.UANlZdm + ')', 'position': 'absolute', 'top': UACrBKAz[UAOUApMqar].UAorYEcO +'px', UALXKbH: UACrBKAz[UAOUApMqar].UARhKdQLSo +'px'});
                                    if (UACrBKAz[UAOUApMqar].UAYkPFoa == 'left') { andizxc('.UAdyatPaGndiOpenSubMenuLevel3Btn').css('left', UACrBKAz[UAOUApMqar].UARhKdQLSo +'px') } else { andizxc('.UAdyatPaGndiOpenSubMenuLevel3Btn').css('right', UACrBKAz[UAOUApMqar].UARhKdQLSo +'px') }
                                    andizxc('.UAdyatPaGndiOpenSubMenuLevel3Btn').bind('click', function (ANDIevent) {
                                        if (andizxc('.UAdyatPaGndiSubMenuLevel3') != undefined && andizxc('.UAdyatPaGndiSubMenuLevel3').length > 0) {
                                            andizxc('.UAdyatPaGndiSubMenuLevel3').remove();
                                            UA.UAhDDCFL(UA.UAZItJSbXp.UAyJOBjoNi);
                                        } else {
                                            UA.UAhDDCFL(UA.UAZItJSbXp.UAVOeBYp);
                                            ANDIevent.preventDefault();
                                            andizxc(ANDIf).find('*').attr({ 'tabindex': '-1', 'aria-hidden': 'true' });
                                            var ANDIg = andizxc(ANDIf).clone().css({ 'max-height': '100%', 'aria-hidden': 'false', 'left': 'auto', 'right': 'auto', 'display': 'block', 'opacity': '1', 'visibility': 'visible' }).addClass('UAdyatPaGndiSubMenuLevel3');
                                            andizxc(this).closest(UACrBKAz[UAOUApMqar].UAuQlIs).append(ANDIg);
                                            andizxc(ANDIg).find('*').attr({ 'tabindex': '', 'aria-hidden': '' });
                                            andizxc(ANDIg).find('a').last().addClass('UAdyatPaGndiUAtLeprJhTLevel3');
                                            andizxc(ANDIg).find('*').focus(function () {
                                                andizxc(this).css({ 'border': '1px solid #fff' });
                                                andizxc(this).blur(function () { andizxc(this).css({ 'border': '' }); });
                                            });
                                        }
                                    });

                                }
                                andizxc(this).css({ 'border': '1px solid #fff' });
                                andizxc(this).blur(function () { andizxc(this).css({ 'border': '' }); })
                            });
                        }
                    });

                    andizxc(UACrBKAz[UAOUApMqar].UAKXHZmaDL).find('*').focus(function () {
                        andizxc(this).css({ 'border': '1px solid #fff' });
                        andizxc(this).blur(function () { andizxc(this).css({ 'border': '' }); })
                    });
                }
				}
            });
            andizxc(document).on('focusout', '.UAdyatPaGndiUAtLeprJhTMenu', function (ANDIevent) {
                var UAJqvvQYw = this;
                var UAPnPkK = [];
                andizxc('a,button,input,[role="button"],[role="link"],[tabindex]').each(function () {
                    UAPnPkK.push(andizxc(this).text());
                });
                var as = andizxc(UAJqvvQYw).text();
                if (ANDIevent.keyCode == 9) {
                    andizxc(UAPnPkK[(andizxc.inArray(as, UAPnPkK)) + 1]).focus();
                }
                if (andizxc('.UAdyatPaGndiOpenSubMenuBtn') != undefined && andizxc('.UAdyatPaGndiOpenSubMenuBtn').length > 0) {
                    andizxc('.UAdyatPaGndiOpenSubMenuBtn').remove();
                }
                if (andizxc('.UAdyatPaGndiSubMenu') != undefined && andizxc('.UAdyatPaGndiSubMenu').length > 0) {
                    andizxc('.UAdyatPaGndiSubMenu').remove();
                }
            });
		}
        });
		
	}
    };
 
	
	UA.UAXlDKzFIX = function (UAYVpstw) {
		if (UAYVpstw !== undefined && UAYVpstw.length > 0) {
			andizxc(UAYVpstw).each(function (TUAj) {
				if(UA.UAhjjHhP(UAYVpstw[TUAj].UACMjza,UAYVpstw[TUAj].UAagmeN)){	
					UA.UAlXwTPTqD(UAYVpstw[TUAj]);
				}
			});
		}
    };

    UA.UAlXwTPTqD = function (UAJqvvQYw) {
		if( !andizxc(this).is('[andialreadysetasbtn]') ){
			andizxc(UAJqvvQYw.UAJqvvQYw).each(function (UAOUApMqar) {
				andizxc(this).attr({ "role": "button", 'andialreadysetasbtn':'true','andiclick':"true",'andihover':'true'}).css({ "cursor": "pointer" });
				if(andizxc(this).attr('tabindex') == undefined || andizxc(this).attr('tabindex') != -1 || andizxc(this).attr('tabindex') == null ){
					andizxc(this).attr({"tabindex": "0"})
				}
				var text = "" , UAQDRraCvn = andizxc(this);
				if (UAJqvvQYw.UAQWGbufJd == "") {
					if (andizxc(UAQDRraCvn).is('IMG')) {
						text = andizxc(UAQDRraCvn).attr('alt');
						if (text == undefined || andizxc.trim(text) == "") {
							text = andizxc(UAQDRraCvn).attr('title');
						}
						if (text != undefined || andizxc.trim(text) != "") {
							andizxc(UAQDRraCvn).attr({ "aria-label": text });
						}
					} else {
						if (andizxc(UAQDRraCvn).text() != undefined && andizxc(UAQDRraCvn).text() != null && andizxc.trim(andizxc(UAQDRraCvn).text()) != "") {
							andizxc(UAQDRraCvn).attr({ "aria-label": text });
						}
					}
				} else {
					andizxc(UAQDRraCvn).attr({ "aria-label": UAJqvvQYw.UAQWGbufJd });
				}
				
				andizxc(UAQDRraCvn).click(function () {
					if (UAJqvvQYw.UAmjYIaJsw !== '') {
						andizxc('body').append('<span class="UAISZqe" role="alert" aria-label="' + UAJqvvQYw.UAmjYIaJsw + '"></span>');
						setTimeout(function () {
							andizxc('.UAISZqe').remove();
						}, 500);
					}
					if (UAJqvvQYw.UAuFOsy != '') {
						setTimeout(function () {
							andizxc(UAJqvvQYw.UAuFOsy).attr('tabindex','0').focus();
						}, 750);
					}
				});
			});
		}
	}
	

	

	UA.UAVakyd = function (UAahHDiuwg) {
	  if(UAahHDiuwg != undefined && UAahHDiuwg.length > 0){
		var UAacKcI = UA.UAqFHmLNR();
			andizxc(UAahHDiuwg).each(function (UAOUApMqar) {
				if(UA.UAhjjHhP(UAahHDiuwg[UAOUApMqar].UACMjza,UAahHDiuwg[UAOUApMqar].UAagmeN)){
					andizxc(UAahHDiuwg[UAOUApMqar].UAJqvvQYw).each(function (TUAj) {
						var UAcjLAs = andizxc(this).css('background-image');
						UAcjLAs = UAcjLAs.replace(/^url\(["']?/, '').replace(/["']?\)$/, '');
						if(UAahHDiuwg[UAOUApMqar].UAeEkCir == UAcjLAs){
							andizxc(this).attr({'role':'img','aria-label':UAahHDiuwg[UAOUApMqar].UAQWGbufJd})
						}
					});
				}
			});
		}
	};	   

   UA.UADdVDLoQ = function (UAITgRD) {
		if (UAITgRD !== undefined && UAITgRD.length > 0) {
			var UAILHuZ = document.querySelectorAll('[onclick^="location"],[onclick^="window.open"]');
			for(var UAOUApMqar = 0; UAOUApMqar < UAILHuZ.length;UAOUApMqar++){
				UAILHuZ[UAOUApMqar].setAttribute('role','link');
				UAILHuZ[UAOUApMqar].setAttribute('tabindex','0');
			}
			for(var TUAj = 0; TUAj < UAITgRD.length;TUAj++){
				if(UA.UAhjjHhP(UAITgRD[TUAj].UACMjza,  UAITgRD[TUAj].UAagmeN)){
				if(UAITgRD[TUAj].UAJqvvQYw != ''){
					var UAILHuZ = document.querySelectorAll(UAITgRD[TUAj].UAJqvvQYw);
					for(var UAOUApMqar = 0; UAOUApMqar < UAILHuZ.length;UAOUApMqar++){
						if( !andizxc(this).is('[andilinkText]') ){
							var UAXIvskW = UAILHuZ[UAOUApMqar].getAttribute('title');
							if(UAXIvskW != undefined && UAXIvskW != null && UAXIvskW.length > 1){
								UAILHuZ[UAOUApMqar].setAttribute('aria-label',UAXIvskW + ", " + UAITgRD[TUAj].UAQWGbufJd);
								UAILHuZ[UAOUApMqar].setAttribute('role','link');
								UAILHuZ[UAOUApMqar].setAttribute('tabindex','0');	
								UAILHuZ[UAOUApMqar].setAttribute('andilinkText','true');
							} else {
								UAILHuZ[UAOUApMqar].setAttribute('aria-label',UAITgRD[TUAj].UAQWGbufJd);
								UAILHuZ[UAOUApMqar].setAttribute('role','link');
								UAILHuZ[UAOUApMqar].setAttribute('tabindex','0');
								UAILHuZ[UAOUApMqar].setAttribute('andilinkText','true');
							}
						}
					}
				}
			}
			}
		}
    };
	
		
    UA.UAQySfvE = function (UAakceaGR) {
        andizxc(UAakceaGR).each(function (UAOUApMqar) {
			if(UA.UAhjjHhP(UAakceaGR[UAOUApMqar].UACMjza,UAakceaGR[UAOUApMqar].UAagmeN)){
				andizxc(UAakceaGR[UAOUApMqar].UAFjmtRuX).each(function (TUAj) {
				if(!andizxc(this).is('[andiAlt]'))
					if (andizxc(this).is('img')  || andizxc(this).is('area') ) {
						andizxc(this).attr({ 'alt': UAakceaGR[UAOUApMqar].UALMaWt , 'andiAlt':'true'});
					} else {
						andizxc(this).attr({ 'role': 'img', 'aria-label': UAakceaGR[UAOUApMqar].UALMaWt, 'andiAlt':'true' });
					}
				});
			}
        });
    }

   UA.UAYMqZAw = function(UAYMqZAw){
		andizxc(UAYMqZAw).each(function (UAOUApMqar) {
			if(UA.UAhjjHhP(UAYMqZAw[UAOUApMqar].UACMjza,UAYMqZAw[UAOUApMqar].UAagmeN)){
				andizxc(UAYMqZAw[UAOUApMqar].UAgGRpDyCC).each(function (TUAj) {
					andizxc(this).attr({ 'role': 'heading', 'aria-level': UAYMqZAw[UAOUApMqar].UAQTfnE })
				});
				andizxc('iframe').each(function(){
					try{
						var tempIframe = andizxc(this);
						andizxc(UAYMqZAw).each(function(UAOUApMqar){
							andizxc(this).contents().find(UAYMqZAw[UAOUApMqar].UAgGRpDyCC).each(function(TUAj){
								andizxc(this).attr({ 'role': 'heading', 'aria-level': UAYMqZAw[UAOUApMqar].UAQTfnE });
							});
						});
					} catch(ANDIerr) {
						if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
					}
				});
			}
		});
    }

	UA.UALhqNN = function (UAKQAue) {
		if(UAKQAue != undefined && UAKQAue.length > 0){
			andizxc(UAKQAue).each(function (UAOUApMqar) {
				if(UA.UAhjjHhP(UAKQAue[UAOUApMqar].UACMjza,UAKQAue[UAOUApMqar].UAagmeN)){
					andizxc(UAKQAue[UAOUApMqar].UArQLDFw).attr({ "role": "article" });
					var UArocgeQ = andizxc(UAKQAue[UAOUApMqar].UArQLDFw);
					andizxc(UArocgeQ).each(function(TUAj){
						UA.UAPlIofXCO(this);
					});
						
					var UAarvYnxN = UA.UAnMQzxTy.UAjHaYTTF;
					andizxc(UAKQAue[UAOUApMqar].UArQLDFw).each(function (TUAj) {
						UA.UAljDsJHkl(UAarvYnxN, this);
					});
				}
			});
		}
	}

		UA.UAPlIofXCO = function(UAIvjxQt){
		if(   !andizxc(UAIvjxQt).is('[andialreadysetasreadmorelink]') ){
			var UAQWGbufJd = '';
			var ANDIUAdIBGWm = andizxc(UAIvjxQt).find(UA.UAnMQzxTy.UAjHaYTTF);
			var ANDIindex  = 0;
			andizxc(ANDIUAdIBGWm).each(function(ANDIi){
				UAQWGbufJd = andizxc(this).text().trim();
				if(UAQWGbufJd != ''){
					return false;
				}
			});
			if(UAQWGbufJd != ''){
				if (andizxc(UAIvjxQt).find(UA.UAnMQzxTy.UAGeEDXRA).last().attr('title') != undefined && andizxc(UAIvjxQt).find('a').last().attr('title').trim() != '') {
				   andizxc(UAIvjxQt).find(UA.UAnMQzxTy.UAGeEDXRA).last().attr('title', andizxc(UAIvjxQt).find('a').last().attr('title').trim() +' ' + UAQWGbufJd);
				} else{						
					 andizxc(UAIvjxQt).find('a').last().attr('title', UAQWGbufJd);
				}
			}
			andizxc(UAIvjxQt).attr('andialreadysetasreadmorelink', 'true');
		}
	}
	
	UA.UAljDsJHkl = function(UAarvYnxN , UAIvjxQt){
		var UACiHushz = andizxc(UAIvjxQt).find('img');
		andizxc(UACiHushz).each(function (UAOUApMqar) {
			if(!andizxc(this).is('[UAVMdZu]') ){
				if ( andizxc(this).attr('alt') == undefined || andizxc.trim(andizxc(this).attr('alt')) == '' ) {
					var UAEDuEi = UAOUApMqar;
					var UAvfxaBfQS = andizxc(this).closest('[role="article"]').find(UAarvYnxN);
					if (UAvfxaBfQS != undefined && UAvfxaBfQS.length > 0) {
						andizxc(this).attr({ 'alt': andizxc(UAvfxaBfQS).first().text() });
					} else {
						UAvfxaBfQS = andizxc(UAIvjxQt).find(UAarvYnxN);
						var UAnebvJO = this;
						var UAmsIxyIJ = andizxc(UAIvjxQt).find('*');
						var UAeAUycksY = andizxc.inArray(UAnebvJO, UAmsIxyIJ);
						var UAbhXXK = false;
						for (var UAOUApMqar = UAeAUycksY; UAOUApMqar >= 0; UAOUApMqar--) {
							if (andizxc(UAmsIxyIJ[UAOUApMqar]).is(UAarvYnxN)) {
								andizxc(UAnebvJO).attr({'UAVMdZu':'true', 'alt': andizxc(UAmsIxyIJ[UAOUApMqar]).text() +UA.UAZItJSbXp.UAhVgTYFI +(1+UAEDuEi)});
								UAbhXXK = true;
								break;
							}
						}
						if (!UAbhXXK) {
							var UAvfxaBfQS = andizxc(this).nextAll(UAarvYnxN);
							if (UAvfxaBfQS != undefined && UAvfxaBfQS.length > 0) {
								andizxc(this).attr({ 'UAVMdZu':'true','alt': andizxc(UAvfxaBfQS).first().text() });
							} else {
								UAvfxaBfQS = andizxc(UAIvjxQt).find(UAarvYnxN);
								var UAnebvJO = this;
								var UAmsIxyIJ = andizxc(UAIvjxQt).find('*');
								var UAeAUycksY = andizxc.inArray(UAnebvJO, UAmsIxyIJ);
								var UAbhXXK = false;
								for (var UAOUApMqar = UAeAUycksY; UAOUApMqar < UAmsIxyIJ.length; UAOUApMqar++) {
									if (andizxc(UAmsIxyIJ[UAOUApMqar]).is(UAarvYnxN)) {
										andizxc(UAnebvJO).attr({'UAVMdZu':'true', 'alt': andizxc(UAmsIxyIJ[UAOUApMqar]).text()+' '+UA.UAZItJSbXp.UAhVgTYFI+' ' +(1+UAEDuEi)});
										UAbhXXK = true;
										break;
									}
								}
							}
						}
					}
				}
			}	
		});
	}
	
	UA.UAGmLBs = function  (UAgkGAbu){
		if(UAgkGAbu != undefined && UAgkGAbu.length > 0){
			
			setInterval(function(){
				for(var UAOUApMqar = 0; UAOUApMqar < UAgkGAbu.length; UAOUApMqar++ ){
					if(UA.UAhjjHhP(UAgkGAbu[UAOUApMqar].UACMjza,UAgkGAbu[UAOUApMqar].UAagmeN)){
						UANRAgNkzi = UAgkGAbu[UAOUApMqar].UANRAgNkzi;
						UADqLQQOB = UAgkGAbu[UAOUApMqar].UADqLQQOB;		
							UA.UAZQdYjoz(UANRAgNkzi, UADqLQQOB);
					
					}
				}
			},1000);
		}
	}
	
	UA.UAZQdYjoz = function (UANRAgNkzi, UADqLQQOB){
		setTimeout(function(){
			UAeUuppAurElement = document.activeElement;
			andizxc(UANRAgNkzi).each(function(){
				var UAQDRraCvn = andizxc(this);
				if( andizxc(UAQDRraCvn).css('display') != 'none' && andizxc(UAQDRraCvn).css('visibility') != 'hidden' ){
					
					if(andizxc(UAQDRraCvn).find('.andiFirstItemInPopUp').length == 0){
						andizxc(UAQDRraCvn).prepend('<div class="andiFirstItemInPopUp" tabindex="0" role="dialog" aria-label="'+UA.UAZItJSbXp.UAhoQdJ+'"> </div>');
						andizxc(UAQDRraCvn).append('<div class="andiLastItemInPopUp" tabindex="0" aria-label="'+UA.UAZItJSbXp.UAMRXsqar+'"> </div>');
						andizxc(UAQDRraCvn).find('.andiFirstItemInPopUp').focus();
						andizxc(document).on('focus','.andiLastItemInPopUp',function(){
							andizxc(UAQDRraCvn).find('.andiFirstItemInPopUp').focus();
						});
					}
				}
			});
			andizxc(UADqLQQOB).attr({'tabindex':'0','role':'button','aria-label': UA.UAZItJSbXp.UABTsXXX});
			andizxc(UADqLQQOB).on('keydown',function(ANDIevent){
				var keyCode = ANDIevent.keyCode || ANDIevent.which;   
				if(keyCode == 13){
					andizxc(this).click();
					setTimeout(function(){
						andizxc('.andiFirstItemInPopUp').remove();
						andizxc('.andiLastItemInPopUp').remove();
						if(UAeUuppAurElement != undefined){
							andizxc(UAeUuppAurElement).focus();
						}
					},200)
				} 
			});
		},800);
		
		andizxc(document).on('focusin','.andiLastItemInPopUp',function(){
			andizxc('.andiFirstItemInPopUp').focus();
		});
		
		andizxc(document).on('keydown',function(ANDIevent){
			if(ANDIevent.keyCode == 27){
				andizxc(UADqLQQOB).click();
				setTimeout(function(){
					andizxc('.andiFirstItemInPopUp').remove();
					andizxc('.andiLastItemInPopUp').remove();
					if(UAeUuppAurElement != undefined){
						andizxc(UAeUuppAurElement).focus();
					}
				},200)
				
			}
		}); 
	}

   UA.UAVQAoiKwK = function (UAVQAoiKwK) {
		if(UAVQAoiKwK != undefined && UAVQAoiKwK.length > 0){
			if (!sessionStorage.UAVQAoiKwK) {
				setTimeout(function () {
					var UAZItJSbXp = UA.UAbarNrArQ();
					if (UAZItJSbXp == 'he') {
						andizxc('body').prepend('<p role="alert" tabindex="0" style="position: absolute; overflow: hidden; clip: rect(0 0 0 0);height: 1px;width: 1px;">' + UAVQAoiKwK.he.UAVQAoiKwK + '</p>');
					}
					if (UAZItJSbXp == 'en') {
						UA.UAhDDCFL(UAVQAoiKwK.en.UAVQAoiKwK);
					}
					sessionStorage.UAVQAoiKwK = 1;
				}, UAVQAoiKwK.UAcdMoDKC);
			}
		}
    }


   UA.UAyhcdrfLC = function (UAzjvzUb) {
	   if(UAzjvzUb != undefined && UAzjvzUb.length > 0){
        var  UAacKcI = UA.UAqFHmLNR();
        if (UAzjvzUb != undefined) {
            andizxc(UAzjvzUb).each(function (UAOUApMqar) {
				if(UA.UAhjjHhP(UAzjvzUb[UAOUApMqar].UACMjza,UAzjvzUb[UAOUApMqar].UAagmeN)){
                var linkNum = UAOUApMqar;
                andizxc(UAzjvzUb[UAOUApMqar].UAwVlYvU).focus(function () {
                    var UAeOoKpCmI = this;
                    var UAArgJEP = andizxc.inArray(this, andizxc(UAzjvzUb[UAOUApMqar].UAwVlYvU));
                    var UAhKwCb = andizxc(UAzjvzUb[UAOUApMqar].UASuLHxqto);
                    andizxc(UAhKwCb[UAArgJEP]).click(function () {
                        andizxc('.UAdyatPaGndienterTabContentBtn').remove();
                        andizxc(UAhKwCb[UAArgJEP]).css({ 'position': 'relative' }).append('<div tabindex="0" role="button" title="' + UA.UAZItJSbXp.UASFXQN + '" class="UAdyatPaGndienterTabContentBtn"></div>');
                        andizxc('.UAdyatPaGndienterTabContentBtn').css({ 'padding': '0', 'margin': '0', 'z-index': '999', 'width': '20px', 'height': '20px', 'background-color': 'transparent', 'border': 'none', 'background-repeat': 'no-repeat', 'background-position': '100% 100%', 'background-image': 'url(' + UAacKcI.UANlZdm + ')', 'position': 'absolute', 'background-size': '100%', 'top': UAzjvzUb[UAOUApMqar].UAQypinCwd, 'left': UAzjvzUb[UAOUApMqar].UAEUSBPgL });
                        andizxc('.UAdyatPaGndienterTabContentBtn').click(function () {
                            andizxc(UAzjvzUb[UAOUApMqar].UAEPsdG[UAArgJEP]).css({ 'display': 'block', 'position': 'relative' }).attr({ 'tabindex': '0' }).focus();
                            andizxc(UAzjvzUb[UAOUApMqar].UAOUJlrOX).append('<div tabindex="0" role="button" title="' + UA.UAZItJSbXp.UAgjBQa + '" class="UAgjBQa"></div>');
                            andizxc('.UAgjBQa').css({ '-ms-transform': ' rotate(180deg)', '-o-transform': ' rotate(180deg)', '-webkit-transform:': ' rotate(180deg)', '-moz-transform': ' rotate(180deg)', 'padding': '0', 'margin': '0', 'z-index': '999', 'width': '40px', 'height': '15px', 'background-color': 'transparent', 'border': 'none', 'background-repeat': 'no-repeat', 'background-position': '50% 50%', 'background-size': '50% 50%', 'background-image': 'url(' + UAacKcI.UANlZdm + ')', 'position': 'absolute', 'bottom': '10px' }).click(function () {
                                andizxc(UAeOoKpCmI).focus();
                            }).keydown(function (ANDIevent) {
                                var keyCode = ANDIevent.keyCode || ANDIevent.which;
                                if (keyCode == 13) {
                                    andizxc(this).click();
                                }
                            });
                            UA.UAJIRvqB(UA.UAnMQzxTy.UAkcQRC);
                        }).keydown(function (ANDIevent) {
                            var keyCode = ANDIevent.keyCode || ANDIevent.which;
                            if (keyCode == 13) {
                                andizxc(this).click();
                            }
                        });
                        UA.UAJIRvqB(UA.UAnMQzxTy.UAkcQRC);
                    });
                    if (UAArgJEP == 0) {
                        andizxc(UAeOoKpCmI).click();
                    }
                });
				}
            });
        }
	   }
    }

    UA.UAUyyEqb = function (UAUyyEqb) {
		if(UAUyyEqb != undefined && UAUyyEqb.length > 0){
            setTimeout(function () {
                andizxc(UAUyyEqb).each(function (UAOUApMqar) {
      if(UA.UAhjjHhP(UAUyyEqb[UAOUApMqar].UACMjza,UAUyyEqb[UAOUApMqar].UAagmeN)){
					
                    var month = (UAUyyEqb[UAOUApMqar].UAQLKJhXvm);
                    month = andizxc.trim(andizxc(month).text());
                    andizxc(UAUyyEqb[UAOUApMqar].UAyPkDWMs).each(function () {
                        andizxc(this).attr({ 'role': 'dialog', 'aria-label': andizxc.trim(andizxc(this).text()) + ' ' + month });
                    });
                    andizxc(UAUyyEqb[UAOUApMqar].UAHUuyy).each(function (TUAj) {
                        var eventText = andizxc.trim(andizxc(this).attr('title'));
                        andizxc(this).attr({
                            'role': 'dialog',
                            'aria-label': andizxc.trim(andizxc(this).text()) + ' ' + month + ' ' + eventText
                        });
                    });
                    andizxc(UAUyyEqb[UAOUApMqar].UAorEKwM).attr({ 'title': UA.UAZItJSbXp.UAqCdcotsk, 'role': 'button', 'tabindex': '0' });
                    andizxc(UAUyyEqb[UAOUApMqar].UAMcmum).attr({ 'title': UA.UAZItJSbXp.UAepeKVWs, 'role': 'button', 'tabindex': '0' });
				  }
				});
            }, UAUyyEqb.UAuODeAqV);
        
		}
    }

	UA.UARbjTxEJ = function (UARbjTxEJ){
		if(UARbjTxEJ != undefined && UARbjTxEJ.length > 0){
			andizxc(UARbjTxEJ).each(function(TUAj){
				var UAMzTAONc = UARbjTxEJ[TUAj].UAMzTAONc
				var UAuHPpDLpY = UARbjTxEJ[TUAj].UAuHPpDLpY
				if(UAMzTAONc != null){
					andizxc(UAuHPpDLpY).each(function(UAOUApMqar){
						var UAvSirZVR = window.innerWidth;
						if(UAMzTAONc >= UAvSirZVR){
							andizxc(UAuHPpDLpY).find('*').each(function(){
								andizxc(this).attr({'tabindex':'-1','aria-hidden':'true'});
							})
						}
					});
				}
			});
		}
	}
		
	UA.UAMSUYJMD = function (UAXQGtmiIL,UAKnqDAh){
		if(UAXQGtmiIL != undefined){
			var UARNEwlgJl = document.querySelectorAll(UAXQGtmiIL);
			for(var UAOUApMqar = 0; UAOUApMqar < UARNEwlgJl.length;UAOUApMqar++){
				UARNEwlgJl[UAOUApMqar].setAttribute('aria-checked','true');
			}
		}
		if(UAKnqDAh != undefined){
			var UARNEwlgJl = document.querySelectorAll(UAKnqDAh);
			for(var UAOUApMqar = 0; UAOUApMqar < UARNEwlgJl.length;UAOUApMqar++){
				UARNEwlgJl[UAOUApMqar].setAttribute('aria-checked','false');
			}
		}
	}
				
	UA.UAyYGkAUHwLDji = function(UAyYGkAUHwLDji){
		if(UAyYGkAUHwLDji != undefined && UAyYGkAUHwLDji.length > 0){
		andizxc(UAyYGkAUHwLDji).each(function(TUAj){
			if(UA.UAhjjHhP(UAyYGkAUHwLDji[TUAj].UACMjza,UAyYGkAUHwLDji[TUAj].UAagmeN)){
			var UAKqeWRyu = UAyYGkAUHwLDji[TUAj].UAKqeWRyu;
			var UAkIrdp = UAyYGkAUHwLDji[TUAj].UAkIrdp;
			var UATaEjdCN = UAyYGkAUHwLDji[TUAj].UATaEjdCN;
			var $UAKqeWRyu = andizxc(UAKqeWRyu),
			$UAkIrdp = andizxc(UAkIrdp);
			
			UA.UAaKaTZMm(UAKqeWRyu,$UAkIrdp);
			$UAKqeWRyu.each(function(UAOUApMqar){
				var $UAQDRraCvn = andizxc(this);
				$UAQDRraCvn.attr({'aria-label':UA.UAZItJSbXp.UAexzuYre+$UAQDRraCvn.text(),'role':'button','tabindex':'0'}).click(function(){
					UA.UAaKaTZMm(UAKqeWRyu,$UAkIrdp)
				});
				if(!UATaEjdCN){
					$UAQDRraCvn.attr({'andialreadysetasbtn':'true'});
				}
			});
		
			andizxc('iframe').each(function(UAOUApMqar){
				try{
					var UAdyatPaG = andizxc(this);
					var $UAKqeWRyu = andizxc(UAdyatPaG).contents().find(UAKqeWRyu),
					$UAkIrdp = andizxc(UAdyatPaG).contents().find(UAkIrdp);
					UA.UAaKaTZMm(UAKqeWRyu,$UAkIrdp);
					$UAKqeWRyu.each(function(UAOUApMqar){
						var $UAQDRraCvn = andizxc(this);
						$UAQDRraCvn.attr({'aria-label':UA.UAZItJSbXp.UAexzuYre + $UAQDRraCvn.text(),'role':'button','tabindex':'0'}).click(function(){
							UA.UAaKaTZMm(UAKqeWRyu,$UAkIrdp)
						});
						if(!UATaEjdCN){
							$UAQDRraCvn.attr({'andialreadysetasbtn':'true'});
						}
					});			
				} catch(ANDIerr) {
					if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
				}
			});
			}
		});
		}
	}
	
	UA.UAaKaTZMm = function (UAKqeWRyu,$UAkIrdp){
		$UAkIrdp.each(function(UAOUApMqar){
			var $UAQDRraCvn = andizxc(this);
			var UAKqeWRyus = andizxc(UAKqeWRyu);
			if($UAQDRraCvn.attr('id') != undefined && $UAQDRraCvn.attr('id') != '' ){
				andizxc(UAKqeWRyus[UAOUApMqar]).attr({'aria-controls':$UAQDRraCvn.attr('id')});
			}
			if(!$UAQDRraCvn.UAmLYMCf2()){
				if($UAQDRraCvn.attr('id') != undefined && $UAQDRraCvn.attr('id') != '' ){
					$UAQDRraCvn.attr({'aria-expanded':'true'});
				} else {
					andizxc(UAKqeWRyus[UAOUApMqar]).attr({'aria-expanded':'true'});
				}
			} else {
				if($UAQDRraCvn.attr('id') != undefined && $UAQDRraCvn.attr('id') != '' ){ 
					$UAQDRraCvn.attr({'aria-expanded':'false'});
				} else {
					andizxc(UAKqeWRyus[UAOUApMqar]).attr({'aria-expanded':'false'});
				}
			}
		});
	}

	UA.UAQMegnAcQ = function(UAQMegnAcQ){
		if(UAQMegnAcQ != undefined && UAQMegnAcQ.length > 0){
			andizxc(UAQMegnAcQ).each(function(UAOUApMqar){
				if(UA.UAhjjHhP(UAQMegnAcQ[UAOUApMqar].UACMjza,UAQMegnAcQ[UAOUApMqar].UAagmeN)){
				andizxc(UAQMegnAcQ[UAOUApMqar].UAeeSvi).find('a').each(function(TUAj){
					if(TUAj == 0){
						andizxc(this).attr({'role':'link','aria-label':UA.UAZItJSbXp.UAImwtX});
					} else {
						andizxc(this).attr({'role':'link','aria-label':UA.UAZItJSbXp.UADOrRmK + andizxc(this).text()})
					}
				});
				var UAMxeGR = andizxc(UAQMegnAcQ[UAOUApMqar].UAeeSvi).find('a').last().parent().next();
				andizxc(UAMxeGR).attr({'aria-label':UA.UAZItJSbXp.UAWaIzvwMD + andizxc(UAMxeGR).text()})
			}
			});
		}
	}
	/*
	
	UA.UAQMegnAcQ = function(UAQMegnAcQ){
		if(UAQMegnAcQ != undefined && UAQMegnAcQ.length > 0){
			andizxc(UAQMegnAcQ).each(function(UAOUApMqar){
				if(UA.UAhjjHhP(UAQMegnAcQ[UAOUApMqar].UACMjza,UAQMegnAcQ[UAOUApMqar].UAagmeN)){
				andizxc(UAQMegnAcQ[UAOUApMqar].UAeeSvi).find('a').each(function(TUAj){
					if(TUAj == 0){
						andizxc(this).attr({'role':'link','aria-label':UA.UAZItJSbXp.UAImwtX});
					} else {
						andizxc(this).attr({'role':'link','aria-label':UA.UAZItJSbXp.UADOrRmK + andizxc(this).text()})
					}
				});
				var UAMxeGR = andizxc(UAQMegnAcQ[UAOUApMqar].UAeeSvi).find('a').last().parent().next();
				andizxc(UAMxeGR).attr({'aria-label':UA.UAZItJSbXp.UAWaIzvwMD + andizxc(UAMxeGR).text()})
			}
			});
		}
	}
	
	*/
			
	UA.UAspsoMageNavigation = function (UAniKDKc){
		if(UAniKDKc != undefined && UAniKDKc.length > 0){
			andizxc(UAniKDKc).each(function(UAOUApMqar){
				if(UA.UAhjjHhP(UAniKDKc[UAOUApMqar].UACMjza,UAniKDKc[UAOUApMqar].UAagmeN)){
				if(UAniKDKc[UAOUApMqar].UAsjTja != ''){	
					UAsjTja = UAniKDKc[UAOUApMqar].UAsjTja
					UAzJpOExu = UAniKDKc[UAOUApMqar].UAzJpOExu;
					UAwgFyHzV = UAniKDKc[UAOUApMqar].UAwgFyHzV;
					UAbkTjL = UAniKDKc[UAOUApMqar].UAbkTjL;
					UAEMbVS = UAniKDKc[UAOUApMqar].UAEMbVS;
					UAQJFNNfDx = UAniKDKc[UAOUApMqar].UAQJFNNfDx;
					UAgzmdAYaM = UAniKDKc[UAOUApMqar].UAgzmdAYaM;
					andizxc(UAsjTja).each(function(TUAj){
						var $UAQDRraCvn = andizxc(this);
						$UAQDRraCvn.find(UAwgFyHzV).each(function(){
							andizxc(this).attr({'title':UA.UAZItJSbXp.UAwgFyHzV + andizxc(this).text()  });
						});
						$UAQDRraCvn.find(UAzJpOExu).attr({'title':UA.UAZItJSbXp.UAzJpOExu +$UAQDRraCvn.find(UAzJpOExu).text()});
						$UAQDRraCvn.find(UAbkTjL).attr({'title':UA.UAZItJSbXp.UAbkTjL});
						$UAQDRraCvn.find(UAEMbVS).attr({'title':UA.UAZItJSbXp.UAEMbVS});
						$UAQDRraCvn.find(UAQJFNNfDx).attr({'title':UA.UAZItJSbXp.UAQJFNNfDx});
						$UAQDRraCvn.find(UAgzmdAYaM).attr({'title':UA.UAZItJSbXp.UAgzmdAYaM});
						
					});
				}
				}
			});
		}
	}

	UA.UAEAzfmiW = function (){
		andizxc('.UAxYDNz').css({
			"width":window.innerWidth,
			"height":window.innerHeight
		});
		var a = (parseInt(andizxc(window).width()*0.8));
		var b = (parseInt(andizxc('body').css('margin-left')));
		var c = (parseInt(andizxc('body').css('margin-right')));
		andizxc('.UAsbPjpDe').css({
			"width":(a - c),
			"height":(window.innerHeight)*0.8,
			"margin-top": window.innerHeight *0.1 ,
			"margin-right": ((andizxc(window).width()*0.1)),
			"margin-left": ((andizxc(window).width()*0.1))
		});
	};


	UA.UAVwRoRg = function (UAfPMieNi, data, whereToGoBackAfterClose){		
		whereToGoBackAfterClose = whereToGoBackAfterClose || undefined;
		var UAIqaSa = UA.UAZItJSbXp
		andizxc('body').prepend('<div class=" UAxYDNz"></div>');
		var UAeAcWS = andizxc('html').attr('andidirection');
		andizxc('.UAxYDNz').prepend('<div class=" UAsbPjpDe" tabindex="0"><input type="image" src="'+ UA.UAVsTsXtF.UAlqQZa+'" id="UAWHcONaxK" alt="'+ UA.UAZItJSbXp.UAOstZjj+'" aria-label=""/></div>');
		andizxc('.UAsbPjpDe').append('<div class=" UAsbPjpDeFirstFocus" aria-label="'+ UA.UAZItJSbXp.UAhoQdJ+'" role="alert" tabindex="0"></div>');
		andizxc('.UAsbPjpDe').append( data );
		andizxc('.UAsbPjpDe').wrapInner('<div tabindex="0" class=" "></div>')
		andizxc('.UAsbPjpDe').append('<div class=" UAsbPjpDeLastFocus" tabindex="0"></div>');
		andizxc('.UAsbPjpDe').append('<div class=" UAMRXsqar" aria-label="'+ UA.UAZItJSbXp.UAMRXsqar+'" role="alert" tabindex="0"></div>');
		UA.UAEAzfmiW();

		
		window.addEventListener('resize', () => { UA.UAEAzfmiW(); });
		andizxc('.UAsbPjpDeFirstFocus').focus();
		andizxc('.UAsbPjpDeLastFocus').focus(function(){
			andizxc('#UAWHcONaxK').focus();
		});
		
		andizxc('#UAWHcONaxK').click(function(){
			andizxc('.UAxYDNz').remove();
			andizxc('#UAOfSon').remove();
			andizxc(UAfPMieNi).focus();
			UA.UAhDDCFL(UAIqaSa.UABTsXXX);
		});
		andizxc(document).keydown(function(e) {
			if ( e.keyCode == 27 ) {
				andizxc('.UAxYDNz').remove();
				andizxc('#UAOfSon').remove();
				andizxc(UAfPMieNi).focus();
				UA.UAhDDCFL(UAIqaSa.UABTsXXX);
				if (whereToGoBackAfterClose != undefined){
					andizxc(whereToGoBackAfterClose).focus();
				}
			}
		});
		
	};

	
	UA.diffrentLayoutForMenus = function(wrapMenu,ANDIbuttonPut){
		
		var wrapMenu = wrapMenu ;
		var ANDIbuttonPut = ANDIbuttonPut ;
		if(andizxc('#diffrentLayoutForMenusStyle').length == 0){
			var UAafmLUp  = localStorage.getItem("UAafmLUp"); 
		andizxc("head").append('<style id="diffrentLayoutForMenusStyle">#diffrentLayoutForMenus a:focus{outline:2px solid #000 !important;} #diffrentLayoutForMenus li {display:inline-block !important;} #diffrentLayoutForMenus h2{text-align:center;} #diffrentLayoutForMenus{margin: 0 auto !important; text-align:center;} #diffrentLayoutForMenus a { text-align: center !important; margin:5px !important;padding-top:25px !important; color:#fff !important; background-color:'+localStorage.getItem('UAafmLUp')+' !important; vertical-align:top !important; display:inline-block !important;height: 100px !important;width:100px !important;}</style>');
		}
		andizxc(ANDIbuttonPut).prepend('<button class="UAUSXdS" id="diffrentLayoutForMenusBtn">'+UA.UAZItJSbXp.UAQWGbufJd2161+'</button>');// element where menu button were exist
		andizxc('#diffrentLayoutForMenusBtn').click(function(){
			opendiffrentLayoutForMenusBtn(wrapMenu);
		});

		function opendiffrentLayoutForMenusBtn(wrapMenu){
			wrapMenu += ' a';
			var text = ('<div id="diffrentLayoutForMenus"><h2>'+UA.UAZItJSbXp.UAQWGbufJd2160+'</h2><ul></ul></div>');
			UA.UAVwRoRg('#diffrentLayoutForMenusBtn',text);
			andizxc( wrapMenu ).clone().appendTo( "#diffrentLayoutForMenus > ul" );
			andizxc( "#diffrentLayoutForMenus > ul a" ).each(function(){	
				andizxc(this).attr('tabindex','0').wrap( "<li></li>" );
			});
			var UAeAcWS = andizxc('html').attr('andidirection');
			if(UAeAcWS == 'rtl'){
				andizxc('.UAxYDNz').css({'text-align':'right'});
				andizxc('#UABXCSU, #UABXCSU *').attr({'dir':UAeAcWS});
				andizxc('#UAWHcONaxK').css({'left':'50px', 'position': 'fixed','top': '24px','z-index': '999999999999999999'}); 
				andizxc('#UAKqMmbnfz').css({'text-align':'right'});

			} else {
				andizxc('.UAxYDNz').css({'text-align':'left'});
				andizxc('#UABXCSU, #UABXCSU *').attr({'dir':UAeAcWS});
				andizxc('#UAWHcONaxK').css({'width':'35px','right':'50px', 'position': 'fixed','top': '24px','z-index': '999999999999999999'});
				andizxc('#UAKqMmbnfz').css({'text-align':'left'});
			}
			andizxc( "#diffrentLayoutForMenus > ul a" ).first().focus();
		}
	}
	
	
	
	UA.UAnMQzxTy.UASIzhST.forEach(function(el) {
	  // whatever with the current node
	  UA.diffrentLayoutForMenus(el.UAJhmboQ,el.UAJhmboQ);
	});

	

	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	UA.UAtAkURTv = function(UATCbxyjz){
		UAjFEVbY = new Array(UATCbxyjz.length);
		UAVbYSr = new Array(UATCbxyjz.length);
		UAtRAgqVK = new Array(UATCbxyjz.length);
		UAqaBIGKSM = new Array(UATCbxyjz.length);
		UAobCGp = new Array(UATCbxyjz.length);
		UAoJaRelAD = new Array(UATCbxyjz.length);
		HTMLElmsThatChange = new Array(UATCbxyjz.length);
		UAIBEfQengthHtml = new Array(UATCbxyjz.length);
		UAIBEfQengthAllelms = new Array(UATCbxyjz.length);
		UAIBEfQengthAllNewElms = new Array(UATCbxyjz.length);
		for (var ANDIi = 0; ANDIi < HTMLElmsThatChange.length; ANDIi++) {
			HTMLElmsThatChange[ANDIi] = [];
		}
		UAOUApMqarsChangeMade = new Array(UATCbxyjz.length);
		
		andizxc(UATCbxyjz).each(function(UAOUApMqar){
			if(UATCbxyjz[UAOUApMqar].UAVwThZg != '' && andizxc(UATCbxyjz[UAOUApMqar].UAVwThZg).length > 0){
				UAoJaRelAD[UAOUApMqar] = 0;
				UAtRAgqVK[UAOUApMqar] = new Date();
				var UABDpDt = andizxc(UATCbxyjz[UAOUApMqar].UAVwThZg);
				andizxc(UABDpDt).bind('DOMNodeInserted', function(ANDIevent) {
					var andiElement = ANDIevent.target;
					if(	andiElement.UAhGqHpCN	&& !andizxc(andiElement).is('#UAUkyxo * ,[id^=UAyYcCJ] *, [id^=UAyYcCJ], #UAndNxT * ,#UAzfzOZus , script ,meta,link,html, head,style , .UAISZqe')){
					UAoJaRelAD[UAOUApMqar]++;
					UAtRAgqVK[UAOUApMqar] = new Date();
					HTMLElmsThatChange[UAOUApMqar].push(andiElement);
					}
				});
				UA.UAmACLIUF(UABDpDt, UAOUApMqar );
			}
			
		});	
	}

	UA.UAmACLIUF = function(UABDpDt, UALxltSA ){		
		UAjFEVbY[UALxltSA] = 0;
		var ANDIb = 0;
		UAOUApMqarsChangeMade[UALxltSA] = false;	
		UAqaBIGKSM[UALxltSA] = setInterval(function(){
			if( UAoJaRelAD[UALxltSA] > 1000){
				UAoJaRelAD[UALxltSA] = 0;
			}
			UAobCGp[UALxltSA] = new Date();
			if (UAjFEVbY[UALxltSA] != UAoJaRelAD[UALxltSA] ){
				var UApCoBDNy = UAwaalOp(UAtRAgqVK[UALxltSA],UAobCGp[UALxltSA] ); //חישוב הפער בזמנים : הזמן כרגע מול הזמן שגילינו את השינוי
				if(UApCoBDNy < 3050){
					UAOUApMqarsChangeMade[UALxltSA] = true;
				} else {
					UAOUApMqarsChangeMade[UALxltSA] = false;
				}
				
				if( (UApCoBDNy > 2000 && UApCoBDNy < 3030) && (UAOUApMqarsChangeMade[UALxltSA] == true )){
					UA.UApRyZwYY(HTMLElmsThatChange[UALxltSA]); // מריצים את כל הבדיקות של הנגישות מפעילים בהתאם
					UAjFEVbY[UALxltSA] = UAoJaRelAD[UALxltSA]; // מעדכנים את השינוי בתוך UAjFEVbY[UALxltSA]  כך בריצה הבאה של הבדיקות נוכל לדעת האם בוצע שינוי נוסף.
					HTMLElmsThatChange[UALxltSA].length = 0;
				}
			} else {
				UAOUApMqarsChangeMade[UALxltSA] = false;
			}
			
			
		},1000);
		
		function UAwaalOp(UAgwBukgBdateNow, UAgwBukgBdateWhenChangehappend ) {
			UAgwBukgBdateNow = UAgwBukgBdateNow.getTime(); // המרה של מילישניות    //UAgwBukgBdateNow = הזמן שבו גילינו שקרה שינוי
			UAgwBukgBdateWhenChangehappend = UAgwBukgBdateWhenChangehappend.getTime();// המרה של מילישניות     //UAgwBukgBdateWhenChangehappend = הזמן העכשיווי
			var UAZLJOUimeDeff = UAgwBukgBdateWhenChangehappend - UAgwBukgBdateNow;
			return parseInt(UAZLJOUimeDeff);
		}

		
	}

	
	UA.UApRyZwYY = function(newElems){
		UA.newElemsToMakeAccessible = newElems;
		UA.ReloadtimesNumber++;
		document.querySelectorAll('*:not([andiruns])').forEach(function(el) {
			andiMarksElms(el);
		});
		function andiMarksElms(currentElm){
			var currentElm = currentElm;
			if (currentElm.tabIndex > -1) {
				andizxc(currentElm).attr('andiElementTabindexNumber', currentElm.tabIndex);
			}
			var ANDIa = false;
			document.querySelectorAll('#UAndNxT *').forEach(function(el) {
				if(ANDIa) return false;
				ANDIa = (el == currentElm)? true: false;
			});
			if ( 
				currentElm.tagName.toLowerCase() != 'link' && 
				currentElm.tagName.toLowerCase() != 'noscript' && 
				currentElm.tagName.toLowerCase() != 'script' && 
				currentElm.tagName.toLowerCase() != 'style' && 
				currentElm.tagName.toLowerCase() != 'meta' && 
				currentElm.tagName.toLowerCase() != 'html' && 
				currentElm.tagName.toLowerCase() != 'head' && 
				currentElm.id != 'UAndNxT' &&  
				currentElm.id != 'UAhTqxchHr' &&  
				!ANDIa
			){
			currentElm.addAttr({'andiruns':UA.ReloadtimesNumber});  
			if(currentElm != undefined && !currentElm.hasAttribute('andiAllElmWithText')){
				andizxc(currentElm).attr('andiAllElmWithText', 'true');
				var UAfSIATsD = parseInt(andizxc(currentElm).css('font-size'));
				andizxc(currentElm).attr({ 'UAxtJoWmMs': UAfSIATsD, 'UAqJsNschiteSpace': andizxc(currentElm).css('white-space'), 'UAIBEfQineHeight': andizxc(currentElm).css('line-height') });
				}
			}
		}
		/*andizxc('.UA2skipAreaAutomate').remove();
			UA.createAutomaticAreas();
		*/
		setTimeout(function(){
			if (localStorage.getItem("UAZJQsu") == "yes") {
				setTimeout(function(){
					if(!UA.UASJbVH){
						var UAhvtXwy = setInterval(function(){
							if(UA.UASJbVH == true){
								clearInterval(UAhvtXwy);
								UA.UAKSIpRbq('aaa');
							}
						},350);
					} else {
						UA.UAKSIpRbq('aaa');
					}
				},250);
			}
		},50);
		setTimeout(function(){
			if (localStorage.getItem("UAwqiXiYg") == "yes") {
				if(!UA.UASJbVH){
					var UAhvtXwy = setInterval(function(){
						if(UA.UASJbVH == true){
							clearInterval(UAhvtXwy);
							var tepmPlusNum = localStorage.getItem("UAxtJoWmMsPlusClick");
							var tepmMinusNum = localStorage.getItem("UAxtJoWmMsMinusClick");
							var UAClKvyZJS = ( (parseFloat(tepmPlusNum)) - (parseFloat(tepmMinusNum)));
							UA.UAjZhjF(UAClKvyZJS, 'aaa');
						}
					},350);
				} else {
					var tepmPlusNum = localStorage.getItem("UAxtJoWmMsPlusClick");
					var tepmMinusNum = localStorage.getItem("UAxtJoWmMsMinusClick");
					var UAClKvyZJS = ( (parseFloat(tepmPlusNum)) - (parseFloat(tepmMinusNum)));
					UA.UAjZhjF(UAClKvyZJS, 'aaa');
				}
			}
		},100);
		setTimeout(function(){
			if (localStorage.getItem("UAraxHx") == "yes") {
				if(!UA.UASJbVH){
					var UAhvtXwy = setInterval(function(){
						if(UA.UASJbVH == true){
							clearInterval(UAhvtXwy);
							var tepmPlusNum = localStorage.getItem("UAxtJoWmMsPlusClick");
							var tepmMinusNum = localStorage.getItem("UAxtJoWmMsMinusClick");
							var UAClKvyZJS = ( (parseFloat(tepmPlusNum)) - (parseFloat(tepmMinusNum)));
							UA.UAjZhjF(UAClKvyZJS, 'aaa');
						}
					},350);
				} else {
					var tepmPlusNum = localStorage.getItem("UAxtJoWmMsPlusClick");
					var tepmMinusNum = localStorage.getItem("UAxtJoWmMsMinusClick");
					var UAClKvyZJS = ( (parseFloat(tepmPlusNum)) - (parseFloat(tepmMinusNum)));
					UA.UAjZhjF(UAClKvyZJS, 'aaa');
				}
			}
		},150);
		
/*
		if (localStorage.getItem("UAdyatPaGndiFocusAreaBtn") == "yes") {
			if(!UA.UAvlIHCs){
					var UARPrEfpN = setInterval(function(){
					if(UA.UAvlIHCs == true){
						clearInterval(UARPrEfpN);
						var UAYtShky = UA.UAnMQzxTy.UABJteddi;
						UA.UAAuAefEK(UAYtShky);
						UA.UAkYqcox(UAYtShky);
					}
				},350);
			} else {
				var UAYtShky = UA.UAnMQzxTy.UABJteddi;
                UA.UAAuAefEK(UAYtShky);
                UA.UAkYqcox(UAYtShky);
			}
        }
		},50);
		setTimeout(function(){
		if (localStorage.getItem('UAdyatPaGndirasheTevot') == "yes") {
			if(!UA.UAlPcATk){
				var UAMhMdF = setInterval(function(){
					if(UA.UAlPcATk == true){
						clearInterval(UAMhMdF);
						UA.findAndReplaceDOMText2('[andiAllElmWithText]');
					}
				},350);
			} else {
				UA.findAndReplaceDOMText2('[andiAllElmWithText]');
			}
        }
		
		*/	
		
		setTimeout(function(){
			if (localStorage.getItem("UAhXWQXGieviledHiddingInfo") == "yes") {		
				if(!UA.UAlPcATk){
					var UAMhMdF = setInterval(function(){
						if(UA.UAlPcATk == true){
							clearInterval(UAMhMdF);
							UA.UAXgZibReviledHiddingInfo();
							UA.UAQrgGLTetActiveReviledHiddingInfo('aaa')
						}
					},350);
				} else {
					UA.UAXgZibReviledHiddingInfo();
				}
			}
		},200);
		setTimeout(function(){
			var UAYZkAC = localStorage.getItem("UAMLJqWwPY1");
			if (UAYZkAC != null && UAYZkAC != '') {
				UA.UAyVEjDW(localStorage.getItem("UAMLJqWwPY1Color"),localStorage.getItem("UAMLJqWwPY1"),'aaa');
			}
		},250);
		setTimeout(function(){
			var UAYZkAC = localStorage.getItem("UAMLJqWwPY2");
			if (UAYZkAC != null && UAYZkAC != '') {
				UA.UAyVEjDW(localStorage.getItem("UAMLJqWwPY2Color"),localStorage.getItem("UAMLJqWwPY2"),'aaa');
			}
		},300);
		setTimeout(function(){
			var UAYZkAC = localStorage.getItem("UAMLJqWwPY3");
			if (UAYZkAC != null && UAYZkAC != '') {
				UA.UAyVEjDW(localStorage.getItem("UAMLJqWwPY3Color"),localStorage.getItem("UAMLJqWwPY3"),'aaa');
			}
		},330);
		setTimeout(function(){
			if (localStorage.getItem("UAHwsXfLLk") == "yes") {
				UA.UAdPiblsT('black', 'aaa');
			}
		},360);
		setTimeout(function(){
			if (localStorage.getItem("UAqJsNschiteContrast") == "yes") {
				UA.UAdPiblsT('white', 'aaa');
			}
		},390);
		setTimeout(function(){
			UA.UAInHvA();
		},410);
		setTimeout(function(){
			UA.UAwgnOA();
		},440);
};


	UA.UAInHvA = function() {
		setTimeout(function(){
			UA.UAQySfvE(UA.UAnMQzxTy.UAakceaGR);
			UA.UAYMqZAw(UA.UAnMQzxTy.UAYMqZAw);
			UA.UADdVDLoQ(UA.UAnMQzxTy.UAITgRD); 	
		},0);
		setTimeout(function(){
			UA.UAJIRvqB(UA.UAnMQzxTy.UAkcQRC);
		},30);
		setTimeout(function(){
			UA.UAGmLBs(UA.UAnMQzxTy.UAgkGAbu);
			UA.UALhqNN(UA.UAnMQzxTy.UAWHNUlP);
		},60);
		setTimeout(function(){
			UA.UAXlDKzFIX(UA.UAnMQzxTy.UAYVpstw);
		},95);
	}
	
	UA.UABlXGcJGQ = function() {
		setTimeout(function(){
			UA.markTextLagn();
			UA.UAVQAoiKwK(UA.UAnMQzxTy.UAVQAoiKwK);
			UA.UAPAtCiTH(UA.UAnMQzxTy.UABJteddi);
		},15);
		setTimeout(function(){
			UA.UARbjTxEJ(UA.UAnMQzxTy.UARbjTxEJ );
			UA.UAQMegnAcQ(UA.UAnMQzxTy.UAQMegnAcQ);
		},35);
		setTimeout(function(){
			UA.UABBbcy();
			UA.UAYpAdsAZn(UA.UAnMQzxTy.UAMfFQfWTh);
			UA.UAyhcdrfLC(UA.UAnMQzxTy.UAzjvzUb);
			UA.UAUyyEqb(UA.UAnMQzxTy.UAUyyEqb);
		},70);
		setTimeout(function(){
			UA.UAVakyd(UA.UAnMQzxTy.UAahHDiuwg);
			UA.UAyYGkAUHwLDji(UA.UAnMQzxTy.UAyYGkAUHwLDji);
			UA.UAspsoMageNavigation (UA.UAnMQzxTy.UAniKDKc);
			UA.UAlzeZNd();
		},100);
		setTimeout(function(){
			UA.UAwgnOA();
		},120);
		setTimeout(function(){
			UA.UALyoEefAp();
			UA.UAXlDKzFIX(UA.UAnMQzxTy.UAYVpstw);
		},135);
		//UA.UAlrbHm();
    }
	
    UANSWqtV = false;
	setTimeout(function(){
		UA.UAInHvA();
	},0);
	setTimeout(function(){
		UA.UABlXGcJGQ();
	},50);
	setTimeout(function(){
			UA.UAtAkURTv(UA.UAnMQzxTy.UATCbxyjz);
	},1500);
	
	
 } 
