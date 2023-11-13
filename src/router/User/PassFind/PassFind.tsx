import React,{useState} from 'react'

import "../style/find.scss"
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'

function PassFind() {

    const memeber = useSelector((state : RootState)=>state.memeber);

    const [input,setInput] = useState({
        user_id : "",
        user_email : ""
    });

    const inputHandler = (e : React.ChangeEvent<HTMLInputElement>,ins : string)=>{

        setInput((prev)=>({
            ...prev,
            [ins] : e.target.value
        }));
    }

    const findSeleter = ()=>{

        if(input.user_id === ""){
            return alert('아이디를 입력해주세요');
        }

        if(input.user_email === ""){
            return alert('이메일을 입력해주세요');
        }

        const findId = memeber.findIndex(e=>e.userID === input.user_id);

        const findEmail = memeber.findIndex(e=>e.email === input.user_email);

        if(findId < 0){
            return alert("해당 되는 아이디가 없습니다.")
        }

        if(findEmail < 0){
            return alert("해당 되는 이메일이 없습니다.")
        }


        const getPass = memeber.filter(e=>{
            return e.userID === input.user_id && e.email === input.user_email
        });

        alert(`${input.user_id} 님의 비밀번호는 ${getPass[0].password} 입니다.`);

    }

  return (
    <div className="user-find">

        <h2 className="t-title">비밀번호 찾기</h2>

        <div className="bx">
            <p className='line'>비밀번호 찾기</p>
            <div className="in">
                <input type="text" value={input.user_id} placeholder='아이디' onChange={e=>inputHandler(e,"user_id")} />
                <p>가입시 사용했던 성함을 입력해주세요.</p>
            </div>
            <div className="in">
                <input type="email" value={input.user_email} placeholder='이메일' onChange={e=>inputHandler(e,"user_email")} />
                <p>가입시 사용했던 이메일을 입력해주세요.</p>
            </div>
            <button onClick={findSeleter}>찾기</button>
        </div>

    </div>
  )
  
}

export default PassFind