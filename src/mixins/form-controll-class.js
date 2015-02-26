'use strict';

module.exports = {
    inputClassName: function(obj) {
        if(typeof obj.value !== 'undefined' && obj.valid) {
            return 'valid';
        }
        else {
            return 'invalid';
        }
    }
};
