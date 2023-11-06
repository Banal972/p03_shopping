import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

// 스타일
import "./Buy.scss";


function Buy() {

    const navigate = useNavigate();
    const {state} = useLocation();
    const [total,setTotal] = useState(0);

    useEffect(()=>{

        console.log(state);

        let allPrice = 0;

        /* state.forEach(elm => {
            allPrice += elm.price * elm.amount;
        }); */

        setTotal(allPrice);

    },[state]);
    

    return (
        <div className="_complete">
            <div className="_k_wrap" data-max="1600">

                <h2 className="t-title">
                    결제가 완료 되었습니다
                </h2>

                <ul className="taps">
                    <li>마이페이지</li>
                    <li onClick={()=>{navigate('/center')}}>고객센터</li>
                </ul>

                <div className="infor">

                    <h2>결제정보</h2>

                    <table>
                        <tr>
                            <th>주문자명</th>
                            <td>{}</td>
                        </tr>
                        <tr>
                            <th>주문상품</th>
                            <td>    
                                <table>
                                    <colgroup>
                                        <col></col>
                                        <col width="5%"></col>
                                        <col width="15%"></col>
                                    </colgroup>
                                    <tr>
                                        <th>상품</th>
                                        <th>갯수</th>
                                        <th>가격</th>
                                    </tr>
                                    {
                                        /* state.map((elm,i)=>(

                                            <tr key={i}>
                                                <td>
                                                    <div className="flex">
                                                        <figure>
                                                            <img src={`/img/shoes/${elm.src}`}/>
                                                        </figure>
                                                        {elm.name}
                                                    </div>
                                                </td>
                                                <td>{elm.amount}</td>
                                                <td>{(elm.price * elm.amount).toLocaleString('ko-KR')}원</td>
                                            </tr>

                                        )) */
                                    }
                                </table>
                            </td>
                        </tr>
                    </table>

                    <h3>
                        {total.toLocaleString('ko-KR')} 원
                    </h3>

                </div>
                

            </div>
        </div>
    )

}

export default Buy