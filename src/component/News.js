import React, { Component } from 'react'
import Newsitem from './Newsitem'

export default class News extends Component {
  render() {
    return (
      <div>
        <h2>Star News - Top Headlines</h2>
        <Newsitem title="my Title" description="mydesc"/>
        <Newsitem/>
        <Newsitem/>
      </div>
    )
  }
}
