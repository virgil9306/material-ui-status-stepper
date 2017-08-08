var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// react
import React, { Component, PropTypes } from 'react';
// material-ui
import { teal500, red500, white } from 'material-ui/styles/colors';
import { Card, CardActions } from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

var styles = {
    button: {
        height: 38,
        minWidth: 0,
        width: 72
    },
    buttonLabel: {
        width: 72,
        textAlign: 'center',
        padding: 0
    },
    stepperTitle: {
        color: '#000000',
        fontSize: 18,
        padding: '20px 0',
        display: 'block'
    },
    body: {
        padding: '0 20px'
    },
    stepContainerInactive: {
        display: 'block',
        width: '100%',
        height: 60,
        position: 'relative',
        marginBottom: 10,
        overflowY: 'hidden'
    },
    stepContainerActive: {
        display: 'block',
        width: '100%',
        height: 110,
        position: 'relative',
        marginBottom: 20,
        overflowY: 'hidden'
    },
    markerInactive: {
        backgroundColor: '#B2B2B2',
        width: 30,
        height: 30,
        borderRadius: 15,
        display: 'block',
        float: 'left'
    },
    markerActive: {
        backgroundColor: teal500,
        width: 30,
        height: 30,
        borderRadius: 15,
        display: 'block',
        float: 'left'
    },
    markerError: {
        backgroundColor: red500,
        width: 30,
        height: 30,
        borderRadius: 15,
        display: 'block',
        float: 'left'
    },
    contentInactive: {
        left: 30,
        marginTop: 4,
        width: '85%',
        marginLeft: 10,
        float: 'left'
    },
    contentActive: {
        left: 30,
        top: 0,
        width: '85%',
        marginLeft: 10,
        float: 'left'
    },
    line: {
        height: 9999,
        position: 'absolute',
        left: 14,
        top: 40,
        borderLeft: '1px solid #BDBDBD',
        display: 'block'
    },
    titleActive: {
        padding: 15,
        display: 'block'
    },
    titleInactive: {
        fontSize: '13px'
    }
};

var StatusStepper = function (_Component) {
    _inherits(StatusStepper, _Component);

    function StatusStepper() {
        _classCallCheck(this, StatusStepper);

        return _possibleConstructorReturn(this, (StatusStepper.__proto__ || Object.getPrototypeOf(StatusStepper)).apply(this, arguments));
    }

    _createClass(StatusStepper, [{
        key: '_getSelected',
        value: function _getSelected() {
            var _props = this.props,
                statuses = _props.statuses,
                currentStatus = _props.currentStatus;

            statuses.forEach(function (item) {
                if (item.status === currentStatus) {
                    return item;
                }
            });
            return;
        }
    }, {
        key: '_renderActions',
        value: function _renderActions(actions) {
            if (!actions || actions.length > 0 === false) return;

            var buttons = [];
            for (var i = 0; i < actions.length; i++) {
                var action = actions[i];

                buttons.push(React.createElement(FlatButton, {
                    label: action.name,
                    primary: action.primary,
                    secondary: action.secondary,
                    onClick: action.callback,
                    style: Object.assign({}, styles.button, action.style),
                    labelStyle: styles.buttonLabel,
                    disabled: action.disabled ? action.disabled : false
                }));
            }

            if (buttons.length > 0) {
                return React.createElement(
                    CardActions,
                    {
                        style: { backgroundColor: white }
                    },
                    React.createElement(
                        'div',
                        {
                            style: { display: 'flex' }
                        },
                        buttons
                    )
                );
            }
            return;
        }
    }, {
        key: '_renderLine',
        value: function _renderLine() {
            return React.createElement('div', {
                style: styles.line
            });
        }
    }, {
        key: '_renderSteps',
        value: function _renderSteps() {
            var _props2 = this.props,
                statuses = _props2.statuses,
                currentStatus = _props2.currentStatus,
                titleStyle = _props2.titleStyle;
            var markerActive = styles.markerActive,
                markerInactive = styles.markerInactive,
                markerError = styles.markerError;

            var usableStates = [];
            var display = [];
            var reachedActiveStatus = false;

            // Get which states we want to display
            statuses.forEach(function (item) {
                if (item.status === currentStatus || item.hideIfNotActive !== true) {
                    usableStates.push(item);
                }
            });

            // Display them
            for (var i = 0; i < usableStates.length; i++) {
                var item = usableStates[i];
                var actions = this._renderActions(item.actions);
                var line = i === usableStates.length - 1 ? React.createElement('div', null) : this._renderLine(i);

                // Show error marker or not?
                var markerStyle = reachedActiveStatus ? markerInactive : markerActive;
                if (item.errorStatus) markerStyle = markerError;

                if (item.status === currentStatus) {
                    reachedActiveStatus = true;
                    if (actions || item.forceCardDisplay) {
                        display.push(React.createElement(
                            'div',
                            {
                                key: i,
                                style: styles.stepContainerActive
                            },
                            line,
                            React.createElement('div', {
                                style: markerActive
                            }),
                            React.createElement(
                                Card,
                                { style: Object.assign({}, styles.contentActive, {
                                        backgroundColor: item.colors.background,
                                        color: item.colors.text
                                    }) },
                                React.createElement(
                                    'div',
                                    null,
                                    React.createElement(
                                        'span',
                                        { style: Object.assign({}, styles.titleActive, titleStyle) },
                                        item.title
                                    ),
                                    actions
                                )
                            )
                        ));
                    } else {
                        display.push(React.createElement(
                            'div',
                            {
                                key: i,
                                style: styles.stepContainerInactive
                            },
                            line,
                            React.createElement('div', {
                                style: markerStyle
                            }),
                            React.createElement(
                                'div',
                                { style: styles.contentInactive },
                                React.createElement(
                                    'span',
                                    { style: styles.titleInactive },
                                    item.title
                                )
                            )
                        ));
                    }
                } else {
                    display.push(React.createElement(
                        'div',
                        {
                            key: i,
                            style: styles.stepContainerInactive
                        },
                        line,
                        React.createElement('div', {
                            style: markerStyle
                        }),
                        React.createElement(
                            'div',
                            { style: styles.contentInactive },
                            React.createElement(
                                'span',
                                { style: styles.titleInactive },
                                item.title
                            )
                        )
                    ));
                }

                // Stop state is a final state, no need to show
                // states that come after;
                // Often used together with hideIfNotActive
                if (item.stopState) {
                    break;
                }
            }

            return display;
        }
    }, {
        key: 'render',
        value: function render() {
            var selected = this._getSelected();
            var steps = this._renderSteps();

            return React.createElement(
                'div',
                null,
                steps
            );
        }
    }]);

    return StatusStepper;
}(Component);

StatusStepper.propTypes = {
    currentStatus: PropTypes.string,
    statuses: PropTypes.array,
    titleStyle: PropTypes.object
};


export default StatusStepper;

