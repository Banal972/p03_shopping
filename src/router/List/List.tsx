import React,{useEffect,useState} from 'react'
import Card from '../../comp/Card/Card'
import { useNavigate, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';

import "./List.scss";

function List() {

  const {cate} = useParams();
  const navigate = useNavigate();
  const productData = useSelector((state : RootState)=>state.product).filter(el => cate === "456" ? el.sale !== undefined : el.cate === cate);

  const [imgSrc,setImgSrc] = useState('');
  const [title,setTitle] = useState('타이틀');

  useEffect(()=>{

    switch(cate){
      case "001" :
        setImgSrc('listBg01');
        setTitle('게시판1');
        break;
      case "002" :
        setImgSrc('listBg02');
        setTitle('게시판2');
        break;
      case "003" :
        setImgSrc('listBg03');
        setTitle('게시판3');
        break;
      case "456" :
        setImgSrc('listBg04');
        setTitle('SALE');
        break;
    }

  },[cate]);

  return (
    <div className='_list'>

        <div className="visual" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img/list/${imgSrc}.jpg)`}}></div>

        <div className="_k_wrap" data-max="1600">

            <h1 className="h1">{title}</h1>

            <ul className='tag'>
              <li>태그1</li>
              <li>태그2</li>
              <li>태그3</li>
              <li>태그4</li>
            </ul>

            <Card max={10} data={productData}/>

        </div>
        
    </div>
  )
}

export default List