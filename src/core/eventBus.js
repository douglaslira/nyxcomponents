(function(catSDK){

    'use strict';

    var subscriptions = {};
    var getNextUniqueId = window.catSDK.getIdGenerator();

    class EventBus {
        
        constructor () {

        }

        subscribe(eventType, callback) {
            var id = getNextUniqueId()
            if(!subscriptions[eventType]) {
                subscriptions[eventType] = {}
            }
            subscriptions[eventType][id] = callback;
            return { 
                unsubscribe: function() {
                    delete subscriptions[eventType][id];
                    if(Object.keys(subscriptions[eventType]).length === 0) {
                        delete subscriptions[eventType];
                    }
                }
            };
        }
        
        publish(eventType, arg) {
            if(!subscriptions[eventType]) {
                return;
            }
            Object.keys(subscriptions[eventType]).forEach(function(key) {
                subscriptions[eventType][key](arg);
            });
        }

    }

    catSDK.eventBus = EventBus;

})(catSDK);