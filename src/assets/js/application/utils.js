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

    var getDistanceFromTopOfDocument = function(el){
        var location = 0;
        if (el.offsetParent) {
            do {
                location += el.offsetTop;
                el = el.offsetParent;
            } while (el);
        }
        return location >= 0 ? location : 0;
    };

    var getHeight = function (el) {
        return Math.max( el.scrollHeight, el.offsetHeight, el.clientHeight );
    };

    return {
        getHeight : getHeight,
        getDistanceFromTopOfDocument: getDistanceFromTopOfDocument,
        addClass: addClass,
        removeClass: removeClass
    };

}(application));
