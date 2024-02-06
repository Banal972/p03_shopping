import React,{useEffect} from 'react'
import { useNavigate } from 'react-router'
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";

// GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

// SCSS
import "./Card.scss";

// 스토어
import { toNumber } from '../../lib/lib';
import { useRecoilState } from 'recoil';
import { userState } from '../../state/atoms/user';
import { ProductType } from '../../types/customType';

interface CardType {
  offset? : number
  type? : string
  data? : ProductType[]
  cate? : String | Number
}

function Card(props : CardType){

    const {data,type} = props;

  // 모듈
  const navigate = useNavigate();

  // 유저
  const [user,setUser] = useRecoilState(userState);

  // 찜목록
  const iconHandler = (e:React.MouseEvent<HTMLDivElement>,elm : number)=>{

    // 로그인이 안되어있으면
    if(!user){
      window.alert('로그인을 해야 찜을 하실수있습니다.') 
      navigate('/login');
      return;
    }

    //user 안에 slang이란 배열안에 id값이 존재하는지 확인
    if(user?.slang?.includes(elm)){

        if(window.confirm('정말 삭제하시겠습니까?')){
          
            setUser( (prev) => ({
                ...prev,
                slang : prev?.slang?.filter(e=>e !== elm) // slang 에서 클릭한 elm을 제외하고 넣어줍니다.
            }));
            
        }
        
      }else{
  
        setUser( (prev) => ({
            ...prev,
            slang : [...(prev?.slang || []), elm] // []을 붙인이유는 null 일수도 있기 때문에 null 일경우 빈 배열을 전달해줍니다.
        }));
          
      }
    
  }

  // 스크롤 애니메이션
  gsap.registerPlugin(ScrollTrigger);
  useEffect(()=>{

    if(type === "scroll"){ // 타입이 스크롤 일때

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

  },[data,type]);

  return (
    <div className="cardLayout">
      {
         data && data.map((elm,i)=>{
            return(

              <div className="item" key={i} >

                  <div className="img"  onClick={(e)=>{
                    navigate(`/detail/${elm.id}`);
                  }}>
                    <div 
                        className="bg" 
                        style={{backgroundImage:`url(${process.env.PUBLIC_URL}${elm.src})`}} 
                    />
                  </div>

                  <div className="tbx">

                    <h2 className="tit">
                      {elm.name}
                    </h2>

                    <p className='price'>
                      { 
                        elm.sale 
                        ? 
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
                          user && 
                            user.slang?.find(item=>Number(item) === Number(elm.id)) 
                            ? 
                              <AiFillHeart/> 
                            : 
                              <AiOutlineHeart/>
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