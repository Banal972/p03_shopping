import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import ReactQuill from 'react-quill'
import "react-quill/dist/quill.snow.css"
import axios from 'axios'
import { useRecoilState, useRecoilValue } from 'recoil'
import { userState } from '../../../../state/atoms/user'
import { ProductType,InquirySubmit } from '../../../../types/customType'
import { inquiryState } from '../../../../state/atoms/inquiry'

import { getToken } from '../../../../lib/lib'

// SCSS
import "./Write.scss"


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
    const user = useRecoilValue(userState);

    // product 이름 가져오기
    const [productName,setProductName] = useState("");
    useEffect(()=>{

        const api = process.env.REACT_APP_PRODUCT_AJAX || "";

        axios.get(api)
        .then(({data} : {data : ProductType[]})=>{
            const id = query.get("id");
            const getName = data.filter(item=>item.id.toString() === id)[0].name;
            setProductName(getName);
        })
        .catch(e=>{
            console.log(e);
            console.log('통신 에러');
        })

    },[query]);
    
    // inquiryData
    const [inquiryData,setInquiryData] = useRecoilState(inquiryState);

    //navigate
    const navigte = useNavigate();

    // state
    
    const [title,setTitle] = useState("");
    const [value, setValue] = useState('');

    // 맨위로
    useEffect(()=>{
        window.scrollTo(0,0);
    },[location])
    

    
    // token 과 user로 상품문의 데이터 가져오기
    useEffect(()=>{

        if(query.get("mode") === "u"){

            const id = Number(query.get("id"));
            const token = Number(query.get("token"));
            const filter = inquiryData[id].filter(e=>e.user === user?.userID && e.token === token)[0];
            setTitle(filter.title);
            setValue(filter.cont);

        }

    },[query,inquiryData,user])

    const submitHanlder = ()=>{

        if(user){
    
            const data : InquirySubmit = {
                productID : Number(query.get("id")),
                payload : {
                    write : user?.nickname || "",
                    user : user?.userID || "",
                    title : title,
                    cont : value,
                    token : Number(query.get("token")) || getToken(),
                    date : new Date().getTime()
                }
            }

            if(query.get("mode") === "w"){

                setInquiryData((prev)=> {

                    if(data.productID in inquiryData){ // 객체가 존재하는지 체크

                        return {
                            ...prev,
                            [data.productID] : [...prev[data.productID], data.payload]
                        }

                    } else {

                        return {
                            ...prev,
                            [data.productID] : [data.payload]
                        }

                    }

                })

                alert('작성이 완료 되었습니다.');
                navigte(-1);

            }else{

                // Recoil은 불변성 때문에 새로 객체를 만들어서 적용을 해줘야합니다.
                setInquiryData((prev) => {
                    
                    const update = {...prev};
                    const rs = update[data.productID].findIndex(e=>e.token === data.payload.token);

                    if( rs > -1){
                        // 배열원소를 직접 수정하면안되고 새로운 배열을 생성해서 할당해야함
                        update[data.productID] = update[data.productID].map((item,index)=>{
                            if(index === rs) return data.payload
                            return item;
                        })
                    }

                    return update;

                });

                alert('수정이 완료 되었습니다.');
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