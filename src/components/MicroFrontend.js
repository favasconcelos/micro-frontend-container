import PropTypes from 'prop-types';
import React, { useCallback, useEffect } from 'react';

function getStringID(name) {
  return `${name}-script`;
}

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
  const addScript = useCallback((name, url, onload) => {
    const script = document.createElement('script');
    script.setAttribute('id', getStringID(name));
    script.setAttribute('src', url);
    script.onload = onload;
    document.head.appendChild(script);
  }, []);

  /**
   * Function used to add the microfrontend style into the container.
  */
  const addStyle = useCallback((name, url) => {
    const style = document.createElement('link');
    style.setAttribute('id', `${name}-style`);
    style.setAttribute('rel', 'stylesheet');
    style.setAttribute('href', url);
    document.head.appendChild(style);
  }, []);

  useEffect(() => {
    const mfName = `micro-frontend-${name}`;
    if (document.getElementById(getStringID(mfName))) {
      // if the microfrontend is already in the screen just render it
      renderMF();
    } else {
      // on the other hand we have to fetch the manifest and add the main.js bundle to the container
      fetch(`${host}/asset-manifest.json`)
        .then(res => res.json())
        .then(manifest => {
          addScript(mfName, `${manifest['files']['main.js']}`, renderMF);
          addStyle(mfName, `${manifest['files']['main.css']}`);
        });
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
