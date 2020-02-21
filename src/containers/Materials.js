import PropTypes from 'prop-types';
import React from 'react';

import MicroFrontend from '../components/MicroFrontend';

const Materials = ({ history }) => <MicroFrontend history={history} host={process.env.REACT_APP_MATERIALS_HOST} name="Materials" />;

Materials.propTypes = {
  history: PropTypes.any,
};

export default Materials;
