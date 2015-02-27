export.url = function(value) {
        return /^(ftp|http|https):\/\/[^ "]+$/i.test(value);
};

export.text = function(value) {
    if(typeof value === 'string' && value.trim().length) {
        return true;
    }
    else {
        return false;
    }
};

export.numeric = function(value) {
    if(typeof value === 'string' && value.length && !isNaN(value)) {
        return true;
    }
    else if(typeof value === 'number') {
        return true;
    }
    else {
        return false;
    }
};

export.image = function(value) {
    if(_validators.url(value)) {
        var imageregex = new RegExp(/\.(?:jpg|gif|png|jpeg)\s*$/);
        return imageregex.test(value);
    }
    else {
        return false;
    }
};

export.getValidatorFn = function(type) {
    var validator = this[type];
    if(!validator || typeof validator !== 'function') {
        throw new Error("Unknown field type: " + type);
    }
    else {
        return validator;
    }
};
