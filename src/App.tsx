import React from 'react';
import { Route, Routes, useLocation } from 'react-router';
import Main from './router/Main/Main';
import Header from './comp/Header/Header';
import Footer from './comp/Footer/Footer';
import Login from './router/Login/Login';
import Cart from './router/Cart/Cart';
import List from './router/List/List';
import Sign from './router/Sign/Sign';
import AuthRouter from './Hoc/AuthRouter';
import Slang from './router/Slang/Slang';

function App() {

  const router = useLocation();

  return (
    <div className="App">
      <Header pathSplit={router.pathname.split('/')[1]} />
      <Routes>
        <Route path='/'>
          <Route index  element={<Main/>} ></Route>
          <Route path='login' element={<Login/>}/>
          <Route path='cart' element={<AuthRouter><Cart/></AuthRouter>}/>
          <Route path='list'>
            <Route path=':cate' element={<List/>} />
          </Route>
          <Route path='sign' element={<Sign/>}/>
          <Route path='slang' element={<Slang/>}/>
        </Route>
      </Routes>
      {/* <Footer/> */}
    </div>
  );
}

export default App;
