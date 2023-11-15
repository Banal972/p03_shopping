import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../app/store'
import { Navigate } from 'react-router-dom';

function AuthRouter({children}:{children : JSX.Element}) {

  const user = useSelector((state:RootState)=>state.user);

  if(Object.keys(user).length === 0){
    alert('로그인을 해야 이용하실수 있습니다.');
    return (
      <Navigate to="/login"/>
    )
  }

  return children;

}

export default AuthRouter