import {useEffect,useState,useRef} from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../../../app/store';
import axios from 'axios';

// 컴포넌트
import Card from '../../../comp/Card/Card'

// 인터페이스
import {ProudctTag} from "../../../store/product"

// SCSS
import "./List.scss";

// 타입
import { ProductType } from '../../../types/customType';

function List() {

  // cate
  const {cate} = useParams();

  // location
  const location = useLocation();

  // ref
  const scrollRef = useRef<HTMLDivElement>(null);

  // 상품데이터
  const [productData,setProductData] = useState<ProductType[]>([]);
  useEffect(()=>{

    axios.get('http://localhost:9000/product')
    .then(({data})=>{
      setProductData(data)
    })
    .catch(e=>{
      console.log('통신 에러');
    })

  },[]);

  // 태그 가져오기
  const tagData = useSelector((state : RootState)=>state.productTag);
  const [productTag,setProductTag] = useState<ProudctTag | undefined>(undefined);

  useEffect(()=>{

    const filter = tagData.filter(e=>e.tagNumber === cate)[0];
    setProductTag(filter);

  },[cate]);

  // 태그 선택
  const [selectTag,setSelectTag] = useState('전체');
  
  // 데이터 1차 공정
  let [filterProductData,setFilterProductData] = useState<ProductType[]>();
  useEffect(()=>{

    if(cate === "456"){ // 세일 데이터
      setFilterProductData(productData.filter(el=>el.sale));
    }else if (cate === "789"){ // ONLY 데이터
      setFilterProductData(productData.filter(e=>e.only));
    }else if (cate === "999"){ // BEST 데이터
      setFilterProductData(productData.filter(e => e.hit >= 100).sort((a,b)=>{ return b.hit - a.hit }));
    }else { // 나머지 데이터
      setFilterProductData(productData.filter(el=>el.cate === cate));
    }

    // 타이틀수정
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
      case "789" :
        setImgSrc('listBg05');
        setTitle('ONLY');
      break;
      case "999" :
        setImgSrc('listBg06');
        setTitle('BEST');
      break;

    }

    // 초기화
    setSelectTag('전체');

  },[cate,productData]);


  // 태그 클릭 데이터
  const [tagFilterProductData,setTagFilterProductData] = useState<ProductType[]>([]);
  // filterProductData가 수정될때
  useEffect(()=>{

    if(filterProductData){
      setTagFilterProductData(filterProductData);
    }

  },[filterProductData])

  // 클릭데이터
  const tagHandler = (e:string)=>{

    setSelectTag(e); // 셀렉버튼

    // filter
    if(e === "전체" && filterProductData) return setTagFilterProductData(filterProductData);

    if(filterProductData){

      const ar = filterProductData.filter(a=>a.tag.includes(e));

      setTagFilterProductData(ar);

    }

  }
  
  // 이미지URL
  const [imgSrc,setImgSrc] = useState('');
  
  // 타이틀
  const [title,setTitle] = useState('타이틀');


  // 화면 맨위로
  useEffect(()=>{
    window.scrollTo(0,0);
  },[location])

  return (
    <div className='_list'>

        <div className="visual" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img/list/${imgSrc}.jpg)`}}></div>

        <div className="_k_wrap" data-max="1600" ref={scrollRef}>

            <h1 className="h1">{title}</h1>

            <ul className='tag'>
              { 
                productTag &&
                productTag.name.map((el,i)=>
                  <li 
                    key={i} 
                    className={el == selectTag as String ? "act" : undefined} 
                    onClick={()=>tagHandler(el as string)}
                  >
                    {el}
                  </li>
                )
              }
            </ul>

            <Card offset={10} type={"scroll"} data={tagFilterProductData} cate={cate}/>

        </div>
        
    </div>
  )

}

export default List