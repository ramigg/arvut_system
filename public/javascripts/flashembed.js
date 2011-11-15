
/**
 * flashembed 0.27. Adobe Flash embedding script
 * 
 * http://flowplayer.org/player/flash-embed.html
 *
 * Copyright (c) 2008 Tero Piirainen (tero@flowplayer.org)
 *
 * Released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * >> Basically you can do anything you want but leave this header as is <<
 *
 * Version: 0.10 - 03/11/2008
 * Version: 0.20 - 03/20/2008
 * Version: 0.25 - 03/29/2008
 * Version: 0.26 - 04/06/2008 
 * Version: 0.27 - 04/12/2008 
 */
function flashembed(root, userParams, flashvars) {
	
	if (typeof root == 'string') root = document.getElementById(root);
	
	// setup params
	var params = {
		
		// very common params
		src: '#',
		width: '100%',
		height: '100%',		
		
		// flashembed specific options
		version:null,  
		loadEvent:null,
		onFail:null,
		expressInstall:null,  
		
		// flashembed defaults
		allowfullscreen: true,
		allowscriptaccess: 'always',
		quality: 'high',
		bgcolor: '#ffffff',
		type: 'application/x-shockwave-flash',
		pluginspage: 'http://www.adobe.com/go/getflashplayer'
	};
	
	extend(params, userParams);	

	var evt = params.loadEvent;
	params.loadEvent = null;
		
	// setup "lazy loading"
	if (evt) {
		root['on' + evt] = function() {
			return load();
		}; 
		
	// normal loading upon startup. handle to the generated flash object is returned
	} else {
		return load();		
	}
	
	// override extend params function 
	function extend(to, from) {
		if (from) {
			for (key in from) {
				to[key] = from[key];	
			}
		}
	}	
 
	function load() {
		
		var version = getVersion(); 
		var required = params.version; 
		var express = params.expressInstall;		 
		
		if (!root) return;
		
		// is supported
		if (!required || isSupported(required)) {
			params.onFail = params.version = params.expressInstall = null; 
			root.innerHTML = getHTML();	
			
			// return our
			return root.firstChild;
			
		// custom fail event
		} else if (params.onFail) {
			var ret = params.onFail.call(params, getVersion(), flashvars);
			if (ret) root.innerHTML = ret;		
			

		// express install
		} else if (required && express && isSupported([6,0,65])) {
			
			extend(params, {src: express});
			
			flashvars =   {
				MMredirectURL: location.href,
				MMplayerType: 'PlugIn',
				MMdoctitle: document.title
			};
			
			root.innerHTML = getHTML();	
			
		// not supported
		} else {

			// minor bug fixed here 08.04.2008 (thanks JRodman)
			if (root.innerHTML != '') {
				// custom content was supplied
			
			} else {
				root.innerHTML = 
					"<h2>Flash version " + required + " or greater is required</h2>" + 
					"<h3>" + (version[0] > 0 ? 
						"Your version is " + version : "You have no flash plugin installed") +
					"</h3>" + 
					"<p>Download latest version from <a href='" + params.pluginspage + "'>here</a></p>"
				;
			}
		} 
		root['on' + evt] = null; 
		
	}
	
	
	function isSupported(version) {
		var now = getVersion();
		return now[0] >= version[0] && now[1] >= version[1] && (now[2] == null || now[2] >= version[2]);				 
	}
	
	
	function getHTML() {
		
		var html = "";
		if (typeof flashvars == 'function') flashvars = flashvars();
		
		
		// mozilla
		if (navigator.plugins && navigator.mimeTypes && navigator.mimeTypes.length) {  

			html = '<embed type="application/x-shockwave-flash" ';

			extend(params, {name:params.id});
			
			for(var key in params) { 
				if (params[key] != null) 
					html += [key] + '="' +params[key]+ '"\n\t'; 
			}  
			
			if (flashvars) {
				html += 'flashvars=\'';
				for(var key in flashvars) { 
					html += [key] + '=' + asString(flashvars[key]) + '&'; 
				}			
				html += '\'';
			}
			
			html += '/>';
			
		// ie
		} else { 

			html = '<object classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" ';
			html += 'width="' + params.width + '" height="' + params.height + '"'; 
			
			// IE Hack: setup pseudo id for IE 6. otherwise we cannot return our embedded Flash object
			if (document.all && parseInt(navigator.appVersion) <= 6) {
				params.id = "_" + ("" + Math.random()).substring(5);
			} 
			if (params.id) html += ' id="' + params.id + '"'; 
			
			html += '>';  
			html += '\n\t<param name="movie" value="'+ params.src +'" />';
			
			params.id = params.src = params.width = params.height = null;
			
			for (var key in params) {
				if (params[key] != null) 
					html += '\n\t<param name="'+ key +'" value="'+ params[key] +'" />';
			}
			
			if (flashvars) {
				html += '\n\t<param name="flashvars" value=\'';
				for(var key in flashvars) { 
					html += [key] + '=' + asString(flashvars[key]) + '&'; 
				}			
				html += '\' />';
			}
			 
			html += "</object>"; 
		}

		return html;
	}
	

	// arr[major, minor, fix]
	function getVersion() {

		var version = [0, 0];
		
		if (navigator.plugins && typeof navigator.plugins["Shockwave Flash"] == "object") {
			var _d = navigator.plugins["Shockwave Flash"].description;
			if (typeof _d != "undefined") {
				_d = _d.replace(/^.*\s+(\S+\s+\S+$)/, "$1");
				var _m = parseInt(_d.replace(/^(.*)\..*$/, "$1"), 10);
				var _r = /r/.test(_d) ? parseInt(_d.replace(/^.*r(.*)$/, "$1"), 10) : 0;
				version = [_m, _r];
			}
			
		} else if (window.ActiveXObject) {
			
			try { // avoid fp 6 crashes
				var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
				
			} catch(e) {
				try { 
					var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
					version = [6, 0];
					_a.AllowScriptAccess = "always"; // throws if fp < 6.47 
					
				} catch(e) {
					if (version[0] == 6) return;
				}
				try {
					var _a = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
				} catch(e) {
				
				}
				
			}
			
			if (typeof _a == "object") {
				var _d = _a.GetVariable("$version"); // bugs in fp 6.21 / 6.23
				if (typeof _d != "undefined") {
					_d = _d.replace(/^\S+\s+(.*)$/, "$1").split(",");
					version = [parseInt(_d[0], 10), parseInt(_d[2], 10)];
				}
			}
		} 
		
		return version;
	}
	
	
	// JSON.asString() function
	function asString(obj) {
		
		switch (typeOf(obj)){
			case 'string':
				return '"'+obj.replace(new RegExp('(["\\\\])', 'g'), '\\$1')+'"';
			case 'array':
				
				return '['+ map(obj, function(el) {
					return asString(el);
				}).join(',') +']';
				
				
			case 'object':
				var str = [];
				for (var property in obj) {
					
					str.push('"'+property+'":'+ asString(obj[property])); 
				}
				return '{'+str.join(',')+'}';
		}
		
		// replace ' --> "  and remove spaces
		return String(obj)
			.replace(/\s/g, " ")
			.replace(/\'/g, "\"");
	}
	
	
	// private functions
	function typeOf(obj){
		if (obj === null || obj === undefined) return false;
		var type = typeof obj;
		return (type == 'object' && obj.push) ? 'array' : type;
	}
	
	
	// version 9 bugfix: (http://blog.deconcept.com/2006/07/28/swfobject-143-released/)
	if (window.attachEvent) {
		window.attachEvent("onbeforeunload", function(){
			__flash_unloadHandler = function() {};
			__flash_savedUnloadHandler = function() {};
		});
	}
	
	function map(arr, func) {
	  var newArr = []; 
	  for (var i in arr) {
		 newArr[i] = func(arr[i]);
	  }
	  return newArr;
	}
	
	// expose as static method
	flashembed.getVersion = getVersion;
	flashembed.isSupported = isSupported; 

	return root;
}



// setup jquery support
if (typeof jQuery == 'function') {
	
	(function($) { 
		$.fn.extend({
			flashembed: function(params, flashvars) {  
				return this.each(function() { 
					new flashembed(this, params, flashvars);
				});
			}		
		}); 
	})(jQuery);
}


