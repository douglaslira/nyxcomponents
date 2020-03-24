(function () {
    'use strict';

    window.catSDK = {};

    catSDK.renderTemplate = renderTemplate;

    function renderTemplate (template, options) {
		return template.replace(/\$\{(.+?)\}/g, (match, variable) => {
            return variable.split('.').reduce((previous, current) => {
                return previous[current];
            }, options) || '';
        });
    }
})();
