import { NavigateFunction } from "react-router-dom";
import { UserType } from "../types/customType";

// 3자리마다 소수점
export const toNumber = (price : number ) =>{
    if(price !== undefined){
        return price.toLocaleString("ko-KR")
    }
}

// 토큰생성
export const getToken = ()=>{
    const timestamp =  new Date().getTime(); // 지금 시간 타임스탭
    const random = Math.floor(Math.random() * 1000); // 랜덤 숫자
    let token = timestamp - random // 구매상품 내역 token 만들기
    return token
}

// 로그인체크
export const authLogin = (user : UserType, navigate : NavigateFunction)=>{
    if(!user){

        alert('로그인을 해야합니다.');
        return navigate('/login');

    }else{
        return true;
    }
}