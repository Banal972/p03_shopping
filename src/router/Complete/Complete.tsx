import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {BsBoxSeam} from "react-icons/bs"

// 스타일
import "./Complete.scss";

interface BuyInterFace{
    id : string
    src : string
    name : string
    price : number
    size : number
    sale : number
    amount : number
}

function Complete() {

    const location = useLocation();
    const [buyItem,setBuyItem] = useState<BuyInterFace[]>(location.state);
    const [total,setTotal] = useState(0);

    // 총액 계산
    useEffect(()=>{

        let allPrice = 0;

        buyItem.forEach((elm)=>{
            elm.sale ? 
                allPrice += (elm.price - (elm.price * elm.sale/100)) * elm.amount
            :
                allPrice += elm.price * elm.amount;
            });

        setTotal(allPrice);

    },[]);

    return (
        <div className="_complete">
            <div className="_k_wrap" data-max="1280">

                <div className="tbx">
                    <div className="icon"><BsBoxSeam/></div>
                    <h4>주문이 완료되었습니다.</h4>
                </div>

                <ul className="grid">

                    {
                        buyItem.map((a,i)=>(
                            <li key={i}>

                                <div className="tup">

                                    <div className="img" style={{backgroundImage : `url(${a.src})`}}></div>
                                    
                                    <div className="desc">
                                        {
                                            a.sale !== 0 && <div className="tg">SALE</div>
                                        }
                                        <p className="name">{a.name}</p>
                                        <p className="option">└ 신발 사이즈 - {a.size}</p>
                                    </div>

                                </div>

                                <div className="tbm">
                                    <p> 
                                        주문금액 : {a.amount}개 <span>{a.price} 원</span> 
                                    </p>
                                    {
                                        a.sale !== 0 && <p> 할인율 : <span>{a.sale} %</span> </p>
                                    }
                                    <p className="last"> 
                                        결제금액 <span>
                                            {
                                                a.sale ? 
                                                <>
                                                    <i>{a.price}</i> { a.price - (a.price * a.sale/100)}
                                                </>
                                                :
                                                <>
                                                    {a.price}
                                                </>
                                            }
                                            원
                                            
                                        </span> 
                                    </p>
                                </div>

                            </li>       
                        ))
                    }

                </ul>

                <p className="all">총 결제금액 <span>{total} 원</span></p>

                <div className="btn">
                    <Link to={'/'}>주문내역</Link>
                    <Link to={'/'}>돌아가기</Link>
                </div>

            </div>
        </div>
    )

}

export default Complete