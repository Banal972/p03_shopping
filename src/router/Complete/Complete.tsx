import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {BsBoxSeam} from "react-icons/bs"

// 스타일
import "./Complete.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../app/store";
import { HistoryInterface } from "../../store/hitory";

function Complete() {

    const {token} = useParams();

    const user = useSelector((state:RootState)=>state.user);
    const history = useSelector((state:RootState)=>state.history);
    const [item,setItem] = useState<HistoryInterface>();

    useEffect(()=>{

        const filter = history.filter(e=>{
            return e.token === Number(token) && e.user === user.userID
        })[0];

        setItem(filter);

    },[token]);

    return (
        <div className="_complete">
            <div className="_k_wrap" data-max="1280">

                <div className="tbx">
                    <div className="icon"><BsBoxSeam/></div>
                    <h4>결제가 완료되었습니다.</h4>
                </div>

                <ul className="grid">

                    {
                        item ?
                        item?.buyItem.map((a,i)=>(
                            <li key={i}>

                                <div className="tup">

                                    <div className="img" style={{backgroundImage : `url(${a.src})`}}></div>
                                    
                                    <div className="desc">
                                        {
                                            a.sale !== 0 && <div className="tg">SALE</div>
                                        }
                                        <p className="name">{a.name}</p>
                                        <p className="option">└ 신발 사이즈 - {a.product_size}</p>
                                        <p className="option">└ 가격 - {a.price}원</p>
                                    </div>

                                </div>

                                <div className="tbm">
                                    <p> 
                                        구매 갯수 : {a.product_amount}개 <span>{a.price * a.product_amount} 원</span> 
                                    </p>
                                    <p> 할인율 : <span>{a.sale ? a.sale : 0} %</span> </p>
                                    <p className="last"> 
                                        결제금액 <span className={a.sale ? "color01" : ""}>
                                            {
                                                a.sale ? 
                                                <>
                                                    <i>{a.price * a.product_amount}</i> { (a.price - (a.price * a.sale/100) ) * a.product_amount}
                                                </>
                                                :
                                                <>
                                                    {a.price * a.product_amount}
                                                </>
                                            }
                                            원
                                            
                                        </span> 
                                    </p>
                                </div>

                            </li>       
                        ))
                        : "오류"
                    }

                </ul>

                <p className="delivery">배송비 <span>{item?.total_pay.delivery_pay} 원</span></p>
                <p className="all">총 결제금액 <span>{item?.total_pay.total} 원</span></p>

                <div className="btn">
                    <Link to={'/history'}>주문내역</Link>
                    <Link to={'/'}>돌아가기</Link>
                </div>

            </div>
        </div>
    )

}

export default Complete