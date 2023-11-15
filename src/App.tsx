import React from 'react';
import { Route, Routes, useLocation } from 'react-router';

// SCSS
import "./asset/scss/layout.scss"

// 컴포넌트
import Header from './comp/Header/Header';
import Footer from './comp/Footer/Footer';

// 라우터
import Main from './router/Main/Main';

// 유저 관련
import Login from './router/User/Login/Login';
import Sign from './router/User/Sign/Sign';
import IdFind from './router/User/IdFind/IdFind';
import History from './router/User/History/Index/History';
import More from './router/User/History/More/More';

// 카트
import Cart from './router/Cart/Cart';

// 상품관련
import Slang from './router/Product/Slang/Slang';
import Detail from './router/Product/Detail/Index/Detail';
import Write from './router/Product/Detail/Write/Write';
import List from './router/Product/List/List';

// 구매관련
import Buy from './router/Buy/Index/Buy';
import Complete from './router/Buy/Complete/Complete';

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
            <Route path="write" element={<Write/>} />
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
