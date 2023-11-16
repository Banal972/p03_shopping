import React, { useCallback, useEffect, useRef, useState } from 'react'

// SCSS
import "./Write.scss"

// 라이브러리
import { getToken } from '../../../../lib/lib'

// 리덕스
import { useDispatch, useSelector } from 'react-redux'
import { addAction, inquirySubmit, updateAction} from '../../../../store/inquiry'
import { RootState } from '../../../../app/store'

// 모듈
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import { useLocation, useNavigate } from 'react-router-dom'


function useQuery() {
    const { search } = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

function Write() {

    // location
    const location = useLocation();

    //params
    const query = useQuery();

    // user
    const user = useSelector((state:RootState)=>state.user);

    // product
    const product = useSelector((state:RootState)=>state.product)
    
    // inquiryData
    const inquiryData = useSelector((state:RootState)=>state.inquiry);

    //navigate
    const navigte = useNavigate();

    //dispatch
    const dispatch = useDispatch();

    // state
    const [productName,setProductName] = useState("");
    const [title,setTitle] = useState("");
    const [value, setValue] = useState('');

    // 맨위로
    useEffect(()=>{

        window.scrollTo(0,0);

    },[location])
    

    // product 이름 가져오기
    useEffect(()=>{

        const id = Number(query.get("id"));
        const getName = product.filter(e=>e.id === id)[0].name;
        setProductName(getName as string);

    },[]);

    // token 과 user로 상품문의 데이터 가져오기
    useEffect(()=>{

        if(query.get("mode") === "u"){
            const id = Number(query.get("id"));
            const token = Number(query.get("token"));

            const filter = inquiryData[id].filter(e=>e.user === user.userID && e.token === token)[0];

            setTitle(filter.title);
            setValue(filter.cont);
        }

    },[])

    const submitHanlder = ()=>{

        if(user){
    
            const data : inquirySubmit = {
                productID : Number(query.get("id")),
                payload : {
                    write : user.nickname as string,
                    user : user.userID as string,
                    title : title,
                    cont : value,
                    token : Number(query.get("token")) || getToken(),
                    date : new Date().getTime()
                }
            }

            if(query.get("mode") === "w"){
                dispatch(addAction(data));
                alert('작성이 완료 되었습니다.')
                navigte(-1);
            }else{
                dispatch(updateAction(data));
                alert('수정이 완료 되었습니다.')
                navigte(-1);
            }

            
        }

    }


  return (
    <div className='detail_write'>

        <div className="_k_wrap" data-max="1024">

            <h2 className="t-title">상품후기 - {productName}</h2>

            <div className="input-t">
                <label htmlFor="t">제목</label>
                <input 
                    type="text" 
                    id='t' 
                    value={title || ""}
                    placeholder='제목을 입력해주세요' 
                    onChange={(e)=>setTitle(e.target.value)} 
                />
            </div>
            
            <div className="cont">

                <h2>내용</h2>

                <div className="editor">
                    <ReactQuill 
                        theme='snow' 
                        value={value} 
                        onChange={setValue}
                        modules={{
                            toolbar : [
                                ['image'],
                                ['clean']
                            ]
                        }}
                        placeholder='내용을 입력해주세요'
                    />
                </div>

            </div>

            <button className='submit' onClick={submitHanlder}>등록하기</button>

        </div>

    </div>
  )
}

export default Write