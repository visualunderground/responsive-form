/*

application.sticky submodule

*/
application.Sticky = (function(application) {
    'use strict';
    var Sticky = function Sticky(el, cssClass) {

        this.el = el;
        this.css = cssClass || 'sticky';
        this.state = false;
        this.origin = application.utils.getDistanceFromTopOfDocument(this.el);
        
        this.bindEvents();
        this.init();
    };

    Sticky.prototype.bindEvents = function() {
        var self = this;
        if (window.addEventListener) {
            window.addEventListener("scroll", function() { self.checkPosition(); });
        } else if (window.attachEvent) {             
            // object.attachEvent <= IE8
            window.attachEvent("onscroll", function() { self.checkPosition(); });
        }
    };

    Sticky.prototype.init = function(){
        this.checkPosition();
    };

    Sticky.prototype.checkPosition = function(){
        if (window.scrollY > this.origin) {
            if (this.state === false){
                this.stick();
                this.state = !this.state;
            }
        }else{
            if (this.state === true){
                this.unStick();
                this.state = !this.state;
            }
        }
    };

    Sticky.prototype.stick = function(){
        application.utils.addClass(document.documentElement, this.css);
    };

    Sticky.prototype.unStick = function(){
        application.utils.removeClass(document.documentElement, this.css);
    };
    
    return Sticky;
})(application);