/*

application Module

*/

application = (function() {
    'use strict';

    var version = '0.1.0';

    return {
        version: version
    };
}());

/*

application.utils submodule

*/

application.utils = (function(application){
    'use strict';

    var addClass = function(el, cssClass){
        if( el.className.indexOf( cssClass ) !== -1 ) {
            return;
        }
        el.className += ' ' + cssClass;
    };

    var removeClass = function(el, cssClass){
        var cn = el.className;
        var rxp = new RegExp( "\\s?\\b"+cssClass+"\\b", "g" );
        cn = cn.replace( rxp, '' );
        el.className = cn;
    };

    return {
        addClass: addClass,
        removeClass: removeClass
    };

}(application));

/*===================================================================================================== 
HELP FUNCTION
===================================================================================================== */
function $() {
    var elements = [];
    for (var i = 0; i < arguments.length; i++) {
        var element = arguments[i];
        if (typeof element === 'string') {
            element = document.getElementById(element);
        }
        if (arguments.length === 1){
            return element;
        }
        elements.push(element);
    }
    return elements;
}
var helpID = "";
function showHelp(sTerm){
    if ($(sTerm + '-content')){ //  IF HELP HAS ALREADY BEEN CALLED - SHOW IT
        if ($(sTerm + '-content').className === "help-bubble"){
            clearhelp();    //  CLEAR OLD HELP ITEM
            return false;
        }else{
            clearhelp();    //  CLEAR OLD HELP ITEM
            helpID = sTerm;
            //  HELP POSITIONING
            if(Modernizr.mq('only screen and (max-width: 789px)')) { // NO COLS
                $(sTerm + '-content').style.top = $(helpID).parentNode.offsetHeight + 5 + "px";
                // $(sTerm + '-content').style.left = "0";
            }else{
                $(sTerm + '-content').style.top = "48px";
                // $(sTerm + '-content').style.left = "0";
            }  // true
            $(helpID + '-content').className = "help-bubble";
        }
    }else{  //  ELSE - CALL HELP
        clearhelp();    //  CLEAR OLD HELP ITEM
        helpID = sTerm;
        //  CREATE NODE
        var oDiv = document.createElement("div");
        oDiv.className = 'help-bubble';
        oDiv.id = helpID + "-content";
        //  HELP POSITIONING        //if (helpPosition=='relative'){oDiv.style.left = $(helpID).offsetLeft + 40 + "px";}    //  REMOVE TO USE CSS ONLY (STATIC) POSITIONING
        if(Modernizr.mq('only screen and (max-width: 789px)')) { // NO COLS
            oDiv.style.top = $(helpID).parentNode.offsetHeight + 5 + "px";
            // oDiv.style.left = "0";
        }else{
            oDiv.style.top = "48px";
            // oDiv.style.left = "0";
        }  
        oDiv.innerHTML = "<div class='help-bubble__content'><h5 class='help-bubble__header'>Test</h5><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. link Quisque sed fringilla ipsum.</p><ul><li>One</li><li>Two</li></ul><p>Suspendisse ut sem augue. Suspendisse sed magna a neque pretium aliquet. Sed justo dolor, bibendum vehicula imperdiet nec. </p><a href='javascript:clearhelp();' class='help-bubble__close-link' title='Close'>x</a></div>";
        $(helpID).parentNode.insertBefore(oDiv, $(helpID).nextSibling);
    }
    return false;
}

function clearhelp(){
    sID = helpID + "-content";
    if (!helpID){return;}
    $(sID).className = "help-bubble is-hidden";
}
    
/* Modernizr (Custom Build) | MIT & BSD
 * Build: http://modernizr.com/download/#-shiv-mq-cssclasses-touch
 */
;window.Modernizr=function(e,t,n){function x(e){f.cssText=e}function T(e,t){return x(h.join(e+";")+(t||""))}function N(e,t){return typeof e===t}function C(e,t){return!!~(""+e).indexOf(t)}function k(e,t,r){for(var i in e){var s=t[e[i]];if(s!==n)return r===!1?e[i]:N(s,"function")?s.bind(r||t):s}return!1}var r="2.8.3",i={},s=!0,o=t.documentElement,u="modernizr",a=t.createElement(u),f=a.style,l,c={}.toString,h=" -webkit- -moz- -o- -ms- ".split(" "),p={},d={},v={},m=[],g=m.slice,y,b=function(e,n,r,i){var s,a,f,l,c=t.createElement("div"),h=t.body,p=h||t.createElement("body");if(parseInt(r,10))while(r--)f=t.createElement("div"),f.id=i?i[r]:u+(r+1),c.appendChild(f);return s=["&#173;",'<style id="s',u,'">',e,"</style>"].join(""),c.id=u,(h?c:p).innerHTML+=s,p.appendChild(c),h||(p.style.background="",p.style.overflow="hidden",l=o.style.overflow,o.style.overflow="hidden",o.appendChild(p)),a=n(c,e),h?c.parentNode.removeChild(c):(p.parentNode.removeChild(p),o.style.overflow=l),!!a},w=function(t){var n=e.matchMedia||e.msMatchMedia;if(n)return n(t)&&n(t).matches||!1;var r;return b("@media "+t+" { #"+u+" { position: absolute; } }",function(t){r=(e.getComputedStyle?getComputedStyle(t,null):t.currentStyle)["position"]=="absolute"}),r},E={}.hasOwnProperty,S;!N(E,"undefined")&&!N(E.call,"undefined")?S=function(e,t){return E.call(e,t)}:S=function(e,t){return t in e&&N(e.constructor.prototype[t],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(t){var n=this;if(typeof n!="function")throw new TypeError;var r=g.call(arguments,1),i=function(){if(this instanceof i){var e=function(){};e.prototype=n.prototype;var s=new e,o=n.apply(s,r.concat(g.call(arguments)));return Object(o)===o?o:s}return n.apply(t,r.concat(g.call(arguments)))};return i}),p.touch=function(){var n;return"ontouchstart"in e||e.DocumentTouch&&t instanceof DocumentTouch?n=!0:b(["@media (",h.join("touch-enabled),("),u,")","{#modernizr{top:9px;position:absolute}}"].join(""),function(e){n=e.offsetTop===9}),n};for(var L in p)S(p,L)&&(y=L.toLowerCase(),i[y]=p[L](),m.push((i[y]?"":"no-")+y));return i.addTest=function(e,t){if(typeof e=="object")for(var r in e)S(e,r)&&i.addTest(r,e[r]);else{e=e.toLowerCase();if(i[e]!==n)return i;t=typeof t=="function"?t():t,typeof s!="undefined"&&s&&(o.className+=" "+(t?"":"no-")+e),i[e]=t}return i},x(""),a=l=null,function(e,t){function c(e,t){var n=e.createElement("p"),r=e.getElementsByTagName("head")[0]||e.documentElement;return n.innerHTML="x<style>"+t+"</style>",r.insertBefore(n.lastChild,r.firstChild)}function h(){var e=y.elements;return typeof e=="string"?e.split(" "):e}function p(e){var t=f[e[u]];return t||(t={},a++,e[u]=a,f[a]=t),t}function d(e,n,r){n||(n=t);if(l)return n.createElement(e);r||(r=p(n));var o;return r.cache[e]?o=r.cache[e].cloneNode():s.test(e)?o=(r.cache[e]=r.createElem(e)).cloneNode():o=r.createElem(e),o.canHaveChildren&&!i.test(e)&&!o.tagUrn?r.frag.appendChild(o):o}function v(e,n){e||(e=t);if(l)return e.createDocumentFragment();n=n||p(e);var r=n.frag.cloneNode(),i=0,s=h(),o=s.length;for(;i<o;i++)r.createElement(s[i]);return r}function m(e,t){t.cache||(t.cache={},t.createElem=e.createElement,t.createFrag=e.createDocumentFragment,t.frag=t.createFrag()),e.createElement=function(n){return y.shivMethods?d(n,e,t):t.createElem(n)},e.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+h().join().replace(/[\w\-]+/g,function(e){return t.createElem(e),t.frag.createElement(e),'c("'+e+'")'})+");return n}")(y,t.frag)}function g(e){e||(e=t);var n=p(e);return y.shivCSS&&!o&&!n.hasCSS&&(n.hasCSS=!!c(e,"article,aside,dialog,figcaption,figure,footer,header,hgroup,main,nav,section{display:block}mark{background:#FF0;color:#000}template{display:none}")),l||m(e,n),e}var n="3.7.0",r=e.html5||{},i=/^<|^(?:button|map|select|textarea|object|iframe|option|optgroup)$/i,s=/^(?:a|b|code|div|fieldset|h1|h2|h3|h4|h5|h6|i|label|li|ol|p|q|span|strong|style|table|tbody|td|th|tr|ul)$/i,o,u="_html5shiv",a=0,f={},l;(function(){try{var e=t.createElement("a");e.innerHTML="<xyz></xyz>",o="hidden"in e,l=e.childNodes.length==1||function(){t.createElement("a");var e=t.createDocumentFragment();return typeof e.cloneNode=="undefined"||typeof e.createDocumentFragment=="undefined"||typeof e.createElement=="undefined"}()}catch(n){o=!0,l=!0}})();var y={elements:r.elements||"abbr article aside audio bdi canvas data datalist details dialog figcaption figure footer header hgroup main mark meter nav output progress section summary template time video",version:n,shivCSS:r.shivCSS!==!1,supportsUnknownElements:l,shivMethods:r.shivMethods!==!1,type:"default",shivDocument:g,createElement:d,createDocumentFragment:v};e.html5=y,g(t)}(this,t),i._version=r,i._prefixes=h,i.mq=w,i.testStyles=b,o.className=o.className.replace(/(^|\s)no-js(\s|$)/,"$1$2")+(s?" js "+m.join(" "):""),i}(this,this.document);
application.Password = (function(application) {
    'use strict';

    var Password = function Password(trigger) {
        this.passwordEl = trigger;
        this.BindEvents();
    };

    var canSetInputAttribute = (function(){
        var body = document.body;
        var input = document.createElement('input');
        var result = true;
        if (! body) {
            body = document.createElement('body');
        }
        input = body.appendChild(input);
        try {
            input.setAttribute('type', 'text');
        } catch (e) {
            result = false;
        }
            body.removeChild(input);
        return result;
    }());

    Password.prototype.BindEvents = function() {
        var self = this;
        if (window.addEventListener) {
            this.passwordEl.addEventListener("focus", function() { self.ShowPassword(); });
            this.passwordEl.addEventListener("blur", function() { self.HidePassword(); });
        } else if (window.attachEvent) {             
            // object.attachEvent <= IE8
            this.passwordEl.attachEvent("onfocus", function() { self.ShowPassword(); });
            this.passwordEl.attachEvent("onblur", function() { self.HidePassword(); });
        }
    };

    Password.prototype.ShowPassword = function(){
        this.passwordEl.type = 'text';
    };

    Password.prototype.HidePassword = function(){
        this.passwordEl.type = 'password';
    };
    
    return Password;
})(application);

/*

application.sticky submodule

*/

application.Sticky = (function(application) {
    'use strict';

    var Sticky = function Sticky(trigger, cssClass) {
        this.waypoint = trigger;
        this.triggerClass = cssClass;
        this.classHolder = document.documentElement;
        this.state = null;
        this.BindEvents();
    };

    Sticky.prototype.BindEvents = function() {
        var self = this;
        if (window.addEventListener) {
            window.addEventListener("scroll", function() { self.CheckPosition(); });
        } else if (window.attachEvent) {             
            // object.attachEvent <= IE8
            window.attachEvent("onscroll", function() { self.CheckPosition(); });
        }
    };

    Sticky.prototype.CheckPosition = function(){
        if (this.waypoint.getBoundingClientRect().bottom <=0) {
            if (this.state !== this.triggerClass){
                this.state = this.triggerClass;
                application.utils.addClass(this.classHolder, this.triggerClass);
            }
        }else{
            if (this.state != null){
                this.state = null;
                application.utils.removeClass(this.classHolder, this.triggerClass);
            }
        }
    };
    
    return Sticky;
})(application);