import React from 'react';
import './App.css';
import './Components/Layout/Menu.css';
import Home from './Components/Home.js';
import {BrowserRouter as Router,Switch, Route, Link} from "react-router-dom";



const App = () => {


  return (
    <div>
      <div className='body'>
        <Home/>

        


      </div>
      
    </div>
  );
};

export default App;