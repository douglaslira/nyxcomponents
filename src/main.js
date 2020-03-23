(function () {
    'use strict';

    window.catSDK = {};

    catSDK.renderTemplate = renderTemplate;


    function renderTemplate (template, options) {

		/*
        var rawFile = new XMLHttpRequest();
        rawFile.open("GET", template, false);
        rawFile.onreadystatechange = function () {
            if(rawFile.readyState === 4) {
                if(rawFile.status === 200 || rawFile.status == 0) {
                    var allText = rawFile.responseText;
                    alert(allText);
                }
            }
        }
		rawFile.send(null);
		*/

        return template.replace(/\$\{(.+?)\}/g, (match, variable) => {
            return variable.split('.').reduce((previous, current) => {
                return previous[current];
            }, options) || '';
        });
    }
})();
