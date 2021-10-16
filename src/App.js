import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './App.css';

class App extends Component {
     constructor(props){
        super(props);
    }

    render() {
        return (
            <div className="App">
            
                  <Link to="/login">Welcome to ABC banking Become a Customer</Link>
           </div>
        );  
    }
}

export default App;
