// SCSS
import "./Cart.scss"

// lib
import { toNumber } from '../../lib/lib';

// redux
import { ProductState } from '../../store/product';
import { RootState } from '../../app/store';
import { checkDelete, deleteCart, minusCart, plusCart, sizeChangeCart } from '../../store/cart';

// 모듈
import React,{useState,useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { AiOutlineClose } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';


function Cart() {

  // 네비게이터
  const navigate = useNavigate();

  // 디스패치
  const dispatch = useDispatch();

  // 카트 가져오기
  const cart = useSelector((state:RootState)=>state.cart);
  
  // 총액
  const [total,setTotal] = useState(0);
  // 총액계산
  useEffect(()=>{

    let allPrice = 0;

    cart.forEach((elm)=>{
      elm.sale ? 
        allPrice += (elm.price - (elm.price * elm.sale/100)) * elm.amount
      :
        allPrice += elm.price * elm.amount;
    });

    setTotal(allPrice);

  },[cart]);

  // 선택된 아이템
  const [checkItem,setCheckItem] = useState<number[]>([]);

  // 모달창
  const [moID,setMoID] = useState({
    show : false,
    id : 0,
  });

  // 모달창닫기
  const modalClose = ()=>{

    setMoID({
      ...moID,
      show :false
    });
    
  }

  // 단일 선택
  const handleSingleCheck = (checked : boolean, id : number) => {

    if(checked){
      // 단일 선택시 아이템 추가
      setCheckItem(prev=>[...prev,id]);
    }else {
      // 단일 선택 해제 시 체크된 아이템 제외
      setCheckItem(checkItem.filter(el=>el !== id));
    }

  }

  // 체크박스 전체 선택
  const handleAllCheck = (checked : boolean) => {

    if(checked){
      const idArray : number[] = [];
      cart.forEach((el)=> idArray.push(el.id));
      setCheckItem(idArray);
    }else{
      setCheckItem([]);
    }

  }



  const buyBtn = ()=>{
    
    const buy = new Array();

    cart.forEach(e=>{

      const data = {
        product_id : e.id,
        product_size : e.size,
        product_amount: e.amount,
      }

      buy.push(data);

    });

    if(window.confirm('상품을 구매하시겠습니까?')){
      navigate('/buy',{state : {type : "cart", buy}});
    }

  }

  return (
    <>

      <div className="_cart">
        <div className="_k_wrap" data-max="1600">

          <h2 className="t-title">
              장바구니
          </h2>

          <div className="ctx">
            <table className="ct">

              <colgroup>
                <col/>
                <col/>
                <col/>
                <col/>
                <col/>
                <col/>
              </colgroup>

              <thead>
                <tr>
                  <th>
                    <input type="checkbox" 
                      onChange={(e)=>handleAllCheck(e.target.checked)}
                      checked={checkItem.length === cart.length ? true : false} readOnly
                    />
                  </th>
                  <th>상품명</th>
                  <th>가격</th>
                  <th>수량</th>
                  <th>합계</th>
                  <th>삭제</th>
                </tr>
              </thead>

              <tbody>
                {
                  cart.length > 0 ?
                  cart.map((elm,i)=>(

                    <tr key={i}>
                      <td>
                        <input type="checkbox" 
                          onChange={(e)=>{handleSingleCheck(e.target.checked,elm.id)}} 
                          checked={checkItem.includes(elm.id) ? true : false} readOnly
                        />
                      </td>
                      <td>
                        <div className="fl">
                          <div className="img" style={{backgroundImage:`url(${process.env.PUBLIC_URL}${elm.src})`}}></div>
                          <div className="tbx">
                            <dl>
                              <dt>{elm.name}</dt>
                              <dd>사이즈 : {elm.size}</dd>
                            </dl>
                            <button onClick={()=>{
                              setMoID({
                                show : true,
                                id : elm.id
                              })
                            }}>옵션변경</button>
                          </div>
                        </div>
                      </td>
                      <td>
                        {
                          elm.sale ?
                          <>
                            <p className="sale">
                              {toNumber(elm.price as number)}원
                            </p>
                            <p className="price">
                              <Sale price={elm.price} sale={elm.sale} />
                            </p>
                          </> 
                          :
                          <p className="price">
                            {toNumber(elm.price as number)}원
                          </p>
                        }
                      </td>
                      <td>
                        <div className="amount">
                          <button onClick={()=>{
                            dispatch(plusCart(elm.id));
                          }}>+</button>
                            <input type="text" value={elm.amount} readOnly />
                          <button onClick={()=>{
                            if(elm.amount <= 1){
                              if(window.confirm('삭제 하시겠습니까?')){
                                dispatch(deleteCart(elm.id));
                              }else{
                                return;
                              }
                            }else{
                              dispatch(minusCart(elm.id));
                            }
                          }}>-</button>

                        </div>
                      </td>
                      <td style={{whiteSpace:"nowrap"}}>
                        {
                          elm.sale ?
                          toNumber(((elm.price - (elm.price * elm.sale/100))*elm.amount) as number)+"원"
                          :
                          toNumber(elm.price * elm.amount as number)+"원"
                        }
                      </td>
                      <td>
                        <button className="delete" onClick={()=>{
                          if(window.confirm('정말 삭제하시겠습니까?')) dispatch(deleteCart(elm.id));
                        }}>삭제하기</button>
                      </td>
                    </tr>

                  ))
                  :
                  <tr>
                    <td colSpan={6}>상품이 존재하지 않습니다.</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <div className="allPrice">
            결제 예정금액 
            <h2><span>{toNumber(total as number)}</span>원</h2>
          </div>

          <div className="btnList">
            <button className="color0" onClick={()=>{
              dispatch(checkDelete(checkItem))
            }}>
              선택삭제
            </button>
            <button className="color1" onClick={buyBtn}>
              결제하기
            </button>
          </div>

        </div>
      </div>

      {
        moID.show ?
          <Modal size={moID.id} modalClose={modalClose}/>
        :
          null
      }

    </>
  )
}


// 세일 컴포넌트
function Sale(props : {sale : number,price : number}){

  function saleCalc(sale : number,price : number){
    return price - (price * sale/100);
  }

  return(
    <span className="color00">{ toNumber(saleCalc(props.sale,props.price) as number)}원</span>
  )

}


// 모달 컴포넌트

function Modal({size,modalClose} : {size : number, modalClose: Function}) {

  const dispatch = useDispatch();

  const productData = useSelector((state:RootState)=>state.product);

  const [shoes,setShoes] = useState<ProductState>();
  useEffect(()=>{
    
    if(productData){
      setShoes(
          productData.find(a=>{
              return a.id === size;
          })
      );
    }
      
  },[size]);    

return (
  <div className="modal-cart">
    <div className="back"></div>
    <div className="cont">

      <div className="close" onClick={()=>{
          modalClose();
      }}>
          <AiOutlineClose/>
      </div>

      <h2>
          사이즈 변경
      </h2>

      <ul className="size">
          {
              shoes ? 
                  shoes.size.map((elm,i)=>(
                      <li key={i} onClick={()=>{
                          if(window.confirm(`${elm}cm로 수정하시겠습니까?`)){
                              dispatch(sizeChangeCart({
                                  id : size,
                                  size : elm
                              }));
                              modalClose();
                          }
                      }}>{elm}</li>
                  ))
              : null
          }
      </ul>

    </div>
  </div>
)
}

export default Cart