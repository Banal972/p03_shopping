import {useEffect, useState} from 'react'

// GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

// Recoil
import { useRecoilValue } from "recoil";
import { userState } from "../../../state/atoms/user";
import { ProductType } from "../../../types/customType";
import axios from "axios";

import Card from '../../../component//Card/Card'

function Slang() {

    const user = useRecoilValue(userState);
    const [slangProductData,setSlangProductData] = useState<ProductType[]>([]);
    useEffect(()=>{
      
        const api = process.env.REACT_APP_PRODUCT_AJAX || "";

        axios.get(api)
        .then(({data} : {data : ProductType[]})=>{
            const filter = data.filter(el=>user?.slang?.some(e => e === el.id)); // some 은 특정 조건을 충족하는지 검사해줍니다.
            setSlangProductData(filter);
        })
        .catch(e=>{
            console.log('통신 에러');
        })
    },[user]);


    // GSAP
    gsap.registerPlugin(ScrollTrigger);
    useEffect(()=>{

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

    },[slangProductData]);

  return (
    <div className='_list'>

        <div className="visual" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img/list/listBg01.jpg)`}}></div>

        <div className="_k_wrap" data-max="1600">

            <h1 className="h1">관심상품</h1>

            <Card data={slangProductData}/>

        </div>
        
    </div>
  )
}

export default Slang