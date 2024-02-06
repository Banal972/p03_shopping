import React,{useState} from 'react'
import {Link,useNavigate} from "react-router-dom"
import axios from 'axios';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { userState } from '../../../state/atoms/user';

// 타입
import { UserType } from '../../../types/customType';

// SCSS
import "./Login.scss"
import { memeberState } from '../../../state/atoms/member';

function Login() {

    // 내비게이터
    const navigate = useNavigate();

    // 데이터

    const member = useRecoilValue(memeberState);

    const [idInput,setIdInput] = useState('');
    const [passInput,setPassInput] = useState('');

    // 유저
    const setUser = useSetRecoilState(userState);

    // 아이디 입력
    const idHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setIdInput(e.target.value);
    }

    // 비밀번호 입력
    const passHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setPassInput(e.target.value);
    }

    // 로그인
    const submitHandler = (e:React.FormEvent<HTMLFormElement>)=>{

        const api = process.env.REACT_APP_MEMBER_AJAX || "";

        if(api){

            axios.get(api)
            .then(({data} : {data : UserType[]})=>{
                
                const check = data.filter((member)=>member.userID === idInput);

                if(check.length > 0){

                    if(check[0].password !== passInput){
                        setPassInput('');
                        return alert('비밀번호가 틀렸습니다.');
                    }

                    alert('로그인을 성공하였습니다.');
                    setUser(check[0]);
                    return navigate('/');

                }else{

                    // api에 없고 recoil에 있을경우체크
                    const recoilCheck = member.filter((member)=>member.userID === idInput);

                    if(recoilCheck.length > 0){

                        if(recoilCheck[0].password !== passInput){
                            setPassInput('');
                            return alert('비밀번호가 틀렸습니다.');
                        }
    
                        alert('로그인을 성공하였습니다.');
                        setUser(recoilCheck[0]);
                        return navigate('/');

                    }else{

                        alert('아이디가 존재하지 않습니다.');

                    }

                }

            })
            .catch(e=>{
                console.log('통신 에러');
            });

        }

        e.preventDefault();
    }

  return (
    <div className='_login'>

        <h1 className="t-title">로그인</h1>

        <div className="bx">
            <form onSubmit={submitHandler}>
                <p>회원</p>
                <input 
                    type="text" 
                    placeholder='아이디' 
                    onChange={idHandler} 
                    defaultValue={idInput}
                />
                <input 
                    type="password" 
                    placeholder='비밀번호' 
                    onChange={passHandler} 
                    autoComplete="off" 
                    defaultValue={passInput}
                />
                <button type="submit">로그인</button>
            </form>

            <ul>
                <li>
                    <Link to={"/sign"}>회원가입</Link>
                </li>
            </ul>

        </div>

    </div>
  )
}

export default Login