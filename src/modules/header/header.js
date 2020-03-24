(function(catSDK) {

    'use strict';

    class Header {

        constructor () {
            this.template = "";
        }

        create (obj) {
            this.template = window.catSDK.renderTemplate(window["templates"]["../src/modules/header/header.html"], obj);
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

    catSDK.header = Header;

})(catSDK);
