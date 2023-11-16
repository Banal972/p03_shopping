import React,{useState} from 'react'

import "../style/find.scss"
import { useSelector } from 'react-redux'
import { RootState } from '../../../app/store'

function IdFind() {

    const memeber = useSelector((state : RootState)=>state.memeber);

    const [input,setInput] = useState({
        user_name : "",
        user_email : ""
    });

    const inputHandler = (e : React.ChangeEvent<HTMLInputElement>,ins : string)=>{

        setInput((prev)=>({
            ...prev,
            [ins] : e.target.value
        }));
    }

    const findSeleter = ()=>{

        if(input.user_name === ""){
            return alert('성함을 입력해주세요');
        }

        if(input.user_email === ""){
            return alert('이메일을 입력해주세요');
        }

        const findname = memeber.findIndex(e=>e.name === input.user_name);

        if(findname < 0){
            return alert("해당 되는 성함이 없습니다.")
        }

        const findEmail = memeber.findIndex(e=>e.email === input.user_email);

        if(findEmail < 0){
            return alert("해당 되는 이메일이 없습니다.")
        }

        const get = memeber.filter(e=>{
            return e.email === input.user_email && e.name === input.user_name
        });

        alert(`${input.user_name} 님의 아이디는 ${get[0].userID} 입니다.`);

    }

  return (
    <div className="user-find">

        <h2 className="t-title">아이디 찾기</h2>

        <div className="bx">
            <p className='line'>아이디 찾기</p>
            <div className="in">
                <input type="text" value={input.user_name} placeholder='성함' onChange={e=>inputHandler(e,"user_name")} />
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

export default IdFind