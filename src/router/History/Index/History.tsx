import React,{useEffect,useState} from 'react'

// SCSS
import "./History.scss"
import {Link} from "react-router-dom"
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'
import moment from 'moment';
import { HistoryInterface } from '../../../store/hitory';

function History() {

    const history = useSelector((state:RootState)=>state.history);
    const user = useSelector((state:RootState)=>state.user);

    const [historyData,setHistoryData] = useState<HistoryInterface[]>([]);


    useEffect(()=>{

        const filter = history.filter(e=>e.user === user.userID);
        setHistoryData(filter);

    },[user]);

    
  return (
    <div className="history">
        <div className="_k_wrap" data-max="1480">
            
            <h2 className="t-title">주문내역</h2>

            <ul className='box'>

                {
                    historyData.length > 0 ?
                    historyData.map((e,i)=>(
                        <li key={i}>
                            <p className="date">{moment(e.date).format("YYYY-MM-DD")}</p>
                            <p className="token">주문번호 : {e.token}</p>

                            {
                                e.buyItem.map((a,index)=>(

                                    <div className="imb" key={index}>
                                        <div className="img" style={{backgroundImage : `url(${a.src})`}}></div>
                                        <div className="tbx">
                                            <p className='name'>{a.name} </p>
                                            <p className='size'>SIZE : {a.product_size} | {a.product_amount}개</p>
                                            <p className='price'>
                                                {
                                                    a.sale ?
                                                        (a.price - (a.price * a.sale / 100)) * a.product_amount
                                                    :
                                                        a.price * a.product_amount
                                                } 원
                                            </p>
                                        </div>
                                    </div>
                                ))
                            }

                            <Link className='detail' to={`more/${e.token}`}>상세 정보</Link>
                            
                        </li>
                    ))
                    :
                    <li style={{textAlign:"center"}}>주문한 기록이 존재하지 않습니다.</li>
                }

            </ul>

        </div>
    </div>
  )
}

export default History