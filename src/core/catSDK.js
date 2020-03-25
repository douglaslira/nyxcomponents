(function () {
    
    'use strict';

    window.catSDK = {};

    catSDK.renderTemplate = renderTemplate;
    catSDK.getIdGenerator = getIdGenerator;
    catSDK.bind = bind;

    function bind(obj, scope) {
        obj.forEach(function(element) {
            var propToBind = element.getAttribute('data-cat-bind');
            addScopeProp(propToBind);
            obj.forEach(function(element){
                if(element.getAttribute('data-cat-bind') === propToBind){
                    if(element.type && (element.type === 'text' || element.type === 'textarea')) {
                        element.value = scope[propToBind];
                    } else if(!element.type){
                        element.innerHTML = scope[propToBind];
                    }
                }
            });
            
            function addScopeProp(prop){
                var value = scope[prop] || "";
                Object.defineProperty(scope, prop, {
                    set: function (newValue) {
                        value = newValue;
                        obj.forEach(function(element){
                            if(element.getAttribute('data-cat-bind') === prop){
                                if(element.type && (element.type === 'text' || element.type === 'textarea')) {
                                    element.value = newValue;
                                } else if(!element.type){
                                    element.innerHTML = newValue;
                                }
                            }
                        });
                    },
                    get: function(){
                        return value;
                    },
                    enumerable: true
                });
            }
        });
    }

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
