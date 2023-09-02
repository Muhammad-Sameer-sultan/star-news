import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import News from "./component/News";
import LoadingBar from 'react-top-loading-bar'


export default class App extends Component {

  page=30;
  apiKey=process.env.REACT_APP_API_KEY

  state={
    progess:0
  }
  setProgress =(progess)=>{
    this.setState({progess:progess})
  }
  render(){
    return (
      <div>
      <Router>
        <Navbar />  
   
        <LoadingBar
        color='red'
        progress={this.state.progess}
        height={5}
       
      />
        <Routes>
          <Route exact path="/" element={<News  setProgress={this.setProgress}
 key="technology" country="us" pageSize={this.page} mykey={this.apiKey} category="technology" />} />
          <Route exact path="/business" element={<News  setProgress={this.setProgress}
 key="business" country="us" pageSize={this.page} mykey={this.apiKey} category="business" />} />
          <Route exact path="/entertainment" element={<News  setProgress={this.setProgress}
 key="entertainment" country="us" pageSize={this.page} mykey={this.apiKey} category="entertainment" />} />
          
          <Route exact path="/general" element={<News  setProgress={this.setProgress}
 key="general" country="us" pageSize={this.page} mykey={this.apiKey} category="general" />} />
          <Route exact path="/health" element={<News  setProgress={this.setProgress}
 key="health" country="us" pageSize={this.page} mykey={this.apiKey} category="health" />} />
          <Route exact path="/sport" element={<News  setProgress={this.setProgress}
 key="sport" country="us" pageSize={this.page} mykey={this.apiKey} category="sport" />} />
          <Route exact path="/science" element={<News  setProgress={this.setProgress}
 key="science" country="us" pageSize={this.page} mykey={this.apiKey} category="science" />} />
         
        </Routes>
      </Router>
    </div>
  );
  }
}
