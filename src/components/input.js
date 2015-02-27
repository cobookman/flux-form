var React = require('react');
var OnChangeFactory = require('../mixins/onChange');
var base = require('./base');
var formControllClass = require('../mixins/form-controll-class');

module.exports = function (actions) {
    var onChange = OnChangeFactory(actions);

    return React.createClass({displayName: "exports",
        mixins: [onChange, base, formControllClass],

        render: function() {
            return (
                React.createElement("div", {htmlFor: this.props.field, className: this.props.className || ''},
                    React.createElement("label", null, this.props.title),
                    React.createElement("input", {
                        id: this.props.field,
                        className: this.formControllClass(this.state),
                        type: this.props.type || "text",
                        placeholder: this.props.placeholder || '',
                        value: this.state.value,
                        onChange: this.handleInputChange.bind(this, this.props.field)})
                )
            );
        }
    });
};
