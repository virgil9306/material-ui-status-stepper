import React from 'react';
import { shallow } from 'enzyme';
import {describe, it, before, after} from 'mocha';
import {expect} from 'chai';
import sinon from 'sinon';
import StatusStepper from '../src/index.js';

import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {Card, CardActions} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton';

// describe('<StatusStepper />', function() {
//   describe('Basic', function() {
//     let wrapper;
//     const muiTheme = getMuiTheme();
//
//     before(function() {
//       // shallow rendering
//       wrapper = shallow(
//         <StatusStepper
//           />,
//         {
//           context: {muiTheme: muiTheme},
//         }
//       );
//     });
//
//     it('should render table header', function() {
//       expect(1).to.equal(1);
//     });
//
//   });
// });
