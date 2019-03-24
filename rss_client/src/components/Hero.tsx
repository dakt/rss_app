import React from "react";
import { inject, observer } from "mobx-react";

import { RootStore } from "../stores/RootStore";

export default inject("stores")(observer((props: { stores?: RootStore, title?: string }) => (
  <section className="hero is-dark">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">{props.title ? props.title : "Svi"}</h1>
      </div>
    </div>
  </section>
)));