import React, { Component } from 'react';
import './App.css';
import PharManager from './containers/PharManager/PharManager';
import {BrowserRouter } from 'react-router-dom';
import {Provider} from 'react-redux';
import store from './store';

class App extends Component{
  render(){
    return (
      <Provider store={store}>
        <BrowserRouter>
          <PharManager />
        </BrowserRouter>
      </Provider>
    );

  }

}


export default App;
