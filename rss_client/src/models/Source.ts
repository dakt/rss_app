export interface ISource {
  id: number;
  title: string;
  url: string;
}

export class Source implements ISource {

  id: number;
  
  title: string;

  url: string;

  public constructor(source: ISource) {
    this.id = source.id;
    this.title = source.title;
    this.url = source.url;
  }
}