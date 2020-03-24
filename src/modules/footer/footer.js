(function(catSDK) {

    'use strict';

    class Footer {

        constructor () {
            this.template = "";
        }

        create (obj) {
            this.template = window.catSDK.renderTemplate(window["templates"]["../src/modules/footer/footer.html"], obj);
            return this;
        }

        render(target) {
			document.getElementById(target).innerHTML += this.template;
			return this;
        }

        debug () {
            return this;
        }
    }

    catSDK.footer = Footer;

})(catSDK);
