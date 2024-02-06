import {useEffect,useState} from 'react'
import moment from 'moment';
import {Link} from "react-router-dom"
import { toNumber } from '../../../../lib/lib'
import { useRecoilValue } from 'recoil';
import { historyState } from '../../../../state/atoms/history';
import { userState } from '../../../../state/atoms/user';
import { HistoryType } from '../../../../types/customType';

// SCSS
import "./History.scss"

function History() {

    const history = useRecoilValue(historyState);
    const user = useRecoilValue(userState);

    const [historyData,setHistoryData] = useState<HistoryType[]>([]);
    useEffect(()=>{

        const filter = history.filter(e=>e.user === user?.userID);
        setHistoryData(filter);

    },[user,history]);
    
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
                                        <div className="img" style={{backgroundImage : `url(${process.env.PUBLIC_URL}${a.src})`}}></div>
                                        <div className="tbx">
                                            <p className='name'>{a.name} </p>
                                            <p className='size'>SIZE : {a.product_size} | {a.product_amount}개</p>
                                            <p className='price'>
                                                {
                                                    a.sale ?
                                                        toNumber((a.price - (a.price * a.sale / 100)) * a.product_amount as number)
                                                    :
                                                        toNumber(a.price * a.product_amount as number)
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