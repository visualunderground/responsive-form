/*

application.menuToggle submodule

*/
application.menuToggle = (function(application) {
    'use strict';
    var menuToggle = function menuToggle(el) {
        
        this.cssConfig = {
            block :     'menu-toggle',
            blockTrue:  'menu-toggle--open',
            blockFalse: 'menu-toggle--closed',
            element :   'menu-toggle__js-link',
        };

        this.el = el;
        this.header = this.el.querySelector("[data-role='header']");
        this.link = this.createEl('b');
        this.state = false;

        this.bindEvents();
        this.init();
    };

    menuToggle.prototype.createEl = function(elType) {
        var el = window.document.createElement(elType);
        el.className = this.cssConfig.element;
        return this.header.insertBefore(el, this.header.firstChild);
    };

    menuToggle.prototype.bindEvents = function() {
        var self = this;
        if (window.addEventListener) {
            this.link.addEventListener("click", function() { self.toggleState(); });
        } else if (window.attachEvent) {             
            // object.attachEvent <= IE8
            this.link.attachEvent("onclick", function() { self.toggleState(); });
        }
    };

    menuToggle.prototype.init = function() {
        this.toggleMenu();
    };

    menuToggle.prototype.toggleState = function() {
        this.state = !this.state;
        this.toggleMenu();
    };

    menuToggle.prototype.toggleMenu = function() {
        if (this.state === false){
            this.hideMenu();
        } else {
            this.showMenu();
        }
    };

    menuToggle.prototype.showMenu = function() {
        this.el.className = this.cssConfig.blockTrue;
    };
    
    menuToggle.prototype.hideMenu = function() {
        this.el.className = this.cssConfig.blockFalse;
    };

    return menuToggle;
})(application);