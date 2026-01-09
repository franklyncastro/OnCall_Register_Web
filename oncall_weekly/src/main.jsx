import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '../src/style/index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
import "./style/theme.css";
import "./style/global.css"

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
