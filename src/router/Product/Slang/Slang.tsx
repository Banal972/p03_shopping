import React,{useEffect} from 'react'
import "./Slang.scss"
import Card from '../../../comp/Card/Card'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'

// GSAP
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/all';

function Slang() {

    const user = useSelector((state:RootState)=>state.user);
    const slangProductData = useSelector((state:RootState)=>state.product).filter(el=>{
        return user?.slang?.some(e => e === el.id);
    })

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

            <Card offset={10} data={slangProductData}/>

        </div>
        
    </div>
  )
}

export default Slang