import React from 'react'
import { useNavigate } from 'react-router'
import "./Card.scss";
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addSlangAction,removeSlangAction } from '../../store/user';

interface CardType {
  max : number,
  data? : any[],
  cate? : String | Number
}


function Card(props : CardType){

  const {max,data,cate} = props;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const user = useSelector((state:RootState)=>state.user);
  // console.log(user);

  const iconHandler = (e:React.MouseEvent<HTMLDivElement>,elm:any)=>{

    if(user?.slang?.includes(elm)){
      dispatch(removeSlangAction(elm));
    }else{
      dispatch(addSlangAction(elm));
    }
    
  }

  return (
    <div className="cardLayout">
      {
         data && data.map((elm,i)=>{
            return(

              max > i ?
                <div className="item" key={i} >

                  <div className="img"  onClick={(e)=>{
                    navigate(`/detail/${elm.id}`);
                  }}>
                    <div className="bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}${elm.src})`}}></div>
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

                    <div className="icon" onClick={(e)=>iconHandler(e,elm.id)}>
                        {
                          user && user.slang?.find(item=>item === elm.id) ? <AiFillHeart/> : <AiOutlineHeart/>
                        }
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