import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import "./Login.scss"
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { loginAction } from '../../store/user';

function Login() {

    const navigate = useNavigate();
    const dispath = useDispatch();

    const [idInput,setIdInput] = useState('');
    const [passInput,setPassInput] = useState('');

    const memeberData = useSelector((state :RootState)=>state.memeber);

    const idHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setIdInput(e.target.value);
    }

    const passHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassInput(e.target.value);
    }

    const submitHandler = (e:React.FormEvent<HTMLFormElement>)=>{

        e.preventDefault();

        const loginData = memeberData.filter(el=>{
            return el.userID === idInput;
        })

        if(loginData.length <= 0 && loginData[0] === undefined){
            alert('없는 계정 입니다.');
            setIdInput('');
        }else{

            if(loginData[0].password === passInput){

                dispath(loginAction(loginData[0]));
                alert('로그인을 성공했습니다.');
                navigate('/');

            }else{

                alert('비밀번호가 틀립니다.');
                setPassInput('');

            }

        }

    }

  return (
    <div className='_login'>

        <h1 className="h1">로그인</h1>

        <div className="bx">
            <form onSubmit={submitHandler}>
                <p>회원</p>
                <input type="text" placeholder='아이디' onChange={idHandler} />
                <input type="password" placeholder='비밀번호' onChange={passHandler}/>
                <div className="checkbox">
                    <input type="checkbox" id='idSave' name='idSave'/>
                    <label htmlFor="idSave"><div className="ch-icon"></div> 아이디 저장</label>
                </div>
                <button type="submit">로그인</button>
            </form>

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