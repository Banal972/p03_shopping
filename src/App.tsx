import { Route, Routes, useLocation } from 'react-router';
import {Outlet} from "react-router-dom"

// SCSS
import "./asset/scss/layout.scss"

// 컴포넌트
import Header from './component/Header/Header';
import Footer from './component/Footer/Footer';

// 라우터
import Main from './router/Main/Main';

// 404에러
import Not from './router/Not/Not';

// 장바구니
import Cart from './router/Cart/Cart';

// 상품관련
import List from './router/Product/List/List';
import Slang from './router/Product/Slang/Slang';
import Detail from './router/Product/Detail/Detail/Detail';
import Write from './router/Product/Detail/Write/Write';


// 구매관련
import Buy from './router/Buy/Buy/Buy';
import Complete from './router/Buy/Complete/Complete';

// 유저 관련
import History from './router/User/History/Index/History';
import More from './router/User/History/More/More';
import Login from './router/User/Login/Login';

// 권한라우터
import AuthRouter from './Hoc/AuthRouter';


/* // 유저 관련
import Sign from './router/User/Sign/Sign';
import Login from './router/User/Login/Login';*/



function App() {

  const router = useLocation();

  return (
    <div className="App">
      
      <Routes>

        <Route path='/' element={
          <>
            <Header pathSplit={router.pathname.split('/')[1]} />
              <Outlet/>
            <Footer/>
          </>          
        }>

          {/* 메인페이지 */}
          <Route index element={<Main/>} ></Route>
          
          {/* 유저관련 라우터 */}
          <Route path='login' element={<Login/>}/>
          {/* <Route path='sign' element={<Sign/>}/> */}
          
          {/* 장바구니 */}
          <Route path='cart' element={<Cart/>}/>

          {/* 상품리스트 */}
          <Route path='list'>
            <Route path=':cate' element={<List/>} />
          </Route>

          {/* 찜목록 */}
          <Route path='slang' 
            element={
              <AuthRouter>
                <Slang/>
              </AuthRouter>
            }
          />

          {/* 상품정보 */}
          <Route path="detail">
            <Route path=":id" element={<Detail/>}/>
            <Route path="write" 
              element={
                <AuthRouter>
                  <Write/>
                </AuthRouter>
              } 
            />
          </Route>

          {/* 구매페이지 */}
          <Route path='buy' 
            element={
              <AuthRouter>
                <Buy/>
              </AuthRouter>
            }
          />

          {/* 구매 완료페이지 */}
          <Route path='complete/:token' 
            element={
              <AuthRouter>
                <Complete/>
              </AuthRouter>
            } 
          />

          {/* 구매내역 */}
          <Route path='history'>
            <Route index 
              element={
                <AuthRouter>
                  <History/>
                </AuthRouter>
              } 
            />
            <Route path='more/:token' 
              element={
                <AuthRouter>
                  <More/>
                </AuthRouter>
              }
            />
          </Route>


        </Route>

        <Route path='/*' element={<Not/>}/>

      </Routes>

    </div>
  );
}

export default App;
