(function(catSDK) {

    'use strict';

    var footerEvents = new window.catSDK.eventBus();
    var footerEventSubscription = footerEvents.subscribe('footerEvent::Button', function(arg){
        console.log(arg);
    });

    class Footer {

        constructor () {
            this.template = "";
            this.footerEvents = "";
            this.footerEventSubscription = "";
        }

        create (obj) {
            this.template = window.catSDK.renderTemplate(window["templates"]["../src/modules/footer/footer.html"], obj);
            return this;
        }

        render(target) {
            document.getElementById(target).innerHTML += this.template;
            document.getElementById("footerButton").onclick = function() {
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
