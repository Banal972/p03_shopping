import React from 'react'
import { useNavigate } from 'react-router'
import "./Card.scss";
import { AiOutlineHeart } from "react-icons/ai";

function Card({max, data} : {max:number,data:any[]}){

  const navigate = useNavigate();

  return (
    <div className="cardLayout">
      {
        data.map((elm,i)=>{
            return(

              max > i ?
                <div className="item" key={i} >

                  <div className="img"  onClick={(e)=>{
                    navigate(`/detail/${elm.id}`);
                  }}>
                    <div className="bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/img/shoes/${elm.src})`}}></div>
                  </div>

                  <div className="tbx">

                    <h2 className="tit">
                      {elm.name}
                    </h2>

                    <p className="price">
                      { 
                        /* elm.sale ? 
                        <Sale sale={elm.sale} price={elm.price} />
                        :
                        elm.price  */
                      }
                      {elm.price}원
                    </p>

                    <p className="des">
                      {elm.description}
                    </p>

                    <div className="icon" onClick={()=>{
                        /* const rs = user.wishlist.findIndex(item=> item.id === elm.id);
                          if(rs > -1) {
                            dispatch(wishlistDel(elm.id));
                          }else {
                            dispatch(wishlistAdd(elm.id));
                          } 
                        */
                      }}>
                        {
                          /* 
                          user.wishlist.find(item=>item.id === elm.id) ? <AiFillHeart/> : <AiOutlineHeart/> 
                          */
                        }
                        <AiOutlineHeart/> 
                    </div>

                  </div>
                </div>
              : null

            )
          }
        )
      }
    </div>
  )
}

export default Card 