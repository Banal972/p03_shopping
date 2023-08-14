import React from 'react';
import { Route, Routes } from 'react-router';
import Main from './router/Main/Main';
import Header from './comp/Header/Header';
import Footer from './comp/Footer/Footer';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/' element={<Main/>} />
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
