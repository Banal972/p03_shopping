import React from 'react';
import { Route, Routes } from 'react-router';
import Main from './router/Main/Main';
import Header from './comp/Header/Header';
import Footer from './comp/Footer/Footer';
import Login from './router/Login/Login';
import Cart from './router/Cart/Cart';
import List from './router/List/List';

function App() {
  return (
    <div className="App">
      <Header/>
      <Routes>
        <Route path='/'>
          <Route index  element={<Main/>} ></Route>
          <Route path='login' element={<Login/>}/>
          <Route path='cart' element={<Cart/>}/>
          <Route path='list'>
            <Route path=':cate' element={<List/>} />
          </Route>
        </Route>
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
