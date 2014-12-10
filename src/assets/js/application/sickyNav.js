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