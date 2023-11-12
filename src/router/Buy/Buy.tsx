import React from "react";
import { Link } from "react-router-dom";
import {BsBoxSeam} from "react-icons/bs"

// 스타일
import "./Buy.scss";


function Buy() {

    return (
        <div className="_complete">
            <div className="_k_wrap" data-max="1280">

                <div className="tbx">
                    <div className="icon"><BsBoxSeam/></div>
                    <h4>주문이 완료되었습니다.</h4>
                </div>

                <ul className="grid">

                    <li>

                        <div className="tup">

                            <div className="img"></div>
                            
                            <div className="desc">
                                <div className="tg">SALE</div>
                                <p className="name">스니커즈 하이01</p>
                                <p className="option">└ 신발 사이즈 - 235</p>
                            </div>

                        </div>

                        <div className="tbm">
                            <p> 주문금액 : 2개 <span>23123123 원</span> </p>
                            <p className="last"> 결제금액 <span>23123123 원</span> </p>
                        </div>

                    </li>

                    <li>

                        <div className="tup">

                            <div className="img"></div>
                            
                            <div className="desc">
                                <div className="tg">SALE</div>
                                <p className="name">스니커즈 하이01</p>
                                <p className="option">└ 신발 사이즈 - 235</p>
                            </div>

                        </div>

                        <div className="tbm">
                            <p> 주문금액 : 2개 <span>23123123 원</span> </p>
                            <p className="last"> 결제금액 <span>23123123 원</span> </p>
                        </div>

                    </li>

                </ul>

                <p className="all">총 결제금액 <span>23123123 원</span></p>

                <div className="btn">
                    <Link to={'/'}>주문내역</Link>
                    <Link to={'/'}>돌아가기</Link>
                </div>

            </div>
        </div>
    )

}

export default Buy