import React, { Component } from "react";
import Newsitem from "./Newsitem";
import PropTypes from 'prop-types'


export default class News extends Component {

    static defaultProps={
      country: 'in',
      pageSize: 8, 
      category: 'technology'
    };
     PropTypes={
       country: PropTypes.string,
      pageSize: PropTypes.number, 
      category: PropTypes.string,
    }
    

    constructor(){
      super();
        // console.log('this is working');
        this.state={
          articles: [],
          loading: false,
          page: 1,
          

        }
    }

    async componentDidMount() {
      let apiKey=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4f98bb28921249eb9de2a024698f34c4&page=1&pageSize=${this.props.pageSize}`;
      let response = await fetch(apiKey);
      let data = await response.json();
      console.log(data);
    this.setState({articles: data.articles,
      totalResults: data.totalResults
    })
      

      }
    
    

    handlerNext=async()=>{
      if(this.state.page+1 > Math.ceil(this.state.totalResults/30)){
        // console.log("if")
      }
      else{
        let apiKey=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4f98bb28921249eb9de2a024698f34c4&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let response = await fetch(apiKey);
        let data = await response.json();
        console.log(data);
        this.setState({articles: data.articles})
      this.setState({
        page: this.state.page +1
      }) 
      }
  
    }

    handlerPrevious=async()=>{
      let apiKey=`https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=4f98bb28921249eb9de2a024698f34c4&page=${this.state.page -1}&pageSize=${this.props.pageSize}`;
      let response = await fetch(apiKey);
      let data = await response.json();
      console.log(data);
      this.setState({articles: data.articles})
    this.setState({
      page: this.state.page -1
    })
    }
  render() {
    return (
      <div className="container my-4">
        <h2>Star News - Top Headlines</h2>
        <div className="row -3">

          {this.state.articles.map((element)=>{
            return <div className="col-md-4 " key={element.url}>
            <Newsitem  title={element.title?element.title.slice(0,30):""} description={element.description?element.description.slice(0,88):""} imgUrl={element.urlToImage?element.urlToImage:"https://www.publicdomainpictures.net/pictures/280000/velka/not-found-image-15383864787lu.jpg"} newsUrl={element.url}/>
          </div>
          })}
          
        
        </div>
        <div className="d-flex justify-content-between">
          <button disabled={this.state.page>1?false:true} className="btn btn-primary " onClick={this.handlerPrevious}>&larr; Previous</button>
          <button  className="btn btn-primary " onClick={this.handlerNext}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}
