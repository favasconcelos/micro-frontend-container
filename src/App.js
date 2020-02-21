import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AppHeader from './components/AppHeader';
import About from './containers/About';
import Home from './containers/Home';
import Libraries from './containers/Libraries';
import Materials from './containers/Materials';

export default function App() {
  return (
    <BrowserRouter>
      <React.Fragment>
        <AppHeader />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/libraries" component={Libraries} />
          <Route exact path="/materials" component={Materials} />
          <Route exact path="/about" render={About} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}
