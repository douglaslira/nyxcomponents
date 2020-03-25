(function(catSDK) {

    'use strict';

    var footerEvents = new window.catSDK.eventBus();
    
    class Footer {

        constructor () {
            this.template = "";
            this.scope = {};
            this.footerEvents = "";
            this.footerEventSubscription = "";
        }

        create (obj) {
            this.template = window.catSDK.renderTemplate(window["templates"]["../src/modules/footer/footer.html"], obj);
            this.scope = obj;
            return this;
        }

        render(target) {

            document.getElementById(target).innerHTML += this.template;
            var elements = document.querySelectorAll('[data-cat-bind]');
            var self = this;

            // Create two-way -----------------------
            window.catSDK.bind(elements, this.scope);

            // Dispatch event -----------------------
            document.getElementById("footerButton").onclick = function() {
                self.scope.name = "Other footer";
                footerEvents.publish("footerEvent::Button", {name: "OK"});
            };
            
            //footerEventSubscription.unsubscribe();
			return this;
        }

        debug () {
           return this;
        }
    }

    catSDK.footer = Footer;

})(catSDK);
