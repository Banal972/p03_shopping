import React,{useState,useEffect} from 'react'

// SCSS
import "./Buy.scss"

// 모듈
import { useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { ProductState } from '../../store/product';
import moment from "moment"
import { addAction } from '../../store/hitory';
import { toNumber } from '../../lib/lib';
import { allDelete } from '../../store/cart';

interface BuyInterFace{
  type : string
  buy : {product_id : number, product_size : number, product_amount : number}[]
}

interface BuyProduct extends ProductState{
  product_size : number
  product_amount : number
}

function Buy() {

  // state 전달받기
  const location = useLocation();

  // 네비게이터
  const navigate = useNavigate();

  // 디스패치
  const dispatch = useDispatch();

  // 유저데이터
  const user = useSelector((state:RootState)=>state.user);

  // 프로덕트데이터
  const product = useSelector((state:RootState)=>state.product);

  // 구매데이터
  const [locationData,setLocationData] = useState<BuyInterFace>(location.state)
  const [buyItem,setBuyItem] = useState<BuyProduct[]>([]);

  useEffect(()=>{
    
    const data : BuyProduct[] = [];

    product.forEach(a=>{

      locationData.buy.forEach(b=>{

        if(a.id === b.product_id){

          const object = {
            ...a,
            ["product_size"] : b.product_size,
            ["product_amount"] : b.product_amount
          }

          data.push(object);

        }

      })

    })

    setBuyItem(data);

  },[location]);


  // 배송데이터
  const [delivery,setDelivery] = useState({
    d_name : user.name,
    d_phone : user.phone,
    d_addr1 : user.address,
    d_addr2 : user.address2
  });

  // 배송요청
  const [request,setRequest] = useState({
    request_select : "",
    request_input : "",
  });

  // 배송요청 수정
  const requestHanlder = (e : any)=>{
    
    setRequest((prev)=>({
      ...prev,
      request_select : e.target.value,
      request_input : ""
    }));

  }

  // 배송요청 작성
  const requestInput = (e : any)=>{

    setRequest((prev)=>({
      ...prev,
      request_input : e.target.value
    }));

  }

  // 결제 방법 데이터
  const [pay,setPay] = useState("간편결제");

  //결제 방법
  const payButton = (e : any) => {
    
    setPay(e.target.innerText);

  }

  // 총 결제데이터
  const [totalPay,setTotalPay] = useState({
    total : 0,
    total_product : 0,
    total_sale : 0,
    delivery_pay : 4500
  });

  useEffect(()=>{

    let total_sale = 0, total_product = 0, total = 0, delivery_pay = 4500;

    buyItem.forEach(a=>{

      total_product += a.price * a.product_amount;

      if(a.sale != undefined){
        total_sale += (a.price * a.sale / 100) * a.product_amount
      }

    });


    // 만약 총 가격이 45000 이상이면
    if(total_product >= 45000){
      delivery_pay = 0
    }

    setTotalPay({
      total : (total_product - total_sale) + delivery_pay,
      total_product : total_product,
      total_sale : total_sale,
      delivery_pay : delivery_pay
    })

  },[buyItem]);

  // 구매
  const buyButton = ()=>{

    const now = new Date();

    const timestamp =  new Date().getTime(); // 지금 시간 타임스탭
    const random = Math.floor(Math.random() * 1000); // 랜덤 숫자
    let token = timestamp - random // 구매상품 내역 token 만들기

    const data = {
      "user" : user.userID,
      "token" : token, // 구매 토큰
      "date" : moment(now).format("YYYY-MM-DD"),
      "buyItem" : [...buyItem], // 구매 상품
      "delivery" : {...delivery, ...request}, // 배송 정보
      "pay" : pay, // 결제 방법
      "total_pay" : totalPay // 총 결제액
    };

    try{
      dispatch(addAction(data));

      if(locationData.type === "cart"){
        dispatch(allDelete(""));
      }

      alert(`${pay}형식으로 결제합니다.`)
      navigate(`/complete/${token}`);

    }
    catch{
      alert('에러가 발생했습니다')
    }

  }

  return (
    <div className="_buy">

        <div className="_k_wrap" data-max="1024">

            <div className="infor">
              <h4 className='small-tit'>상품정보 총 {buyItem.length}개</h4>

              <ul className='box'>
                {
                  buyItem.map((a,i)=>(
                    <li>
                      <div className="img" style={{backgroundImage: `url(${a.src})`}}></div>
                      <div className="tbx">
                        {
                          a.sale && <div className="tag color01">SALE</div>
                        }
                        {
                          a.only && <div className="tag color02">ONLY</div>
                        }
                        <dl>
                          <dt>{a.name}</dt>
                          <dd>사이즈 - {a.product_size}</dd>
                          <dd className='price'>{toNumber(a.price as number)}원 <span>{a.product_amount}개</span></dd>
                        </dl>
                      </div>
                    </li>
                  ))
                }
              </ul>

            </div>

            <div className="delivery_info">

              <h4 className='small-tit'>배송 정보 <button>변경하기</button> </h4>

              <ul className='addr'>
                <li>{delivery.d_name} {delivery.d_phone}</li>
                <li>{delivery.d_addr1}</li>
                <li>{delivery.d_addr2}</li>
              </ul>

              <select className='select' onChange={requestHanlder} defaultValue={request.request_select}>
                <option value="" selected>요청사항을 선택해주세요</option>
                <option value="부재 시 경비실에 맡겨주세요.">부재 시 경비실에 맡겨주세요.</option>
                <option value="부재 시 택배함에 넣어주세요">부재 시 택배함에 넣어주세요</option>
                <option value="부재 시 집 앞에 놔주세요">부재 시 집 앞에 놔주세요</option>
                <option value="배송 전 연락바랍니다">배송 전 연락바랍니다</option>
                <option value="직접입력">직접입력</option>
              </select>

              {
                request.request_select === "직접입력" &&
                <div className="input-t">
                  <input type="text" value={request.request_input} placeholder='배송 시 요청사항을 입력해주세요.' onChange={requestInput}/>
                </div>
              }

            </div>

            <div className="total-price">

              <h4 className='small-tit'>총 결제금액 <p>{toNumber(totalPay.total as number)}원</p> </h4>

              <ul className='price-info'>
                <li>총 상품금액 <span>{toNumber(totalPay.total_product as number)}원</span></li>
                <li>상품 할인 <span>{toNumber(totalPay.total_sale as number)}원</span></li>
                <li>배송비 <span>{toNumber(totalPay.delivery_pay as number)}원</span></li>
              </ul>

            </div>

            <div className="pay">
              <h4 className='small-tit'>결제 방법</h4>
              <div className="btn">
                {
                  ["간편결제","카드","가상계좌","휴대폰"].map((e,i)=>(
                    <button key={i} className={pay === e ? "act" : ""} onClick={(e)=>payButton(e)}>{e}</button>    
                  ))
                }
              </div>
            </div>

            <button className='submit' onClick={buyButton}>{toNumber(totalPay.total as number)}원 결제하기</button>

        </div>

    </div>
  )
}

export default Buy