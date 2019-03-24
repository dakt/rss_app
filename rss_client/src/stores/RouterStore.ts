import { History, Location } from "history";

export class RouterStore {

  history: History;

  location: Location;
  
  public constructor(history: History) {
    this.history = history;
    this.location = history.location;
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.history.listen(this.handleLocationChange);
  }

  public replaceQueryString(queryString: URLSearchParams) {
    const newPath = `${this.location.pathname}?${queryString.toString()}`;
    this.history.replace(newPath);
  }

  private handleLocationChange(location: Location) {
    this.location = location;
  }
}