'use strict';

module.exports = function (actions) {
    return {
        handleInputChange: function(field, e) {
            e.preventDefault();
            var change = {};
            change[field] = e.target.value;
            actions.set(change);
        }
    };
};
