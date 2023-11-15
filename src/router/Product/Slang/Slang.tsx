import React from 'react'
import "./Slang.scss"
import Card from '../../../comp/Card/Card'
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'

function Slang() {

    const user = useSelector((state:RootState)=>state.user);
    const slangProductData = useSelector((state:RootState)=>state.product).filter(el=>{
        return user?.slang?.some(e => e === el.id);
    })

  return (
    <div className="_slang">

        <div className="visual" style={{backgroundImage: `url(${process.env.PUBLIC_URL}/img/list/listBg01.jpg)`}}></div>

        <div className="_k_wrap" data-max="1600">

            <h1 className="h1">관심상품</h1>

            <Card offset={0} data={slangProductData}/>

        </div>

    </div>
  )
}

export default Slang