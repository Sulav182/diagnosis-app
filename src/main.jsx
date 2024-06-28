import React from 'react'
import * as ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'
import './index.css'
import { registerSW } from 'virtual:pwa-register'
registerSW({ immediate: true })

console.log(
  "version 1.0.0"
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
)
