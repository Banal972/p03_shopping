import React,{useState,useEffect} from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useDaumPostcodePopup } from 'react-daum-postcode';
import { BuyProductType, ProductType } from '../../../types/customType';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../../state/atoms/user';
import moment from "moment"
import axios from 'axios';


// SCSS
import "./Buy.scss"

// 아이콘
import { MdClose } from "react-icons/md";

// 라이브러리
import { getToken, toNumber } from '../../../lib/lib';
import { historyState } from '../../../state/atoms/history';
import { cartState } from '../../../state/atoms/cart';

// redux
/* import { addAction } from '../../../store/hitory';
import { allDelete } from '../../../store/cart'; */



interface BuyInterFace{
  type : string
  buy : {product_id : number, product_size : number, product_amount : number}[]
}

interface Delivery{
  d_name? : String
  d_phone? : String
  d_addr1? : String
  d_addr2? : String
}

function Buy() {

  // state 전달받기
  const location = useLocation();

  // 네비게이터
  const navigate = useNavigate();

  // 유저데이터
  const user = useRecoilValue(userState);

  // 프로덕트데이터
  const [product,setProduct] = useState<ProductType[]>([]);
  useEffect(()=>{

    const api = process.env.REACT_APP_PRODUCT_AJAX || "";

    if(api){
      axios.get(api)
      .then(({data})=>{
        setProduct(data);
      })
      .catch(e=>{
        console.log('통신 에러');
      })
    }

  },[]);

  // 구매데이터
  const locationData : BuyInterFace = location.state;
  const [buyItem,setBuyItem] = useState<BuyProductType[]>([]);
  useEffect(()=>{
    
    const data : BuyProductType[] = [];

    product.forEach(a=>{

      locationData.buy.forEach(b=>{

        if(a.id === b.product_id){

          const object = {
            ...a,
            product_size : b.product_size,
            product_amount : b.product_amount
          }

          data.push(object);

        }

      })

    })

    setBuyItem(data);

  },[location,locationData,product]);
  

  // 모달창
  const [modal,setModal] = useState(false);


  // 배송데이터
  const [delivery,setDelivery] = useState<Delivery>({
    d_name : user?.name,
    d_phone : user?.phone,
    d_addr1 : user?.address,
    d_addr2 : user?.address2
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

    let total_sale = 0, total_product = 0, delivery_pay = 4500;

    buyItem.forEach(a=>{

      total_product += a.price * a.product_amount;

      if(a.sale !== undefined){
        total_sale += (a.price * a.sale / 100) * a.product_amount
      }

    });

    // 만약 총 가격이 100000 이상이면
    if(total_product >= 100000){
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
  const setHistory = useSetRecoilState(historyState);
  const setCart = useSetRecoilState(cartState);
  const buyButton = ()=>{

    // 현재 날짜 가져오기
    const now = new Date();

    // 토큰 생성
    let token = getToken();

    const data = {
      "user" : user?.userID,
      "token" : token, // 구매 토큰
      "date" : moment(now).format("YYYY-MM-DD"),
      "buyItem" : [...buyItem], // 구매 상품
      "delivery" : {...delivery, ...request}, // 배송 정보
      "pay" : pay, // 결제 방법
      "total_pay" : totalPay // 총 결제액
    };

    // 히스토리 저장
    setHistory((prev)=>[...prev,data])
    if(locationData.type === "cart"){ // 만약 카트에서 구매 버튼을 눌렀을 경우
      setCart([]);
    }
    alert(`${pay}형식으로 결제합니다.`) // 결제방식
    navigate(`/complete/${token}`); // 토큰을 이용해서 구매완료 페이지 보여주기

  }

  return (
    <>
      <div className="_buy">

          <div className="_k_wrap" data-max="1024">

              <div className="infor">
                <h4 className='small-tit'>상품정보 총 {buyItem.length}개</h4>

                <ul className='box'>
                  {
                    buyItem.map((a,i)=>(
                      <li key={i}>
                        <div className="img" style={{backgroundImage: `url(${process.env.PUBLIC_URL}${a.src})`}}></div>
                        <div className="tbx">
                          {
                            a.sale && a.sale > 0 ? <div className="tag color01">SALE</div> : ""
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

                <h4 className='small-tit'>배송 정보 <button onClick={()=>setModal(true)}>변경하기</button> </h4>

                <ul className='addr'>
                  <li>{delivery.d_name} {delivery.d_phone}</li>
                  <li>{delivery.d_addr1}</li>
                  <li>{delivery.d_addr2}</li>
                </ul>

                <select className='select' onChange={requestHanlder} defaultValue={request.request_select}>
                  <option value="">요청사항을 선택해주세요</option>
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
      {
        modal && <Modal change={setDelivery} modal={setModal}/>
      }
    </>
  )

}

function Modal(
  {change, modal} : 
  {change : React.Dispatch<React.SetStateAction<Delivery>>, modal : React.Dispatch<React.SetStateAction<boolean>>}
){

  // 주소찾기 lib
  const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

  const [data,setData] = useState({
    zipcode : "",
    d_name : "",
    d_phone : "",
    d_addr1 : "",
    d_addr2 : ""
  });

  const inputUpdate = (e : React.ChangeEvent<HTMLInputElement>, ins : string)=>{

    setData((prev)=>({
      ...prev,
      [ins] : e.target.value
    }));    

  }

  // 주소찾기
  const zipHandleComplete = (data : any) => {
        
      let zipcode = data.zonecode;
      let fullAddress = data.address;
      let extraAddress = '';

      if (data.addressType === 'R') {
        if (data.bname !== '') {
          extraAddress += data.bname;
        }
        if (data.buildingName !== '') {
          extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
        }
        fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
      }

      setData((prev)=>({
        ...prev,
        zipcode : zipcode,
        d_addr1 : fullAddress
      }));

  };

  // 주소찾기 이벤트
  const zipHandleClick = () => {
    open({ onComplete: zipHandleComplete });
  };

  //수정버튼
  const submitHanlder = ()=>{
    
    if(data.d_name === ""){
      return alert('배송자명을 입력하세요')
    }

    if(data.d_phone === ""){
      return alert('연락처을 입력하세요.')
    }

    if(data.zipcode === ""){
      return alert('우편번호을 입력하세요.')
    }

    if(data.d_addr1 === ""){
      return alert('주소을 입력하세요.')
    }

    if(data.d_addr2 === ""){
      return alert('상세주소을 입력하세요.')
    }

    if(window.confirm("배송 정보를 수정하시겠습니까?")){
      change({
        d_name : data.d_name,
        d_phone : data.d_phone,
        d_addr1 : data.d_addr1,
        d_addr2 : data.d_addr2
      })
      modal(false);
      setData({
        zipcode : "",
        d_name : "",
        d_phone : "",
        d_addr1 : "",
        d_addr2 : ""
      })
    }

  }

  return (
    <div className="modal-delivery">
      <div className="back"></div>

      <div className="cont">

        <div className="close" onClick={()=>modal(false)}><MdClose/></div>

        <div className="input-t">
          <label htmlFor="d_1">배송자명</label>
          <input 
            type="text" 
            id='d_1' 
            placeholder='배송자명' 
            value={data.d_name || ""} 
            onChange={e=>inputUpdate(e,"d_name")}
          />
        </div>

        <div className="input-t">
          <label htmlFor="d_2">연락처</label>
          <input 
            type="text" 
            id='d_2' 
            placeholder='01000000000' 
            value={data.d_phone || ""}
            onChange={e=>inputUpdate(e,"d_phone")}
          />
        </div>
        
        <div className="input-t" style={{maxWidth:250}}>
          <label htmlFor="d_3">우편번호</label>
          <div className="fl">
            <input type="text" id='d_3' value={data.zipcode} readOnly/>
            <button onClick={zipHandleClick}>주소찾기</button>
          </div>
        </div>

        <div className="input-t">
          <label htmlFor="d_4">주소</label>
          <input 
            type="text" 
            id='d_4' 
            placeholder='주소' 
            value={data.d_addr1 || ""} 
            onChange={e=>inputUpdate(e,"d_addr1")}
          />
        </div>
        
        <div className="input-t">
          <label htmlFor="d_5">상세주소</label>
          <input 
            type="text" 
            id='d_5' 
            placeholder='상세주소' 
            value={data.d_addr2 || ""} 
            onChange={e=>inputUpdate(e,"d_addr2")}
          />
        </div>

        <button className='btn' onClick={submitHanlder}>수정하기</button>

      </div>

    </div>
  )

}

export default Buy