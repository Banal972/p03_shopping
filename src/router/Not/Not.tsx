import {useEffect} from 'react'
import not from "../../asset/img/not.svg"
import "./Not.scss"
import gsap from 'gsap'

function Not() {

    useEffect(()=>{

        gsap.fromTo('.not',{
            y : -15
        },{
            y : 15,
            yoyo : true,
            duration : 2,
            repeat : -1,
            ease : "power1.inOut"
        })

    },[]);

  return (
    <div className="not">
        <img src={not} alt="404에러" />
    </div>
  )
}

export default Not