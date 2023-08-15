import React from 'react'
import "./Cart.scss"

function Cart() {
  return (
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
                    {/* <input type="checkbox" onChange={(e)=>handleAllCheck(e.target.checked)}
                      checked={checkItem.length === cart.length ? true : false}
                    /> */}
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
                  /* cart.length > 0 ?
                  cart.map((elm,i)=>(

                    <tr key={i}>
                      <td>
                        <input type="checkbox" 
                          onChange={(e)=>{handleSingleCheck(e.target.checked,elm.id)}} 
                          checked={checkItem.includes(elm.id) ? true : false}
                        />
                      </td>
                      <td>
                        <div className="fl">
                          <div className="img" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/img/shoes/${elm.src})`}}></div>
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
                              {elm.price}원
                            </p>
                            <p className="price">
                              <Sale price={elm.price} sale={elm.sale} />원
                            </p>
                          </> 
                          :
                          <p className="price">
                            {elm.price}원
                          </p>
                        }
                      </td>
                      <td>
                        <div className="amount">
                          <button onClick={()=>{
                            dispatch(plusCart(elm.id));
                          }}>+</button>
                            <input type="text" value={elm.amount} />
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
                          (elm.price - (elm.price * elm.sale/100))*elm.amount
                          :
                          elm.price * elm.amount
                        }
                        원
                      </td>
                      <td>
                        <button className="delete" onClick={()=>{
                          if(window.confirm('정말 삭제하시겠습니까?')) dispatch(deleteCart(elm.id));
                        }}>삭제하기</button>
                      </td>
                    </tr>

                  ))
                  : */
                  <tr>
                    <td colSpan={6}>상품이 존재하지 않습니다.</td>
                  </tr>
                }
              </tbody>
            </table>
          </div>

          <div className="allPrice">
            결제 예정금액 
            <h2><span>{/* {total.toLocaleString('ko-KR')} */}</span>원</h2>
          </div>

          <div className="btnList">
            <button className="color0" onClick={()=>{
              /* dispatch(checkDelete(checkItem)) */
            }}>
              선택삭제
            </button>
            <button className="color1">
              결제하기
            </button>
          </div>

        </div>
      </div>
  )
}

export default Cart