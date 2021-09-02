import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.tsx'
import { Provider } from 'react-redux'
import store from './store/store'

const start = (data, node) => {
  ReactDOM.render(
    <Provider store={store}>
      <App props={data} />
    </Provider>,
    node,
  )
}

export { start }
