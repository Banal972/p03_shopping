import React,{useEffect,useState} from 'react'

// SCSS
import "./History.scss"
import { useSelector } from 'react-redux'
import { RootState } from '../../app/store'
import moment from 'moment';
import { HistoryInterface } from '../../store/hitory';

function History() {

    const history = useSelector((state:RootState)=>state.history);
    const user = useSelector((state:RootState)=>state.user);

    const [historyData,setHistoryData] = useState<HistoryInterface[]>([]);


    useEffect(()=>{

        const filter = history.filter(e=>e.userID === user.userID);
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
                            <p className="date">{moment(e.buydate).format("YYYY-MM-DD")}</p>
                            <p className="token">주문번호 : {e.buyToken}</p>

                            <div className="imb">
                                <div className="img" style={{backgroundImage : `url(${e.src})`}}></div>
                                <div className="tbx">
                                    <p className='name'>{e.name}</p>
                                    <p className='size'>사이즈 - {e.size}</p>
                                    <p className='price'>{e.price}원</p>
                                </div>
                            </div>
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