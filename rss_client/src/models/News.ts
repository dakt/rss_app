import { observable } from "mobx";

import { Source } from "./Source"

export interface INews {
  guid: string;
  title: string;
  link: string;
  description: string;
  imageUrl?: string;
  publishDate: Date;
  category: string;
  sources: Source[];
}

export class News implements INews {

  @observable
  guid: string;

  @observable
  title: string;

  @observable
  link: string;

  @observable
  description: string;

  @observable
  imageUrl?: string;

  @observable
  publishDate: Date;

  @observable
  category: string;

  @observable
  sources: Source[];
  
  public constructor(news: INews) {
    this.guid = news.guid;
    this.title = news.title;
    this.link = news.link;
    this.description = news.description;
    this.imageUrl = news.imageUrl;
    this.publishDate = news.publishDate;
    this.category = news.category;
    this.sources = news.sources;
  }
}