import React, { useEffect, useMemo, useState } from 'react'
import "./Header.scss";
import { Link } from 'react-router-dom';
import { BsCart2,BsPerson,BsTriangle } from "react-icons/bs"
import arr from "../../asset/img/snb_dep2Arr.png"
import $ from "jquery"
import gsap from "gsap"

function Header() {

  useEffect(()=>{

    let chk :Number = 0;

    $(".header .snb .icon").eq(1).on("click",function(){
      if(chk == 0){
        $(this).find('.dep2').stop().slideDown(300);
        chk = 1;
      }else{
        $(this).find('.dep2').stop().slideUp(300);
        chk = 0;
      }
    });

  },[]);

  const menuTl = useMemo(()=>gsap.timeline({paused : true }),[]);
  const [menuClick,setMenuClick] = useState(true);

  useEffect(()=>{

    menuTl.to('.header .menu span:nth-of-type(1)',{
      rotate : 45,
      top : "50%",
      yPercent : -50
    },'m')
    .to('.header .menu span:nth-of-type(2)',{
      xPercent : -50,
      opacity : 0
    },'m')
    .to('.header .menu span:nth-of-type(3)',{
      rotate : -45,
      top : "50%",
      yPercent : -50
    },'m');

  },[])

  const menuHanlder = ()=>{
    if(menuClick){
      menuTl.restart();
      setMenuClick(false);
    }else{
      menuTl.reverse();
      setMenuClick(true);
    }
    

  }

  return (
    <header className='header'>
      <div className="_k_wrap" data-max={"1600"}>
        <div className="logo">
          <Link to={"/"}>로고</Link>
        </div>

        <nav className="gnb">
          <Link to={"/list"}>게시판1</Link>
          <Link to={"/list"}>게시판2</Link>
          <Link to={"/list"}>게시판3</Link>
          <Link to={"/list"}>게시판4</Link>
        </nav>

        <div className="sbx">

          <nav className="snb">
            <div className="icon">
              <p className='num'>1</p>
              <Link to={"/cart"}><BsCart2/></Link>
            </div>
            <div className="icon">
              <BsPerson/>
              <div className="dep2">
                <div className="up">
                  <img src={arr} alt="" />
                </div>
                <ul>
                  <li><Link to={"/login"}>로그인</Link></li>
                  <li><Link to={"/"}>회원가입</Link></li>

                  <li><Link to={"/"}>관심상품</Link></li>
                  <li><Link to={"/"}>주문내역</Link></li>
                  <li><Link to={"/"}>배송조회</Link></li>
                  <li><Link to={"/"}>로그아웃</Link></li>
                  
                </ul>
              </div>
            </div>
          </nav>

          <div className="menu" onClick={menuHanlder}>
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