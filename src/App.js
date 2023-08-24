import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./component/Navbar";
import News from "./component/News";

export default function App() {
  return (
    <div>
      <Router>
        <Navbar />  
        <Routes>
          <Route exact path="/business" element={<News key="business" country="us" pageSize={15} category="business" />} />
          <Route exact path="/entertainment" element={<News key="entertainment" country="us" pageSize={15} category="entertainment" />} />
          
          <Route exact path="/general" element={<News key="general" country="us" pageSize={15} category="general" />} />
          <Route exact path="/health" element={<News key="health" country="us" pageSize={15} category="health" />} />
          <Route exact path="/sport" element={<News key="sport" country="us" pageSize={15} category="sport" />} />
          <Route exact path="/science" element={<News key="science" country="us" pageSize={15} category="science" />} />
         
        </Routes>
      </Router>
    </div>
  );
}
