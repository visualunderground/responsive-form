// todo: http://toddmotto.com/psswrd-the-show-hide-password-javascript-plugin/ ??

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
