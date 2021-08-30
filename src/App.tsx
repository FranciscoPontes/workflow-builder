import React from 'react';
import Layout from './components/Layout';

interface IApp {
  appCode: string
}

const App = ({appCode} : IApp) => {
  return (
    <div>
      <Layout appCode={appCode}/>
    </div>
  );
}

export default App;