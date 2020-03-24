(function () {
    
    'use strict';

    window.catSDK = {};

    catSDK.renderTemplate = renderTemplate;
    catSDK.getIdGenerator = getIdGenerator;

    function getIdGenerator() {
        var lastId = 0;
        return function getNextUniqueId() {
            lastId += 1;
            return lastId;
        }
    }

    function renderTemplate (template, options) {
		return template.replace(/\$\{(.+?)\}/g, (match, variable) => {
            return variable.split('.').reduce((previous, current) => {
                return previous[current];
            }, options) || '';
        });
    }
})();
