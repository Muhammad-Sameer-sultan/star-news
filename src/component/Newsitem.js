import React, { Component } from 'react'

export default class Newsitem extends Component {
  render() {
      let {title,description,imgUrl,newsUrl}=this.props;
    return (
        <div className="card m-2" style={{width:"18rem",height:"22rem"}}>
        <img src={imgUrl} className="card-img-top" style={{height:"8rem"}} alt="..."/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{description}</p>
          <a href={newsUrl} target='_blank' className="btn btn-primary btn-sm">Read more</a>
        </div>
      </div>
    )
  }
}
