import React from 'react';
import './App.css';
// import Table from './components/Table';
import SWProvider from './context/SWprovider';

class App extends React.Component {
  render(): React.ReactNode {
    return (
      <SWProvider>
        {/* <Table /> */}
      </SWProvider>
    );
  }
}
export default App;
