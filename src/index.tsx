import React from 'react';

import { StatusBar } from 'react-native';
import Main from './pages/Home';

const App: React.FC = () => {
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#000" />
      <Main />
    </>
  );
};

export default App;
