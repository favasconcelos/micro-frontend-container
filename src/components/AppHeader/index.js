import './AppHeader.scss';

import React from 'react';
import { NavLink } from 'react-router-dom';

const AppHeader = () => {
  return (
    <header>
      <h1>Creation Portal</h1>
      <nav>
        <ul>
          <li>
            <NavLink to="/">Home</NavLink>
          </li>
          <li>
            <NavLink to="/libraries">Libraries</NavLink>
          </li>
          <li>
            <NavLink to="/materials">Materials</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default AppHeader;
