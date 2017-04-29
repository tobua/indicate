'use strict';

var React = require('react');

var NumeralFormatter = require('./shortcuts/NumeralFormatter');
var DateFormatter = require('./shortcuts/DateFormatter');
var PhoneFormatter = require('./shortcuts/PhoneFormatter');
var CreditCardDetector = require('./shortcuts/CreditCardDetector');
var Util = require('./utils/Util');
var DefaultProperties = require('./common/DefaultProperties');

var Cleave = React.createClass({
    componentDidMount: function () {
        this.init();
    },

    render: function () {
        var owner = this,
            { value, options, onKeyDown, onChange, onInit, htmlRef, ...propsToTransfer } = owner.props;

        return (
            <input
                type="text"
                ref={htmlRef}
                value={owner.state.value}
                onKeyDown={owner.onKeyDown}
                onChange={owner.onChange}
                {...propsToTransfer}
                data-cleave-ignore={[value, options, onKeyDown, onChange, onInit, htmlRef]}
            />
        );
    }
});

module.exports = Cleave;
