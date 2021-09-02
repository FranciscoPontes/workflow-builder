import React from 'react'
import Layout, { ILayout } from './components/Layout'

const App = ({ props }: ILayout) => {
  return (
    <div>
      <Layout props={props} />
    </div>
  )
}

export default App
