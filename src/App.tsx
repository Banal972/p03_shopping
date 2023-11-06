import React from 'react';
import { Route, Routes, useLocation } from 'react-router';

// SCSS
import "./asset/scss/layout.scss"

// 컴포넌트
import Header from './comp/Header/Header';
import Footer from './comp/Footer/Footer';

// 라우터
import Main from './router/Main/Main';
import Login from './router/Login/Login';
import Cart from './router/Cart/Cart';
import List from './router/List/List';
import Sign from './router/Sign/Sign';
import Slang from './router/Slang/Slang';
import Detail from './router/Detail/Detail';

// 권한라우터
import AuthRouter from './Hoc/AuthRouter';
import Buy from './router/Buy/Buy';


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

          <Route path="/detail">
            <Route path=":id" element={<Detail/>}/>
            {/* <Route path="write/:id" element={<Wirte/>} /> */}
          </Route>

          <Route path='buy' element={<Buy/>} />

          <Route path='sign' element={<Sign/>}/>

          <Route path='slang' element={<Slang/>}/>

        </Route>
      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
