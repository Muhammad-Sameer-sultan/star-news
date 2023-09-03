import React,{useState,useEffect} from "react";
import Newsitem from "./Newsitem";
import PropTypes from "prop-types";
import Spinner from "./Spinner";
import InfiniteScroll from "react-infinite-scroll-component";

const News=(props)=> {

  const upperFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  const [articles,setArticles]=useState([])
  const [loading,setLoading]=useState(false)
  const [page,setPage]=useState()
 
  const [totalResults,settotalResults]=useState(1)

  document.title = `Star News | ${upperFirstLetter(
    props.category
  )}`;


  const update= async ()=> {
    props.setProgress(0);
    let apiKey = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.mykey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    props.setProgress(25);
    let response = await fetch(apiKey);
    props.setProgress(50);
    
   
    let data = await response.json();
    props.setProgress(75);
    setArticles(data.articles)
    settotalResults(data.totalResults)
    setLoading(false)
    props.setProgress(100);
  }

  useEffect(()=>{
    update(); 
  },)
 
  //   handlerNext = async () => {
  //     if ( setPage(page + 1)  > Math.ceil(totalResults /pageSize)) {
  //       // console.log("if")
  //     } else {
  //     //   let apiKey = `https://newsapi.org/v2/top-headlines?country=${
  //     //     props.country
  //     //   }&category=${
  //     //     props.category
  //     //   }&apiKey=4f98bb28921249eb9de2a024698f34c4&page=${
  //     //     state.page + 1
  //     //   }&pageSize=${props.pageSize}`;
  //     //   let response = await fetch(apiKey);
  //     //   let data = await response.json();
  //     setPage(page + 1,)
  //   update();
  //       };
  //   };

  // handlerPrevious = async () => {
  //   // let apiKey = `https://newsapi.org/v2/top-headlines?country=${
  //   //   props.country
  //   // }&category=${
  //   //   props.category
  //   // }&apiKey=4f98bb28921249eb9de2a024698f34c4&page=${
  //   //   state.page - 1
  //   // }&pageSize=${props.pageSize}`;
  //   // let response = await fetch(apiKey);
  //   // let data = await response.json();

  //   // setStateArticles(data.articles);
  //   setPage(page - 1)
  //   update();
  // };

  const fetchMoreData = async () => {
    setPage(page + 1);
    let apiKey = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.mykey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true)
    let response = await fetch(apiKey);
    let data = await response.json();

setArticles(articles.concat(data.articles))
settotalResults(data.totalResults)
setLoading(false)
 
  };
  
    return (
      <>
        <h2 className="text-center my-3">
          Star News - Top {upperFirstLetter(props.category)} Headlines
        </h2>
      {loading&& <Spinner/>}
        <InfiniteScroll
          dataLength={articles.length}
          next={fetchMoreData}
          hasMore={articles.length < totalResults}
          loader={<Spinner />}
        >
          <div className="container">
            {
              <div className="row -3">
                {articles.map((element, index) => {
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
            disabled={page > 1 ? false : true}
            className="btn btn-primary "
            onClick={handlerPrevious}
          >
            &larr; Previous
          </button>
          <button 
          disabled= {page  > Math.ceil(totalResults / pageSize)?true:false}
          
          className="btn btn-primary " onClick={handlerNext}>
            Next &rarr;
          </button>
        </div> */}
      </>
    );
  
}
News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "technology",
  totalResults: 0,
};
News.propTypes = {
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string,
};
export default News;