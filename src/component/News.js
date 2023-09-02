import React, { Component } from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "technology",
    totalResults: 0,
  };
  PropTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  upperFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    // console.log('this is working');
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
    document.title = `Star News | ${this.upperFirstLetter(
      this.props.category
    )}`;
  }

  async update() {
    this.props.setProgress(0);
    let apiKey = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.mykey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    this.props.setProgress(25);
    let response = await fetch(apiKey);
    this.props.setProgress(50);
    let data = await response.json();
    this.props.setProgress(75);
    
    this.setState({
      articles: data.articles,
      totalResults: data.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  async componentDidMount() {
    this.update();
    // let apiKey = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4f98bb28921249eb9de2a024698f34c4&page=1&pageSize=${this.props.pageSize}`;
    // this.setState({loading: true})
    // let response = await fetch(apiKey);
    // let data = await response.json();

    // this.setState({ articles: data.articles, totalResults: data.totalResults,loading: false });
  }

  //   handlerNext = async () => {
  //     if (this.state.page + 1 > Math.ceil(this.state.totalResults / this.pageSize)) {
  //       // console.log("if")
  //     } else {
  //     //   let apiKey = `https://newsapi.org/v2/top-headlines?country=${
  //     //     this.props.country
  //     //   }&category=${
  //     //     this.props.category
  //     //   }&apiKey=4f98bb28921249eb9de2a024698f34c4&page=${
  //     //     this.state.page + 1
  //     //   }&pageSize=${this.props.pageSize}`;
  //     //   let response = await fetch(apiKey);
  //     //   let data = await response.json();
  //     this.setState({
  //       page: this.state.page + 1,
  //   })
  //   this.update();
  //       };

  // // console.log(this.state.page,this.state.totalResults,this.pageSize);
  // // console.log( Math.ceil(this.state.totalResults / this.pageSize));
  // // console.log(this.state.page + 1 > Math.ceil(this.state.totalResults / this.pageSize));
  //   };

  // handlerPrevious = async () => {
  //   // let apiKey = `https://newsapi.org/v2/top-headlines?country=${
  //   //   this.props.country
  //   // }&category=${
  //   //   this.props.category
  //   // }&apiKey=4f98bb28921249eb9de2a024698f34c4&page=${
  //   //   this.state.page - 1
  //   // }&pageSize=${this.props.pageSize}`;
  //   // let response = await fetch(apiKey);
  //   // let data = await response.json();

  //   // this.setState({ articles: data.articles });
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.update();
  // };

  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });
    let apiKey = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.mykey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let response = await fetch(apiKey);
    let data = await response.json();

    this.setState({
      articles: this.state.articles.concat(data.articles),
      totalResults: data.totalResults,
      loading: false,
    });
    console.log(this.state.articles.length)
  };
  render() {
    return (
      <>
        <h2 className="text-center my-3">
          Star News - Top {this.upperFirstLetter(this.props.category)} Headlines
        </h2>
        {/* {this.state.loading &&<Spinner/>} */}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length < this.state.totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            {
              <div className="row -3">
                {this.state.articles.map((element, index) => {
  // Check if 'element' is defined before accessing its properties
  if (element) {
    return (
      <div className="col-md-4" key={index}>
        <Newsitem
          title={element.title ? element.title.slice(0, 30) : ""}
          description={element.description ? element.description.slice(0, 88) : ""}
          imgUrl={element.urlToImage ? element.urlToImage : "https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"}
          newsUrl={element.url ? element.url : ""}
          author={element.author ? element.author : ""}
          date={element.publishedAt ? element.publishedAt : ""}
          source={element.source && element.source.name ? element.source.name : ""}
        />
      </div>
    );
  } else {
    // Handle the case where 'element' is undefined
    return null;
  }
})}

              </div>
            }
          </div>
        </InfiniteScroll>
        {/* <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page > 1 ? false : true}
            className="btn btn-primary "
            onClick={this.handlerPrevious}
          >
            &larr; Previous
          </button>
          <button 
          disabled= {this.state.page  > Math.ceil(this.state.totalResults / this.pageSize)?true:false}
          
          className="btn btn-primary " onClick={this.handlerNext}>
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  }
}
