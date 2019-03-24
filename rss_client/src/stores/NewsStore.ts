import { action, observable } from "mobx";

import api from "../utils/api";
import { Collection } from "./types";
import { News } from "../models/News";
import { Source } from "../models/Source";

interface IFilter {
  page: number;
  pageSize: number;
  search: string;
}

export class NewsStore extends Collection<News> {

  @observable
  filter: IFilter = {
    page: 1,
    pageSize: 10,
    search: "",
  }

  @action
  public initialize() {
    const { location } = this.stores.Router;
    const urlSearchParams = new URLSearchParams(location.search);

    this.filter.page = Number(urlSearchParams.get("page")) || 1;
    this.filter.pageSize = Number(urlSearchParams.get("pageSize")) || 10;
    this.filter.search = urlSearchParams.get("search") || "";
    this.updateFilter();
  }

  @action
  public updateFilter(filter?: Partial<IFilter>) {
    if (filter) {
      this.filter = { ...this.filter, ...filter };
    }

    /* Sync querystring with history */
    this.stores.Router.replaceQueryString(new URLSearchParams({
      page: this.filter.page.toString(),
      pageSize: this.filter.pageSize.toString(),
      search: this.filter.search,
    }));

    this.get();
  }

  @action
  public async get() {
    const { location } = this.stores.Router;
    
    const urlSearchParams = new URLSearchParams({
      page: this.filter.page.toString(),
      page_size: this.filter.pageSize.toString(),
      search: this.filter.search,
    });

    const url = location.pathname === "/" ? "/news/" : location.pathname;

    try {
      this.setStatus("loading");
      const response = await api.get(`${url}?${urlSearchParams.toString()}`);
      this.setStatus("loaded");
      const news = response.data.results.map(this._mapServiceResult);
      this.setData(news, response.data.count);
    } catch(error) {
      this.setStatus("error");
    }
  }

  private _mapServiceResult(item: any) {
    return new News({
      guid: item.guid,
      title: item.title,
      link: item.link,
      category: item.category,
      description: item.description,
      imageUrl: item.image_url,
      publishDate: new Date(item.publish_date),
      sources: item.sources.map((source: any) => new Source({
        id: source.id,
        title: source.title,
        url: source.url,
      })),
    });
  }
}