import React from 'react';
import { inject, observer } from "mobx-react";
import { Switch, Route } from "react-router-dom";

import { RootStore } from "../stores/RootStore";
import News from "./News";

interface IProps {
  stores?: RootStore;
}

@inject("stores")
@observer
export default class NewsRoutes extends React.Component<IProps> {

  componentDidMount() {
    this.props.stores!.Sources.get();
  }

  render() {
    return (
      <Switch>
        <Route exact={true} path="/" children={<News />} />
        {this.props.stores!.Sources.data.map(source => (
          <Route
            key={source.id}
            exact={true}
            path={`/sources/${source.id}/news/`}
            children={<News source={source} />}
          />
        ))}
      </Switch>
    );
  }
}
