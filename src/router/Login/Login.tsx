import React from 'react'
import {Link} from "react-router-dom"
import "./Login.scss"

function Login() {
  return (
    <div className='_login'>

        <h1 className="h1">로그인</h1>

        <div className="bx">
            <p>회원</p>
            <input type="text" placeholder='아이디' />
            <input type="password" placeholder='비밀번호' />
            <div className="checkbox">
                <input type="checkbox" id='idSave' name='idSave'/>
                <label htmlFor="idSave"><div className="ch-icon"></div> 아이디 저장</label>
            </div>
            <button type="submit">로그인</button>

            <ul>
                <li>
                    <Link to={"/"}>회원가입</Link>
                </li>
                <li>
                    <Link to={"/"}>아이디 찾기</Link>
                    <Link to={"/"}>비밀번호 찾기</Link>
                </li>
            </ul>

        </div>

    </div>
  )
}

export default Login