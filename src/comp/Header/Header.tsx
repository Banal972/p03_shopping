import React, { useEffect, useMemo, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';

// 아이콘
import { BsCart2,BsPerson } from "react-icons/bs"
import {AiFillGithub} from "react-icons/ai"

// 리덕스
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { logoutAction } from '../../store/user';

// 모듈
import $ from "jquery"
import gsap from "gsap"

// 이미지
import arr from "../../asset/img/snb_dep2Arr.png"
import logo from "../../asset/img/logo.svg"

function Header({pathSplit}:{pathSplit : String}) {

  // 서브페이지 Header가 블랙으로 시작해야할경우
  let subHeader = true;

  switch(pathSplit){
    case "" :
    case "list" :
      subHeader = false;
    break
  }

  // location
  const location = useLocation();

  // 네비게이터
  const navigate = useNavigate();

  // 디스패치
  const dispath = useDispatch();

  // 유저값 가져오기
  const user = useSelector((state:RootState)=>state.user);
  
  // 유저 로그아웃
  const logoutHandler = (e:React.MouseEvent<HTMLAnchorElement>)=>{
    e.preventDefault();
    alert('로그아웃 되었습니다');
    dispath(logoutAction());
    navigate('/');
  }

  // 카트값 가져오기
  const cart = useSelector((state:RootState)=>state.cart);
  // 장바구니 갯수
  const [cartAmount,setCartAmount] = useState(0);

  // 카드값이 변할때마다
  useEffect(()=>{
    // 카드안에 갯수만큼 수정
    setCartAmount(cart.length);
  },[cart]);

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

    window.addEventListener('scroll',(e)=>{
      if(window.scrollY > 0){
        document.querySelector('.header')?.classList.add('scroll');
      }else{
        document.querySelector('.header')?.classList.remove('scroll');
      }
    })

  },[]);

  const menuTl = useMemo(()=>gsap.timeline({paused : true }),[]);
  const [menuClick,setMenuClick] = useState(false);

  useEffect(()=>{
    setMenuClick(false);
  },[location])
  

/*   useEffect(()=>{

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

  },[]) */

  const menuHanlder = ()=>{
    if(menuClick){
      // menuTl.reverse();
      setMenuClick(false);
    }else{
      // menuTl.restart();
      setMenuClick(true);
    }
  }

  return (
    <header className={`header ${menuClick && "active"} ${subHeader? "sub" : ""}`}>
      <div className="_k_wrap" data-max={"1600"}>
        <div className="logo">
          <Link to={"/"}>
            <img src={logo} alt="쇼핑몰 로고" width={50}/>
          </Link>
        </div>

        <nav className="gnb">
          <Link to={"/list/999"}>BEST</Link>
          <Link to={"/list/001"}>스니커즈</Link>
          <Link to={"/list/002"}>스포츠</Link>
          <Link to={"/list/003"}>샌들/슬리퍼</Link>
          <Link to={"/list/456"}>SALE</Link>
        </nav>

        <div className="sbx">

          <nav className="snb">

            {/* 장바구니 */}
            <div className="icon">
              {
                cartAmount !== 0 && <p className='num'>{cartAmount}</p>
              }
              <Link to={"/cart"}><BsCart2/></Link>
            </div>

            {/* 마이페이지 */}
            <div className="icon per">
              <BsPerson/>
              <div className="dep2">
                <div className="up">
                  <img src={arr} alt="" />
                </div>
                <ul>

                  {
                    Object.keys(user).length === 0 ?
                    <>
                      <li><Link to={"/login"}>로그인</Link></li>
                      <li><Link to={"/sign"}>회원가입</Link></li>
                    </>
                    :
                    <>
                      <li><Link to={"/slang"}>관심상품</Link></li>
                      <li><Link to={"/history"}>주문내역</Link></li>
                      <li><Link to={"/"} onClick={logoutHandler}>로그아웃</Link></li>
                    </>
                  }
                  
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

      <div className={'mob-menu'}>
        
        <div className="top">
          <div className="menu" onClick={menuHanlder}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>

        <ul className="m-gnb">
          <li><Link to={"/list/999"}>BEST</Link></li>
          <li><Link to={"/list/001"}>스니커즈</Link></li>
          <li><Link to={"/list/002"}>스포츠</Link></li>
          <li><Link to={"/list/003"}>샌들/슬리퍼</Link></li>
          <li><Link to={"/list/456"}>SALE</Link></li>
        </ul>

        <div className="bottom">
            <p className='p'>
                이 사이트는 Banal(김지유) <span> <AiFillGithub/><a href="https://github.com/Banal972" target='_blank'>https://github.com/Banal972</a> </span> 포트폴리오 사이트 입니다.
            </p>

            <p className='copy'>Copyright 2023.Banal(김지유). All rights reserved.</p>
        </div>

      </div>

    </header>
  )
}

export default Header