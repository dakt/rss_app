import { observable, action } from "mobx";

import { RootStore } from "../stores/RootStore";

export type CollectionAsyncStatus = "initial"|"loading"|"loaded"|"error"

export class Collection<T> {

  @observable
  data: T[] = [];

  @observable
  count: number = 0;

  @observable
  status: CollectionAsyncStatus = "initial";

  stores: RootStore;

  public constructor(rootStore: RootStore) {
    this.stores = rootStore;
  }

  @action
  public setData(data: T[], count?: number) {
    this.data = data;
    if (count !== undefined) {
      this.count = count;
    }
  }

  @action
  public setStatus(status: CollectionAsyncStatus) {
    this.status = status;
  }

  public get isLoading() {
    return this.status === "loading";
  }
}