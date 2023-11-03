import React,{useState,useEffect} from 'react'
import { useNavigate } from 'react-router'
import "./Card.scss";
import { AiOutlineHeart,AiFillHeart } from "react-icons/ai";
import { useDispatch, useSelector, useStore } from 'react-redux';
import { RootState } from '../../app/store';
import { addSlangAction,removeSlangAction } from '../../store/user';
import { ProductState } from '../../store/product';

interface CardType {
  offset : number
  data? : ProductState[]
  cate? : String | Number
}


function Card(props : CardType){

  const {offset,data,cate} = props;

  const limit = 10;

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
    if(!user){
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

  return (
    <div className="cardLayout">
      {
         data && data.map((elm,i)=>{
            return(

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
                      {/* { 
                        elm.sale ? 
                        <Sale sale={elm.sale} price={elm.price} />
                        :
                        elm.price
                      }
                      {elm.price}원 */}
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

export default Card 