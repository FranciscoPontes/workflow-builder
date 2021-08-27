import React from 'react';
import Layout from './components/Layout';
import { ITemplateData } from './samples/phases-states-sample';

const App = (props : ITemplateData) => {
  return (
    <div>
      <Layout data={props}/>
    </div>
  );
}

export default App;