/* =====================
| BAPS.JS - return baps about the user's environment
| Detects:
|	@browser
|	@browser_version
|	@platform
|	@cookiesEnabled
|	@language
|	...plus key plugin info
|
| Re: language, not always clear what this is the language of. Browsers are inconsistent in how they expose language. Browsers
| variously expose browser language, system language and user language.
|
| For browser, it returns the string 'Opera', 'IE', 'Firefox', 'Safari' or 'Chrome'
|
| Plugin detection is a case of IE vs. the rest; IE deals with plugins through ActiveX, while other browsers expose plugin info
| through navigator.plugins
===================== */

(function() {


	/* ----------------------
	| PREP inc. cross-browser properties
	---------------------- */

	baps = {}
	var apVer = navigator.appVersion, apName = navigator.appName, plugs = navigator.plugins;
	baps.cookiesEnabled = navigator.cookieEnabled;
	baps.platform = navigator.platform;


	/* ----------------------
	| OPERA (yay!)
	---------------------- */

	if (apName == 'Opera') {
		baps.browser = 'Opera';
		baps.language = navigator.userLanguage;
		temp = navigator.userAgent.match(/Version\/([\d\.]+)/);
		if (temp) baps.browserVer = temp[1];

	/* ----------------------
	| IE (boo)
	---------------------- */

	} else if (apName == 'Microsoft Internet Explorer') {
		var ie = true;
		baps.browser = 'IE';
		baps.language = navigator.userLanguage;
		var temp = apVer.match(/MSIE ([\d\.]+)/);
		if (temp) baps.browserVer = temp[1];


	/* ----------------------
	| CHROME/SAFARI (boo)
	---------------------- */

	} else if (apVer.indexOf('WebKit') != -1) {
		baps.browser = apVer.indexOf('Chrome') != -1 ? 'Chrome' : 'Safari';
		baps.language = navigator.language;
		var temp = apVer.match(/(Chrome|Version)\/([\d\.]+)/);
		if (temp) baps.browserVer = temp[2];


	/* ----------------------
	| FIREFOX (boo)
	---------------------- */

	} else if (apName == 'Netscape') {
		baps.browser = 'Firefox';
		baps.language = navigator.language;
		var temp = navigator.userAgent.match(/Firefox\/([\d\.]+)/);
		if (temp) baps.browserVer = temp[1];
	}


	/* ----------------------
	| PLUGINS
	---------------------- */

	//NON-IE

	if (!ie) {

		//Flash
		var flash = plugs['Shockwave Flash'];
		if (flash) {
			flash_ver = flash.description.match(/[\d\.]+/);
			baps.flash = flash_ver ? flash_ver[0] : 'installed (version unknown)';
		}

		//QuickTime
		var quickTime = (function() { for (var i in plugs) if (/^QuickTime/.test(plugs[i].name)) return plugs[i]; })();
		if (quickTime) {
			quickTime_ver = quickTime.name.match(/[\d\.]+/);
			baps.quickTime = quickTime_ver ? quickTime_ver[0] : 'installed (version unknown)';
		}

		//Windows Media
		var wmp = (function() { for (var i in plugs) if (plugs[i].description == 'np-mswmp') return plugs[i]; })();
		if (wmp) baps.wmp = 'installed (version unknown)';


	//IE (ACTIVEX)

	} else {

		//Flash
		var quicktime;
		try { flash = new ActiveXObject('ShockwaveFlash.ShockwaveFlash'); } catch(e) {}
		if (flash) {
			var flash_ver = flash.GetVariable('$version');
			baps.flash = flash_ver ? flash_ver : 'installed (version unknown)';
		}

		//QuickTime
		var quicktime;
		try { quickTime = new ActiveXObject('QuickTime.QuickTime'); } catch(e) {}
		if (quickTime) {
			quickTime = 'installed (version unknown)';
			var quickTime_ver = new ActiveXObject('QuickTimeCheckObject.QuickTimeCheck');
			if (quickTime_ver) {
				quickTime = quickTime_ver.QuickTimeVersion.toString();
				quickTime = quickTime.substr(0, 1)+'.'+quickTime.substring(1, 3);
			}
			baps.quickTime = quickTime;
		}

		//Windows Media
		var wmp;
		try { wmp = new ActiveXObject('WMPlayer.OCX'); } catch(e) {}
		if (wmp) baps.wmp = wmp.versionInfo;
	}

})()