import React from 'react';
import { Route, Routes, useLocation } from 'react-router';

// SCSS
import "./asset/scss/layout.scss"

// 컴포넌트
import Header from './comp/Header/Header';
import Footer from './comp/Footer/Footer';

// 라우터
import Main from './router/Main/Main';
import Login from './router/User/Login/Login';
import Cart from './router/Cart/Cart';
import List from './router/List/List';

import Sign from './router/User/Sign/Sign';
import IdFind from './router/User/IdFind/IdFind';

import Slang from './router/Slang/Slang';
import Detail from './router/Detail/Detail';
import Buy from './router/Buy/Buy';
import Complete from './router/Complete/Complete';
import History from './router/History/Index/History';
import More from './router/History/More/More';

// 권한라우터
import AuthRouter from './Hoc/AuthRouter';
import PassFind from './router/User/PassFind/PassFind';


function App() {

  const router = useLocation();

  return (
    <div className="App">
      <Header pathSplit={router.pathname.split('/')[1]} />
      
      <Routes>

        <Route path='/'>

          {/* 메인페이지 */}
          <Route index  element={<Main/>} ></Route>
          
          {/* 유저관련 라우터 */}
          <Route path='login' element={<Login/>}/>
          <Route path='idfind' element={<IdFind/>}/>
          <Route path='passfind' element={<PassFind/>}/>
          <Route path='sign' element={<Sign/>}/>
          
          {/* 장바구니 */}
          <Route path='cart' element={<AuthRouter><Cart/></AuthRouter>}/>

          {/* 상품리스트 */}
          <Route path='list'>
            <Route path=':cate' element={<List/>} />
          </Route>

          {/* 찜목록 */}
          <Route path='slang' element={<Slang/>}/>

          {/* 상품정보 */}
          <Route path="detail">
            <Route path=":id" element={<Detail/>}/>
            {/* <Route path="write/:id" element={<Wirte/>} /> */}
          </Route>

          {/* 구매페이지 */}
          <Route path='buy' element={<Buy/>} />

          {/* 구매 완료페이지 */}
          <Route path='complete/:token' element={<Complete/>} />

          {/* 구매내역 */}
          <Route path='history'>
            <Route index element={<History/>} />
            <Route path='more/:token' element={<More/>} />
          </Route>


        </Route>

      </Routes>

      <Footer/>
    </div>
  );
}

export default App;
