(function(catSDK) {

    'use strict';

    var headerEvents = new window.catSDK.eventBus();
    class Header {

        constructor () {
            this.template = "";
        }

        create (obj) {
            this.scope = obj;
            this.template = window.catSDK.renderTemplate(window["templates"]["../src/modules/header/header.html"], obj);
            return this;
        }

        render() {
            document.body.innerHTML += this.template;
            var elements = document.querySelectorAll('[data-cat-bind]');
            var self = this;
            
            // Create DATABIND -----------------------
            window.catSDK.bind(elements, this.scope);
            
            // Attach events -------------------------
            headerEvents.subscribe('footerEvent::Button', function(arg) {
                self.scope.x = 'X';
                self.scope.y = 'Y';
            });
            this.debug();
            return this;
        }

        debug () {
            return this;
        }
    }

    catSDK.header = Header;

})(catSDK);
