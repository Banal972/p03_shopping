import React from 'react'
import { Link } from 'react-router-dom'
import "./Footer.scss"

function Footer() {
  return (
    
    <footer className='footer'>
        <div className="_k_wrap" data-max="1600">

            <ul className="footer_up">
                <li>
                    <Link to="">이용안내</Link>
                </li>
                <li>
                    <Link to="">이용약관</Link>
                </li>
                <li>
                    <Link to="">개인정보처리방침</Link>
                </li>
            </ul>

            <div className="flex">
                <div className="about">
                    <h2>주식회사 OOO</h2>
                    <address>
                        서울특별시 강남구 테헤란로 152 (역삼동, 강남파이낸스센터)
                        사업자등록번호 : 220-81-83676 | 통신판매업신고 : 강남 10630호 사업자정보확인
                        대표이사 : 전항일
                    </address>
                </div>

                <div className="comunity">
                    <h2>고객센터</h2>
                    경기도 부천시 부일로 223 9층 (상동)
                    Tel : 1566-5701 (평일 09:00 ~ 18:00) | 스마일클럽 전용 Tel : 1522-5700 (365일 09:00 ~ 18:00)
                    Fax : 02-589-8842 | Mail : gmarket@corp.gmarket.co.kr
                </div>
            </div>
    
        </div>
    </footer>

  )
}

export default Footer