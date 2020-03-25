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
            this.template = window.catSDK.renderTemplate(window.templates["../src/modules/footer/footer.html"], obj);
            this.scope = obj;
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

            // Create two-way -----------------------
            window.catSDK.bind(elements, this.scope);

            // Dispatch event -----------------------
            document.getElementById("footerButton").onclick = function() {
                self.scope.x = "Other footer";
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
