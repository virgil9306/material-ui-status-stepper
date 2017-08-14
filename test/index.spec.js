import React from 'react';
import { shallow } from 'enzyme';
import {describe, it, before, after} from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';
import StatusStepper from '../src/index.js';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions} from 'material-ui/Card';
import {teal500, red500, white} from 'material-ui/styles/colors';
import FlatButton from 'material-ui/FlatButton';

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

const steps = [
    {
        title: 'Inactive',
        status: 'INACTIVE',
        completed: false,
        actions: [
            {
                name: 'FUEL',
                callback: () => {},
                style: {width: 88},
            }
        ],
        colors: {
            background: 'blue',
            text: 'black'
        },
        hideIfNotActive: false
    },
    {
        title: 'Fueling',
        status: 'FUELING',
        completed: false,
        actions: [
            {
                name: 'LIFTOFF',
                callback: () => {},
                style: {width: 88},
            },
            {
                name: 'ABORT',
                callback: () => {},
                style: {width: 88},
            }
        ],
        colors: {
            background: 'blue',
            text: 'black'
        },
        hideIfNotActive: false
    }
];

describe('<StatusStepper/>', function () {
  describe('Basic', function() {
    let wrapper;

    before(function() {
      wrapper = shallow(
        <StatusStepper
          currentStatus={'FUELING'}
          statuses={steps}
          />
      );
    });

    it('Displays # of statuses correctly', function () {
      expect(wrapper.find('span')).to.have.length(2);
    });

    it('Displays correct # of action buttons (and correct # for current status)', function () {
      expect(wrapper.find(FlatButton)).to.have.length(2);
    });

    it('Displays action button names correctly', function () {
      expect(wrapper.find(FlatButton).getNodes()[0].props['label']).to.equal('LIFTOFF');
      expect(wrapper.find(FlatButton).getNodes()[1].props['label']).to.equal('ABORT');
    });

    it('Displays status names correctly', function () {
      expect(wrapper.find('span').at(0).text()).to.equal('Inactive');
      expect(wrapper.find('span').at(1).text()).to.equal('Fueling');
    });
  });
});
