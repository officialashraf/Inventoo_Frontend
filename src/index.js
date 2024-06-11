import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import {Provider} from "react-redux"
import store from "./store"
import { positions, transitions, Provider as AlertProvider} from "react-alert"
import  AlertTemplate  from 'react-alert-template-basic';
//http://localhost:4000/api/v1/login
const root = ReactDOM.createRoot(document.getElementById('root'));
const options = {
  transition: transitions.SCALE,
  position: positions.BOTTOM_CENTER,
  timeout:5000
  }
root.render(
  <Provider store={store} >
    <AlertProvider template={AlertTemplate} {...options}>
    <App />
    </AlertProvider>
  </Provider>
);
