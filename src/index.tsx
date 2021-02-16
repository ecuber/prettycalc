import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import reportWebVitals from './reportWebVitals'
import { setBreakpoints } from './Components/visly'

const bootstrap = 'https://maxcdn.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css'
const integrity = 'sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk'

setBreakpoints('min-width', ['800px', '1200px'])

ReactDOM.render(
  <React.StrictMode>
    <link rel='stylesheet' href={bootstrap} integrity={integrity} crossOrigin='anonymous'/>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
)

// https://bit.ly/CRA-vitals
reportWebVitals()
