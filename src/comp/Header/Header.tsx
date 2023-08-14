import React from 'react'
import "./Header.scss";
import { Link } from 'react-router-dom';
import { BsCart2,BsPerson,BsTriangle } from "react-icons/bs";
import arr from "../../asset/img/snb_dep2Arr.png";

function Header() {
  return (
    <header className='header'>
      <div className="_k_wrap" data-max={"1600"}>
        <div className="logo">
          <Link to={"/"}>로고</Link>
        </div>

        <nav className="gnb">
          <Link to={"/"}>게시판1</Link>
          <Link to={"/"}>게시판2</Link>
          <Link to={"/"}>게시판3</Link>
          <Link to={"/"}>게시판4</Link>
        </nav>

        <div className="sbx">

          <nav className="snb">
            <div className="icon">
              <p className='num'>1</p>
              <Link to={"/"}><BsCart2/></Link>
            </div>
            <div className="icon">
              <Link to={"/"}><BsPerson/></Link>
              <div className="dep2">
                <div className="up">
                  <img src={arr} alt="" />
                </div>
                <ul>
                  <li><Link to={"/"}>로그인</Link></li>
                  <li><Link to={"/"}>회원가입</Link></li>

                  <li><Link to={"/"}>관심상품</Link></li>
                  <li><Link to={"/"}>주문내역</Link></li>
                  <li><Link to={"/"}>배송조회</Link></li>
                  <li><Link to={"/"}>로그아웃</Link></li>
                  
                </ul>
              </div>
            </div>
          </nav>

          <div className="menu">
            <span></span>
            <span></span>
            <span></span>
          </div>

        </div>

      </div>

      <div className="full-menu">

      </div>

    </header>
  )
}

export default Header