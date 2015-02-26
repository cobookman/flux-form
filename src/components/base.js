'use strict';
var store = require('../store');

module.exports = {
    getInitialState: function() {
        return store.getContext(this.props.field);
    },
    componentWillMount: function() {
        store.addChangeListener(this.props.field, this._onChange);
    },
    componentWillUnmount: function() {
        store.removeChangeListener(this.props.field, this._onChange);
    },
    _onChange: function(payload) {
        if(typeof payload[this.props.field] !== 'undefined') {
            this.setState(payload[this.props.field]);
        }
    }
};
