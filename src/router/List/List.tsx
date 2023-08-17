import React,{useEffect,useState} from 'react'
import Card from '../../comp/Card/Card'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';

import "./List.scss";

function List() {

  const {cate} = useParams();
  const navigate = useNavigate();
  const dispath = useDispatch();

  // 상품데이터
  const productData = useSelector((state : RootState)=>state.product);

  // 태그 가져오기
  const productTagData = useSelector((state : RootState)=>state.productTag);
  
  // 데이터 1차 공정
  let filterProductData = [];
  if(cate === "456"){ // 세일 데이터
    filterProductData = productData.filter(el=>el.sale);
  }else if (cate === "999"){ // BEST 데이터
    filterProductData = productData.filter(e => e.hit >= 100).sort((a,b)=>{ return b.hit - a.hit });
  }else { // 나머지 데이터
    filterProductData = productData.filter(el=>el.cate === cate);
  }
  
  // 이미지URL
  const [imgSrc,setImgSrc] = useState('');
  
  // 타이틀
  const [title,setTitle] = useState('타이틀');
  
  // 클릭데이터
  const [selectTag,setSelectTag] = useState<String | null>(null);

  const tagHandler = (e:String)=>{
    if(e === "전체") return setSelectTag(null);
    setSelectTag(e);
  }

  // 태그 클릭 데이터
  const tagFilterProductData = selectTag ? filterProductData.filter(e=>e.tag.includes(selectTag)) : filterProductData; // includes로 가지고 있는지 체크

  // 타이틀수정
  useEffect(()=>{

    switch(cate){
      case "001" :
        setImgSrc('listBg01');
        setTitle('스니커즈');
        break;
      case "002" :
        setImgSrc('listBg02');
        setTitle('스포츠');
        break;
      case "003" :
        setImgSrc('listBg03');
        setTitle('샌들/슬리퍼');
        break;
      case "456" :
        setImgSrc('listBg04');
        setTitle('SALE');
      break;

      case "999" :
        setImgSrc('listBg01');
        setTitle('BEST');
      break;

    }

  },[cate]);


  return (
    <div className='_list'>

        <div className="visual" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img/list/${imgSrc}.jpg)`}}></div>

        <div className="_k_wrap" data-max="1600">

            <h1 className="h1">{title}</h1>

            <ul className='tag'>
              { productTagData && productTagData.map((el,i)=><li key={i} onClick={()=>tagHandler(el)} >{el}</li>)}
            </ul>

            <Card max={10} data={tagFilterProductData} cate={cate}/>

        </div>
        
    </div>
  )

}

export default List