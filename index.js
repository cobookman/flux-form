var FormInputFactory = require('./src/components/input');
var FormSelectFactory = require('./src/components/select');
var FormTextAreaFactory = require('./src/components/textarea');
var Store = require('./src/store');
var Actions = require('./src/actions');

function FluxForm () {
}

FluxForm.prototype.setup = function(dispatcher) {
    this.actions = Actions(dispatcher);
    this.store = Store(dispatcher);

    this.FormInput = FormInputFactory(this.actions);
    this.FormSelect = FormSelectFactory(this.actions);
    this.FormTextArea = FormTextAreaFactory(this.actions);
};

module.exports = (new FluxForm());
