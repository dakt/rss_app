import React, { Component } from 'react';
import { Provider } from "mobx-react";
import { Router, Route, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import { RootStore } from "./stores/RootStore";
import NewsRoutes from "./components/NewsRoutes";

const history = createBrowserHistory();

class App extends Component {
  render() {
    return (
      <Provider stores={new RootStore(history)}>
        <Router history={history}>
          <NewsRoutes />
        </Router>
      </Provider>
    );
  }
}

export default App;
