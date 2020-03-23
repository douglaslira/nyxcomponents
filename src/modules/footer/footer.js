(function(catSDK) {

    'use strict';

    class Footer {

        constructor () {
            this.template = "./footer.html";
        }

        create (obj) {
            this.template = window.catSDK.renderTemplate(markup, obj);
            return this;
        }

        render() {
            document.body.innerHTML += this.template;
            return this;
        }
        
        debug () {
            return this;
        }
    }

    catSDK.footer = Footer; 

})(catSDK);