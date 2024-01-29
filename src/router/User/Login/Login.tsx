import React,{useState,useEffect} from 'react'
import {Link,useNavigate} from "react-router-dom"
import {useCookies} from "react-cookie"
import axios from 'axios';

// 타입
import { UserType } from '../../../types/customType';

// SCSS
import "./Login.scss"

function Login() {

    // 내비게이터
    const navigate = useNavigate();

    // 디스패치

    // 쿠키
    const [cookies, setCookie, removeCookie] = useCookies(['userID']);

    // 데이터
    const [idInput,setIdInput] = useState('');
    const [passInput,setPassInput] = useState('');

    // 아이디저장
    const [term,setTerm] = useState(false);

    const termHandler = (e:React.ChangeEvent<HTMLInputElement>)=>{
        setTerm(e.target.checked);
    }

    useEffect(()=>{
        setIdInput(cookies.userID);
        if(cookies.userID){
            setTerm(true);
        }
    },[cookies]);


    // 멤버 데이터
    const [memeberData,setMemeberData] = useState<UserType>({});
    useEffect(()=>{

        const api = process.env.REACT_APP_MEMBER_AJAX || "";

        if(api){

            axios.get(api)
            .then(({data})=>{
                setMemeberData(data);
            })
            .catch(e=>{
                console.log('통신 에러');
            });

        }

    },[]);

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

        e.preventDefault();

        /* const loginData = memeberData.filter(el=>{
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

                if(term){
                    setCookie('userID',idInput);
                }else{
                    removeCookie('userID');
                }

            }else{

                alert('비밀번호가 틀립니다.');
                setPassInput('');

            }

        } */

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
                    defaultValue={memeberData.userID}
                />
                <input 
                    type="password" 
                    placeholder='비밀번호' 
                    onChange={passHandler} 
                    autoComplete="off" 
                    defaultValue={memeberData.password}
                />
                {/* <div className="checkbox">
                    <input type="checkbox" id='idSave' name='idSave' onChange={termHandler} checked={term} readOnly/>
                    <label htmlFor="idSave">아이디 저장</label>
                </div> */}
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