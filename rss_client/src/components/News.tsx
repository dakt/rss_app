import * as React from "react";
import { inject, observer } from "mobx-react";
import ReactPaginate from "react-paginate";

import { Source } from "../models/Source";
import { News } from "../models/News";
import { RootStore } from "../stores/RootStore";
import Footer from "./Footer";
import Hero from "./Hero";
import Navigation from "./Navigation";

const FALLBACK_NEWS_IMAGE = "https://www.logolynx.com/images/logolynx/bc/bc65e13a1b3a444b696dff5b7b4a0d99.jpeg"

interface IProps {
  stores?: RootStore;
  source?: Source;
}

@inject("stores")
@observer
export default class NewsPage extends React.Component<IProps> {

  public constructor(props: IProps) {
    super(props);

    this.handlePageChange = this.handlePageChange.bind(this);
  }

  componentDidMount() {
    this.props.stores!.News.initialize();
  }

  handlePageChange(selectedItem: { selected: number }) {
    this.props.stores!.News.updateFilter({ page: selectedItem.selected + 1 });
  }

  public renderNewsCard(news: News) {
    return (
      <a href={news.link} className="card">
        <div className="card-image">
          <figure className="image is-4by3">
            <img
              src={news.imageUrl ? news.imageUrl : FALLBACK_NEWS_IMAGE}
              alt="Placeholder image"
            />
          </figure>
        </div>
        <div className="card-content">
          <div className="media">
            <div className="media-content">
              <p className="title is-4">{news.title}</p>
              <p className="subtitle is-6">
                {news.publishDate.toLocaleDateString()}
              </p>
            </div>
          </div>
          <div className="content">
            <p>{news.description}</p>
            {news.sources.map(source => (
              <span key={source.id} className="tag" style={{ marginRight: 5 }}>
                {source.title}
              </span>
            ))}
            <br />
          </div>
        </div>
      </a>
    );
  }

  public render() {
    const { News } = this.props.stores!;

    return (
      <>
        <Navigation source={this.props.source} />
        <Hero title={this.props.source && this.props.source.title} />
        <section className="section">
          <div className="container">
            <div className="columns is-multiline">
              {this.props.stores!.News.data.map(news => (
                <div key={news.guid} className="column is-4">
                  {this.renderNewsCard(news)}
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section">
          <div className="container" style={{ maxWidth: 600 }}>
            <ReactPaginate
              forcePage={News.filter.page - 1}
              pageCount={Math.ceil(News.count / 10)}
              pageRangeDisplayed={10}
              marginPagesDisplayed={10}
              previousLabel="Predhodna"
              nextLabel="Sljedece"
              containerClassName="pagination"
              pageLinkClassName="pagination-link"
              previousLinkClassName="pagination-previous"
              nextLinkClassName="pagination-next"
              activeLinkClassName="pagination-link is-current"
              onPageChange={this.handlePageChange}
            />
          </div>
          </section>
        <Footer />
      </>
    );
  }
}