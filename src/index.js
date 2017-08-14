// react
import React, {Component} from 'react';
// material-ui
import {teal500, red500, white} from 'material-ui/styles/colors';
import {Card, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';
import PropTypes from 'prop-types';

const styles = {
    button: {
        height: 38,
        minWidth: 0,
        width: 72,
    },
    buttonLabel: {
        width: 72,
        textAlign: 'center',
        padding: 0,
    },
    stepperTitle: {
        color: '#000000',
        fontSize: 18,
        padding: '20px 0',
        display: 'block',
    },
    body: {
        padding: '0 20px',
    },
    stepContainerInactive: {
        display: 'block',
        width: '100%',
        height: 60,
        position: 'relative',
        marginBottom: 10,
        overflowY: 'hidden',
    },
    stepContainerActive: {
        display: 'block',
        width: '100%',
        height: 110,
        position: 'relative',
        marginBottom: 20,
        overflowY: 'hidden',
    },
    markerInactive: {
        backgroundColor: '#B2B2B2',
        width: 30,
        height: 30,
        borderRadius: 15,
        display: 'block',
        float: 'left',
    },
    markerActive: {
        backgroundColor: teal500,
        width: 30,
        height: 30,
        borderRadius: 15,
        display: 'block',
        float: 'left',
    },
    markerError: {
        backgroundColor: red500,
        width: 30,
        height: 30,
        borderRadius: 15,
        display: 'block',
        float: 'left',
    },
    contentInactive: {
        left: 30,
        marginTop: 4,
        width: '85%',
        marginLeft: 10,
        float: 'left',
    },
    contentActive: {
        left: 30,
        top: 0,
        width: '85%',
        marginLeft: 10,
        float: 'left',
    },
    line: {
        height: 9999,
        position: 'absolute',
        left: 14,
        top: 40,
        borderLeft: '1px solid #BDBDBD',
        display: 'block',
    },
    titleActive: {
        padding: 15,
        display: 'block',
    },
    titleInactive: {
        fontSize: '13px',
    },
};

class StatusStepper extends Component {
    _getSelected () {
        let {statuses, currentStatus} = this.props;
        statuses.forEach((item) => {
            if (item.status === currentStatus) {
                return item;
            }
        });
        return;
    }

    _renderActions (actions) {
        if (!actions || actions.length > 0 === false) return;

        let buttons = [];
        for (var i = 0; i < actions.length; i++) {
            let action = actions[i];

            buttons.push(
                <FlatButton
                    label={action.name}
                    primary={action.primary}
                    secondary={action.secondary}
                    onClick={action.callback}
                    style={Object.assign({}, styles.button, action.style)}
                    labelStyle={styles.buttonLabel}
                    disabled={action.disabled ? action.disabled : false}
                    key={i}
                    />
            );
        }

        if (buttons.length > 0) {
            return (
                <CardActions
                    style={{backgroundColor: white}}
                    >
                    <div
                        style={{display: 'flex'}}
                        >
                        {buttons}
                    </div>
                </CardActions>
            );
        }
        return;
    }

    _renderLine () {
        return (
            <div
                style={styles.line}
                />
        );
    }

    _renderSteps () {
        let {statuses, currentStatus, titleStyle} = this.props;
        let {markerActive, markerInactive, markerError} = styles;
        let usableStates = [];
        let display = [];
        let reachedActiveStatus = false;

        // Get which states we want to display
        statuses.forEach((item) => {
            if (item.status === currentStatus ||  item.hideIfNotActive !== true) {
                usableStates.push(item);
            }
        });

        // Display them
        for (let i = 0; i < usableStates.length; i++) {
            let item = usableStates[i];
            let actions = this._renderActions(item.actions);
            let line = (i === usableStates.length - 1) ? (<div />) : this._renderLine(i);

            // Show error marker or not?
            let markerStyle = reachedActiveStatus ? markerInactive : markerActive;
            if (item.errorStatus) markerStyle = markerError;

            if (item.status === currentStatus) {
                reachedActiveStatus = true;
                if (actions || item.forceCardDisplay) {
                    display.push(
                        <div
                            key={i}
                            style={styles.stepContainerActive}
                            >
                            {line}
                            <div
                                style={markerActive}
                                />
                            <Card style={
                                    Object.assign({}, styles.contentActive, {
                                        backgroundColor: item.colors.background,
                                        color: item.colors.text
                                    })
                                }>
                                <div>
                                    <span style={Object.assign({}, styles.titleActive, titleStyle)}>
                                        {item.title}
                                    </span>
                                    {actions}
                                    {/*item.actions Needs to be in specific format
                                        & will be output as Flat Button: [{title:...,callback:...,},...]*/}
                                </div>
                            </Card>
                        </div>
                    );
                } else {
                    display.push(
                        <div
                            key={i}
                            style={styles.stepContainerInactive}
                            >
                            {line}
                            <div
                                style={markerStyle}
                                />
                            <div style={styles.contentInactive}>
                                <span style={styles.titleInactive}>
                                    {item.title}
                                </span>
                            </div>
                        </div>
                    );
                }
            } else {
                display.push(
                    <div
                        key={i}
                        style={styles.stepContainerInactive}
                        >
                        {line}
                        <div
                            style={markerStyle}
                            />
                        <div style={styles.contentInactive}>
                            <span style={styles.titleInactive}>
                                {item.title}
                            </span>
                        </div>
                    </div>
                );
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

    render() {
        let selected = this._getSelected();
        let steps = this._renderSteps();

        return (
            <div>
                {steps}
            </div>
        );
    }
}

StatusStepper.propTypes = {
    currentStatus: PropTypes.string,
    statuses: PropTypes.array,
    titleStyle: PropTypes.object,
};

export default StatusStepper;
