// JavaScript Document
/***********************************************
* Universal Countdown script- © Dynamic Drive (http://www.dynamicdrive.com)
* This notice MUST stay intact for legal use
* Visit http://www.dynamicdrive.com/ for this script and 100s more.
***********************************************/

function cdLocalTime(container, servertime, offsetMinutes, targetdate, prefix, suffix, debugmode){
  if (!document.getElementById || !document.getElementById(container)) return;
  this.container = document.getElementById(container);
  this.localtime = this.serverdate = new Date(servertime);
  this.targetdate = new Date(targetdate);
  this.prefix = prefix;
  this.suffix = suffix;
  this.debugmode = (typeof debugmode != "undefined") ? 1 : 0;
  this.timesup = false;
  this.localtime.setTime(this.serverdate.getTime() + offsetMinutes * 60 * 1000); //add user offset to server time
  this.updateTime();
}

cdLocalTime.prototype.updateTime = function(){
  var thisobj = this;
  this.localtime.setSeconds(this.localtime.getSeconds() + 1);
  setTimeout(function(){thisobj.updateTime()}, 1000); //update time every second
}

cdLocalTime.prototype.displaycountdown = function(baseunit, functionref){
  this.baseunit = baseunit;
  this.formatresults = functionref;
  this.showresults();
}

cdLocalTime.prototype.showresults = function(){
  var thisobj = this
  var debugstring = (this.debugmode)? "<p style=\"background-color: #FCD6D6; color: black; padding: 5px\"><big>Debug Mode on!</big><br /><b>Current Local time:</b> "+this.localtime.toLocaleString()+"<br />Verify this is the correct current local time, in other words, time zone of count down date.<br /><br /><b>Target Time:</b> "+this.targetdate.toLocaleString()+"<br />Verify this is the date/time you wish to count down to (should be a future date).</p>" : ""

  var timediff = (this.targetdate - this.localtime)/1000; //difference btw target date and current date, in seconds
  if (timediff < 0){ //if time is up
    this.timesup = true;
    this.container.innerHTML = debugstring+this.formatresults();
    return;
  }
  var oneMinute = 60; //minute unit in seconds
  var oneHour = 60*60; //hour unit in seconds
  var oneDay = 60*60*24; //day unit in seconds
  var dayfield = Math.floor(timediff/oneDay);
  var hourfield = Math.floor((timediff-dayfield*oneDay)/oneHour);
  var minutefield = Math.floor((timediff-dayfield*oneDay-hourfield*oneHour)/oneMinute);
  var secondfield = Math.floor((timediff-dayfield*oneDay-hourfield*oneHour-minutefield*oneMinute));
  if (this.baseunit=="hours"){ //if base unit is hours, set "hourfield" to be topmost level
    hourfield = dayfield*24+hourfield;
    dayfield = "n/a";
  } else if (this.baseunit=="minutes"){ //if base unit is minutes, set "minutefield" to be topmost level
    minutefield = dayfield*24*60+hourfield*60+minutefield;
    dayfield = hourfield="n/a";
  } else if (this.baseunit=="seconds"){ //if base unit is seconds, set "secondfield" to be topmost level
    var secondfield = timediff;
    dayfield = hourfield = minutefield = "n/a";
  }
  this.container.innerHTML = debugstring+this.formatresults(dayfield, hourfield, minutefield, secondfield);
  setTimeout(function(){thisobj.showresults()}, 1000); //update results every second
}

/////CUSTOM FORMAT OUTPUT FUNCTIONS BELOW//////////////////////////////

//Create your own custom format function to pass into cdLocalTime.displaycountdown()
//Use arguments[0] to access "Days" left
//Use arguments[1] to access "Hours" left
//Use arguments[2] to access "Minutes" left
//Use arguments[3] to access "Seconds" left

//The values of these arguments may change depending on the "baseunit" parameter of cdLocalTime.displaycountdown()
//For example, if "baseunit" is set to "hours", arguments[0] becomes meaningless and contains "n/a"
//For example, if "baseunit" is set to "minutes", arguments[0] and arguments[1] become meaningless etc

//1) Display countdown using plain text
function formatresults(){
  if (this.timesup==false){//if target date/time not yet met
    var displaystring = "<span style='background-color: #CFEAFE'>"+arguments[1]+" hours "+arguments[2]+" minutes "+arguments[3]+" seconds</span> left until launch time";
  } else{ //else if target date/time met
    var displaystring = "Launch time!";
  }
  return displaystring;
}

//2) Display countdown with a stylish LCD look, and display an alert on target date/time
function formatresults2(){
  if (this.timesup==false){ //if target date/time not yet met
	  var digits = new Array(0);
  
	// days
	digits[0] = Math.floor(arguments[0]/10);
	digits[1] = arguments[0]%10;
	// hours
	digits[2] = Math.floor(arguments[1]/10);
	digits[3] = arguments[1]%10;
	// minutes
	digits[4] = Math.floor(arguments[2]/10);
	digits[5] = arguments[2]%10;
	// seconds
	digits[6] = Math.floor(arguments[3]/10);
	digits[7] = arguments[3]%10;
	
	var suffix = this.suffix;
	
	if (digits[0] < 0 && digits[1] <= 1) suffix = suffix;
	else suffix = suffix + "s";
 
	return 	"<ul class='only'>" + 
			"<li class='days'>" + "<span>" +digits[0]+digits[1] + " " + suffix + "</span>" + "</li>" +
			"<li class='time'>"+
			"<span class='dg'>"+digits[2]+"</span>" +
			"<span class='dg'>"+digits[3]+"</span>" +
			"<span class='dots'>:</span>" +
			"<span class='dg'>"+digits[4]+"</span>" +
			"<span class='dg'>"+digits[5]+"</span>" +
			"<span class='dots'>:</span>" +
			"<span class='dg'>"+digits[6]+"</span>" +
			"<span class='dg'>"+digits[7]+"</span>" +
			"</li>" + 
			"</ul>";
  } else{ //else if target date/time met
  var suffix = "Days";
	return 	"<ul class='only'>" + 
			"<li class='days'>" + "<span>" + 0 + " " + suffix + "</span>" + "</li>" +
			"<li class='time'>"+
			"<span class='dg'>"+0+"</span>" +
			"<span class='dg'>"+0+"</span>" +
			"<span class='dots'>:</span>" +
			"<span class='dg'>"+0+"</span>" +
			"<span class='dg'>"+0+"</span>" +
			"<span class='dots'>:</span>" +
			"<span class='dg'>"+0+"</span>" +
			"<span class='dg'>"+0+"</span>" +
			"</li>" + 
			"</ul>";
  }
  return '';
}



/**Initialization**/

jQuery(document).ready(function($) { 

	var suffix = 'Day';
	
	var servertime = new Date();
       
    var launchdate = new cdLocalTime('countdown', servertime, 0, 'December 07, 2011 09:00:00', 'Left', suffix);
    launchdate.displaycountdown('countdown', formatresults2);
    
	
}); 