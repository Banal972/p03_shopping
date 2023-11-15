import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import { useLocation } from 'react-router-dom';
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector, useStore } from 'react-redux';

// GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

// SCSS
import "./Card.scss";

// 스토어
import { RootState } from '../../app/store';
import { addSlangAction,removeSlangAction } from '../../store/user';
import { ProductState } from '../../store/product';
import { toNumber } from '../../lib/lib';

interface CardType {
  offset : number
  type? : string
  data? : ProductState[]
  cate? : String | Number
}

function Card(props : CardType){

  const {offset,data,type,cate} = props;
  const limit = 10;

  // location
  const location = useLocation();

  // 모듈
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 유저
  const user = useSelector((state:RootState)=>state.user);
  
  // 데이터 2차 공정
  const [sliceData,setSliceData] = useState<ProductState[]>();

  useEffect(()=>{

    const limitCalc = limit + offset;
    const slice = data?.slice(offset,(limitCalc));

    setSliceData(slice);

  },[offset]);

  // 찜목록
  const iconHandler = (e:React.MouseEvent<HTMLDivElement>,elm:any)=>{

    // 로그인이 안되어있으면
    if(Object.keys(user).length === 0){
      window.alert('로그인을 해야 찜을 하실수있습니다.') 
      navigate('/login');
      return;
    }

    //user 안에 slang이란 배열안에 id값이 존재하는지 확인
    if(user?.slang?.includes(elm)){
      if(window.confirm('정말 삭제하시겠습니까?')){
        dispatch(removeSlangAction(elm));
      }
    }else{
      dispatch(addSlangAction(elm));
    }
    
  }

  // GSAP
  gsap.registerPlugin(ScrollTrigger);
  useEffect(()=>{

    if(type === "scroll"){

      gsap.utils.toArray<HTMLElement>(".cardLayout .item").forEach((e)=>{

        gsap.fromTo(e,{
          yPercent : 20,
          opacity : 0
        },{
          yPercent : 0,
          opacity : 1,
          duration : 0.6,
          ease : "back.inOut(1.7)",
          scrollTrigger : {
            trigger : e,
            // markers : true,
            start : "top-=20% bottom-=5%"
          }
        })
  
      })

    }

  },[data]);

  return (
    <div className="cardLayout">
      {
         data && data.map((elm,i)=>{
            return(

              <div className="item" key={i} >

                  <div className="img"  onClick={(e)=>{
                    navigate(`/detail/${elm.id}`);
                  }}>
                    <div className="bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}${elm.src})`}} ></div>
                  </div>

                  <div className="tbx">

                    <h2 className="tit">
                      {elm.name}
                    </h2>

                    <p className='price'>
                      { 
                        elm.sale ? 
                        <Sale sale={elm.sale} price={elm.price} />
                        :
                        toNumber(elm.price as number)+"원"
                      }
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

            )
          }
        )
      }
    </div>
  )
}


function Sale(props:{sale:number,price:number}){

  function saleCalc(sale:number,price:number){
    return price - (price * sale/100);
  }

  return(
    <>
      <span className="sales">{toNumber(props.price as number)}</span> <span className='color00'>{toNumber(saleCalc(props.sale,props.price) as number)}원</span>
    </>
  )

}

export default Card 