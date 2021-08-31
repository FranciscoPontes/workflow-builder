import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store'

const start = (data, node) => {
  ReactDOM.render(
    <Provider store={store}>
      <App appCode={data.appCode} DBTier={data.DBTier} />
    </Provider>,
    node,
  )
}

export { start }
