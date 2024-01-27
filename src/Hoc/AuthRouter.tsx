import { Navigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userState } from '../state/atoms/user';

function AuthRouter({children}:{children : JSX.Element}) {

  const user = useRecoilValue(userState);

  if(!user){
    alert('로그인을 해야 이용하실수 있습니다.');
    return (
      <Navigate to="/login"/>
    )
  }

  return children;

}

export default AuthRouter