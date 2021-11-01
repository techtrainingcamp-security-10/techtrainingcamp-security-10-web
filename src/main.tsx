import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { SWRConfig } from 'swr'

ReactDOM.render(
  <HashRouter>
    <SWRConfig value={{ fetcher: url => fetch(url).then(x => x.json()) }}>
      <App />
    </SWRConfig>
  </HashRouter>,
  document.getElementById('root')
)
