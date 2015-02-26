'use strict';

var contextActions = require('../actions');

module.exports = {
    handleInputChange: function(field, e) {
        e.preventDefault();
        var change = {};
        change[field] = e.target.value;
        contextActions.set(change);
    }
};
