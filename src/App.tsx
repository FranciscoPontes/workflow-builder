import React from 'react';
import Layout, { ILayout } from './components/Layout';

const App = (data : ILayout) => {
  return (
    <div>
      <Layout 
        appCode={data.appCode}
        DBTier={data.DBTier}
        baseURL={data.baseURL}
      />
    </div>
  );
}

export default App;