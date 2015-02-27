'use strict';

var Constants = require('./constants');
var ActionTypes = Constants.ActionTypes;

module.exports = function (Dispatcher) {
    return {
        set: function(context) {
            Dispatcher.handleViewAction({
                actionType: ActionTypes.SET_CONTEXT,
                context: context
            });
        }
    };
};
