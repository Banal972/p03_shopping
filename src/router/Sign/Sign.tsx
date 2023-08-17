import React, { useState } from 'react'
import { useDaumPostcodePopup } from "react-daum-postcode"
import "./Sign.scss";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { addAction } from '../../store/user';

function Sign() {

    const open = useDaumPostcodePopup("//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js");

    const dispath = useDispatch();

    const memberData = useSelector((state:RootState)=>state.memeber);

    const [id,setId] = useState('');
    const [pass,setPass] = useState('');
    const [pass2,setPass2] = useState('');
    const [zipcode,setZipcode] = useState('');
    const [add,setAdd] = useState('');
    const [add2,setAdd2] = useState('');
    const [name,setName] = useState('');
    const [nickname,setNickname] = useState('');
    const [phoe,setPhone] = useState('');
    const [phoe2,setPhone2] = useState('');
    const [phoe3,setPhone3] = useState('');
    const [email,setEmail] = useState('');
    
    const zipHandleComplete = (data : any) => {
        
        let zipcode = data.zonecode;
        let fullAddress = data.address;
        let extraAddress = '';
    
        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
          }
          fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
        }
    
        setZipcode(zipcode);
        setAdd(fullAddress);
    };
    
    const zipHandleClick = () => {
        open({ onComplete: zipHandleComplete });
    };

    const inputHandler = (e:React.ChangeEvent<HTMLInputElement>,a: React.Dispatch<React.SetStateAction<string>>)=>{
        a(e.target.value);
    }

    const submitHanlder = ()=>{

        const regex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');
        const regid = new RegExp('^(?=.*[a-z])[a-z0-9]{4,16}$');
        const regpass = new RegExp('^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$');

        // 아이디
        if(id === ""){
            return alert('아이디를 입력해주세요');
        }

        if(!regid.test(id)){
            return alert('대문자 혹은 공백 혹은 특수문자가 포함되었거나, 숫자로 시작 또는 숫자로만 이루어진 아이디를 사용하실수 없습니다.');
        }

        const idCheck = memberData.filter(el=>el.userID === id);
        if(idCheck.length > 0){
            alert('존재하는 아이디 입니다.');
            return setId("");
        }


        // 비밀번호
        if(pass === ""){
            return alert('비밀번호를 입력해주세요');
        }
        
        if(pass2 === ""){
            return alert('비밀번호 확인을 입력해주세요');
        }


        if(!regpass.test(pass)){
            return alert("영문, 숫자, 특수문자 조합으로 이루어진 8~15자 가 들어가야합니다.");
        }

        if(pass !== pass2){
            alert('비밀번호가 서로 다릅니다.');
            return setPass2('');
        }


        // 이름
        if(name === ""){
            return alert('이름을 입력해주세요.')
        }

        
        // 전화번호
        if(phoe === "" || phoe2 === "" || phoe3 === ""){
            return alert("휴대폰번호를 전부 다 입력하지 않았습니다.");
        }


        // 이메일
        if(email === ""){
            return alert("이메일을 입력해주세요");
        }

        if(!regex.test(email)){
            return alert('제대로된 이메일을 입력해주세요.');
        }



        // 데이터 조합해서 보내기
        const data = {
            userID : id,
            password : pass,
            email : email,
            name : name,
            nickname : nickname,
            zipcode : zipcode,
            address : add,
            address2 : add2,
            phone : `${phoe}${phoe2}${phoe3}`,
        }

        alert('회원가입이 완료되었습니다.');
        dispath(addAction(data));

    }


  return (
    <div className="_sign">

        <div className="_k_wrap" data-max="850">

            <h1 className="h1">회원가입</h1>

            <div className="bx">

                <div className="terms">
                    
                    [필수] 필수로 꼭 읽어주세요
                    <div className="cobx">
                        <div className="cont">
                            이 사이트는 포트폴리오로 만든 토이 프로젝트 사이트 입니다.<br/>
                            회원가입 같은 경우 DB에 저장되지 않고 브라우저에 저장되어 사용되기 때문에 <br/>브라우저를 껏다키거나 캐시삭제를 하면 저장된것들이 사라집니다.<br/>
                            아무생각 없이 가입하셔도 괜찮습니다.<br/>
                            어떤것에 사용되거나 남겨지거나 하지 않습니다.<br/>
                        </div>
                    </div>
                    <div className="check">
                        <input type="checkbox" id='chk1'/>
                        <label htmlFor="chk1">동의합니다.</label>
                    </div>
                    


                </div>

                <p className="p">정보</p>

                <div className="g">
                    <div className="col">
                        <div className="th">아이디<sup>*</sup></div>
                        <div className="td">
                            <input type="text" onChange={(e)=>inputHandler(e,setId)} value={id}/>
                            <p>(영문소문자/숫자,4~16자)</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="th">비밀번호<sup>*</sup></div>
                        <div className="td">
                            <input type="password" onChange={(e)=>inputHandler(e,setPass)} value={pass}/>
                            <p>(영문 숫자 특수기호 조합 8자리 이상)</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="th">비밀번호 확인<sup>*</sup></div>
                        <div className="td">
                            <input type="password" onChange={(e)=>inputHandler(e,setPass2)} value={pass2}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="th">이름<sup>*</sup></div>
                        <div className="td">
                            <input type="text" onChange={(e)=>inputHandler(e,setName)} value={name}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="th">닉네임<sup>*</sup></div>
                        <div className="td">
                            <input type="text" onChange={(e)=>inputHandler(e,setNickname)} value={nickname}/>
                        </div>
                    </div>
                    <div className="col">
                        <div className="th">주소</div>
                        <div className="td">
                            <div className="zip"><input type="text" disabled style={{maxWidth:150}} value={zipcode}/> <button type='button' onClick={zipHandleClick}>주소찾기</button></div>
                            <div className="add"><input type="text" disabled value={add}/></div>
                            <div className="add2"><input type="text" placeholder='상세주소' onChange={(e)=>inputHandler(e,setAdd2)} value={add2}/></div>
                        </div>
                    </div>
                    <div className="col">
                        <div className="th">휴대전화<sup>*</sup></div>
                        <div className="td call">
                            <input type="text" style={{maxWidth:100}} onChange={(e)=>inputHandler(e,setPhone)} value={phoe} /> - <input type="text" style={{maxWidth:100}} onChange={(e)=>inputHandler(e,setPhone2)} value={phoe2} /> - <input type="text" style={{maxWidth:100}} onChange={(e)=>inputHandler(e,setPhone3)} value={phoe3} />
                        </div>
                    </div>
                    <div className="col">
                        <div className="th">이메일<sup>*</sup></div>
                        <div className="td">
                            <input type="email" onChange={(e)=>inputHandler(e,setEmail)} value={email}/>
                        </div>
                    </div>
                </div>

                <button type="button" onClick={submitHanlder}>회원가입</button>

            </div>

        </div>

    </div>
  )
}

export default Sign