import {useState,useEffect} from 'react'

import "./More.scss"
import { useParams } from 'react-router-dom'
import { toNumber } from '../../../../lib/lib';
import { useRecoilValue } from 'recoil';
import { userState } from '../../../../state/atoms/user';
import { historyState } from '../../../../state/atoms/history';
import { HistoryType } from '../../../../types/customType';

function More() {

  const {token} = useParams();
  const user = useRecoilValue(userState);
  const history = useRecoilValue(historyState);
  const [data,setData] = useState<HistoryType>();

  useEffect(()=>{

    const data = history.filter(e=> e.user === user?.userID && e.token === Number(token))[0];
    setData(data);

    window.scrollTo(0,0);

  },[token,history,user]);

  return (
    <div className='history-more'>

      <div className="_k_wrap" data-max="1480">

        <h2 className="t-title">주문상세</h2>

        <div className="order-number">

          <dl>
            <dt>주문번호 {token}</dt>
            <dd>구매 날짜 {data?.date}</dd>
          </dl>

        </div>

        <div className="product">

          <h4 className="small-tit">주문상품 1개</h4>

          <ul className='list'>

            {
              data?.buyItem.map((a,i)=>(
                <li key={i}>
              
                  <dl className='d'>
                    <dt>구매확정</dt>
                    <dd>배송완료</dd>
                  </dl>

                  <div className="ibx">
                    <div className="img" style={{backgroundImage : `url(${process.env.PUBLIC_URL}${a.src})`}}></div>
                    <dl>
                      <dt>{a.name}</dt>
                      <dd>사이즈 - {a.product_size}</dd>
                      <dd className='price'><span>{toNumber(a.price as number)}원</span> {a.product_amount}개</dd>
                    </dl>
                  </div>

                </li>
              ))
            }

          </ul>

        </div>

        <div className="price-detail">

          <h4 className="small-tit">구매자 정보</h4>

          <ul className='list'>
            <li><p>주문자</p> <span>{user?.name}</span></li>
            <li><p>연락처</p> <span>{user?.phone}</span></li>
            <li><p>이메일</p> <span>{user?.email}</span></li>
          </ul>

        </div>

        <div className="price-detail">
          <h4 className="small-tit">배송지 정보</h4>
          <ul className='list'>
            <li><p>받는분</p> <span>{data?.delivery.d_name}</span></li>
            <li><p>주소</p> <span>{data?.delivery.d_addr1}<br/>{data?.delivery.d_addr2}</span></li>
            <li><p>연락처</p> <span>{data?.delivery.d_phone}</span></li>
            {
              data?.delivery.request_select !== "" &&
              <li><p>배송 메세지</p> <span>{data?.delivery.request_select} <br/> { data?.delivery.request_input}</span></li>
            }
          </ul>
        </div>

        <div className="price-detail">
          <h4 className="small-tit">결제 정보</h4>
          <ul className='list'>
            <li><p>결제 방식</p> <span>{data?.pay}</span></li>
            <li><p>총 상품금액</p> <span>{toNumber(data?.total_pay.total as number)}원</span></li>
            <li><p>상품 할인</p> <span>-{toNumber(data?.total_pay.total_sale as number)}원</span></li>
            <li><p>배송비</p> <span>{toNumber(data?.total_pay.delivery_pay as number)}원</span></li>
          </ul>
        </div>

        <div className="total-price">
          총 {data?.buyItem.length}개 결제금액 <span>{toNumber(data?.total_pay.total as number)}원</span>
        </div>

      </div>

    </div>
  )
}

export default More