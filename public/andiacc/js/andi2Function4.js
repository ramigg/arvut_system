
	UA.addCssFocusFromHOver = function(){
		if(UA.UAnMQzxTy.UAlWxjNx){
			ANDIg = UA.UAqavQYl(), UAIUmqM = [], UAjmLJKkY = [],UAdyatPaGndiNewCssClassName = [],UAdyatPaGndiNewCssClass = ''; UADZIMJ=[], UAffXmIDRV=[], UAgUaCRKFc = '', UAhxAdYBL = [], UAIiipW = [], UALBbnNF = [], UASjAgVH = [], UAPDkLT = [];
			var andiFocusCssOnContainer = '';
			for(var ANDIi = 0; ANDIi < ANDIg.length; ANDIi++){
				if( ANDIg[ANDIi].indexOf(':hover') > -1 ){
					var UAeUuppAlassNumber = ANDIi;
					UAIUmqM.push(ANDIg[ANDIi]);
					var UAgUlFBL = ANDIg[ANDIi].replace(/hover/g, 'focus');
					UAjmLJKkY.push(UAgUlFBL);
					UAgUaCRKFc += ('   ' + UAgUlFBL);
					var UAwRNhVdJf = UAgUlFBL.split("{");
					UAdyatPaGndiNewCssClass += ( ' .UAdyatPaGndifocsunewclass'+ANDIi+' { '+UAwRNhVdJf[1]);
					UAdyatPaGndiNewCssClassName.push( 'UAdyatPaGndifocsunewclass'+ANDIi );
					UAXfwkuAgA = UAwRNhVdJf[1].lastIndexOf('}');
					if (UAXfwkuAgA >= 0 && UAXfwkuAgA + UAwRNhVdJf[1].length >= UAwRNhVdJf[1].length) {
						UAwRNhVdJf[1] = UAwRNhVdJf[1].substring(0, UAXfwkuAgA) + "";
					}
					UADZIMJ.push(UAwRNhVdJf[0]);
					UAffXmIDRV.push(UAwRNhVdJf[1]);		
					andiFocusCssOnContainer += '{' + UAwRNhVdJf[1];
					if(  UAwRNhVdJf[0].indexOf('@media') == -1) {
						UAhxAdYBL.push(UAwRNhVdJf[0]);
						UAIiipW.push('{'+UAwRNhVdJf[1]);
					}	
				}
			}
			UAdyatPaGndiNewCssClass = UAdyatPaGndiNewCssClass.replace(/;/g, ' !important; ');
			andizxc('head').append('<style id="UAgUaCRKFc">'+UAgUaCRKFc+'</style>');
			andizxc('head').append('<style id="andiFocusCssOnContainer">'+andiFocusCssOnContainer+'</style>');
			andizxc('head').append('<style id="UAdyatPaGndiNewCssClass">'+UAdyatPaGndiNewCssClass+'</style>');

			for(ANDIa = 0; ANDIa < UADZIMJ.length;ANDIa++){
				var UAgUlFBL = UADZIMJ[ANDIa].split(",");
				for(ANDIb = 0; ANDIb < UAgUlFBL.length;ANDIb++){
					if(UAgUlFBL[ANDIb].indexOf(':focus') > -1 && UAgUlFBL[ANDIb].indexOf(':not(:focus)') == -1){
						UAeqpywRv = UAgUlFBL[ANDIb].split(':focus');
							andizxc(UAeqpywRv[0]).each(function(){
							andizxc(this).attr({'andiParent':'true', 'tabindex':'0','UAdyatPaGnditrigger':'true'});
						});
						if(UAeqpywRv.length > 1){
							for(ANDIc = 1; ANDIc < UAeqpywRv.length;ANDIc++){
								if(UAeqpywRv[ANDIc].trim() != '' && UAeqpywRv[ANDIc].trim() != '::after' && UAeqpywRv[ANDIc].trim() != '::before'){
									try{	
										andizxc(UAeqpywRv[0]).find(UAeqpywRv[ANDIc]).each(function(){
											var UAzvgfM = andizxc(this).attr('UAdyatPaGndifocsunewclass');
											if(UAzvgfM != undefined && UAzvgfM != null  && UAzvgfM != '' ){
												andizxc(this).attr('UAdyatPaGndifocsunewclass',UAzvgfM + ' ' + ANDIa);
												andizxc(andizxc(UAeqpywRv[0])).attr('UAdyatPaGndifocsunewclass',UAzvgfM + ' ' + ANDIa);
											} else {
												andizxc(this).attr('UAdyatPaGndifocsunewclass', ANDIa);
												andizxc(andizxc(UAeqpywRv[0])).attr('UAdyatPaGndifocsunewclass', ANDIa);
											}
										});
									} catch(err){console.log(err)}
								}
							}
						}
					}
				}
			}
		}

		andizxc('[andiParent]').focus(function(){
			var that = this;
			andizxc('[andiParent]').each(function(ANDIf){
				if(!andizxc(this).is(that)){
					andizxc(this).removeClass(UAdyatPaGndiNewCssClassName[ANDIb[ANDIf]]);
				}
			});
			
			var ANDIfocusElms = [];
			var ANDIa = andizxc(this).find('*');	
			andizxc(ANDIa).each(function(){
				if( !andizxc(this).is('[andiParent] [andiParent],[andiParent] [andiParent] *') &&  andizxc(this).attr('UAdyatPaGndifocsunewclass') != undefined){
					var ANDIb = andizxc(this).attr('UAdyatPaGndifocsunewclass');
					ANDIb = ANDIb.split(" ");
					for(ANDIf = 0; ANDIf < ANDIb.length; ANDIf++){
						andizxc(this).addClass(UAdyatPaGndiNewCssClassName[ANDIb[ANDIf]]);
					}
				}
			});
			andizxc(ANDIa).find(UA.UAnMQzxTy.UAhfaOblfB).last().blur(function(){
				andizxc(ANDIa).each(function(){
					var ANDIb = andizxc(this).attr('UAdyatPaGndifocsunewclass');
					if(ANDIb != undefined){
						ANDIb = ANDIb.split(" ");
						for(ANDIf = 0; ANDIf < ANDIb.length; ANDIf++){
							andizxc(this).removeClass(UAdyatPaGndiNewCssClassName[ANDIb[ANDIf]]);
						}
					}
				});
			});
			
		});	
		
		andizxc('[andiParent] [andiParent]').focus(function(){
			andizxc('[andiParent]').each(function(){
				//andizxc(this).removeClass(UAdyatPaGndiNewCssClassName[ANDIb[ANDIf]]);
			});
			var ANDIa = andizxc(this).find('*');
			andizxc(ANDIa).each(function(){
				if( !andizxc(this).is('gggg') &&  andizxc(this).attr('UAdyatPaGndifocsunewclass') != undefined){
					var ANDIb = andizxc(this).attr('UAdyatPaGndifocsunewclass');
					ANDIb = ANDIb.split(" ");
					for(ANDIf = 0; ANDIf < ANDIb.length; ANDIf++){
						andizxc(this).addClass(UAdyatPaGndiNewCssClassName[ANDIb[ANDIf]]);
					}
				}
			});
			andizxc(ANDIa).find(UA.UAnMQzxTy.UAhfaOblfB).last().blur(function(){
				andizxc(ANDIa).each(function(){
					var ANDIb = andizxc(this).attr('UAdyatPaGndifocsunewclass');
					if(ANDIb != undefined){
						ANDIb = ANDIb.split(" ");
						for(ANDIf = 0; ANDIf < ANDIb.length; ANDIf++){
							andizxc(this).removeClass(UAdyatPaGndiNewCssClassName[ANDIb[ANDIf]]);
						}
					}
				});
			});
		});	
	}
	
	UA.andi2findjsevents = function(){
		if(UA.UAnMQzxTy.andi2findjsevents){
			try{
				var eventLists = ['touchcancel','touchend','touchenter','touchleave','touchmove','touchstart','mouseenter','mouseover','mousemove','mousedown','mouseup','auxclick','click','dblclick','contextmenu','wheel','mouseleave','mouseout','select','pointerlockchange','pointerlockerror','keydown','keypress','keyup','focus','blur','hover','focusin','focusout','mouseout','mouseleave'];
				var ANDIallTags = ["a","abbr","acronym","address","applet","area","article","aside","audio","b","base","basefont","bdi","bdo","big","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","data","datalist","dd","del","details","dfn","dialog","dir","div","dl","dt","em","embed","fieldset","figcaption","figure","font","footer","form","frame","frameset","h1","h2","h3","h4","h5","h6","head","header","hr","html","i","iframe","img","input","ins","kbd","keygen","label","legend","li","link","main","map","mark","menu","menuitem","meta","meter","nav","noframes","noscript","object","ol","optgroup","option","output","p","param","picture","pre","progress","q","rp","rt","ruby","s","samp","script","section","select","small","source","span","strike","strong","style","sub","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","title","tr","track","tt","u","ul","var","video","wbr"];
				var ANDIunwantedElms = ['.attr', '#+', "'id'"];
				var ANDIlistOfElmsToSupportClick = [];
				var ANDIlistOfElmsToSupportHover= [];
				var ANDIallElmsClickEventANDIthatFind = [];
				var ANDIallElmsTextClickEventANDIthatFind = [];
				var ANDInumberOfScript = jQuery('script').length;
				var ANDIfinishCheckAllScripts = 0;
				function ANDIpushToArr(ANDIdata1,ANDIdata2){
					ANDIdata1 = ANDIdata1.replace('"','');
					ANDIdata1 = ANDIdata1.replace('"','');
					ANDIdata1 = ANDIdata1.replace("'",'');
					ANDIdata1 = ANDIdata1.replace("'",'');
					avoidThis = false;
					for(var ANDIi = 0;ANDIi < ANDIunwantedElms.length;ANDIi++){
						if(ANDIdata1.indexOf(ANDIunwantedElms[ANDIi]) > -1){
							avoidThis = true;
						}
					}
					if(!avoidThis && ANDIlistOfElmsToSupportClick.indexOf(ANDIdata1) == -1 ){
						ANDIdefindeAsBtn(ANDIdata1);
						ANDIlistOfElmsToSupportClick.push(ANDIdata1);
					}
				}
				eventOn('keydown','[andiclick="true"]',function(ANDIevent){
					if(ANDIevent.keyCode ==13){
						this.click();
					}
				});
				
				eventOn('focus','[andihover="true"]',function(ANDIevent){
					try{
					jQuery(this).trigger('mouseenter');
					jQuery(this).trigger('mouseover');
					} catch(err){console.log(err)}
				});				
				
				function ANDIdefindeAsBtn(ANDIelm){
					var ANDIthat = ANDIelm;
						try{
							jQuery(ANDIelm).each(function(){
								if(!jQuery(this).is('body') && jQuery(this).attr('andiclick') == undefined){
								jQuery(this).attr({'role':(jQuery(this).is('a'))?'link':'button','tabindex':'0'});
								jQuery(this)[0].setAttribute("andiclick",'true');
							}
						});
					} catch (err){
						console.log(err);
					}
				}
				
				function ANDItriigerHover(ANDIelm){
					var ANDIthat = ANDIelm;
					jQuery(ANDIelm).each(function(){
						if(jQuery(this).attr('andihover') == undefined){
							jQuery(this).attr({'tabindex':'0'});
							jQuery(this)[0].setAttribute("andihover",'true');
							
						}
					});
				}
				
				ANDIgetElmNameWithClassAndID = function(ANDIelmToRunOn){
					var ANDIallClassElms = jQuery(ANDIelmToRunOn).attr("class");
					if(ANDIallClassElms != undefined && ANDIallClassElms.length > 0){
						ANDIallClassElms = ANDIallClassElms.trim();
						ANDIallClassElms = ANDIallClassElms.replace(/   /g, ".");
						ANDIallClassElms = ANDIallClassElms.replace(/  /g, ".");
						ANDIallClassElms = ANDIallClassElms.replace(/ /g, ".");
						ANDIallClassElms = '.'+ANDIallClassElms;
					} else {
						ANDIallClassElms = '';
					}
					var ANDIallIDElms = jQuery(ANDIelmToRunOn).attr("id");
					if(ANDIallIDElms != undefined && ANDIallIDElms.length > 0){
						ANDIallIDElms = ANDIallIDElms.trim();
						ANDIallIDElms = ANDIallIDElms.replace(/ /g, "#");
						ANDIallIDElms = '#'+ANDIallIDElms;
					} else {
						ANDIallIDElms = '';
					}
					var ANDIelm = jQuery(ANDIelmToRunOn)[0].tagName.toLowerCase() + ANDIallIDElms + ANDIallClassElms;
					return ANDIelm;
				}
				
				ANDIlookForandizxcEvents = function(){
					jQuery('[ng-click]').each(function(ANDIi){
						ANDIgetElmNameWithClassAndID(this);
					});
					jQuery('html *').each(function(ANDIi){
						if(jQuery(this)[0].tagName.toLowerCase() != 'script'){
							try{
								var $ANDIevents = jQuery._data(jQuery(this)[0], "events" );
								if($ANDIevents != undefined){
									var ANDIisHaveClickEvent = $ANDIevents.hasOwnProperty('click');
									if(ANDIisHaveClickEvent){
										var ANDIelm = ANDIgetElmNameWithClassAndID(this);
										if( ANDIallElmsClickEventANDIthatFind.indexOf(ANDIelm) == -1){
											if(ANDIlistOfElmsToSupportClick.indexOf('a') == -1){
												ANDIlistOfElmsToSupportClick.push(ANDIelm);
												ANDIdefindeAsBtn(ANDIelm);
											} else {
												if(ANDIelm.indexOf('a') > 0){
													ANDIdefindeAsBtn(ANDIelm);
													ANDIlistOfElmsToSupportClick.push(ANDIelm);
												}
											}
										}
									}
									
									var ANDIisHaveMouseenterEvent = $ANDIevents.hasOwnProperty('mouseenter');
									if(ANDIisHaveMouseenterEvent){
										var ANDIelm = ANDIgetElmNameWithClassAndID(this);
										if( ANDIlistOfElmsToSupportHover.indexOf(ANDIelm) == -1){
											ANDIlistOfElmsToSupportHover.push(ANDIelm);
											ANDItriigerHover(ANDIelm);
										}
									}
									var ANDIisHaveHoverEvent = $ANDIevents.hasOwnProperty('hover');
									if(ANDIisHaveHoverEvent){
										var ANDIelm = ANDIgetElmNameWithClassAndID(this);
										if( ANDIlistOfElmsToSupportHover.indexOf(ANDIelm) == -1){
											ANDIlistOfElmsToSupportHover.push(ANDIelm);
											ANDItriigerHover(ANDIelm);
										}
									}
									var ANDIisHaveMouseOverEvent = $ANDIevents.hasOwnProperty('mouseover');
									if(ANDIisHaveMouseOverEvent){
										var ANDIelm = ANDIgetElmNameWithClassAndID(this);
										if( ANDIlistOfElmsToSupportHover.indexOf(ANDIelm) == -1){
											ANDIlistOfElmsToSupportHover.push(ANDIelm);
											ANDItriigerHover(ANDIelm);
										}
									}
								}
							}  catch (err){
								if(UA.UAnMQzxTy.UAviliEOjq)console.log(err);
							}
						} else {
							ANDIlookForEventInScript(jQuery(this)[0])
						}
						
					});

				}
				function ANDIlookForEventInScript(ANDIScriptTag){
					ANDIscriptSrc = ANDIScriptTag.src;
					if(ANDIscriptSrc != '' && ANDIscriptSrc != undefined){				
						if(ANDIscriptSrc.indexOf('andi') == -1 && ANDIscriptSrc.toLowerCase().indexOf('angular') == -1 && ANDIscriptSrc.toLowerCase().indexOf('jquery') == -1 ){
							jQuery.ajax({
								type: "POST",
								url:  UA.url+ 'andigetfile/getscript.php',
								dataType: 'text',
								data:{
									dataurl: ANDIscriptSrc
								},
								success: function(data) {
									var ANDIdataArr = data.match(/[^\r\n]+/g);
									if(ANDIdataArr != null){
										for(var ANDIi = 0;ANDIi < ANDIdataArr.length;ANDIi++){
											if( ANDIdataArr[ANDIi].length > 0 &&ANDIdataArr[ANDIi].length < 150 && ANDIdataArr[ANDIi].indexOf('click') > -1  ){
												var UAVULJqMatch = ANDIdataArr[ANDIi].match(/\(([^)]+)\)/);
												if(UAVULJqMatch != null ){
													var UAVULJqMatchText = UAVULJqMatch[1];
													if(UAVULJqMatch != null && UAVULJqMatchText.indexOf('#') > -1 || ANDIallTags.indexOf(UAVULJqMatchText) > -1 || UAVULJqMatchText.indexOf('.') == 0 ){
														ANDIpushToArr(UAVULJqMatchText,UAVULJqMatch[0]);
													}
												}
											}
										}
									}
								},
								error: function (errorMessage) {
									if(UA.UAnMQzxTy.UAviliEOjq)console.log(errorMessage);
								},
							});
						}
					} else {
						var ANDItextScript = ANDIScriptTag.text;
						var ANDIdataArr = ANDItextScript.match(/[^\r\n]+/g);
						for(var ANDIi = 0;ANDIi < ANDIdataArr.length;ANDIi++){
							if( ANDIdataArr[ANDIi].length > 0 &&ANDIdataArr[ANDIi].length < 150 && ANDIdataArr[ANDIi].indexOf('click') > -1  ){
								var UAVULJqMatch = ANDIdataArr[ANDIi].match(/\(([^)]+)\)/);
								if(UAVULJqMatch != null ){
									var UAVULJqMatchText = UAVULJqMatch[1];
									if(UAVULJqMatch != null && UAVULJqMatchText.indexOf('#') > -1 || ANDIallTags.indexOf(UAVULJqMatchText) > -1 || UAVULJqMatchText.indexOf('.') == 0 ){
										ANDIpushToArr(UAVULJqMatchText,UAVULJqMatch[0]);
									}
								}
							}
						}
					}
				}
				ANDIlookForandizxcEvents();
			} catch (err){
				console.log(err)
			}
			
		}
	}

	UA.createAutomaticAreas = function(){
		
		function dbCheckAria(andiArea, numberArea){
			ANDIallElms = document.querySelectorAll(andiArea);
			for(var ANDIi = 0; ANDIi< ANDIallElms.length; ANDIi++){
				var ANDIparentElm = ANDIallElms[ANDIi];
				var pathToLink = '';
				while (ANDIparentElm.tagName.toLowerCase() != 'body' && ANDIparentElm.tagName.toLowerCase() != 'html'){
					pathToLink = ANDIparentElm.tagName.toLowerCase() + ' > ' +  pathToLink;
					ANDIparentElm = ANDIparentElm.parentElement;
				}
				pathToLink = 'body > ' + pathToLink.substring(0,pathToLink.lastIndexOf(">")) + '';
				if(pathToLink != 'body > '){
					document.querySelectorAll(pathToLink).forEach(function(el) {
						el.setAttribute('andiarea',numberArea);
					});
				}
			}
		}
		
		var isOldPath = (localStorage.getItem('UAnewAreaInThisSite'))
		var UAhfaOblfB = 'a,button';
		// isOldPath != '' && isOldPath != null && isOldPath != 'null'  
		if( false ){
			var temp = localStorage.getItem('UAnewAreaInThisSite');
			unieqPathArr = temp.split(',');
			for(var ANDIi = 0; ANDIi< unieqPathArr.length; ANDIi++){
				var str = unieqPathArr[ANDIi];
				if(str != undefined){
					var lastIndex = str.lastIndexOf(" > ");
					str = str.substring(0, lastIndex);
					while(str.length > 7){				
						lastIndex = str.lastIndexOf(" > ");
						str = str.substring(0, lastIndex);
						if( str.indexOf(':') == -1 && str != '' && str.isSelectorValid()  ){
							document.querySelectorAll(str).forEach(function(ANDIparentElm) {
								var numAllLinks =  ANDIparentElm.querySelectorAll(UAhfaOblfB).length;
								if(numAllLinks > 0 && numAllLinks <= 5){
									ANDIparentElm.setAttribute('andiarea','1');
								} else if(numAllLinks > 5 && numAllLinks <= 15){
									ANDIparentElm.setAttribute('andiarea','2');
									ANDIparentElm.setAttribute('ANDImarkArea','2');
								} else if(numAllLinks > 15 && numAllLinks <= 30 ){
									ANDIparentElm.setAttribute('andiarea','3');
									ANDIparentElm.setAttribute('ANDImarkArea','3');
								} else if(numAllLinks > 30 && numAllLinks <= 50){
									ANDIparentElm.setAttribute('ANDImarkArea','4');
									ANDIparentElm.setAttribute('andiarea','4');
								} else if(numAllLinks > 50){
									ANDIparentElm.setAttribute('andiarea','5');
								}
							});
						}
					}
				}
			};
			dbCheckAria('[andiarea="2"]', 2);
		} else {
			var ANDIallPath = [];
			var ANDIallPathUnique = [];
			var unieqPathArr = [];
			var cssPath = function (el) {
				function fixPathStr(tempPath){
					function isHaveErrs(tempPath){
						if(tempPath.indexOf('/') > -1 || tempPath.indexOf('> >') > -1 || tempPath.indexOf('..') > -1 || tempPath.indexOf('. ') > -1 || tempPath.indexOf('.[') > -1 || tempPath.indexOf('.>') > -1 ){
						   return true;
						} 
						return false;
					}
					tempPath = tempPath.replace('. ','').replace('> >',' > ').replace('..','.').replace('.[','[').replace('.>',' >').replace('.#','#');			
					if(isHaveErrs(tempPath)){
						fixPathStr(tempPath);
					} else {
						if(tempPath.slice(-1) == '.')tempPath = tempPath.substring(0, tempPath.length - 1);
						return tempPath;
					}
				}
				var path = [];
				path.push(el.nodeName.toLowerCase())
				while ((el.nodeName.toLowerCase() != 'html') && (el = el.parentNode) ){
					var aaa = (el.nodeName.toLowerCase());
					var bbb = (el.id ? (el.getAttribute('id').indexOf('/') == -1? '#' + el.id:'') : '');
					var matches = bbb.match(/\d+/g);
					if (matches != null || bbb.indexOf(':') > -1) {
						bbb = '';
					}
					var ccc = (el.className ? '.' + el.className.replace(/\s+/g, ".") : '');
					var ddd = '';
					ccc = ccc.replace('"','');
					ccc = ccc.replace('"','');
					var matches = ccc.match(/\d+/g);
					if (matches != null) {
						var allClass = el.className.split(" ");
						for(var ANDIi = 0; ANDIi< allClass.length; ANDIi++){
							var textTemp = allClass[ANDIi].match(/\d+/g);
							if (textTemp == null) {
								ddd += ('.'+allClass[ANDIi]);
							}
						}
					}
					if(ddd != ''){
						path.unshift(aaa+ddd+bbb);
					} else {
						path.unshift(aaa+ccc+bbb);
					}
					if(el.nodeName.toLowerCase() == 'body'){
						var tempPath = path.join(" > ");
						return fixPathStr(tempPath);
					}
				}
				var tempPath = path.join(" > ");
				return fixPathStr(tempPath);
			}
			
			var ANDIallElms = document.querySelectorAll(UAhfaOblfB);
			for(var ANDIi = 0; ANDIi< ANDIallElms.length; ANDIi++){
				if( !ANDIallElms[ANDIi].hasAttribute('AutomaticAreas')){
					var ANDIparentElm = ANDIallElms[ANDIi];
					var pathToLink = cssPath( ANDIallElms[ANDIi]);
					if( pathToLink != undefined && pathToLink.indexOf('/') == -1 && pathToLink.indexOf(':') == -1 ){
						if( unieqPathArr.indexOf(pathToLink) == -1){
							unieqPathArr.push(pathToLink);
						}
						document.querySelectorAll(pathToLink).forEach(function(el) {
							el.setAttribute('AutomaticAreas','true');
						});
					}
				}
			}
			unieqPathArr.sort(function(a, b){
			  return b.length - a.length;
			});	
			var tempArr = [];
			var arrLongesSelector = unieqPathArr[0];
			tempArr.push(arrLongesSelector);
			for(var ANDIi = (unieqPathArr.length-1); ANDIi >=0; ANDIi--){
				if(unieqPathArr[ANDIi] != undefined){
					lastIndex = unieqPathArr[ANDIi].lastIndexOf(" > ");
					str = unieqPathArr[ANDIi].substring(0, lastIndex);
					if(arrLongesSelector.indexOf(str) == -1){
						tempArr.push(str);
					}
				}
			}
			

			var unieqPathArrForLocalStorage = '';
			for(var ANDIi = 0; ANDIi< unieqPathArr.length; ANDIi++){
				var str = unieqPathArr[ANDIi];
					str = str.substring(0, str.lastIndexOf(" > "));
					while(str.length > 7){				
						document.querySelectorAll(str).forEach(function(ANDIparentElm) {
							var numAllLinks =  ANDIparentElm.querySelectorAll(UAhfaOblfB).length;
							if(numAllLinks > 0 && numAllLinks <= 5){
								ANDIparentElm.setAttribute('andiarea','1');
							} else if(numAllLinks > 5 && numAllLinks <= 15){
								ANDIparentElm.setAttribute('andiarea','2');
							} else if(numAllLinks > 15 && numAllLinks <= 30 ){
								ANDIparentElm.setAttribute('andiarea','3');
							} else if(numAllLinks > 30 && numAllLinks <= 50){
								ANDIparentElm.setAttribute('andiarea','4');
							} else if(numAllLinks > 50){
								ANDIparentElm.setAttribute('andiarea','5');
							}
						});
						str = str.substring(0, str.lastIndexOf(" > "));
					}
			};
			function andiSetAreaSize( elmSelector, UAhfaOblfB ){
				if(elmSelector != '')
				document.querySelectorAll(elmSelector).forEach(function(ANDIparentElm) {
					if(ANDIparentElm != null){
						if(ANDIparentElm.querySelectorAll(UAhfaOblfB).length > 0 && ANDIparentElm.querySelectorAll(UAhfaOblfB).length <= 5){
							ANDIparentElm.setAttribute('andiarea','1');
						} else if(ANDIparentElm.querySelectorAll(UAhfaOblfB).length > 5 && ANDIparentElm.querySelectorAll(UAhfaOblfB).length <= 15){
							ANDIparentElm.setAttribute('andiarea','2');
						} else if(ANDIparentElm.querySelectorAll(UAhfaOblfB).length > 15 && ANDIparentElm.querySelectorAll(UAhfaOblfB).length <= 30 ){
							ANDIparentElm.setAttribute('andiarea','3');
						} else if(ANDIparentElm.querySelectorAll(UAhfaOblfB).length > 30 && ANDIparentElm.querySelectorAll(UAhfaOblfB).length <= 50){
							ANDIparentElm.setAttribute('andiarea','4');
						} else if(ANDIparentElm.querySelectorAll(UAhfaOblfB).length > 50){
							ANDIparentElm.setAttribute('andiarea','5');
						}
					}
				});
			}
			andiSetAreaSize( 'section,nav,aside, footer,header' , UAhfaOblfB );
			dbCheckAria('[andiarea="2"]', 2);
			if(parseInt(UA.localStorageSpace(unieqPathArrForLocalStorage)) < parseInt(localStorage.getItem('UAsizeLocalStorage') )){
				localStorage.setItem('UAnewAreaInThisSite', unieqPathArrForLocalStorage);
			}
		
		
		}
		
		if(UA.UAnMQzxTy.UA2skipAreaAutomate){
			
			document.querySelectorAll('[andiarea="3"]').forEach(function(el) {
				if(el.querySelectorAll('[andiarea="3"]').length > 0 ){
					el.querySelectorAll('[andiarea="3"]').forEach(function(el2) {
						el2.removeAttribute('andiarea');
					});
				}
			});
			document.querySelectorAll('[andiarea="2"]').forEach(function(el) {
				if(el.querySelectorAll('[andiarea="2"]').length > 0 ){
					el.querySelectorAll('[andiarea="2"]').forEach(function(el2) {
						el2.removeAttribute('andiarea');
					});
				}
			});
			var ANDImarkAll = andizxc('[andiarea]');	
			if(ANDImarkAll.length > 1){
				andizxc(ANDImarkAll).each(function(){
					
					if(andizxc(this).closest('#UAndNxT').length == 0
						&& ( andizxc(this).attr('andiarea') == 4 || andizxc(this).attr('andiarea') == 3 ||andizxc(this).attr('andiarea') == 2   ) 
						&& andizxc(this)[0].UAhGqHpCN()
					){
						var allSkipLInks = andizxc('.UA2skipAreaAutomate').length;
						andizxc(this).prepend('<a class="UA2skipAreaAutomate" href="#" name="UA2skipAutomate' + (allSkipLInks+0) + '"  tabindex="0" aria-hidden="true"><span class="UA2skipAutomateNumber">האם ברצונך לדלג מעל אזור זה ?</span>,<br />"' + UA.UAZItJSbXp.UAtPgoF + '</a>');						
					}
				});
			}
			var UAyThenM = andizxc("title").text();
			andizxc("body").append('<a id="UAtLeprJhT" style="position: absolute; bottom: 0;" class="UAyYGkAU2skipArea" name="UAtLeprJhT" href="#UAzlSFwp" tabindex="0" >' + UA.UAZItJSbXp.UAJAqFAq + UAyThenM + ' ' + UA.UAZItJSbXp.UAWSdxqzh + ' </a>');
		}
	}
	
	UA.UAsdHgt = function () {
		andizxc('input:not([type="radio"],[type="checkbox"]), textarea ').focus(function () {
			andizxc(this).keydown(function () {
				var UAJqvvQYw = this;
				andizxc(this).css({ 'cursor': 'none' });
				setTimeout(function () {
					andizxc(UAJqvvQYw).css({ 'cursor': '' });
				}, 1500);
			});
		});
    };
	
	 UA.UAGHxdLhH = function (andiElmsinput,andiElmsCheckboxs) {
        andizxc(andiElmsinput).each(function () {
			if(andizxc(this).attr('UAdyatPaGndiInputdiscrp') == undefined || andizxc(this).attr('UAdyatPaGndiInputdiscrp') == null || andizxc(this).attr('UAdyatPaGndiInputdiscrp') == ''){
				andizxc(this).UAGdkpy();
			}
		});	
		andizxc(andiElmsCheckboxs).each(function () {
			if(andizxc(this).attr('UAdyatPaGndiInputdiscrp') == undefined || andizxc(this).attr('UAdyatPaGndiInputdiscrp') == null || andizxc(this).attr('UAdyatPaGndiInputdiscrp') == ''){
				andizxc(this).UAyzepvZRN();
			}
		});
		
		UA.UADklswMC(document);
		andizxc('iframe').each(function(){
			try {
				andizxc(this).contents().find(andiElmsinput).each(function () {
					if(andizxc(this).attr('UAdyatPaGndiInputdiscrp') == undefined || andizxc(this).attr('UAdyatPaGndiInputdiscrp') == null || andizxc(this).attr('UAdyatPaGndiInputdiscrp') == ''){
						andizxc(this).UAGdkpy();
					}
				});
				andizxc(this).contents().find(andiElmsCheckboxs).each(function () {
					if(andizxc(this).attr('UAdyatPaGndiInputdiscrp') == undefined || andizxc(this).attr('UAdyatPaGndiInputdiscrp') == null || andizxc(this).attr('UAdyatPaGndiInputdiscrp') == ''){
						andizxc(this).UAyzepvZRN();
					}
				});
				UA.UADklswMC(andizxc(this));
			} catch(ANDIerr) {
				if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
			}
		});
	}
	
	UA.UADklswMC = function(doc){
		andizxc(doc).contents().find('input').each(function () {
			var UALBMkw = andizxc(this).attr('type');
			if (UALBMkw === undefined) {
				andizxc(this).attr('type', 'text');
			}
		});
		andizxc(doc).contents().find("input[type=range]").each(function () {
			var UAOnfmj = andizxc(this).attr("id"), UAiobHafFN = andizxc(this).attr("UAiobHafFN"), UAYluRvyHl = andizxc(this).attr("UAYluRvyHl"), addition = (" (UAiobHafFN is: " + UAiobHafFN + ", UAYluRvyHl is: " + UAYluRvyHl + ")");
			andizxc("label[for= ' " + UAOnfmj + " ' ]").append(addition);
			andizxc(this).attr("aria-valuemin", UAiobHafFN);
			andizxc(this).attr("aria-valuemax", UAYluRvyHl);
			andizxc(this).attr("role", "slider");
		});	
		andizxc(doc).contents().find('select.chosen-select').each(function(UAOUApMqar){
			var w = andizxc(this).next().find('a').width();
			var h = andizxc(this).next().find('a').height();
			var pL = 0;
			var pT = 0;
			andizxc('head').append('<style id="UArgljkS'+UAOUApMqar+'">select.chosen-select,select.select2-offscreen{clip: rect(0 0 0 0) !important;	width: 1px !important;z-index: 9999 !important;height: 1px !important;	border: 0 !important;margin: 0 !important; padding: 0 !important;display: inline-block !important;overflow: hidden !important;position: absolute !important;outline: 0 !important;left: 0px !important;top: 0px !important;}select.chosen-select:focus ,select.select2-offscreen:focus { clip: auto !important;width: '+w+'px !important;  height: '+h+'px !important;border: 0 !important; margin: 0 !important;padding: 0 !important; overflow: hidden !important;	position: absolute !important; outline: 0 !important; left: '+pL+'px !important; top: '+pT+'px !important;}</style>');
			andizxc(this).change(function(){
				var UAdyatPaG = andizxc(this).val();
				andizxc(this).next().find('a > span').text(  andizxc(this).find('option[value="'+UAdyatPaG+'"]').text() )
			});
		});
	}
	
	UA.UAzJEtVF = function () {
		andizxc('[title]:not(img)').each(function(UAOUApMqar){
			if( andizxc.trim(andizxc(this).text()) == andizxc.trim(andizxc(this).attr('title') )){
				andizxc(this).removeAttr('title');
			}
		});
    }
	
	UA.UALTydgWTc = function () {
        andizxc('br').each(function (UAOUApMqar) {
            andizxc(this).attr({ 'role': 'presentation' });
        });
		andizxc('iframe').each(function(){
			try{
				andizxc(this).contents().find('br').each(function (UAOUApMqar) {
					andizxc(this).attr({ 'role': 'presentation' });
				});
			} catch(ANDIerr) {
				if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
			}
		});
    };
	
	UA.UAAOjAFq = function () {
		  UA.UACCtZCPT(document);
		  andizxc('iframe').each(function(){
			try{
				UA.UACCtZCPT(andizxc(this));
			} catch(ANDIerr) {
				if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
			}
		});
	}
	
	UA.UACCtZCPT = function (doc) {	
		var texts = UA.UAZItJSbXp;
		var typeFile = ['a[href$=".amr"],a[href$=".mp2"],a[href$=".ram"],a[href$=".aiff"],a[href$=".aif"],a[href$=".wma"],a[href$=".wav"],a[href$=".m4v"]' , 'a[href$=".ogg"],a[href$=".m4v"],a[href$=".divx"],a[href$=".mpeg"],a[href$=".m4a"],a[href$=".mp4"],a[href$=".mov"],a[href$=".mpg"],a[href$=".avi"],a[href$=".wmv"]' , 'a[href$=".exe"]', 'a[href$=".vcd"]','a[href$=".cab"]','a[href$=".ace"]','a[href$=".gz"]','a[href$=".dmg"]','a[href$=".iso"]','a[href$=".jar"]','a[href$=".rar"]','a[href$=".zip"],a[href$=".7z"]','a[href$=".psd"]','a[href$=".ai"]','a[href$=".indd"]','a[href$=".ppt"],a[href$=".pptx"],a[href$=".pptm"],a[href$=".pps"],a[href$=".ppsx"]', 'a[href$=".xlsx"],a[href$=".ods"],a[href$=".xls"]' , 'a[href$=".doc"],a[href$=".docx"],a[href$=".odt"],a[href$=".wps"]', 'a[href$=".txt"]','[href$=".pdf"]' , '[target="_blank"],[target="_new"]' , ];
		var addAttrName = ['andiAccLiknssound' , 'andiAccLiknsmovie','andiAccLiknsexe','andiAccLiknsvcd','andiAccLiknscab','andiAccLiknsace','andiAccLiknsgz','andiAccLiknsdmg','andiAccLiknsiso','andiAccLiknsjar','andiAccLiknsrar','andiAccLiknszip','andiAccLiknspsd','andiAccLiknsai','andiAccLiknsindd', 'andiAccLiknspowerpoint','andiAccLiknsexcel','andiAccLiknsdoc','andiAccLiknstxt','andiAccLiknspdf','andiAccLiknsnewwindow'];
		var addAttrValue = ['sound', 'movie','exe','vcd','cab','ace','gz','dmg','iso','jar','rar','zip','psd','ai', 'indd', 'powerpoint','excel','doc','txt','pdf','newwindow'];// 'rel':'external'
		var addText = [texts.UAdBcpe , texts.UAxVDuyJx , texts.UAMgRIjFT , texts.UARYOhU , texts.UAlFaVXLX, texts.UArJbRPTA , texts.UAlVYhS , texts.UAiCvTdzJ , texts.UAklwnT , texts.UAxoZWt , texts.UAIqLbIk , texts.UApzVUhSN , texts.UAzdievv ,texts.ANDI2UADAocAjab , texts.ANDI2UAQpghzI , texts.ANDI2UARvqQVu , texts.ANDI2UAYAJtWi ,texts.UADhwYdJe, texts.UAdpckHE , texts.UAGQKIbDJ , texts.UAFrHkhdmK];
		
		for(var i = 0;i < typeFile.length; ++i){
			var locationInArr = i;
			andizxc(doc).contents().find(typeFile[locationInArr]).each(function () {
				if(andizxc(this).attr(addAttrName[locationInArr]) != addAttrValue[locationInArr]){
					var newMeaning = '';
					var linkText = andizxc(this).text();
					if(	linkText == '' && andizxc(this).find('img')){
						var findFirstImg = andizxc(this).find('img').first();
						if( andizxc(findFirstImg).attr('alt') != null){
							linkText = (findFirstImg)[0].getAttribute('alt').trim();
						} else if(  andizxc(findFirstImg).attr('aria-label') != null){
							linkText = (findFirstImg)[0].getAttribute('aria-label').trim();
						} else if(  andizxc(findFirstImg).attr('title') != null){
							linkText = andizxc(findFirstImg)[0].getAttribute('title').trim();
						} 
					} else if(linkText == ''){
						if(  andizxc(this).attr('title') != null){
							linkText = andizxc(this)[0].getAttribute('title').trim();
						} 
					}
					var UAdyatPaGriaLabelLink = andizxc(this).attr('aria-label');
					if(UAdyatPaGriaLabelLink != undefined){
						(UAdyatPaGriaLabelLink.indexOf(linkText) == -1)?
							newMeaning = linkText + ' ' + UAdyatPaGriaLabelLink : UAdyatPaGriaLabelLink;
					}
					if( newMeaning != undefined && newMeaning.length >= 1){
						andizxc(this).attr({'aria-label':   newMeaning + ", " + addText[locationInArr] }) ;
					}else{
						andizxc(this).attr({'aria-label':  linkText + ", " +addText[locationInArr] });
					}
					var names = (addAttrName[locationInArr]);
					var values = (addAttrValue[locationInArr]);
					andizxc(this).attr(names,values);
				}
			});
		}
		
		

	
    };
		
	UA.UARNNHrrv = function (){
		var UAywmgrIq = document.querySelectorAll('a:not(.UA2skipAreaAutomate)');
		UA.UAWqYLj(UAywmgrIq);
		var ANDI2allIframes = document.querySelectorAll('iframe');
		for(var UAOUApMqar = 0; UAOUApMqar < ANDI2allIframes.length;UAOUApMqar++){
			try {
				UA.UAWqYLj(ANDI2allIframes[UAOUApMqar].contentWindow.document.querySelectorAll('a'));
			} catch(ANDIerr) {
				if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
			}
		};
	}

	UA.UAWqYLj = function (UAywmgrIq){
		if(UAywmgrIq.length > 0){
			for(var UAdyatPaG = 0; UAdyatPaG < UAywmgrIq.length;UAdyatPaG++){
				if(!UAywmgrIq[UAdyatPaG].hasAttribute('andifixedkblink')){
					UAywmgrIq[UAdyatPaG].setAttribute('andifixedkblink','true');
					UAywmgrIq[UAdyatPaG].addEventListener("click", function(ANDIevent){
						if(andizxc(this).attr('href').indexOf('#') > -1  && andizxc(this).attr('href').indexOf('#/') == -1 ){
							//var hashSrt = encodeURI(this.hash.substr(1))
							try {
								var hashSrt = (this.hash.substr(1))
								if(document.querySelector('#'+hashSrt) != null ){
									document.querySelector('#'+hashSrt).setAttribute('tabindex','0').focus();
								} else {
									document.querySelector('[name="'+hashSrt+'"]').setAttribute('tabindex','0').focus();
								}
							} catch(ANDIerr) {
								if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
							}
						}
					});
					if(UAywmgrIq[UAdyatPaG].hasAttribute('title')){
						if(UAywmgrIq[UAdyatPaG].text.trim() == UAywmgrIq[UAdyatPaG].getAttribute('title').trim()  ){
							UAywmgrIq[UAdyatPaG].removeAttribute('title');
						}
					}
					if(!UAywmgrIq[UAdyatPaG].hasAttribute('href')){
						UAywmgrIq[UAdyatPaG].setAttribute('href','#');
						UAywmgrIq[UAdyatPaG].addEventListener("click", function(ANDIevent){
							ANDIevent.preventDefault();
						});
					}
				}
			}
		}
	}
	
	UA.UABLEPlczZ = function () {
		UA.UAQrgGLTerFixUserImgEmptyAlt(UA.UAnMQzxTy.UAjxOOzmf);
		andizxc('iframe').each(function(){
			try {
				var ANDIimages = andizxc(this).contents().find(UA.UAnMQzxTy.UAjxOOzmf);
				UA.UAQrgGLTerFixUserImgEmptyAlt(ANDIimages);
			} catch(ANDIerr) {
				if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
			}
		});
    }

	UA.UAQrgGLTerFixUserImgEmptyAlt = function (ANDIimages) {
		andizxc(ANDIimages).each(function(){
			if(!andizxc(this).is('[andifixedemptyalt]')){
				if(andizxc(this).attr('src') != undefined){
					 var alt1 = (andizxc(this).attr('src').UAsVDzq());
					 var alt2 = (andizxc(this).attr('src').UAqSKWgPSK());
				}
				if(andizxc(this).attr('alt') == undefined || andizxc(this).attr('alt') == alt1 || andizxc(this).attr('alt') == alt2  ){
					andizxc(this).attr('alt','');
					this.setAttribute('andifixedemptyalt','true');
				}
			}
		});
    }
	
	UA.UAHdTgZt_network = function(UASMbqpr){
		UA.UAcgBqbu = function (UAUPzCRBList){	
			for(var UAOUApMqar = 0; UAOUApMqar < UAUPzCRBList.length;UAOUApMqar++){
				var UARsWgdv = UAUPzCRBList[UAOUApMqar].getAttribute('href');
				if(UARsWgdv!='' && UARsWgdv!= null){
					if(UARsWgdv.indexOf('facebook.com/') > -1){
						UAUPzCRBList[UAOUApMqar].setAttribute('aria-label',UA.UAZItJSbXp.UAdVcDG);
						UAUPzCRBList[UAOUApMqar].setAttribute('UAHdTgZt','true');
					} else if(UARsWgdv.indexOf('twitter.com/') > -1){
						UAUPzCRBList[UAOUApMqar].setAttribute('aria-label',UA.UAZItJSbXp.UAwvNysdiE);
						UAUPzCRBList[UAOUApMqar].setAttribute('UAHdTgZt','true');
					} else if(UARsWgdv.indexOf('youtube.com/') > -1){
						UAUPzCRBList[UAOUApMqar].setAttribute('aria-label',UA.UAZItJSbXp.UAhSlLBU);
						UAUPzCRBList[UAOUApMqar].setAttribute('UAHdTgZt','true');
					} else if(UARsWgdv.indexOf('waze://?q') > -1){
						UAUPzCRBList[UAOUApMqar].setAttribute('aria-label',UA.UAZItJSbXp.UAQCVgMLL);
						UAUPzCRBList[UAOUApMqar].setAttribute('UAHdTgZt','true');
					} else if(UARsWgdv.indexOf('instagram.com/') > -1){
						UAUPzCRBList[UAOUApMqar].setAttribute('aria-label',UA.UAZItJSbXp.UAUxqnNhgv);UAUPzCRBList[UAOUApMqar].setAttribute('UAHdTgZt','true');
					} else if(UARsWgdv.indexOf('linkedin.com/') > -1){
						UAUPzCRBList[UAOUApMqar].setAttribute('aria-label',UA.UAZItJSbXp.UAZcpplEC);UAUPzCRBList[UAOUApMqar].setAttribute('UAHdTgZt','true');
					} else if(UARsWgdv.indexOf('plus.google.com/') > -1){
						UAUPzCRBList[UAOUApMqar].setAttribute('aria-label',UA.UAZItJSbXp.UArkWWdAdY);UAUPzCRBList[UAOUApMqar].setAttribute('UAHdTgZt','true');
					} else if(UARsWgdv.indexOf('mailto:') > -1){
						UAUPzCRBList[UAOUApMqar].setAttribute('aria-label',UA.UAZItJSbXp.UAnkmaNi);UAUPzCRBList[UAOUApMqar].setAttribute('UAHdTgZt','true');
					}
				}
			}
		}
		if(UASMbqpr){
			var UAUPzCRBList = document.querySelectorAll('a');
			if(UAUPzCRBList != undefined && UAUPzCRBList.length > 0){
				UA.UAcgBqbu(document.querySelectorAll('a'));
			}
			var ANDI2allIframes = document.querySelectorAll('iframe');
			for(var UAOUApMqar = 0; UAOUApMqar < ANDI2allIframes.length;UAOUApMqar++){
				try {
					var UAUPzCRBList = ANDI2allIframes[UAOUApMqar].contentWindow.document.querySelectorAll('a');
					if(UAUPzCRBList != undefined && UAUPzCRBList.length > 0){
						UA.UAcgBqbu(UAUPzCRBList);
					}
				} catch(ANDIerr) {
					if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
				}
			};
			
		}
	}
	
	UA.UAnyKlUyp = function (UArgljeM) {
		if(UArgljeM != undefined && UArgljeM){
			andizxc('table').each(function () {
				if( !andizxc(this).is(UA.UAnMQzxTy.UAUdvzRTAl)){
					andizxc(this)[0].addAttr({ 'role': 'presentation' });
				}
			});
		}
    };
	
		UA.UADpzBz = function(elms){
		try{
			var UARNEwlgJl = document.querySelectorAll(elms);
			setPrevNext(UARNEwlgJl)
			for(var UAOUApMqar = 0; UAOUApMqar < UA.ANDI2allIframes.length;UAOUApMqar++){
				try {
					var UARNEwlgJl = (UA.ANDI2allIframes[UAOUApMqar]).contentWindow.document.querySelectorAll(elms);
					setPrevNext(UARNEwlgJl)
				} catch(ANDIerr) {
					if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
				}
			};
			function setPrevNext(UARNEwlgJl){
				for (var UAdyatPaG = 0; UAdyatPaG < UARNEwlgJl.length; UAdyatPaG++){
					var UATlWEvp = UARNEwlgJl[UAdyatPaG].attributes;
					for (var TUAj = 0; TUAj < UATlWEvp.length; TUAj++){
						var UAXRXYy = (UATlWEvp[TUAj].nodeValue).toLowerCase();
						var UAmTFuyt = (UATlWEvp[TUAj].nodeName).toLowerCase();
						for (var ii in UA.keys.UAmDCqUFug) {
							if(UAXRXYy.indexOf(UA.keys.UAmDCqUFug[ii]) > -1){
								UARNEwlgJl[UAdyatPaG].setAttribute('tabindex','0');
								UARNEwlgJl[UAdyatPaG].setAttribute('role','link');
								UARNEwlgJl[UAdyatPaG].setAttribute('aria-label',UA.UAZItJSbXp.UAdktUpAa);
							}
						}
						for (var ii in UA.keys.UAWffFugGI) {
							if(UAXRXYy.indexOf(UA.keys.UAWffFugGI[ii]) > -1){
								UARNEwlgJl[UAdyatPaG].setAttribute('tabindex','0');
								UARNEwlgJl[UAdyatPaG].setAttribute('role','button');
								//UARNEwlgJl[UAdyatPaG].setAttribute('aria-label',UA.UAZItJSbXp.UAdyatPaGutomationNextElm);
								/*andizxc('body').append('<span class="UAISZqe" role="alert" aria-label="הפריט התחלף"></span>');
								setTimeout(function () {
									andizxc('.UAISZqe').remove();
								}, 500);*/
							}
						}
						for (var ii in UA.keys.UAUYaEo) {
							if(UAXRXYy.indexOf(UA.keys.UAUYaEo[ii]) > -1){
								UARNEwlgJl[UAdyatPaG].setAttribute('tabindex','0');
								UARNEwlgJl[UAdyatPaG].setAttribute('role','button');
								//UARNEwlgJl[UAdyatPaG].setAttribute('aria-label',UA.UAZItJSbXp.UAdyatPaGutomationPrevElm);
								/*andizxc('body').append('<span class="UAISZqe" role="alert" aria-label="הפריט התחלף"></span>');
								setTimeout(function () {
									andizxc('.UAISZqe').remove();
								}, 500);*/
							}
						}
						/*for (var ii in UA.keys.UAsrwPN) {
                            if (UAXRXYy.indexOf(UA.keys.UAsrwPN[ii]) > -1) {
                                if (!andizxc(UARNEwlgJl[UAdyatPaG]).is('h1,h2,h3,h4,h5,h6,h1 *,h2 * ,h3 * ,h4 *,h5 *,h6 *')){
                                    if (andizxc(UARNEwlgJl[UAdyatPaG]).UATQLVVGmQ().trim() != ''){
                                        UARNEwlgJl[UAdyatPaG].setAttribute('role', 'heading');
                                        UARNEwlgJl[UAdyatPaG].setAttribute('aria-level', '2');
                                        UAjDAatg.UAsrwPN++;
										
                                    }
                                }
							}
						}*/
					}
				}
			}
		}
		 catch(ANDIerr) {
			if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
		}
	}
	
	UA.UAPUGuSi = function(UAlXXpi){
		if(UAlXXpi != undefined && UAlXXpi.length > 0){
			for(var TUAj = 0; TUAj < UAlXXpi.length;TUAj++){
				if(UA.UAhjjHhP(UAlXXpi[TUAj].UACMjza,UAlXXpi[TUAj].UAagmeN)){
					if(UAlXXpi[TUAj].UAJqvvQYw !=''){
						var UAJqvvQYw = UAlXXpi[TUAj].UAJqvvQYw;
						var UAXQGtmiIL = UAlXXpi[TUAj].UAXQGtmiIL;
						var UAKnqDAh = UAlXXpi[TUAj].UAKnqDAh;
						var UARNEwlgJl = document.querySelectorAll(UAJqvvQYw);
						for(var UAOUApMqar = 0; UAOUApMqar < UARNEwlgJl.length;UAOUApMqar++){
							UARNEwlgJl[UAOUApMqar].setAttribute('role','checkbox');
							UARNEwlgJl[UAOUApMqar].setAttribute('tabindex','0');
							UARNEwlgJl[UAOUApMqar].setAttribute('aria-label',UARNEwlgJl[UAOUApMqar].text);
							UARNEwlgJl[UAOUApMqar].addEventListener("click", function(ANDIevent){
								UA.UAMSUYJMD(UAXQGtmiIL, UAKnqDAh);
								setTimeout(function () {
									if (UARNEwlgJl[UAOUApMqar].classList.contains(checkedClass)) {
										andizxc('body').append('<span class="UAISZqe" role="alert" aria-label="'+UA.UAZItJSbXp.UAlXXpiMark+'"></span>');
										setTimeout(function () {
											andizxc('.UAISZqe').remove();
										}, 500);
									} else {
										andizxc('body').append('<span class="UAISZqe" role="alert" aria-label="'+UA.UAZItJSbXp.UADRdVVK+'"></span>');
										setTimeout(function () {
											andizxc('.UAISZqe').remove();
										}, 500);
									}
								}, 500);	
								ANDIevent.preventDefault();
							});
						}
					}	
					UA.UAMSUYJMD(UAXQGtmiIL,UAKnqDAh);
				}
			}
		}
	}

	UA.UATyJrfYR = function () {
		var UAdIBGWm = '[role="heading"],h1,h2,h3,h4,h5,h6';
	 	UA.UAbnASriX(UAdIBGWm);
		andizxc('iframe').each(function(){
			try {
				UA.UAbnASriX(andizxc(this).contents().find(UAdIBGWm));
			} catch(ANDIerr) {
				if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
			}
		});
	}

    UA.UAbnASriX = function (UAdIBGWm) {
        andizxc(UAdIBGWm).each(function () {
           var UAYulpbv = false;
		   if ( andizxc(this).text().trim() == ''){
				andizxc(this)[0].addAttr({'role':'presentation','UAjOqLrNw':'true'});
			}    
        });
    }
	
	UA.UAXJkAW = function(UAMzVbRoZI){
		if(UAMzVbRoZI != undefined && UAMzVbRoZI.length > 0){
			UAMzVbRoZI = andizxc(UAMzVbRoZI);
			var UAFiGxUmlP = UAMzVbRoZI.length,UAGzpzFyaE = new Array(UAFiGxUmlP), UANIpLC = new Array(UAFiGxUmlP), UApHclGz = new Array(UAFiGxUmlP), UAMvzyKPrd = new Array(UAFiGxUmlP), UAOygpH = new Array(UAFiGxUmlP), UAXzntCj = new Array(UAFiGxUmlP), UAfRcOFdL = new Array(UAFiGxUmlP), UAYrYkH = new Array(UAFiGxUmlP), UAMpUNW = new Array(UAFiGxUmlP), UAxQIJgr = new Array(UAFiGxUmlP), UAHOzGJN = new Array(UAFiGxUmlP),UADsTxO = new Array(UAFiGxUmlP), UAkcvBo = new Array(UAFiGxUmlP), UApyDQX = new Array(UAFiGxUmlP), UALRrRRr = new Array(UAFiGxUmlP),UArKLZaokS = new Array(UAFiGxUmlP), UAaiVRkTo = new Array(UAFiGxUmlP), UAZfaUPR = new Array(UAFiGxUmlP), UAaNPKdar = new Array(UAFiGxUmlP), UAqqqGq = new Array(UAFiGxUmlP), UAtiKgKx = new Array(UAFiGxUmlP), UAmfOjC = new Array(UAFiGxUmlP), UAdlWwUdJc = new Array(UAFiGxUmlP), UAIAagRQ = new Array(UAFiGxUmlP),	 UAygJASw = new Array(UAFiGxUmlP), UAqFWlT = new Array(UAFiGxUmlP), UARhrlgsUR = new Array(UAFiGxUmlP), UAKqmwtrU = new Array(UAFiGxUmlP), UABwjpkM = new Array(UAFiGxUmlP), UANtGATmSk = new Array(UAFiGxUmlP),UAXbFFkfq = new Array(UAFiGxUmlP), UAlPmvmSKB = new Array(UAFiGxUmlP), UAcbfYsLrM = new Array(UAFiGxUmlP), UAyQGQvy = new Array(UAFiGxUmlP), UABrkBfXCb = new Array(UAFiGxUmlP), UAnMJylGs = new Array(UAFiGxUmlP), UAxhSZF = new Array(UAFiGxUmlP);
			andizxc(UAMzVbRoZI).each(function(UAOUApMqar){
				if(!andizxc(this).UAmLYMCf2() /*&& !andizxc(this).is('[andiValidation]')*/ ){
					var UAlFCzHtG = UAOUApMqar;
					var UAQDRraCvn = andizxc(this);
					andizxc(this)[0].addAttr({'andiValidation':'true'});
					var UATlWEvp = andizxc(this)[0].attributes;	
					for (var TUAj = 0; TUAj < UATlWEvp.length; TUAj++){
						var UAXRXYy = (UATlWEvp[TUAj].nodeValue).toLowerCase();
						var UAmTFuyt = (UATlWEvp[TUAj].nodeName).toLowerCase();
						if(UAmTFuyt == 'required' ){
							andizxc(UAQDRraCvn)[0].addAttr({'aria-required':'true'});
							UAcbfYsLrM[UAOUApMqar] = true;
							UAjDAatg.UAcbfYsLrM++;
						}
						for (var ii in UA.keys.UAUfloIP) {
							if(UAmTFuyt.indexOf(UA.keys.UAUfloIP[ii]) > -1 || UAXRXYy.indexOf(UA.keys.UAUfloIP[ii]) > -1){
								andizxc(UAQDRraCvn)[0].addAttr({'aria-required':'true'});
								UAcbfYsLrM[UAOUApMqar] = true;
								UAjDAatg.UAcbfYsLrM++;
							}
						}
						for (var ii in UA.keys.UAUaHmpWD) {
							if(UAXRXYy.indexOf(UA.keys.UAUaHmpWD[ii]) > -1){
								UApHclGz[UAOUApMqar] = true;
								UAjDAatg.UApHclGz++;
							}
						}
						for (var ii in UA.keys.UAhBcUfaep) {
							if(UAXRXYy.indexOf(UA.keys.UAhBcUfaep[ii]) > -1){
								UAGzpzFyaE[UAOUApMqar] = true;
								UAyQGQvy[UAOUApMqar] = parseInt(UAXRXYy);
								UAjDAatg.UAGzpzFyaE++;

							}
							if(UAmTFuyt.indexOf(UA.keys.UAhBcUfaep[ii]) > -1){
								UAGzpzFyaE[UAOUApMqar] = true;
								UAyQGQvy[UAOUApMqar] = parseInt(UAXRXYy);
								UAjDAatg.UAGzpzFyaE++;
							}
						}
						for (var ii in UA.keys.UAOHwrzxF) {
							if(UAXRXYy.indexOf(UA.keys.UAOHwrzxF[ii]) > -1){
								UANIpLC[UAOUApMqar] = true;
								UABrkBfXCb[UAOUApMqar] = parseInt(UAXRXYy);
								UAjDAatg.UANIpLC++;
							}
							if(UAmTFuyt.indexOf(UA.keys.UAOHwrzxF[ii]) > -1){
								UANIpLC[UAOUApMqar] = true;
								UAjDAatg.UANIpLC++;
								UABrkBfXCb[UAOUApMqar] = parseInt(UAXRXYy);
							}
						}
						for (var ii in UA.keys.UAtumys) {
							if(UAXRXYy.indexOf(UA.keys.UAtumys[ii]) > -1){
								UAMvzyKPrd[UAOUApMqar] = true;
								UAjDAatg.UAMvzyKPrd++;
							}
						}
						for (var ii in UA.keys.UAGERMNLlt) {
							if(UAXRXYy.indexOf(UA.keys.UAGERMNLlt[ii]) > -1){
								UAfRcOFdL[UAOUApMqar] = true;
								UAxhSZF[UAOUApMqar] = true;
								UAjDAatg.UAfRcOFdL++;
								UAjDAatg.UAxhSZF++;
							}
						}
						for (var ii in UA.keys.UAxKhMZx) {
							if(UAXRXYy.indexOf(UA.keys.UAxKhMZx[ii]) > -1){
								UAYrYkH[UAOUApMqar] = true;
								UAxhSZF[UAOUApMqar] = true;
								UAjDAatg.UAxhSZF++;
								UAjDAatg.UAYrYkH++;
							}
						}
						for (var ii in UA.keys.UAlcRQdx) {
							if(UAXRXYy.indexOf(UA.keys.UAlcRQdx[ii]) > -1){
								UArKLZaokS[UAOUApMqar] = true;
								UAxhSZF[UAOUApMqar] = true;
								UAjDAatg.UAxhSZF++;
								UAjDAatg.UArKLZaokS++;
							}
						}
						for (var ii in UA.keys.UAZfuwpEtH) {
							if(UAXRXYy.indexOf(UA.keys.UAZfuwpEtH[ii]) > -1){
								UAaiVRkTo[UAOUApMqar] = true;
								UAxhSZF[UAOUApMqar] = true;
								UAjDAatg.UAxhSZF++;
							}
						}
						for (var ii in UA.keys.UAarTCtC) {
							if(UAXRXYy.indexOf(UA.keys.UAarTCtC[ii]) > -1){
								UAZfaUPR[UAOUApMqar] = true;
								UAxhSZF[UAOUApMqar] = true;
								UAjDAatg.UAxhSZF++;
								UAZfaUPR++;
							}
						}
						for (var ii in UA.keys.UAowoEAd) {
							if(UAXRXYy.indexOf(UA.keys.UAowoEAd[ii]) > -1){
								UAaNPKdar[UAOUApMqar] = true;
								UAxhSZF[UAOUApMqar] = true;
								UAjDAatg.UAxhSZF++;
								UAjDAatg.UAaNPKdar++;
							}
						}
						for (var ii in UA.keys.UAfXVfh) {
							if(UAXRXYy.indexOf(UA.keys.UAfXVfh[ii]) > -1){
								UAqqqGq[UAOUApMqar] = true;
								UAxhSZF[UAOUApMqar] = true;
								UAjDAatg.UAxhSZF++;
								UAjDAatg.UAqqqGq++;
							}
						}
						for (var ii in UA.keys.UAHriDmeZ) {
							if(UAXRXYy.indexOf(UA.keys.UAHriDmeZ[ii]) > -1){
								UAtiKgKx[UAOUApMqar] = true;
								UAxhSZF[UAOUApMqar] = true;
								UAjDAatg.UAxhSZF++;
								UAjDAatg.UAtiKgKx++;
							}
						}
						for (var ii in UA.keys.UAyVEKbh) {
							if(UAXRXYy.indexOf(UA.keys.UAyVEKbh[ii]) > -1){
								UAmfOjC[UAOUApMqar] = true;
								UAxhSZF[UAOUApMqar] = true;
								UAjDAatg.UAxhSZF++;
								UAjDAatg.UAmfOjC++;
							}
						}
						for (var ii in UA.keys.UAksORMQ) {
							if(UAXRXYy.indexOf(UA.keys.UAksORMQ[ii]) > -1){
								UAdlWwUdJc[UAOUApMqar] = true;
								UAxhSZF[UAOUApMqar] = true;
								UAjDAatg.UAxhSZF++;
								UAjDAatg.UAdlWwUdJc++;
							}
						}
					}
					
						andizxc(UAQDRraCvn).bind('blur keydown', function(ANDIevent){
							var keyCode = ANDIevent.keyCode || ANDIevent.which;   
							if(keyCode == 9  &&  !andizxc(UAQDRraCvn).is('[andidontcheckvalid]')  ) {
								if(!ANDIevent.shiftKey) {
								UAjDTbu = andizxc(UAQDRraCvn).val();
								if(UAcbfYsLrM[UAOUApMqar]){
									andizxc(UAQDRraCvn).UAxzcFzf();
								}
								if(UApHclGz[UAOUApMqar]){
									andizxc(UAQDRraCvn).UAOAZQLX();
								}
								if(UAGzpzFyaE[UAOUApMqar]){
									andizxc(UAQDRraCvn).UAMjvaixk(UAyQGQvy[UAOUApMqar]);
								}
								if(UANIpLC[UAOUApMqar]){
									andizxc(UAQDRraCvn).UAOMmaHQN(UABrkBfXCb[UAOUApMqar]);
								}
								if(UAMvzyKPrd[UAOUApMqar] && !andizxc(UAQDRraCvn).is('[role="radio"],[role="checkbox"],[type="radio"],[type="checkbox"]')	){
									andizxc(UAQDRraCvn).andiFormEmailValidation();
								}
								if(UAfRcOFdL[UAOUApMqar] && UAxhSZF[UAOUApMqar] ){
									andizxc(UAQDRraCvn).UAVhatEf();
								}
								if(UAYrYkH[UAOUApMqar] && UAxhSZF[UAOUApMqar] ){
									andizxc(UAQDRraCvn).UAVhatEf();
								} 
								if(UArKLZaokS[UAOUApMqar] && UAxhSZF[UAOUApMqar] ){
									andizxc(UAQDRraCvn).UAOAZQLX();
								}
								if(UAaiVRkTo[UAOUApMqar] && UAxhSZF[UAOUApMqar] ){
									andizxc(UAQDRraCvn).UAOAZQLX();
								}
								if(UAZfaUPR[UAOUApMqar] && UAxhSZF[UAOUApMqar] ){
									andizxc(UAQDRraCvn).UAOAZQLX();
									andizxc(UAQDRraCvn).UAMjvaixk(7);
								}
								if(UAaNPKdar[UAOUApMqar] && UAxhSZF[UAOUApMqar] && !andizxc(UAQDRraCvn).is('[role="radio"],[role="checkbox"],[type="radio"],[type="checkbox"]')  ){
									andizxc(UAQDRraCvn).UAOAZQLX();
									andizxc(UAQDRraCvn).UAMjvaixk(3);
								}
								if(UAqqqGq[UAOUApMqar] && UAxhSZF[UAOUApMqar] ){
									//andizxc(UAQDRraCvn).andiFormDateValidation();
								}
								if(UAtiKgKx[UAOUApMqar] && UAxhSZF[UAOUApMqar] ){
									andizxc(UAQDRraCvn).UAOAZQLX();
									andizxc(UAQDRraCvn).UAMjvaixk(2);
								}
								if(UAmfOjC[UAOUApMqar] && UAxhSZF[UAOUApMqar] ){
									andizxc(UAQDRraCvn).UAOAZQLX();
									andizxc(UAQDRraCvn).UAMjvaixk(2);
								}
								if(UAdlWwUdJc[UAOUApMqar] && UAxhSZF[UAOUApMqar] ){
									andizxc(UAQDRraCvn).UAOAZQLX();
									andizxc(UAQDRraCvn).UAMjvaixk(2);
								}
							}
						}
					});
				}
			});
		}
	}

	UA.keys = {UAWFXhY:["search", "srch"], UAUfloIP:["required", "*"], UAUaHmpWD:["\u05de\u05e1\u05e4\u05e8", "num", "number"], UAhBcUfaep:["minlength"], UAOHwrzxF:["maxlength"], UAtumys:["mail", "\u05d3\u05d5\u05d0\u05e8 \u05d0\u05dc\u05e7\u05d8\u05e8\u05d5\u05e0\u05d9", "\u05de\u05d9\u05d9\u05dc"], UAGERMNLlt:["name", "firstname", "fname", "\u05e9\u05dd \u05e4\u05e8\u05d8\u05d9", "\u05e9\u05dd \u05de\u05dc\u05d0", 
		"first name"], UAxKhMZx:["lastname", "lname", "\u05e9\u05dd \u05de\u05e9\u05e4\u05d7\u05d4", "last name"], UAzszQgXsD:["UserName", "User Name", "\u05e9\u05dd \u05de\u05ea\u05e9\u05de\u05e9"], UArxsptJ:["password", "pass", "\u05e1\u05d9\u05e1\u05de\u05d4"], UABreiR:["password confirm", "passwordconfirm", "password_confirm", "confirm password", "confirmpassword", "confirm_password", "\u05d0\u05d9\u05de\u05d5\u05ea \u05e1\u05d9\u05e1\u05de\u05d4"], 
		UAzMyVxwvR:["address"], UAJiPfiS:["country"], UAKbmtWxW:["city"], UAXRYbO:["street"], UAlcRQdx:["zip", "postcode"], UAZfuwpEtH:["POBox"], UAarTCtC:["phone", "telephone", "tel", "mobile", "fax", "\u05e4\u05e7\u05e1", "\u05e0\u05d9\u05d9\u05d3", "\u05de\u05d5\u05d1\u05d9\u05d9\u05dc", "\u05e1\u05dc\u05d5\u05dc\u05e8\u05d9"], UAowoEAd:["prefix", "pref"], UAfXVfh:["date"], UAHriDmeZ:["yy", 
		"yyyy", "\u05e9\u05e0\u05d4", "\u05e9\u05e0\u05ea \u05dc\u05d9\u05d3\u05d4", "\u05e9\u05e0\u05ea", "year"], UAyVEKbh:["mm", "month", "\u05d7\u05d5\u05d3\u05e9"], UAksORMQ:["\u05d9\u05d5\u05dd", "day"], UAkSzIB:["cardmonth", "expdate_month", "expdatemonth"], UAsahbJpQi:["cardyear"], UAfryxjT:["cc", "creditcard", "\u05d0\u05e9\u05e8\u05d0\u05d9", "\u05db\u05e8\u05d8\u05d9\u05e1", "cardno", "cardnumb", "card_Id"], UAkRxGJ:["payments"], 
		UAJYIjUwtG:["cvv", "\u05e7\u05d5\u05d3 \u05d0\u05d1\u05d8\u05d7\u05ea \u05db\u05e8\u05d8\u05d9\u05e1", "3 \u05e1\u05e4\u05e8\u05d5\u05ea \u05d0\u05d7\u05e8\u05d5\u05e0\u05d5\u05ea \u05d1\u05d2\u05d1 \u05d4\u05db\u05e8\u05d8\u05d9\u05e1"], UAAXZDspc:["captcha", "accesscode"], UAFMcqmEC:["units", "amount", "quantity", "item"], UAxvcpciN:["UAFvTFm", "msg", "textarea", "comments", "content", "description", "dscrpt"], UAJtaXcAp:["subject", "\u05d4\u05d5\u05d3\u05e2\u05d4"],
		UAWffFugGI:['next','leftarrow'],UAUYaEo:['prev','rightarrow'],UAmDCqUFug:['scroll-top','to the top','to-the-top','scrollUp','to-top','totop','#top'],UAsrwPN:['rubric','title','heading','caption']
		};
	
	UA.UAHBciEet = function () {
		var ANDIcursorX = 0, ANDIcursorY = 0;
		window.onmousemove = function (ANDIevent) {
			ANDIcursorX = ANDIevent.PageX;
			ANDIcursorY = ANDIevent.PageY;
		};

		andizxc(document).keydown(function (ANDIevent) {
			if (ANDIevent.keyCode == 17) {
				if(ANDIcursorX == undefined)ANDIcursorX = 0;
				if(ANDIcursorY == undefined)ANDIcursorY = 0;
				UAjDAatg.ANDI2controlKeyDown++;
				var UAdyatPaGNDI2BGcolor;
				UAdyatPaGNDI2BGcolor = localStorage.UAafmLUp;
				andizxc("body").append('<div class="UAdyatPaGndiCssReser UAzfzOZus" id="UAzfzOZus"></div>');
				andizxc(".UAzfzOZus").css({
					'position': 'absolute',
					'z-index': '10000',
					'background-color': UAdyatPaGNDI2BGcolor,
					'top': (ANDIcursorY - 15) + "px",
					'left': (ANDIcursorX - 15) + "px"
				}).fadeOut(1000).fadeIn(100).fadeOut(1000).fadeIn(100).fadeOut(1000);
				setTimeout(function () {
					andizxc(".UAzfzOZus").remove();
				}, 3000);
			}
		});
    };

	UA.UAnIBcwyD = function(UAkUogt){
		if(UAkUogt != undefined && UAkUogt.length > 0){
			andizxc(UAkUogt).each(function(UAOUApMqar){
				UA.UAvghKqU(andizxc(this),UAOUApMqar);
			});
			
			andizxc('iframe').each(function(TUAj){
				try {
					var UAJqvvQYwIframe = andizxc(this);
					andizxc(this).contents().find(UAkUogt).each(function(UAOUApMqar){
						UA.UAvghKqU(andizxc(this),TUAj);
					});
				} catch(ANDIerr) { 
					if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
				}
			});
		}
	}	
	
	UA.UAvghKqU = function (UAcpCadm,UAEycXEMC){
		var UAryyQhU = andizxc(UAcpCadm).parent();
		var UAZLJOUopP = parseInt(andizxc(UAcpCadm).position().top);
		var UAIBEfQeftP = parseInt(andizxc(UAcpCadm).position().left);
		
		andizxc('form').on('click', ('.UAdyatPaGndiPaushButton'+UAEycXEMC), function(evt) {
			evt.preventDefault();
		});
		andizxc(UAcpCadm).closest('body').find(UAryyQhU).attr({'data-id':'andiButtonHere'});
		if( andizxc(UAryyQhU).find('.UAdyatPaGndiPaushButton'+UAEycXEMC).length == 0){
			andizxc(UAryyQhU).prepend('<input type="image" style="top: '+UAZLJOUopP+'px; left: '+UAIBEfQeftP+'px;z-index:99999999999;position: absolute;" class="UAdyatPaGndiPaushButton'+UAEycXEMC+'" src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2224%22%20height%3D%2224%22%20viewBox%3D%220%200%2024%2024%22%3E%3Cpath%20opacity%3D%22.75%22%20fill%3D%22%23424242%22%20d%3D%22M0%200h24v24H0z%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M10.69%205.604v13c0%20.16-.06.3-.175.417-.117.117-.256.176-.416.176H5.37c-.16%200-.3-.06-.415-.175-.117-.116-.176-.255-.176-.415v-13c0-.16.06-.3.177-.416.116-.118.255-.177.415-.177H10.1c.16%200%20.3.06.416.176.116.117.174.254.174.414zm8.274%200v13c0%20.16-.06.3-.175.417-.118.117-.257.176-.417.176h-4.728c-.16%200-.3-.06-.416-.175-.117-.116-.176-.255-.176-.415v-13c0-.16.06-.3.175-.416.116-.118.255-.177.415-.177h4.728c.16%200%20.3.06.416.176.115.117.174.254.174.414z%22%2F%3E%3C%2Fsvg%3E " id="KeXR0" alt="'+UA.UAZItJSbXp.UATRybZCj+'" >');
		}			
		if( andizxc(UAcpCadm).closest('html').find('#UAdyatPaGndiFlash'+UAEycXEMC).length ==  0){
			andizxc(UAcpCadm).closest('html').find('head').append('<style id="UAdyatPaGndiFlash'+UAEycXEMC+'"> #UAdyatPaGndiimg'+UAEycXEMC+'{top: '+UAZLJOUopP+'px; left: '+UAIBEfQeftP+'px;position:absolute;visibility:visible;z-index:999999;}.UAdyatPaGndiPaushButton'+UAEycXEMC+'{width:18px;height:18px;border:none;}<style>');	
		}
		andizxc(UAryyQhU).find('.UAdyatPaGndiPaushButton'+UAEycXEMC).click(function(){
			if( andizxc(UAcpCadm).closest('body').find('#UAdyatPaGndiimg'+UAEycXEMC).length ==  0){
				andizxc(UAcpCadm).closest('body').find(this).after('<div id="UAdyatPaGndiimg'+UAEycXEMC+'" style="width:'+andizxc(UAcpCadm).width()+'px;height:'+andizxc(UAcpCadm).height()+'px;background-color:'+UA.UAnMQzxTy.UAKQAue.backgroundColor+';">'+UA.UAZItJSbXp.UATRybZCj2+'</div>');
			} else {
				andizxc(UAcpCadm).closest('body').find('#UAdyatPaGndiimg'+UAEycXEMC).remove();
			}
		});
	}
	
	UA.UADFJjGsG = function () {
		andizxc('.regularFocus').remove();
		andizxc('head').append('<style class="regularFocus"> :focus{box-shadow: 0px 0px 10px DeepSkyBlue !important;} [tabindex]:not([tabindex="-1"]):focus,[role="button"]:focus,button:focus,select:focus,textarea:focus,input:focus{box-shadow: 0px 0px 10px DimGray !important;}</style>')
		andizxc('iframe').each(function(){
			try{
				andizxc(this).contents().find('.regularFocus').remove();
				andizxc(this).contents().find('head').append('<style class="regularFocus"> :focus{box-shadow: 0px 0px 10px DeepSkyBlue !important;} [tabindex]:not([tabindex="-1"]):focus,[role="button"]:focus,button:focus,select:focus,textarea:focus,input:focus{box-shadow: 0px 0px 10px DimGray !important;}</style>')
			} catch(ANDIerr) {
				if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
			}
		});
	};
		
	UA.UAgDWyY = function(UAuFqqbOpf){
		if(UAuFqqbOpf != undefined && UAuFqqbOpf.length > 0){
			andizxc(UAuFqqbOpf).each(function(UAOUApMqar){
				andizxc(UAuFqqbOpf[UAOUApMqar].UAJqvvQYw).each(function(TUAj){
					andizxc(this)[0].addAttr({'aria-label':UAuFqqbOpf[UAOUApMqar].UAIokRsSZX,'UAdyatPaGndiInputdiscrp':UAuFqqbOpf[UAOUApMqar].UAIokRsSZX });
				});
			});
			andizxc('iframe').each(function(x){
				try {
					andizxc(UAuFqqbOpf).each(function(ANDIb){
						andizxc(this).contents().find(UAuFqqbOpf[ANDIb].UAJqvvQYw).each(function(TUAj){
							andizxc(this)[0].addAttr({'aria-label':UAuFqqbOpf[ANDIb].UAIokRsSZX,'UAdyatPaGndiInputdiscrp':UAuFqqbOpf[ANDIb].UAIokRsSZX });
						});
					});
				} catch(ANDIerr) {
					if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr);
				}
			});
		}
	}
	UA.activeKBRsupport = function(){
		function hideMessage(){
			andizxc('#andiKBRmessage').css('display','none');
			andizxc('#andiKBRmessage [role="button"]').attr({'tabindex':'-1'});
			andizxc('#UAkJmxzLip')[0].addAttr({'andiKBRmessage':'false'});
		}
		
		runactiveKBRfns = function(){
			UA.UADFJjGsG();
			UA.UARNNHrrv();			
		}
		
		runKBRfns = function(){
			if(localStorage.getItem('activeKBRsupport') != 'true'){
			andizxc('#UAkJmxzLip')[0].addAttr({'andiKBRmessage':'false'});
				hideMessage();
				runactiveKBRfns();
				localStorage.removeItem('noactiveKBRsupport');
				localStorage.setItem('activeKBRsupport','true');
			}
		}
		
		if( UA.andiAskkeybourdNav) {
			UA.UADFJjGsG();
			UA.UARNNHrrv();
			return false;
		}
		
		if(window.innerWidth > 700) {
			var isRtlLang = (document.querySelector('head').innerHTML.indexOf('UA2StyleSheetLTR') > -1) ?false:true;
			var isDIRok = false;
			var andiKBRmessageStyle = 'z-index:99999999999;	display:none; border-radius:5px; margin:10px;background-color: rgba(0, 0, 0, 0.65);height:75px;box-sizing:border-box;text-align:'+((isRtlLang)?'right':'left')+' ; width:360px;padding: 23px 20px 10px;;position:fixed;color:#fff !important ;bottom:0';
			var smallArrowStyle =  '';
			var ANDIclsBtnStyle = 'z-index:99999999999;	width: 25px;   position: absolute; top: 8px; '+((isRtlLang)?'left':'right')+': 7px;';
			andizxc('#wrapAndiIconOpenMenuBtn').append('<div aria-hidden="true" id="andiKBRmessage" style="'+andiKBRmessageStyle+'"><div style="'+smallArrowStyle+'"></div>'+UA.UAZItJSbXp.UAQWGbufJd2158+'<div  style="'+ANDIclsBtnStyle+'" aria-label="'+UA.UAZItJSbXp.UAQWGbufJd2159+'" id="ANDIclsBtn" role="button" tabindex="0">X</div></div>');
			if(parseInt(andizxc('#andiKBRmessage').css('right')) != 'NaN' && parseInt(andizxc('#andiKBRmessage').css('right')) < 40){
				andizxc('#andiKBRmessage').css('right','40px');
			}
			if(parseInt(andizxc('#andiKBRmessage').css('left')) != 'NaN' && parseInt(andizxc('#andiKBRmessage').css('left')) < 40){
				andizxc('#andiKBRmessage').css('left','40px');
			}
			eventOn('click','#activateKBRbyY',function (e){
				if(localStorage.getItem('activeKBRsupport') != 'true' ){
					hideMessage();
					runKBRfns();
				}
			});
			eventOn('keydown','#UAkJmxzLip',function (e){
				if(e.keyCode == 89){
					andizxc('#activateKBRbyY').click();
				}
			});
			eventOn('click','#ANDIclsBtn', function(e){
				andizxc('#andiKBRmessage').css('display','none');
				localStorage.removeItem('activeKBRsupport');
				localStorage.setItem('noactiveKBRsupport','true');
				setTimeout(function(){
					andizxc('#UAkJmxzLip')[0].addAttr({'andiKBRmessage':'false'});
				},100);
			});		
			eventOn('keydown','#ANDIclsBtn', function(e){
				if(  e.keyCode == 13 ){
					this.click();
				}
			});	
			
			if(localStorage.getItem('activeKBRsupport') == 'true' ){
				runactiveKBRfns();
			} else if(localStorage.getItem('noactiveKBRsupport') == 'true'){
				localStorage.removeItem('activeKBRsupport');
			} else {
				TABSarr = [];
				var myVar, confirmKBRuse;
				andizxc(document).on('keydown',function toovya(e){
					if(localStorage.getItem('noactiveKBRsupport')  != 'true' && localStorage.getItem('activeKBRsupport') != 'true'){
						if(  e.target.tagName != 'INPUT' && e.target.tagName != 'TEXTAREA' && e.target.tagName != 'SELECT' ){
							if(myVar != undefined) clearTimeout(myVar);
							if(e.keyCode == 89 && localStorage.getItem('activeKBRsupport') != 'true' ){
								if(confirmKBRuse != undefined) clearTimeout(confirmKBRuse);
								hideMessage();
								runKBRfns();
							}
							if(e.keyCode == 9 && localStorage.getItem('activeKBRsupport') != 'true' ){
								andizxc('#andiKBRmessage').css('display','inline-block');
								andizxc('#andiKBRmessage [role="button"]').attr({'tabindex':'0'});
								TABSarr.push('tab');
								if(TABSarr.length >= 3){
									if(localStorage.getItem('activeKBRsupport') != 'true' ){
										runKBRfns();
									}
								}
								myVar = setTimeout(function(){
									TABSarr.length = 0;
								}, 1000);
							} else {
								TABSarr.length = 0;
							}
						}
						
					}
				});
				
			}
		}
	}
	
	UA.fixHeading = function(){
		//var posibleHeading = [];
		var posibleHeadingSize = [];
		var basefontsize = localStorage.getItem('basefontsize');
		allElms = document.querySelectorAll('[andiallelmwithtext]');
		for(var i = 0;i < allElms.length; i++){
			var thsiElmfontsize = allElms[i].getAttribute('UAxtJoWmMs');
			if(thsiElmfontsize != 'null' &&  parseInt(thsiElmfontsize) > basefontsize){
				if( !posibleHeadingSize.contains(thsiElmfontsize) )
				posibleHeadingSize.push(parseInt(thsiElmfontsize));
			}
		}
		posibleHeadingSize.sort(function(a,b){
			return b - a;
		});
		var UAFiGxUmlP = posibleHeadingSize.length;
		var didntMarkAsHeading = 0;
		var posibleHeading = 0;
		function markHeading(elm){
			elm.setAttribute('role','heading');
			elm.setAttribute('aria-level',(i+2 <7 )?(i+2):'6');
		}
		for(var i = 0;i < UAFiGxUmlP; i++){
			allElms = document.querySelectorAll('[UAxtJoWmMs="'+posibleHeadingSize[i]+'"]');
			for(var j = 0;j < allElms.length; j++){
				posibleHeading++;
				var thisTagName = allElms[j].tagName.toLowerCase();
				var compareList = 'a input button h1 h2 h3 h4 h5 h6';
				var thisText = (allElms[j].innerText || allElms[j].textContent).trim();
				var numOfSpace = thisText.match(/([\s]+)/g);
				if(compareList.indexOf(thisTagName) == -1 && thisText.indexOf(' ') > -1 && !allElms[j].hasAttribute('[role]')){
					markHeading(allElms[j]);
				} else {
					var parentElm = allElms[j].parentElement;
					var thisParentText = (parentElm.innerText || parentElm.textContent).trim();
					if(compareList.indexOf(thisTagName) == -1 && thisParentText == thisText && compareList.indexOf(parentElm.tagName.toLowerCase()) == -1 && !allElms[j].hasAttribute('[role]') ){
						markHeading(allElms[j])
					} else if(compareList.indexOf(thisTagName) == -1 && numOfSpace != null && thisParentText.match(/([\s]+)/g) != null && ((numOfSpace.length)+1 == (thisParentText.match(/([\s]+)/g).length)) ){
						markHeading(allElms[j]);
					} else {
					}
				}
			}
		}
	} 
		
	UA.fixBreadcrumb = function(){
		(function(){
			var wrapBreadCrumbArr = [];
			andizxc('.breadcrumb, #breadcrumb ,.crumbs, #crumbs, [class*="breadcrumb"],[id*="breadcrumb"]').each(function(){
				var that = this;
				ANDIparentElm = andizxc(this);
				var isWrapAll = true;
				while (andizxc(ANDIparentElm)[0].tagName.toLowerCase() != 'body' && andizxc(ANDIparentElm)[0].tagName.toLowerCase() != 'html'){
					ANDIparentElm = andizxc(ANDIparentElm).parent();
					if((andizxc(ANDIparentElm).attr('class') != undefined && andizxc(ANDIparentElm).attr('class').indexOf('breadcrumb') > -1) ||(andizxc (ANDIparentElm).attr('id') != undefined && 									   				andizxc(ANDIparentElm).attr('id').indexOf('breadcrumb') > -1)){
						isWrapAll = false;
					}
				}
				if(isWrapAll){
					wrapBreadCrumbArr.push(that);
				}
			});
			var createText = function (arrOfElms){
				var tempText = '';
				for(var i = arrOfElms.length-1;i>=0; i-- ){
					if(andizxc(arrOfElms[i]).text().trim().length > 2){
						var elmText = andizxc(arrOfElms[i]).text().trim();
						if(tempText.indexOf(UA.UAZItJSbXp.UAHoTDcOreadcrumb1) == -1){
							andizxc(arrOfElms[i]).attr('aria-current','page')
							tempText = UA.UAZItJSbXp.UAHoTDcOreadcrumb1 + elmText + ' ';
						} else {
							if(andizxc(arrOfElms[i]).is('a').length > 0){
								andizxc(arrOfElms[i]).attr('aria-label',UA.UAZItJSbXp.UAHoTDcOreadcrumb2 + elmText);
							} else if(andizxc(arrOfElms[i]).find('a').length > 0){
								andizxc(arrOfElms[i]).find('a').attr('aria-label',UA.UAZItJSbXp.UAHoTDcOreadcrumb2 + elmText);
							}
							tempText = tempText + UA.UAZItJSbXp.UAHoTDcOreadcrumb3 + elmText + ' ';
						}
					}
				}
				return( tempText );
			}

			andizxc(wrapBreadCrumbArr).each(function(i){
				var that = this;
				if(andizxc(that)[0].children.length == 1){
					var wraptext = (andizxc(that)[0].children)
					if(wraptext.length == 1){
						var allElms = andizxc(wraptext)[0].children; 
						var allSentence = createText(allElms);
						andizxc(that).attr({'aria-label':allSentence,'tabindex':'0','role':'dialog'})
					}
				} else {
					var allElms = andizxc(that)[0].children; 
					var allSentence = createText(allElms);
					andizxc(that).attr({'aria-label':allSentence,'tabindex':'0','role':'dialog'});				}
			});
		})();
	}
	
	UA.fixBreadcrumb();
	
/************************************************************************/		
/************************************************************************/		
/************************************************************************/		
/************************************************************************/		
	andiRunAll = function(){
		setTimeout(function(){
			UA.createAutomaticAreas();
			UA.andi2findjsevents();
		},30);
		setTimeout(function(){
			UA.addCssFocusFromHOver();
			UA.UAsdHgt();
		},45);
		setTimeout(function(){
			UA.UAgDWyY (UA.UAnMQzxTy.UAuFqqbOpf);
			UA.UAGHxdLhH(UA.UAnMQzxTy.UAWlVCmtA.UAxjqWAi , UA.UAnMQzxTy.UAWlVCmtA.UARFqfQDBb);
		},60);
		setTimeout(function(){
			andizxc('iframe').each(function(){
				try {
					if(andizxc(this).attr('src') ){
						UASREei = andizxc(this).contents().find( UA.UAnMQzxTy.UAWlVCmtA.UAxjqWAi  );
						UA.UAXJkAW(UASREei);
					}
				} catch(ANDIerr) {
					if(UA.UAnMQzxTy.UAviliEOjq)console.log("Error: "+ANDIerr); 
				} 
			});
			UA.UAXJkAW(UA.UAnMQzxTy.UAWlVCmtA.UAxjqWAi);
		},80);
		setTimeout(function(){
			UA.UADpzBz(UA.UAnMQzxTy.UAZUahhNlt);
			UA.UAPUGuSi(UA.UAnMQzxTy.UAlXXpi);
			UA.UAzJEtVF();
			UA.fixHeading();
		},100);
		setTimeout(function(){
			UA.UALTydgWTc();
			
			UA.UABLEPlczZ();
			UA.UAAOjAFq();
			UA.UAHdTgZt_network(true);
		},120);
		setTimeout(function(){
			UA.UAnyKlUyp(UA.UAnMQzxTy.UArgljeM);
			UA.UATyJrfYR();
			UA.UAHBciEet();
		},145);
		setTimeout(function(){
			UA.UAlrbHm();
			UA.andiAskkeybourdNav = false;
			UA.activeKBRsupport();
		},170);
	}
	