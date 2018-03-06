
var UAModule = (function(){
var ANDIUAXhuOR = document.getElementById("andi2path");
if(window.location.href.indexOf("andicloud=true") > -1 || localStorage.getItem("andicloud") == "true"){
    localStorage.setItem("andicloud", "true");
      console.log("cloudmode");
	var ANDIUAXhuOR = document.getElementById("andi2path").src;
	if(ANDIUAXhuOR.indexOf('production.user-a.co.il') == -1){
		document.getElementById("andi2path").removeAttribute('id');	
		ANDIUAXhuOR = ANDIUAXhuOR.replace('//testua.user-a.co.il/' , '//production.user-a.co.il/');
		var script = document.createElement('script');
		script.src = ANDIUAXhuOR;
		script.id = 'andi2path';
		script.type = 'text/javascript';
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(script);
		return false;
	} else {
		checkIfDomReady();
	}
} else if (ANDIUAXhuOR.classList != undefined && ANDIUAXhuOR.classList != "" && ANDIUAXhuOR.classList.contains("anditestmode")) {
  console.log("anditestmode");
  if (window.location.href.indexOf("andi=1") > -1 || localStorage.getItem("andi") == "1") {
    localStorage.setItem("andi", "1");
    if (window.self == top) {
      checkIfDomReady();
    }
  }
} else if(  window.location.href.indexOf("andiqa=qa") > -1 || localStorage.getItem("andiqa") == "qa"    ){ 
    localStorage.setItem("andiqa", "qa");
    if(document.getElementById("andi2path").src.indexOf('QA') == -1){
    	 document.getElementById("andi2path").removeAttribute('id');
        UApMLobB = "//testua.user-a.co.il/Customers/_kabbalahmedia_info/QA";     
        var script = document.createElement('script');
		script.src = UApMLobB + '/andi2fn1.js';
		script.id = 'andi2path';
		script.type = 'text/javascript';
		var head = document.getElementsByTagName("head")[0];
		head.appendChild(script);
	    return false;	
	} else{
	    checkIfDomReady();
	}
    

} else{
  if (window.location.href.indexOf("andi2=debug") > -1 || localStorage.getItem("andi2") == "debug") {
    localStorage.setItem("andi2", "debug");
  } else {
    if (window.self == top) {
      checkIfDomReady();
    }
  }
}

function checkIfDomReady() {
  var interval = setInterval(function() {
    if (document.readyState === "complete") {
      clearInterval(interval);
      ANDIUAzmIjL();
    }
  }, 100);
};
	
function ANDIUAzmIjL(){
	/********************************************/
	UA = {};
	UA.ReloadtimesNumber = 0;
	UA.ANDIloadHelp = false;
	UA.stat = false;
	UA.andipro = true;	
	UA.UArnLht=function(d,c){if("function"!==typeof d)throw"Not a valid UAvDlNOqA";var a=document.createElement("script");a.onload=d;a.src=c;a.type="text/javascript";document.getElementsByTagName("head")[0].appendChild(a)};
	UA.url = 'https://user-a.co.il/';
	UA.UAnNzrTC = '2.0.5';
	UA.UAejCoVc = 750;
	UA.UAjuEbvS = true;
	ANDIUAXhuOR = document.getElementById('andi2path').src; //'//www.user-a.co.il/test_component/addonchrome/';
	UA.UApMLobB = ANDIUAXhuOR.replace('/andi2fn1.js', '');
	/*************************************/
	/*************************************/
	/*************************************/
		/**** JS native functions ****/
	/*if (localStorage && !localStorage.getItem('UAsizeLocalStorage')) {
		var i = 0;
		try {
			// Test up to 10 MB
			for (i = 250; i <= 10000; i += 250) {
				localStorage.setItem('test', new Array((i * 1024) + 1).join('a'));
			}
		} catch (e) {
			localStorage.removeItem('test');
			localStorage.setItem('UAsizeLocalStorage', i - 250);            
		}
	}*/
	localStorage.setItem('UAsizeLocalStorage', 4500);      
	UA.isStorageItemEx = function(UArQLDFw){
		if(localStorage.getItem(UArQLDFw) == null || localStorage.getItem(UArQLDFw) == 'null')return false;
		return true;
	};
	
	UA.localStorageSpace = function(allStrings){
        var allStrings = allStrings || '';
        for(var key in window.localStorage){
            if(window.localStorage.hasOwnProperty(key)){
                allStrings += window.localStorage[key];
            }
        }
        return allStrings ? 3 + ((allStrings.length*16)/(8*1024)) : 0;
    }
	JS = {};
	/*document.querySelectorAll = function ( elem ) {
		if(document.querySelectorAll( elem ) == null)
			return false;
		return document.querySelectorAll( elem );
	}*/

	/*

	document.querySelectorAll('CSS SELECTOR').forEach(function(el) {
	  // whatever with the current node
	});

	*/
	
	/*document.querySelector = function ( elem ) {
		/*if( document.querySelector( elem ) == null)
			return false;*//*
		return document.querySelector( elem );
	}*/
	
	live = function(selector,callback){
	  document.observe("click",function(e){
		var element = e.element()
		if (!element.match(selector))
		  element = element.ancestors().find(function(elem){return elem.match(selector)});
		else
		  element = null
		if (element)
		  callback.apply(element)
	  })
	}

	andiaddCss = function(elm, cssValues) {
		elm = document.querySelectorAll( elem );
		document.querySelectorAll(elm).forEach(function(el) {
			Object.keys(cssValues).forEach(function(attr) {
				var styleProp = attr.preperCssNameRole(), cssValue = cssValues[attr];
				el.style[styleProp] = cssValue;
			});
		});
		
	}
	Array.prototype.contains = function(obj) {
		var i = this.length;
		while (i--) {
			if (this[i] == obj) {
				return true;
			}
		}
		return false;
	}
	String.prototype.UAsVDzq = function (extension) {
		var UAQrgGLT = this.replace(/\\/g, '/');
		UAQrgGLT = UAQrgGLT.substring(UAQrgGLT.lastIndexOf('/') + 1);
		return extension ? UAQrgGLT.replace(/[?#].+$/, '') : UAQrgGLT.split('.')[0];
	}

	String.prototype.UAqSKWgPSK = function (extension) {
		var UAQrgGLT = this.replace(/\\/g, '/');
		UAQrgGLT = UAQrgGLT.substring(UAQrgGLT.lastIndexOf('/') + 1);
		return UAQrgGLT;
	}

	String.prototype.UAtwtaB = function(UAibOaCWT, UAgqlpz) {
		var str = this;
		UAibOaCWT = UAibOaCWT.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
		return str.replace(new RegExp(UAibOaCWT, 'gi'), UAgqlpz);
	};

	String.prototype.preperCssNameRole = function(){
		var str = this;
		str = str.UAtwtaB('-',' ').toLowerCase().replace( /(^|\s)([a-z])/g , function(m,p1,p2){ return p1+p2.toUpperCase();}); 
		str = str.charAt(0).toLowerCase() + str.slice(1);
		return str.UAtwtaB(' ','');
	}; 
	
	String.prototype.isSelectorValid = function(){
		var str = this;
		var dummy = document.createElement('br');
		try {
		  dummy.querySelector(str);
		} catch (e) {
		  return false;
		}
		return true;
	}; 

	NodeList.prototype.forEach = HTMLCollection.prototype.forEach = Array.prototype.forEach;
	
	if (!Element.prototype.matches)
		Element.prototype.matches = Element.prototype.msMatchesSelector || 
                                Element.prototype.webkitMatchesSelector;

	if (!Element.prototype.closest)
		Element.prototype.closest = function(s) {
			var el = this;
			var ancestor = this;
			if (!document.documentElement.contains(el)) return null;
			do {
				if (ancestor.matches(s)) return ancestor;
				ancestor = ancestor.parentElement;
			} while (ancestor !== null); 
			return null;
		};
	
	
	Element.prototype.removeAttr = function(attrName) {
		var that = this;
		attrName.split(' ');
		for(var UAOUApMqar = 0; UAOUApMqar < attrName.length; UAOUApMqar++){
			that.removeAttribute(attrName[UAOUApMqar]);
		}
		return that;
	}

	Element.prototype.addAttr = function(attrValues) {
		var that = this;
		Object.keys(attrValues).forEach(function(attr) {
			that.setAttribute(attr, attrValues[attr]);
		});
		return that;
	}

	Element.prototype.getAttr = function(attrName) {
		return this.getAttribute(attrName);
	}

	Element.prototype.getText = function() {
		return this.innerText || this.textContent;
	}

	Element.prototype.addCss = function(cssValues) {
		var that = this;
		Object.keys(cssValues).forEach(function(attr) {
			var styleProp = attr.preperCssNameRole(), cssValue = cssValues[attr];
			that.style[styleProp] = cssValue;
		});
		return that;
	}

	Element.prototype.getCss = function(cssValues) {
		return window.getComputedStyle(this, null).getPropertyValue(cssValues);
	}

	Element.prototype.removeElm = function() {
		this.parentNode.removeChild(this);
		return this;
	}
	
	Element.prototype.getHtml = function() {
		return this.innerHTML;
	}

	Element.prototype.setHtml = function( newHtml ) {
		this.innerHTML = newHtml;
		return this;
	}

	Element.prototype.appendHtml = function( newHtml ) {
		this.insertAdjacentHTML('beforeend', newHtml );
		return this;
	}

	Element.prototype.prependHtml = function( newHtml ) {
		this.insertAdjacentHTML('afterbegin', newHtml);
		return this;
	}
	
	Element.prototype.afterHtml = function( newHtml ) {
		this.insertAdjacentHTML('afterend', newHtml);
		return this;
	}
	
	Element.prototype.addAnimate = function( attrValues, times ) {
		var that = this;
		times = times || '1';
		times = ' ' +times+'s';
		Object.keys(attrValues).forEach(function(attr) {
			var styleProp = attr.preperCssNameRole(), cssValue = attrValues[attr];
			that.style[styleProp] = cssValue;
			that.style.transition = styleProp + times;
		});
		return that;
	}

	Element.prototype.addClass = function( classNames ) {
		this.classList.add(classNames);
		return this;
	}
	
	Element.prototype.removeClass = function( classNames ) {
		this.classList.remove(classNames);
		return this;
	}
	
	Element.prototype.hasClass = function(className) {
		return this.className && new RegExp("(^|\\s)" + className + "(\\s|$)").test(this.className);
	}
	
	/*function insertAfter(newNode, referenceNode) {
		referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
	}*/
	Element.prototype.insertAfter = function(newNode) {
		this.parentNode.insertBefore(newNode, this.nextSibling);
	}
	
	UA.sleep = function(milliseconds) {
	  var start = new Date().getTime();
	  for (var i = 0; i < 1e7; i++) {
		if ((new Date().getTime() - start) > milliseconds){
		  break;
		}
	  }
	}
	eventOn = function ( eventName, selector, fn) {
        var element = document.querySelector('body');
        element.addEventListener(eventName, function(event) {
            var possibleTargets = element.querySelectorAll(selector);
            var target = event.target;
            for (var i = 0, l = possibleTargets.length; i < l; i++) {
                var el = target;
                var p = possibleTargets[i];
                while(el && el !== element) {
                    if (el === p) {
                        return fn.call(p, event);
                    }
                    el = el.parentNode;
                }
            }
        });
    }

	/* add event */
	var addEvent = function(object, type, callback) {
		if (object == null || typeof(object) == 'undefined') return;
		if (object.addEventListener) {
			object.addEventListener(type, callback, false);
		} else if (object.attachEvent) {
			object.attachEvent("on" + type, callback);
		} else {
			object["on"+type] = callback;
		}
	};

	function getAllSiblings(elem, filter) {
		var sibs = [];
		elem = elem.parentNode.firstChild;
		do {
			if (elem.nodeType === 3) continue;
			if (!filter || filter(elem)) sibs.push(elem);
		} while (elem = elem.nextSibling)
		return sibs;
	}
	function getPreviousSiblings(elem, filter) {
		var sibs = [];
		while (elem = elem.previousSibling) {
			if (elem.nodeType === 3) continue;
			if (!filter || filter(elem)) sibs.push(elem);
		}
		return sibs;
	}
	function getNextSiblings(elem, filter) {
		var sibs = [];
		while (elem = elem.nextSibling) {
			if (elem.nodeType === 3) continue; // text node
			if (!filter || filter(elem)) sibs.push(elem);
		}
		return sibs;
	/**********************/
	}
	if (!Array.prototype.indexOf){
		Array.prototype.indexOf = function(searchValue, index) {
			var len = this.length >>> 0;
				index |= 0;              
			if (index < 0)             
				index = Math.max(len - index, 0);
			else if (index >= len) 
				return -1;
			if (searchValue === undefined)
			do {
				if (index in this && this[index] === undefined)
					return index;
			} while (++index !== len)
			else
				do {
					if (this[index] === searchValue)
						return index;
				} while (++index !== len)
			return -1;
		};
	}

	UA.loadjscssfile = function(UAsVDzq, UANBHSCMey) {
		if (UANBHSCMey == "js") {
			var ANDIfileref = document.createElement('script');
			ANDIfileref.setAttribute("type", "text/javascript");
			ANDIfileref.setAttribute("src", UAsVDzq);
		} else if (UANBHSCMey == "css") {
			var ANDIfileref = document.createElement("link");
			ANDIfileref.setAttribute("rel", "stylesheet");
			ANDIfileref.setAttribute("type", "text/css");
			ANDIfileref.setAttribute("href", UAsVDzq);
		}
		if (typeof ANDIfileref != "undefined") document.getElementsByTagName("head")[0].appendChild(ANDIfileref);

	}

	/**** End JS native functions ****/

	/*************************************/
	/*************************************/
	/*************************************/
	UA.UArnLht(function() {}, UAisSIGcL = (UA.UApMLobB + '/js/andi2BasicFuncions.js'));
	UA.UAfOaFZLV = setInterval(function(UAisSIGcL) {
	    if (UA.UANtvupGK) {
			if( localStorage.getItem('dontruninthissite') == 'true' ){
				var Text = document.querySelector('html').getAttr('lang')=='he'? 'לחץ להפעלה של אנדי באתר זה.': 'Click to run andi on this site';
				var html = '<div style="z-index: 99999999; text-align:right; background: rgb(0, 133, 186); position: fixed; height: 40px; top: 200px; left: 0px;" id="UAkJmxzLip" role="button" aria-label="'+Text+'" tabindex="0" andivalidation="true"><span></span><img alt="" src="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2235%22%20height%3D%2235%22%20viewBox%3D%220%200%2035%2035%22%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M24.1%2026.34L21.003%2019h-7.82l-.67-11.184c-.055-.956.674-1.66%201.63-1.715.96-.054%201.776.73%201.832%201.687l.48%208.213h6.818l2.71%206.216%201-.357c.9-.323%201.895.145%202.217%201.046s-.147%201.777-1.05%202.1L24.1%2026.34z%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M20.943%2014h-6.32c-.96%200-1.734-.78-1.734-1.5%200-.718.774-1.5%201.732-1.5h6.32c.958%200%201.735.782%201.735%201.5%200%20.72-.777%201.5-1.734%201.5z%22%2F%3E%3Ccircle%20fill%3D%22%23FFF%22%20cx%3D%2214.835%22%20cy%3D%226.336%22%20r%3D%222.835%22%2F%3E%3Cpath%20fill%3D%22%23FFF%22%20d%3D%22M21.37%2021.76c-.55%202.425-2.68%204.252-5.27%204.252-3.012%200-5.457-2.447-5.457-5.458%200-1.43.568-2.714%201.475-3.683l-.196-3.033-1.78-1.232c-.212-.144-.487-.12-.67.06L8.21%2013.928c-.18.178-.205.46-.06.667l1.313%201.9c-.42.687-.736%201.438-.93%202.24l-2.186.415c-.25.042-.347.26-.347.514v1.783c0%20.253.098.47.348.516l2.23.413c.19.803.485%201.555.906%202.24l-1.324%201.9c-.146.208-.124.49.054.668l1.26%201.26c.182.18.456.207.667.063l1.9-1.316c.686.422%201.435.74%202.237.933l.414%202.36c.045.247.263.517.516.517h1.784c.256%200%20.472-.27.517-.518l.41-2.314c.806-.192%201.557-.533%202.242-.955l1.898%201.305c.21.144.49.11.666-.067l.994-.99-2.347-5.7z%22%2F%3E%3C%2Fsvg%3E"></div>';
				document.querySelector('body').prependHtml(html);
				document.querySelector('#UAkJmxzLip').addEventListener("click", function(){
					if(confirm(document.querySelector('html').getAttr('lang')=='he'? 'הנגישות באתר זה בוטלה על ידך. האם תרצה להפעילה שוב ?': 'The accessibility in this site has been canceled by you. Would you like to enable it again?')){
						localStorage.removeItem('dontruninthissite');
						location.reload();
					}
				});
			} else {
				UAPnDWQsDc=function(d,c){var a=(d&65535)+(c&65535);return(d>>16)+(c>>16)+(a>>16)<<16|a&65535};UAXjTaDafE=function(d,c){return d<<c|d>>>32-c};UAgylZM=function(d,c,a,b,e,f){return UAPnDWQsDc(UAXjTaDafE(UAPnDWQsDc(UAPnDWQsDc(c,d),UAPnDWQsDc(b,f)),e),a)};UAGQAcvDcL=function(d,c,a,b,e,f,g){return UAgylZM(c&a|~c&b,d,c,e,f,g)};UAGoXjKU=function(d,c,a,b,e,f,g){return UAgylZM(c&b|a&~b,d,c,e,f,g)};
				UAkiaSM=function(d,c,a,b,e,f,g){return UAgylZM(c^a^b,d,c,e,f,g)};UACNyGCREH=function(d,c,a,b,e,f,g){return UAgylZM(a^(c|~b),d,c,e,f,g)};
				UAWyiptJKg=function(d){var c=1732584193,a=-271733879,b=-1732584194,e=271733878;for(UAOUApMqar=0;UAOUApMqar<d.length;UAOUApMqar+=16){var f=c,g=a,h=b,k=e;c=UAGQAcvDcL(c,a,b,e,d[UAOUApMqar+0],7,-680876936);e=UAGQAcvDcL(e,c,a,b,d[UAOUApMqar+1],12,-389564586);b=UAGQAcvDcL(b,e,c,a,d[UAOUApMqar+2],17,606105819);a=UAGQAcvDcL(a,b,e,c,d[UAOUApMqar+3],22,-1044525330);c=UAGQAcvDcL(c,a,b,e,d[UAOUApMqar+4],7,-176418897);e=UAGQAcvDcL(e,c,a,b,d[UAOUApMqar+5],12,1200080426);b=UAGQAcvDcL(b,e,c,a,d[UAOUApMqar+6],17,-1473231341);
				a=UAGQAcvDcL(a,b,e,c,d[UAOUApMqar+7],22,-45705983);c=UAGQAcvDcL(c,a,b,e,d[UAOUApMqar+8],7,1770035416);e=UAGQAcvDcL(e,c,a,b,d[UAOUApMqar+9],12,-1958414417);b=UAGQAcvDcL(b,e,c,a,d[UAOUApMqar+10],17,-42063);a=UAGQAcvDcL(a,b,e,c,d[UAOUApMqar+11],22,-1990404162);c=UAGQAcvDcL(c,a,b,e,d[UAOUApMqar+12],7,1804603682);e=UAGQAcvDcL(e,c,a,b,d[UAOUApMqar+13],12,-40341101);b=UAGQAcvDcL(b,e,c,a,d[UAOUApMqar+14],17,-1502002290);a=UAGQAcvDcL(a,b,e,c,d[UAOUApMqar+15],22,1236535329);c=UAGoXjKU(c,a,b,e,d[UAOUApMqar+1],5,-165796510);
				e=UAGoXjKU(e,c,a,b,d[UAOUApMqar+6],9,-1069501632);b=UAGoXjKU(b,e,c,a,d[UAOUApMqar+11],14,643717713);a=UAGoXjKU(a,b,e,c,d[UAOUApMqar+0],20,-373897302);c=UAGoXjKU(c,a,b,e,d[UAOUApMqar+5],5,-701558691);e=UAGoXjKU(e,c,a,b,d[UAOUApMqar+10],9,38016083);b=UAGoXjKU(b,e,c,a,d[UAOUApMqar+15],14,-660478335);a=UAGoXjKU(a,b,e,c,d[UAOUApMqar+4],20,-405537848);c=UAGoXjKU(c,a,b,e,d[UAOUApMqar+9],5,568446438);e=UAGoXjKU(e,c,a,b,d[UAOUApMqar+14],9,-1019803690);b=UAGoXjKU(b,e,c,a,d[UAOUApMqar+3],14,-187363961);
				a=UAGoXjKU(a,b,e,c,d[UAOUApMqar+8],20,1163531501);c=UAGoXjKU(c,a,b,e,d[UAOUApMqar+13],5,-1444681467);e=UAGoXjKU(e,c,a,b,d[UAOUApMqar+2],9,-51403784);b=UAGoXjKU(b,e,c,a,d[UAOUApMqar+7],14,1735328473);a=UAGoXjKU(a,b,e,c,d[UAOUApMqar+12],20,-1926607734);c=UAkiaSM(c,a,b,e,d[UAOUApMqar+5],4,-378558);e=UAkiaSM(e,c,a,b,d[UAOUApMqar+8],11,-2022574463);b=UAkiaSM(b,e,c,a,d[UAOUApMqar+11],16,1839030562);a=UAkiaSM(a,b,e,c,d[UAOUApMqar+14],23,-35309556);c=UAkiaSM(c,a,b,e,d[UAOUApMqar+1],4,-1530992060);
				e=UAkiaSM(e,c,a,b,d[UAOUApMqar+4],11,1272893353);b=UAkiaSM(b,e,c,a,d[UAOUApMqar+7],16,-155497632);a=UAkiaSM(a,b,e,c,d[UAOUApMqar+10],23,-1094730640);c=UAkiaSM(c,a,b,e,d[UAOUApMqar+13],4,681279174);e=UAkiaSM(e,c,a,b,d[UAOUApMqar+0],11,-358537222);b=UAkiaSM(b,e,c,a,d[UAOUApMqar+3],16,-722521979);a=UAkiaSM(a,b,e,c,d[UAOUApMqar+6],23,76029189);c=UAkiaSM(c,a,b,e,d[UAOUApMqar+9],4,-640364487);e=UAkiaSM(e,c,a,b,d[UAOUApMqar+12],11,-421815835);b=UAkiaSM(b,e,c,a,d[UAOUApMqar+15],16,530742520);
				a=UAkiaSM(a,b,e,c,d[UAOUApMqar+2],23,-995338651);c=UACNyGCREH(c,a,b,e,d[UAOUApMqar+0],6,-198630844);e=UACNyGCREH(e,c,a,b,d[UAOUApMqar+7],10,1126891415);b=UACNyGCREH(b,e,c,a,d[UAOUApMqar+14],15,-1416354905);a=UACNyGCREH(a,b,e,c,d[UAOUApMqar+5],21,-57434055);c=UACNyGCREH(c,a,b,e,d[UAOUApMqar+12],6,1700485571);e=UACNyGCREH(e,c,a,b,d[UAOUApMqar+3],10,-1894986606);b=UACNyGCREH(b,e,c,a,d[UAOUApMqar+10],15,-1051523);a=UACNyGCREH(a,b,e,c,d[UAOUApMqar+1],21,-2054922799);c=UACNyGCREH(c,a,b,e,d[UAOUApMqar+8],6,1873313359);
				e=UACNyGCREH(e,c,a,b,d[UAOUApMqar+15],10,-30611744);b=UACNyGCREH(b,e,c,a,d[UAOUApMqar+6],15,-1560198380);a=UACNyGCREH(a,b,e,c,d[UAOUApMqar+13],21,1309151649);c=UACNyGCREH(c,a,b,e,d[UAOUApMqar+4],6,-145523070);e=UACNyGCREH(e,c,a,b,d[UAOUApMqar+11],10,-1120210379);b=UACNyGCREH(b,e,c,a,d[UAOUApMqar+2],15,718787259);a=UACNyGCREH(a,b,e,c,d[UAOUApMqar+9],21,-343485551);c=UAPnDWQsDc(c,f);a=UAPnDWQsDc(a,g);b=UAPnDWQsDc(b,h);e=UAPnDWQsDc(e,k)}return[c,a,b,e]};
				UAtPInawA=function(d,c){var a=!1;andizxc(d).each(function(b){d[b]==c&&(a=!0)});return a};UAkHpzDIn=function(d){for(var c="",a=0;a<4*d.length;a++)c+="0123456789abcdef".charAt(d[a>>2]>>a%4*8+4&15)+"0123456789abcdef".charAt(d[a>>2]>>a%4*8&15);return c};UArPmjFF=function(d){for(var c="",a=0;a<32*d.length;a+=6)c+="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".charAt(d[a>>5]<<a%32&63|d[a>>6]>>32-a%32&63);return c};
				UAzzlcKxzA=function(d){for(var c=(d.length+8>>6)+1,a=Array(16*c),b=0;b<16*c;b++)a[b]=0;for(b=0;b<d.length;b++)a[b>>2]|=(d.charCodeAt(b)&255)<<b%4*8;a[b>>2]|=128<<b%4*8;a[16*c-2]=8*d.length;return a};UAiXjzQCdW=function(d){for(var c=(d.length+4>>5)+1,a=Array(16*c),b=0;b<16*c;b++)a[b]=0;for(b=0;b<d.length;b++)a[b>>1]|=d.charCodeAt(b)<<b%2*16;a[b>>1]|=128<<b%2*16;a[16*c-2]=16*d.length;return a};UAjDAatg={};UAdWDbGcCZ=function(d){return UAkHpzDIn(UAWyiptJKg(UAzzlcKxzA(d)))};
				UAyYGkAUtmGHRU=function(){for(var d=0,c=document.domain,a=c.split("."),b="_gd"+(new Date).getTime();d<a.length-1&&-1==document.cookie.indexOf(b+"="+b);)c=a.slice(-1-++d).join("."),document.cookie=b+"="+b+";domain="+c+";";document.cookie=b+"=;expires=Thu, 01 Jan 1970 00:00:01 GMT;domain="+c+";";return""}();UAbsWvCY=function(){UAuBvAU=new Date;var d=(UAuBvAU.getDate()+UAuBvAU.getFullYear()+UAuBvAU.getMonth()).toString();return UAdWDbGcCZ(d)};
				UAJTOCzfQG={UAGyaFDmOQ:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",UARjIOye:function(d){var c="",a=0;for(d=UAJTOCzfQG.UAjIgsO(d);a<d.length;){var b=d.charCodeAt(a++);var e=d.charCodeAt(a++);var f=d.charCodeAt(a++);var g=b>>2;b=(b&3)<<4|e>>4;var h=(e&15)<<2|f>>6;var k=f&63;isNaN(e)?h=k=64:isNaN(f)&&(k=64);c=c+this.UAGyaFDmOQ.charAt(g)+this.UAGyaFDmOQ.charAt(b)+this.UAGyaFDmOQ.charAt(h)+this.UAGyaFDmOQ.charAt(k)}return c},UAghFnjbNe:function(d){var c=
				"",a=0;for(d=d.replace(/[^A-Za-z0-9\+\/=]/g,"");a<d.length;){var b=this.UAGyaFDmOQ.indexOf(d.charAt(a++));var e=this.UAGyaFDmOQ.indexOf(d.charAt(a++));var f=this.UAGyaFDmOQ.indexOf(d.charAt(a++));var g=this.UAGyaFDmOQ.indexOf(d.charAt(a++));b=b<<2|e>>4;e=(e&15)<<4|f>>2;var h=(f&3)<<6|g;c+=String.fromCharCode(b);64!=f&&(c+=String.fromCharCode(e));64!=g&&(c+=String.fromCharCode(h))}return c=UAJTOCzfQG.UAkxWUvsX(c)},UAjIgsO:function(d){d=d.replace(/\r\n/g,
				"\n");for(var c="",a=0;a<d.length;a++){var b=d.charCodeAt(a);128>b?c+=String.fromCharCode(b):(127<b&&2048>b?c+=String.fromCharCode(b>>6|192):(c+=String.fromCharCode(b>>12|224),c+=String.fromCharCode(b>>6&63|128)),c+=String.fromCharCode(b&63|128))}return c},UAkxWUvsX:function(d){var c="",a=0;for(UAHsvOSgD=UAEfdpKx=0;a<d.length;){var b=d.charCodeAt(a);128>b?(c+=String.fromCharCode(b),a++):191<b&&224>b?(UAEfdpKx=d.charCodeAt(a+1),c+=String.fromCharCode((b&31)<<6|UAEfdpKx&63),a+=2):
				(UAEfdpKx=d.charCodeAt(a+1),UAzLKTSSh=d.charCodeAt(a+2),c+=String.fromCharCode((b&15)<<12|(UAEfdpKx&63)<<6|UAzLKTSSh&63),a+=3)}return c}};
				UA.UAhDDCFL = function(UAYdOPSR) {
					document.querySelector('body').appendHtml('<span class="UAISZqe" role="alert" aria-label="' + UAYdOPSR + '"></span>');
					setTimeout(function() {
						document.querySelectorAll('.UAISZqe').forEach(function(el) {
							el.removeElm();
						});
						
					}, 1500);
				};
				var aaaa = document.querySelector('html').getAttr('lang');
				if (aaaa == 'en') {
					var UAWcnrdStu = 'Starts loading accessibility';
					var UAxGobL = 'Loading data from server';
					var UAaLsgmTsZ = 'Starts Making your request';
					var UAuDvuda = 'The accessibility add-on could not be loaded for this site because the publisher blocked this option. You can contact the site owner and request UAQDRraCvn the accessibility add-on be enabled on their site. UA will be happy to assist the site owner in this matter.';
				} else if (document.querySelector('html').getAttr('lang') == 'he') {
					var UAWcnrdStu = 'מתחיל לטעון את הננגשה לאתר';
					var UAxGobL = 'טוען מידע מהשרת';
					var UAaLsgmTsZ = 'מבצע את בקשתך';
					var UAuDvuda = 'לא ניתן לטעון את רכיב הנגישות מאחת הסיבות הבאות <br/>' +
						'1. בעיה בטעינת הרכיב - נסה לטעון מחדש את הדף.<br/>' +
						'2. בעל האתר חסם אפשרות זו בשל שיקולי אבטחה.<br/>' +
						'<br/>' +
						'במידה והבעיה חוזרת, בבקשה צור איתנו קשר במייל: info@user-a.co.il' +
						'עם הפרטים הבאים:<br/> כתובת האתר, שמך וכיצד ניתן לצור עמך קשר כדי לעדכנך בהמשך הטיפול.' +
						'תודה רבה מראש.<br/>' +
						'צוות UA.<br/>';
				} else {
					var UAWcnrdStu = 'Starts loading accessibility';
					var UAxGobL = 'Loading data from server';
					var UAaLsgmTsZ = 'Starts Making your request';
					var UAuDvuda = 'The accessibility add-on could not be loaded for this site because the publisher blocked this option. You can contact the site owner and request UAQDRraCvn the accessibility add-on be enabled on their site. UA will be happy to assist the site owner in this matter.';
				}
				var andiHtmlLang = document.querySelector('html').getAttr('lang');
				var andiHtmlDirection = document.querySelector('body').getCss('direction');
				var UAcLzksO = '<style>\
				#UAhzYETrC {\
				-webkit-box-shadow: 0px 0px 2px 0px rgba(50, 50, 50, 0.75); \
				-moz-box-shadow:0px 0px 2px 0px rgba(50, 50, 50, 0.75); \
				box-shadow: 0px 0px 2px 0px rgba(50, 50, 50, 0.75);\
				background-color:#fff;\
				position:fixed;\
				width:50px;\
				height:auto;\
				top:50%;\
				left:' + ((andiHtmlDirection == 'rtl') ? '100%' : '0') + ';\
				z-index:999999999999999;\
				text-align:center;\
				background-color:#fff;\
				}\
				</style>\
				<div style="" firsttime="true" id="UAhzYETrC"  tabindex="0" aria-label="' + UAWcnrdStu + '" role="dialog">\
				<img src="' + UA.UApMLobB + '/images/load2.gif" alt="" style="width:60px;height:60px;"/><br/>\
				</div>';
				document.querySelector('body').prependHtml(UAcLzksO);

				setTimeout(function() {
					if (document.querySelector('#UAhzYETrC[firsttime]') != null) {
						UA.UAhDDCFL(UAuDvuda);
						document.querySelector('#UAhzYETrC[firsttime]').addCss({
							'font-size': '14px',
							'height': 'auto',
							'width': '100%',
							'padding': '5px'
						})
						document.querySelector('#UAhzYETrC[firsttime]').textContent = (UAuDvuda);
						var andiH = document.querySelector('#UAhzYETrC[firsttime]').getCss('height');
						document.querySelector('#UAhzYETrC[firsttime]').addCss({
							'top': 'calc(100% - ' + (andiH + 10) + 'px)',
						});
						setTimeout(function() {
							document.querySelector('#UAhzYETrC[firsttime]').removeElm();
						}, 7000);
					}
				}, 60000);
					UA.UAhzYETrC = function() {
						document.querySelector('#UAndNxT').prependHtml('<div id="UAoVmehT" ></div>\
						<div id="UANPSwV" tabindex="0" role="dialog" style="z-index=999999999999;text-align:center;" aria-label="' + UAxGobL + '" >\
						<div style="" id="UAhzYETrC">\
						<img src="' + UA.UApMLobB + '/images/load2.gif" alt="" style="margin: 0 auto; width:150;height:150px;"/><br/>\
						<span aria-hidden="true">' + UAxGobL + '</span>\
						</div></div>');
						UA.UAhDDCFL(UAxGobL);
					}
					UA.UAhDDCFL(UAWcnrdStu);
					clearInterval(UA.UAfOaFZLV);
					UAxqSWFrlI = ['421aa90e079fa326b6494f812ad13e79', '','43106670bff69e6b897f098c90044914'];
					UAJxUjW = UAbsWvCY();
					UA2ab = (UAyYGkAUtmGHRU);
					if (UAtPInawA(UAxqSWFrlI, UA2ab)) {
						var UANtvupGK = setInterval(function(UAisSIGcL) {
							if (UA.UANtvupGK != undefined) {
								clearInterval(UANtvupGK);
								UA.UAbarNrArQ = function() {
									var UANRzedPTl = UANRzedPTl || '';

									UAAxtLi = localStorage.getItem("UAibxdvIR");
										var UAoxHBWTi = undefined;
										UA.countWorsInHebrew = 0,
										UA.countWorsInArabic = 0,
										UA.countWorsInEnglish = 0,
										UA.countWorsInRussian = 0;
										UA.WorsInHebrew = [],
										UA.WorsInArabic = [],
										UA.WorsInEnglish = [],
										UA.WorsInRussian = [];
										UA.AcronymsHeb = [];
										UA.AcronymsEng = [];
										ANDIavrTextAmount = 0, ANDIavrText = 0;
										var n, a = [],
											walk = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
										while (n = walk.nextNode()) {
											var ANDIelm = n.parentNode;

											var elmText = n.data.trim();
											if (elmText !== '' && ANDIelm.tagName !== 'NOSCRIPT' && ANDIelm.tagName !== 'SCRIPT' && ANDIelm.tagName !== 'STYLE' && ANDIelm.tagName !== 'HEAD' && ANDIelm.tagName !== 'META' && ANDIelm.tagName !== 'LINK') {

												ANDIelm.setAttribute('andiAllElmWithText', 'true');
												var UAfSIATsD = parseInt(window.getComputedStyle(ANDIelm, null).getPropertyValue('font-size'));
												var UAJqvvQYwWhiteSpace = (window.getComputedStyle(ANDIelm, null).getPropertyValue('white-space'));
												var UAJqvvQYwlineHeight = (window.getComputedStyle(ANDIelm, null).getPropertyValue('line-height'));
												ANDIelm.setAttribute('UAxtJoWmMs', UAfSIATsD);
												ANDIelm.setAttribute('UAqJsNschiteSpace', UAJqvvQYwWhiteSpace);
												ANDIelm.setAttribute('UAIBEfQineHeight', UAJqvvQYwlineHeight);
												if (ANDIelm.hasAttribute('style'))
													ANDIelm.setAttribute('andisaveStyle', ANDIelm.style.cssText)
												ANDIavrText += UAfSIATsD;
												ANDIavrTextAmount++;
												var thatElm = ANDIelm;
												var elmTextArray = elmText.split(" ");
												for (var a = 0; a < elmTextArray.length; a++) {
													var word = elmTextArray[a];
													if (UA.UAptUJCD(word)) {
														UA.WorsInArabic.push(word);
														UA.countWorsInArabic++;
													} else {
														if (UA.UACgRPH(word)) {
															UA.WorsInHebrew.push(word);
															if((word.indexOf('"') > 0 && word.indexOf('"') < (word.length-1) )|| word.indexOf("'") > -1){
																UA.AcronymsHeb.push(word);
															}
															UA.countWorsInHebrew++;
														} else {
															if (UA.UAXFsUG(word)) {
																UA.WorsInEnglish.push(word);
																if (UA.UABEozjNPB(word) && word.length > 2) {
																	UA.AcronymsEng.push(word);
																	ANDIelm.setAttribute("andiUpper", "true");
																}
																UA.countWorsInEnglish++;
															} else {
																if (UA.UAuEcxq(word)) {
																	UA.WorsInRussian.push(word);
																	UA.countWorsInRussian++;
																}
															}
														}
													}
												}
											}
										}
										localStorage.setItem('basefontsize', ANDIavrText / ANDIavrTextAmount);
										var allWords = UA.countWorsInHebrew + UA.countWorsInArabic + UA.countWorsInEnglish + UA.countWorsInRussian;
										var avrageWordHeb = UA.countWorsInHebrew / allWords * 100;
										var avrageWordAr = UA.countWorsInArabic / allWords * 100;
										var avrageWordEng = UA.countWorsInEnglish / allWords * 100;
										var avrageWordRus = UA.countWorsInRussian / allWords * 100;
										var arrLang = [avrageWordHeb, avrageWordAr, avrageWordEng, avrageWordRus];
										var arrLangName = ["he", "ar", "en", "ru"];
										UAgKhxoD = arrLangName[arrLang.indexOf(UA.UAZyrYAiv(arrLang))];
									if (UAoxHBWTi != undefined && UAoxHBWTi.indexOf(UAgKhxoD) > -1) {
										UAoxHBWTi = UAgKhxoD;
									}
									if (UAoxHBWTi == undefined || UAoxHBWTi == "") {
										if (UAgKhxoD == undefined || UAgKhxoD == "") {
											UAoxHBWTi = "en";
										} else {
											UAoxHBWTi = UAgKhxoD;
										}
									}
									UAAxtLi = localStorage.getItem("UAibxdvIR");
									if (UAAxtLi !== null) {
										UAoxHBWTi = UAAxtLi;
										UAgKhxoD = UAAxtLi;
									}
									var andiHTMLelm = document.querySelector('html');
									if (UAoxHBWTi.toLowerCase().indexOf("he") >= 0) {
										UAoxHBWTi = "he";
										andiHTMLelm.setAttribute("andiDirection", "rtl");
										andiHTMLelm.setAttribute("andilang", "he");
										if(!andiHTMLelm.hasAttribute('lang'))andiHTMLelm.setAttribute("lang", "he");

									} 
									if (UAoxHBWTi.toLowerCase().indexOf("ar") >= 0) {
										UAoxHBWTi = "ar";
										andiHTMLelm.setAttribute("andiDirection", "rtl");
										andiHTMLelm.setAttribute("andilang", "ar");
										if(!andiHTMLelm.hasAttribute('lang'))andiHTMLelm.setAttribute("lang", "ar");
									}
									if (UAoxHBWTi.toLowerCase().indexOf("en") >= 0) {
										UAoxHBWTi = "en";
										andiHTMLelm.setAttribute("andiDirection", "ltr");
										andiHTMLelm.setAttribute("andilang", "en");
										if(!andiHTMLelm.hasAttribute('lang'))andiHTMLelm.setAttribute("lang", "en");

									}
									console.log(UAoxHBWTi)
									UA.UAoxHBWTi = UAoxHBWTi;
								};
								UA.UAbarNrArQ();

								UAKrvyf = function() {
									if (UA.UAoxHBWTi == 'he') {
										UA.andidirection = ('rtl')
										UA.UArnLht(function() {}, UAisSIGcL = (UA.UApMLobB + '/js/andi2hebSetting.js'));
										UA.UArnLht(function() {}, UAisSIGcL = (UA.UApMLobB + '/js/andi2heb.js'));
										UA.loadjscssfile(UA.UApMLobB + '/css/andiUA2StyleSheetRTL.css', "css");
									} else if (UA.UAoxHBWTi == 'ar') {
										UA.andidirection = ('rtl')
										UA.UArnLht(function() {}, UAisSIGcL = (UA.UApMLobB + '/js/andi2arabSetting.js'));
										UA.UArnLht(function() {}, UAisSIGcL = (UA.UApMLobB + '/js/andi2arab.js'));
										UA.loadjscssfile(UA.UApMLobB + '/css/andiUA2StyleSheetRTL.css', "css");
									} else {
										UA.andidirection = ('ltr')
										UA.UArnLht(function() {}, UAisSIGcL = (UA.UApMLobB + '/js/andi2enSetting.js'));
										UA.UArnLht(function() {}, UAisSIGcL = (UA.UApMLobB + '/js/andi2en.js'));
										UA.loadjscssfile(UA.UApMLobB + '/css/andiUA2StyleSheetLTR.css', "css");
									}
								}
								UAKrvyf();
								document.querySelectorAll("[style]:not(#UAndNxT)").forEach(function(el) {
									el.setAttribute('andisaveStyle',el.getAttribute('Style'));
								});
								var UAQfNVaLZB = setInterval(function(UAisSIGcL) {
									if (typeof(UA.UALKtax) == 'function' && typeof(UA.UAnMQzxTy) == "object") {
										clearInterval(UAQfNVaLZB);
										UA.UArnLht(function() {}, UAisSIGcL = (UA.UApMLobB + "/js/andi2Funcions.js"));
									}
								}, 200);
							}
						}, 200);
					}
				}
	
			}
		}, UA.UAejCoVc);
}
})();