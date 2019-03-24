import api from "../utils/api"
import { Collection } from "./types";
import { Source } from "../models/Source";

export class SourceStore extends Collection<Source> {
  public async get() {
    try {
      this.setStatus("loading");
      const response = await api.get("/sources/");
      this.setStatus("loaded");
      const sources = response.data.results.map((item: any) => new Source({
        id: item.id,
        title: item.title,
        url: item.url,
      }));

      this.setData(sources);
    } catch(error) {
      this.setStatus("error");
    }
  }
}