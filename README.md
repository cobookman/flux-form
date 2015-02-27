!Work In Progress!

# flux-form
Have a form which validates all values, and manages form dependencies.  

### Why?

Lets say some part of your UI external to the form changes based on if a particular form section
has been filled out correctly.  Maybe its a checklist in your navbar?  With this, you'd simply
listen to the fluxForm and update on changes.  Makes life easy.  


### Example setup
```js

'use strict';
// Make a new Dispatcher
var Dispatcher = require('flux').Dispatcher;
var _ = require('lodash');
var PayloadSources = require('../constants').PayloadSources;
var AppDispatcher = _.assign(new Dispatcher(), {

    /**
     * A bridge function between the views and the dispatcher, marking the action
     * as a view action.
     * @param {object} action The data coming from the view.
     */
    handleViewAction: function(action) {
        this.dispatch({
            source: PayloadSources.VIEW_ACTION,
            action: action
        });
    },

    /**
     * A bridge function between the server and the dispatcher, marking the action
     * as a server action.
     * @param {object} action The data coming from the server
     */
    handleServerAction: function(action) {
        this.dispatch({
            source: PayloadSources.SERVER_ACTION,
            action: action
        });
    }
});

// setup fluxForm
var fluxForm = require('./flux-form');
fluxForm.setup(AppDispatcher);

var FormInput = fluxForm.FormInput;

React.createClass({
    render: function() {
        getInitialState: function() {
                fluxForm.store.register('login', {
                    username: {
                        type: 'text',
                        default: '',
                        required: true
                    }
                });
        },
        return (
            <FormInput
                title="Whats your username"
                field="username"
                placeholder="gburdell3">
            </FormInput>
        );
    }
});

```
