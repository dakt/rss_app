import { History } from "history";

import { SourceStore } from "./SourcesStore";
import { NewsStore } from "./NewsStore";
import { RouterStore } from "./RouterStore";

export class RootStore {

  News: NewsStore = new NewsStore(this);
  Sources: SourceStore = new SourceStore(this);
  Router: RouterStore;

  constructor(history: History) {
    this.Router = new RouterStore(history);
  }
}