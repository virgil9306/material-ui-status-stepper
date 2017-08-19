'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _colors = require('material-ui/styles/colors');

var _Card = require('material-ui/Card');

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // react

// material-ui


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
        backgroundColor: _colors.teal500,
        width: 30,
        height: 30,
        borderRadius: 15,
        display: 'block',
        float: 'left'
    },
    markerError: {
        backgroundColor: _colors.red500,
        width: 30,
        height: 30,
        borderRadius: 15,
        display: 'block',
        float: 'left'
    },
    contentInactive: {
        left: 30,
        marginTop: 4,
        width: 'calc(100% - 50px)',
        marginLeft: 10,
        float: 'left'
    },
    contentActive: {
        left: 30,
        top: 0,
        width: 'calc(100% - 50px)',
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

                buttons.push(_react2.default.createElement(_FlatButton2.default, {
                    label: action.name,
                    primary: action.primary,
                    secondary: action.secondary,
                    onClick: action.callback,
                    style: Object.assign({}, styles.button, action.style),
                    labelStyle: styles.buttonLabel,
                    disabled: action.disabled ? action.disabled : false,
                    key: i
                }));
            }

            if (buttons.length > 0) {
                return _react2.default.createElement(
                    _Card.CardActions,
                    {
                        style: { backgroundColor: _colors.white }
                    },
                    _react2.default.createElement(
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
            return _react2.default.createElement('div', {
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
                var line = i === usableStates.length - 1 ? _react2.default.createElement('div', null) : this._renderLine(i);

                // Show error marker or not?
                var markerStyle = reachedActiveStatus ? markerInactive : markerActive;
                if (item.errorStatus) markerStyle = markerError;

                if (item.status === currentStatus) {
                    reachedActiveStatus = true;
                    if (actions || item.forceCardDisplay) {
                        display.push(_react2.default.createElement(
                            'div',
                            {
                                key: i,
                                style: styles.stepContainerActive
                            },
                            line,
                            _react2.default.createElement('div', {
                                style: markerActive
                            }),
                            _react2.default.createElement(
                                _Card.Card,
                                { style: Object.assign({}, styles.contentActive, {
                                        backgroundColor: item.colors.background,
                                        color: item.colors.text
                                    }) },
                                _react2.default.createElement(
                                    'div',
                                    null,
                                    _react2.default.createElement(
                                        'span',
                                        { style: Object.assign({}, styles.titleActive, titleStyle) },
                                        item.title
                                    ),
                                    actions
                                )
                            )
                        ));
                    } else {
                        display.push(_react2.default.createElement(
                            'div',
                            {
                                key: i,
                                style: styles.stepContainerInactive
                            },
                            line,
                            _react2.default.createElement('div', {
                                style: markerStyle
                            }),
                            _react2.default.createElement(
                                'div',
                                { style: styles.contentInactive },
                                _react2.default.createElement(
                                    'span',
                                    { style: styles.titleInactive },
                                    item.title
                                )
                            )
                        ));
                    }
                } else {
                    display.push(_react2.default.createElement(
                        'div',
                        {
                            key: i,
                            style: styles.stepContainerInactive
                        },
                        line,
                        _react2.default.createElement('div', {
                            style: markerStyle
                        }),
                        _react2.default.createElement(
                            'div',
                            { style: styles.contentInactive },
                            _react2.default.createElement(
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

            return _react2.default.createElement(
                'div',
                null,
                steps
            );
        }
    }]);

    return StatusStepper;
}(_react.Component);

StatusStepper.propTypes = {
    currentStatus: _propTypes2.default.string,
    statuses: _propTypes2.default.array,
    titleStyle: _propTypes2.default.object
};

exports.default = StatusStepper;

