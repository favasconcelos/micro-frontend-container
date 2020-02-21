import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';

const MicroFrontend = ({ name, host, history }) => {
  /**
   * Function used to render the microfrontend into the container.
   */
  const renderMF = useCallback(() => {
    const key = `render${name}`;
    window[key] && window[key](`${name}-container`, history);
  }, [history, name]);

  /**
   * Function used to unmoun the microfontend from the container.
   */
  const unmountMF = useCallback(() => {
    const key = `unmount${name}`;
    window[key] && window[key](`${name}-container`);
  }, [name]);

  /**
   * Function used to add the microfrontend code into the container.
   */
  const addScript = useCallback((scriptId, url, onload) => {
    const script = document.createElement('script');
    script.setAttribute('id', scriptId);
    script.setAttribute('src', url);
    script.onload = onload;
    document.head.appendChild(script);
  }, []);

  useEffect(() => {
    const scriptId = `micro-frontend-script-${name}`;
    if (document.getElementById(scriptId)) {
      // if the microfrontend is already in the screen just render it
      renderMF();
    } else {
      // on the other hand we have to fetch the manifest and add the main.js bundle to the container
      fetch(`${host}/asset-manifest.json`)
        .then(res => res.json())
        .then(manifest => addScript(scriptId, `${manifest['files']['main.js']}`, renderMF));
    }
    return () => unmountMF();
  }, [host, name, renderMF, unmountMF, addScript]);

  return <main id={`${name}-container`} />;
};

MicroFrontend.propTypes = {
  name: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  history: PropTypes.any,
};

export default MicroFrontend;
