"use strict";


var w3 = {};
w3.getElements = function (id) {
  if (typeof id == "object") {
    return [id];
  } else {
    return document.querySelectorAll(id);
  }
};
w3.styleElements = function (elements, prop, val) {
  var i, l = elements.length;
  for (i = 0; i < l; i++) {    
    w3.styleElement(elements[i], prop, val);
  }
};
w3.styleElement = function (element, prop, val) {
  element.style.setProperty(prop, val);
};
w3.hide = function (sel) {
  w3.hideElements(w3.getElements(sel));
};
w3.hideElements = function (elements) {
  var i, l = elements.length;
  for (i = 0; i < l; i++) {
    w3.hideElement(elements[i]);
  }
};
w3.hideElement = function (element) {
  w3.styleElement(element, "display", "none");
};
w3.show = function (sel, a) {
  var elements = w3.getElements(sel);
  if (a) {w3.hideElements(elements);}
  w3.showElements(elements);
};
w3.showElements = function (elements) {
  var i, l = elements.length;
  for (i = 0; i < l; i++) {
    w3.showElement(elements[i]);
  }
};
w3.showElement = function (element) {
  w3.styleElement(element, "display", "block");
};

// toggle show hide 
w3.toggleShow = function (sel) {
  var i, x = w3.getElements(sel), l = x.length;
  for (i = 0; i < l; i++) {    
    if (x[i].style.display == "none") {
      w3.styleElement(x[i], "display", "block");
    } else {
      w3.styleElement(x[i], "display", "none");
    }
  }
};

// w3 slideshow 

w3.slideshow = function (sel, ms, func) {
  var i, ss, x = w3.getElements(sel), l = x.length;
  ss = {};
  ss.current = 1;
  ss.x = x;
  ss.ondisplaychange = func;
  if (!isNaN(ms) || ms == 0) {
    ss.milliseconds = ms;
  } else {
    ss.milliseconds = 1000;
  }
  ss.start = function() {
    ss.display(ss.current)
    if (ss.ondisplaychange) {ss.ondisplaychange();}
    if (ss.milliseconds > 0) {
      window.clearTimeout(ss.timeout);
      ss.timeout = window.setTimeout(ss.next, ss.milliseconds);
    }
  }
  ss.next = function() {
    ss.current += 1;
    if (ss.current > ss.x.length) {ss.current = 1;}
    ss.start();
  }
  ss.previous = function() {
    ss.current -= 1;
    if (ss.current < 1) {ss.current = ss.x.length;}
    ss.start();
  }
  ss.display = function (n) {
    w3.styleElements(ss.x, "display", "none");
    w3.styleElement(ss.x[n - 1], "display", "block");
  }
  ss.start();
  return ss;
}

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        document.getElementById("myBtn").style.display = "block";
    } else {
        document.getElementById("myBtn").style.display = "none";
    }
};

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
    document.body.scrollTop = 0; // For Chrome, Safari and Opera 
    document.documentElement.scrollTop = 0; // For IE and Firefox
};


	
// mobile navigation transition 

function ShowEleId(id){
				var element = document.getElementById(id);
				element.style.display = "block";
			}
			
			function HideEleId(id){
				var element = document.getElementById(id);
				element.style.display = "none";	
			}
			
			function ShowEle(element){
				element.style.display = "block";
			}
			
			function HideEle(element){
				element.style.display = "none";
			}
			
			function CloseMobileNav(){
				var navMenu = document.getElementById("small-nav-menu");
				var xbtn = document.getElementById("nav-close-btn");
				var navBarText = document.getElementById("nav-bar-text");
				
				navMenu.style.display = "none";
				xbtn.style.display = "none";
				navBarText.style.display = "block";
			}
			
			function OpenMobileNav(){
				var navMenu = document.getElementById("small-nav-menu");
				var xbtn = document.getElementById("nav-close-btn");
				var navBarText = document.getElementById("nav-bar-text");
				navMenu.style.display = "block";
				xbtn.style.display = "block";
				navBarText.style.display = "none";				
			}
			
			function ToggleCategoryList(catElement){
				
				var list = catElement.nextElementSibling;
				
				if(list.style.display === ""){
					list.style.display ="block";
					return;
				}
				
				if(list.style.display === "none"){
					list.style.display = "block";
				}
				else{
					list.style.display = "none";
				}
			}
			
			
			
			w3.slideshow(".SSLL", 2250);
			w3.slideshow(".SSCL", 2250);
			w3.slideshow(".SSCR", 2250);
			w3.slideshow(".SSRR", 2250);
			w3.slideshow(".mobile-SSCL", 2250);
			w3.slideshow(".mobile-SSCR", 2250);