import React from 'react';
import { inject, observer } from "mobx-react";
import { Link } from "react-router-dom";
import { debounce } from "lodash-es";

import { RootStore } from "../stores/RootStore";
import { Source } from '../models/Source';

interface IProps {
  stores?: RootStore;
  source?: Source;
}

@inject("stores")
@observer
export default class Navigation extends React.Component<IProps> {

  constructor(props: IProps) {
    super(props);

    this.search = debounce(this.search.bind(this), 300);
    this.handleSearchTextChange = this.handleSearchTextChange.bind(this);
  }

  search(text: string) {
    this.props.stores!.News.updateFilter({ search: text });
  }

  handleSearchTextChange(event: React.ChangeEvent<HTMLInputElement>) {
    this.search(event.target.value);
  }

  render() {
    return (
      <nav className="navbar is-warning" role="navigation" aria-label="main navigation">
        <div className="navbar-brand">
          
        </div>
        <Link to="/" className={`navbar-item ${this.props.source || "is-active"}`}>Svi</Link>
        {this.props.stores!.Sources.data.map(source => (
          <Link
            key={source.id}
            to={`/sources/${source.id}/news/`}
            className={`navbar-item ${this.props.source === source && "is-active"}`}
          >{source.title}</Link>
        ))}
        <div className={"navbar-item"}>
          <div className={`control ${this.props.stores!.News.isLoading && "is-loading"}`}>
            <input
              type="text"
              className={"input is-rounded"}
              placeholder="Pretraži..."
              onChange={this.handleSearchTextChange}
            />
          </div>
        </div>
      </nav>
    );
  }
}
