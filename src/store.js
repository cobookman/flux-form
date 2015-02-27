'use strict';

var _ = require('lodash');
var EventEmitter = require('events').EventEmitter;
var validators = require('./utils/validators');
var Constants = require('./constants');

var ActionTypes = Constants.ActionTypes;
var CHANGE_EVENT = 'change';

var _store = {
    context: {
    },
    dependencies: {
    }
};

function _validate(type, value) {
    var validator = validators.getValidatorFn(type);
    return validator(value);
}

function _setElm(elm, value) {
    elm.value = value;
    elm.valid = _validate(elm.type, value);
    return true;
}

function _setField(field, value) {
    if(typeof field !== 'string' || !field.length) {
        console.log("cannot set field", field);
        return false;
    }

    var elm = _store.context[field];
    if(typeof elm !== 'object') {
        console.log("cannot set field, as it has not been registered yet", field);
        return false;
    }
    return _setElm(elm, value);
}

var Store = _.assign({}, EventEmitter.prototype, {
    setContext: function(changes) {
        if(typeof changes === 'object') {
            Object.keys(changes).forEach(function (key) {
                if(_setField(key, changes[key])) {
                    this.emitChange(key);
                }
            }.bind(this));

        }
    },

    getContexts: function(component) {
        return Object.keys(_store.dependencies[component]).map(function(key) {
            return _store.context[key];
        });
    },

    getContext: function(prop) {
        if(prop) {
            return _store.context[prop];
        } else {
            return _store.context;
        }
    },

    register: function(component, params) {
        Object.keys(params).forEach(function(key) {
            // set context's value to current, or default
            params[key].value = params[key].default;
            if(_store.context[key] && typeof _store.context[key].value !== 'undefined') {
                params[key].value = _store.context[key].value;
            }

            // register context
            _store.context[key] = params[key];

            // register context as dependency
            if(typeof _store.dependencies[component] === 'undefined') {
                _store.dependencies[component] = {};
            }
            _store.dependencies[component][key] = params[key].required;
        });
    },

    getDependencies: function() {
        return _store.dependencies;
    },

    emitChange: function(field) {
        var payload = {};
        payload[field] = this.getContext(field);
        this.emit(CHANGE_EVENT, payload);
        this.emit(CHANGE_EVENT + ":" + field, payload);
    },

    addChangeListener: function(field, callback) {
        if(field !== '*') {
            this.on(CHANGE_EVENT + ":" + field, callback);
        }
        else {
            this.on(CHANGE_EVENT, callback);
        }
    },

    removeChangeListener: function(field, callback) {
        if(field !== '*') {
            this.removeListener(CHANGE_EVENT + ":" + field, callback);
        }
        else {
            this.removeListener(CHANGE_EVENT, callback);
        }
    }

});

module.exports = function(Dispatcher) {
    Dispatcher.register(function(payload) {
        var action = payload.action;
        switch(action.actionType) {
            case ActionTypes.SET_CONTEXT:
                Store.setContext(action.context);
                break;
        }
    });
    return Store;
};
