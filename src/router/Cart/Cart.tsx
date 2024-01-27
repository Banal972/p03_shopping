import {useState,useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { IoIosCheckmark } from "react-icons/io";
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from '../../state/atoms/user';
import { cartState } from '../../state/atoms/cart';
import { BuyType, CartType } from '../../types/customType';

// lib
import { authLogin, toNumber } from '../../lib/lib';

// SCSS
import "./Cart.scss"


function Cart() {


  // 카트 가져오기
  const cart = useRecoilValue(cartState);  

  // 총액
  const [total,setTotal] = useState(0);
  // 총액계산
  useEffect(()=>{

    let allPrice = 0;

    cart.forEach((elm)=>{
      elm.product.sale ? 
        allPrice += (elm.product.price - (elm.product.price * elm.product.sale/100)) * elm.amount
      :
        allPrice += elm.product.price * elm.amount;
    });

    setTotal(allPrice);

  },[cart]);

  // 선택된 아이템
  const [checkItem,setCheckItem] = useState<string[]>([]);
  

  // 단일 선택
  const handleSingleCheck = (checked : boolean, id : string) => {

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
      const idArray : string[] = [];
      cart.forEach((el)=> idArray.push(`${el.id}${el.size}`));
      setCheckItem(idArray);
    }else{
      setCheckItem([]);
    }

  }


  return (
    <>

      <div className="_cart">
        <div className="_k_wrap" data-max="1600">

          <h2 className="t-title">
              장바구니
          </h2>

          <div className="grid-table">

            <div className="h-col head">

              <div className="col">
                
                <div className="flay">
                  <div className="check">
                    <input type="checkbox" 
                      onChange={(e)=>handleAllCheck(e.target.checked)}
                      checked={checkItem.length === cart.length ? true : false} 
                      readOnly
                      id="all"
                    />
                    <label htmlFor="all"><IoIosCheckmark/></label>
                  </div>
                  <p className="all-amount">전체선택 ({checkItem.length}/{cart.length})</p>
                </div>

              </div>
              
              <div className="col">상품명</div>
              <div className="col">가격</div>
              <div className="col">수량</div>
              <div className="col">삭제</div>

            </div>

            {

              cart.length > 0 ?
              cart.map((elm,i)=>(
                <div className="h-col" key={i}>

                  <div className="col">
                    <div className="check">
                      <input type="checkbox" 
                        onChange={(e)=>{handleSingleCheck(e.target.checked,`${elm.id}${elm.size}`)}} 
                        checked={checkItem.includes(`${elm.id}${elm.size}`) ? true : false} 
                        id={`chk${elm.id}${elm.size}`}
                        readOnly
                      />
                      <label htmlFor={`chk${elm.id}${elm.size}`}><IoIosCheckmark/></label>
                    </div>
                  </div>

                  <div className="col">
                    <div className="fl">
                        <div className="img" style={{backgroundImage:`url(${process.env.PUBLIC_URL}${elm.product.src})`}}></div>
                        <div className="tbx">
                          <dl>
                            <dt>{elm.product.name}</dt>
                            <dd>사이즈 : {elm.size}</dd>
                          </dl>
                        </div>
                      </div>
                  </div>

                  <div className="col priceCol">
                    <p className="p-col">가격</p>
                    {
                      elm.product.sale ?
                      <div>
                        <p className="sale">
                          {toNumber(elm.product.price as number)}원
                        </p>
                        <p className="price">
                          <Sale price={elm.product.price} sale={elm.product.sale} />
                        </p>
                      </div> 
                      :
                      <p className="price">
                        {toNumber(elm.product.price as number)}원
                      </p>
                    }
                  </div>

                  <div className="col amountCol">

                    <p className="p-col">
                      수량
                    </p>
                    <div className="amount">
                      <AddCart elm={elm}/>
                      <ChangeCart elm={elm}/>
                      <DeleteCart elm={elm}/>
                    </div>

                  </div>

                  <div className="col">
                    <RemoveCart elm={elm}/>
                  </div>

                </div>
              ))
              :
              <div className="h-col">
                <div className="col" style={{gridColumn:"1/10", textAlign : "center"}}>상품이 존재하지 않습니다.</div>
              </div>
            }

          </div>

          <div className="allPrice">
            결제 예정금액 
            <h2><span>{toNumber(total as number)}</span>원</h2>
          </div>

          <RemoveBuy checkItem={checkItem}/>

        </div>
      </div>

    </>
  )
}

// 갯수 추가 컴포넌트
function AddCart(props : {elm : CartType}){

  const {elm} = props;

  const [cart,setCart] = useRecoilState(cartState);

  const addHandler = ()=>{

    const rs = cart.findIndex(el=>{ // findIndex 로 값이 있는지 체크
        return el.id === elm.id && el.size === elm.size;
    });

    if(rs > -1){ // 값이 존재하면
      
      // Recoil은 불변성을 강제해서 새로운 배열을 생성하고 수정해줘야합니다.
      const updateCart = cart.map((item,index)=>
        index === rs
        ? {
          ...item,
          amount : item.amount + 1
        }
        : item
      );

      setCart(updateCart);

    }

  }

  return (
    <button onClick={addHandler}>+</button>
  )
}


// 값 삭제 컴포넌트
function DeleteCart(props : {elm : CartType}){

  const {elm} = props;

  const [cart,setCart] = useRecoilState(cartState);

  const removeHandler = ()=>{

    let rs = cart.findIndex(el=>el.id === elm.id && el.size === elm.size);

    if(elm.amount <= 1){
      
      if(window.confirm('삭제 하시겠습니까?')){

        if(rs > -1){

          setCart((prev)=>{
            const updateCart = prev.filter((item,index)=>index !== rs);
            return updateCart;
          })

        }

      }

    }else{

      const updateCart = cart.map((item,index)=>
        index === rs
        ? {
          ...item,
          amount : item.amount - 1
        }
        : item
      );

      setCart(updateCart)

    }

  }

  return (
    <button 
      onClick={removeHandler}
    >-</button>
  )

}


// 값 수정 컴포넌트
function ChangeCart(props : {elm : CartType}){

  const {elm} = props;

  const [cart,setCart] = useRecoilState(cartState);

  const changeHanlder = (e : React.ChangeEvent<HTMLInputElement>)=>{
    
    let rs = cart.findIndex(el=>{ // findIndex 로 값이 있는지 체크
        return el.id === elm.id && el.size === elm.size;
    });

    if(rs > -1){ // 값이 존재하면
      
      if(window.confirm('삭제 하시겠습니까?')){

        if(Number(e.target.value) === 0){ // 0을 입력했을때 삭제할건지
          setCart((prev)=>{
            const updateCart = prev.filter((item,index)=>index !== rs);
            return updateCart;
          })
        }

      }else{

        setCart((prev)=>{ 
          const prevCart = [...prev];
          prevCart[rs] = {
            ...prevCart[rs],
            amount : Number(e.target.value)
          }
          return prevCart;
        });

      }

    }
      
  }

  return(
    <input 
      type="text" 
      value={elm.amount} 
      onChange={(e)=>changeHanlder(e)}
    />
  )

}

// 전체 삭제 컴포넌트
function RemoveCart(props : {elm : CartType}){

  const {elm} = props;
  const [cart,setCart] = useRecoilState(cartState);

  const removeHandler = ()=>{

    let rs = cart.findIndex(el=>el.id === elm.id && el.size === elm.size);

    if(window.confirm('삭제 하시겠습니까?')){

      if(rs > -1){

        setCart((prev)=>{
          const prevCart = [...prev].filter((item,index)=>index !== rs); // splice로 배열삭제
          return prevCart;
        })

      }

    }

  }

  return(
    <button 
      className="delete"
      onClick={removeHandler}
    >삭제하기</button>
  )

}

// 결제/삭제 컴포넌트
function RemoveBuy(props : {checkItem : string[]}){

  const {checkItem} = props;

  // 네비게이터
  const navigate = useNavigate();

  // 유저 가져오기
  const userData = useRecoilValue(userState);

  const [cart,setCart] = useRecoilState(cartState);

  // 구매버튼
  const buyBtn = ()=>{
    
    if(userData && authLogin(userData,navigate)){

      const buy :BuyType[] = [];

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

  }

  return (
    <div className="btnList">
            
      <button className="color0" onClick={()=>{

        if(checkItem.length <= 0){
          return alert('체크된 상품이 없습니다.')
        }

        if(window.confirm("삭제하시겠습니까?")){

          setCart((prev)=>{
            const prevCart = [...prev].filter(el => checkItem.includes(`${el.product.id}${el.product.size}`))
            return prevCart;
          });

        }
      }}>
        선택삭제
      </button>

      <button 
        className="color1" 
        onClick={buyBtn}
      >
        결제하기
      </button>

    </div>
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

export default Cart