import PropTypes from 'prop-types';
import React from 'react';

import MicroFrontend from '../components/MicroFrontend';

const Libraries = ({ history }) => <MicroFrontend history={history} host={process.env.REACT_APP_LIBRARIES_HOST} name="Libraries" />;

Libraries.propTypes = {
  history: PropTypes.any,
};

export default Libraries;
