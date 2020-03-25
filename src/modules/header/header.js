(function(catSDK) {

    'use strict';

    var headerEvents = new window.catSDK.eventBus();
    class Header {

        constructor () {
            this.template = "";
        }

        create (obj) {
            this.scope = obj;
            this.template = window.catSDK.renderTemplate(window.templates["../src/modules/header/header.html"], obj);
            return this;
        }

        render(target) {
            var newTarget = target || window.catSDK.guidGenerator();
            if(!target){
                var newContent = document.createElement('div');
                newContent.id = newTarget;
                document.body.appendChild(newContent);
            }
            var objTarget =  document.getElementById(newTarget);
            objTarget.innerHTML += this.template;
            var elements = objTarget.querySelectorAll('[data-cat-bind]');
            var self = this;
            
            // Create DATABIND -----------------------
            window.catSDK.bind(elements, this.scope);
            
            // Attach events -------------------------
            headerEvents.subscribe('footerEvent::Button', function(arg) {
                self.scope.x = 'X';
                self.scope.y = 'Y';
            });
            return this;
        }

        debug () {
            return this;
        }
    }

    catSDK.header = Header;

})(catSDK);
