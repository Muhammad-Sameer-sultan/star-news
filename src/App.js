import React, { Component } from 'react'
import Navbar from './component/Navbar'
import News from './component/News'

export default class App extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <News country='us' PageSize={15} category='sports' />
      </div>
    )
  }
}
