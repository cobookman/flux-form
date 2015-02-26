var React = require('react');
var onChange = require('../mixins/onChange');
var base = require('./base');
var formControllClass = require('../mixins/form-controll-class');


module.exports = React.createClass({displayName: "exports",
    mixins: [onChange, base, formControllClass],

    render: function() {
        return (
            React.createElement("div", {htmlFor: this.props.field, className: this.props.className || ''},
                React.createElement("label", null, this.props.title),
                React.createElement("textarea", {
                    id: this.props.field,
                    className: this.formControllClass(this.state),
                    value: this.state.value,
                    onChange: this.handleInputChange.bind(this, this.props.field)
                })
            )
        );
    }
});
