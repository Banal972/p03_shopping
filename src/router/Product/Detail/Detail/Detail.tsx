import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom"
import axios from "axios";
import $ from "jquery";
import {Autoplay, Navigation} from "swiper";
import {Swiper,SwiperSlide} from "swiper/react";
import { AiOutlineLeft,AiOutlineRight } from "react-icons/ai";

// 스타일
import "./Detail.scss"

// 리덕스

// 라이브러리
import { authLogin, toNumber } from "../../../../lib/lib";

// 타입
import { InquiryType, ProductType, UserType } from "../../../../types/customType";

// Recoil
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../../../state/atoms/user";
import { cartState } from "../../../../state/atoms/cart";
import { inquiryState } from "../../../../state/atoms/inquiry";
import moment from "moment";


function Detail() {

    const { id } = useParams();

    // navigate
    const navigate = useNavigate();

    // 유저
    const userData = useRecoilValue(userState);

    // 제품
    const [productData,setProductData] = useState<ProductType[]>([]);
    useEffect(()=>{

        const api = process.env.REACT_APP_PRODUCT_AJAX || "";

        axios.get(api)
        .then(({data})=>{
            setProductData(data);
        })
        .catch(e=>{
            console.log('통신에러');
        })

    },[]);

    // 번호에 맞는 신발
    const [shoes,setShoes] = useState<ProductType | undefined>(undefined);
    const [size,setSize] = useState(0);
    const [amount,setAmount] = useState(1);
    useEffect(()=>{ 

        if(id){
            const finds = productData.find((a)=>a.id.toString() === id);
            if(finds){
                setShoes(finds);
                setSize(finds?.size[0])
                setAmount(1);
            }
        }

    },[id,productData]);

    // 랜덤 신발
    const [rShoes,setRShoes] = useState<ProductType[] | null>(null);
    useEffect(()=>{

        if(id){

            let rendom :ProductType[] = [];

            const filter = productData.filter(e=>e.id !== Number(id));

            for(let i= 0; i < 8; i++){
                let randomNum = Math.floor(Math.random()* filter.length);
                if(!rendom.includes(productData[randomNum])){ // 중복제거
                    rendom.push(productData[randomNum]);
                }
            }

            setRShoes(rendom);

        }

    },[productData,id]);

    // 상세정보, 상품후기 탭 변경
    const [taplist,setTaplist] = useState(true);

    // 장바구니 추가기능
    const [cart,setCart] = useRecoilState(cartState)
    function cartAdd(){

        if(shoes){ // shoes가 존재하면

            const data = {
                product : shoes,
                id : shoes.id,
                size  : size,
                amount : amount,
            }

            const rs = cart.findIndex(el=>{ // 데이터가 존재하는지 여부 가져오기
                return el.id === shoes.id && el.size === size;
            }); 

            if(rs > -1){
                setCart((prev)=>{
                    const cart = [...prev]; // 예전 데이터 가져오고
                    cart[rs].amount++;  // 해당순서의 amount을 1 더해줍니다.
                    return cart; // 그리고 다시 넣어주기
                })
            }else{
                setCart((prev)=>[...prev, data]);
            }

        
        }

        if(window.confirm("장바구니로 이동하시겠습니까?")){
            navigate('/cart');
        }else {
            return;
        }

    }

    // 구매버튼
    function buyHanlder(){

        if(userData && authLogin(userData,navigate)){

            if(shoes){

                const buy = [
                    {
                        product_id : shoes.id,
                        product_size : size,
                        product_amount: amount,
                    }
                ];
    
                navigate('/buy',{state : {type : "single", buy}});
    
            }

        }

    }
    

    //반응형
    function webResize(){
        
        if(window.innerWidth >= 821){
    
            if($('.detailView ._k_wrap').children('.rbx').length <= 0){
    
                $('.detailView ._k_wrap').append($('.rbx'));
    
            }
    
        }else{
    
            if($('.detailView ._k_wrap .lbx').find('.rbx').length <= 0){

                $('.detailView ._k_wrap .slide').after($('.rbx'));
    
            }
    
        }
    
    } 

    // 페이지를 맨위로 올리기
    useEffect(()=>{

        window.scrollTo(0,0);
        webResize();

        window.addEventListener('resize',webResize);

        return ()=>{
            window.removeEventListener('resize',webResize);
        }

    },[id]);


  return (
    <>
        {
            shoes &&
            <div className="detailView">

                <div className="_k_wrap" data-max="1480" >

                    <div className="lbx">

                        <div className="slide">
                            <div className="bix">
                                <div className="bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}${shoes.src})`}}></div>
                            </div>
                        </div>

                        <div className="detail">

                            <ul className="tap">
                                <li className={taplist ? "active" : undefined} onClick={()=>setTaplist(true)} >상세정보</li>
                                <li className={!taplist ? "active" : undefined} onClick={()=>setTaplist(false)} >상품후기</li>
                                <li></li>
                                <li></li>
                            </ul>

                            {
                                taplist === true 
                                ? 
                                    <div className="cont" dangerouslySetInnerHTML={{__html : shoes.detail as string}}></div>
                                : 
                                    <Inquiry user={userData}/>
                            }

                        </div>
                                    
                        <div className="popular">
                            <dl>
                                <dt>비슷한 상품</dt>
                                <dd>{shoes.name} 과 관련된 비슷한 상품도 보고 가세요.</dd>
                            </dl>
                            <div className="p_slide">
                                <button className="prev"><AiOutlineLeft/></button>
                                <Swiper
                                    slidesPerView={2.5}
                                    spaceBetween={15}
                                    modules={[Navigation,Autoplay]}
                                    navigation={{
                                        prevEl : '.p_slide button.prev',
                                        nextEl : '.p_slide button.next'
                                    }}
                                    autoplay={{
                                        delay : 3000,
                                        disableOnInteraction : false
                                    }}
                                    loop
                                    speed={500}
                                    breakpoints={{
                                        480 : {
                                            slidesPerView : 3.5,
                                            spaceBetween : 15
                                        },
                                        1024 : {
                                            slidesPerView : 4,
                                            spaceBetween : 25
                                        }
                                    }}
                                >
                                    {
                                        rShoes ? 
                                        rShoes.map((elm,i)=>(
                                            <SwiperSlide key={i} onClick={()=>{
                                                navigate(`/detail/${elm.id}`);
                                            }}
                                            >
                                                <div className="img">
                                                    <div className="bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}${elm.src})`}}></div>
                                                </div>
                                                <div className="tbx">
                                                    <h2 className="tit">
                                                        {elm.name}
                                                    </h2>
                                                    <p className="price">
                                                        {
                                                            elm.sale ? 
                                                                <Sale 
                                                                    sale={elm.sale} 
                                                                    price={elm.price} 
                                                                />
                                                            :
                                                            toNumber(elm.price as number)+"원"
                                                        }
                                                    </p>
                                                    <p className="des">
                                                        {elm.description}
                                                    </p>
                                                </div>
                                            </SwiperSlide>
                                        ))
                                        : null

                                    }
                                </Swiper>
                                <button className="next"><AiOutlineRight/></button>
                            </div>
                        </div>

                    </div>

                    <div className="rbx">

                        <h2 className="tit">
                            {shoes.name}
                        </h2>

                        <p className="price">
                            {
                                shoes &&
                                shoes.sale ?
                                <>
                                    <span>{shoes.price.toLocaleString('ko-KR')}</span> 
                                    <span className="p-no">
                                        { (shoes.price - (shoes.price * shoes.sale / 100)).toLocaleString("ko-KR") }원
                                    </span>
                                </>
                                :
                                <>
                                    { shoes.price.toLocaleString('ko-KR') } 원
                                </>
                            }
                            
                        </p>

                        <div className="layr">
                            
                            <dl>
                                <dt>상품내용</dt>
                                <dd>
                                    {shoes.description}
                                </dd>
                            </dl>

                            <dl>
                                <dt>신발 사이즈</dt>
                                <dd className="size">
                                    {
                                        shoes.size.map((elm,i)=>(
                                            <button 
                                                onClick={(e)=>{
                                                    setSize(elm);
                                                }} 
                                                className={elm === size ? 'active' : undefined} 
                                                key={i}
                                            > 
                                                {String(elm)} 
                                            </button>
                                        ))
                                    }
                                </dd>
                            </dl>

                            <dl className="center">
                                <dt>수량</dt>
                                <dd className="amount">
                                    <button
                                        onClick={()=>{
                                            setAmount(amount+1);
                                        }}
                                    >+</button>
                                    <input type="text" className="num" value={amount} onChange={(e)=>{setAmount(Number(e.target.value))}} />
                                    <button
                                        onClick={()=>{
                                            if(amount <= 1){
                                                return;
                                            }
                                            setAmount(amount-1);
                                        }}
                                    >-</button>
                                </dd>
                            </dl>

                        </div>

                        <ul className="btn">
                            <li className="color0" onClick={cartAdd}>장바구니</li>
                            <li onClick={buyHanlder}>구매하기</li>
                        </ul>

                    </div>

                </div>

            </div>
        }
    </>
  )
}

// 세일 컴포넌트
function Sale({price, sale} : {price : number, sale : number}){

    function saleCalc(sale : number, price: number){
        return price - (price * sale/100);
    }

    return(
        <>
            <span className="sales">{toNumber(price as number)}</span> <span className='color00'>{toNumber(saleCalc(sale,price) as number)}원</span>
        </>
    )

}


// 상품문의 컴포넌트
function Inquiry(
    props : {user : UserType | null}
){

    //params
    const { id } = useParams();

    //navigate
    const navigate = useNavigate();

    //userData
    const userData = props.user;

    //inquiryData
    const [inquiryData,setInquiryData] = useRecoilState(inquiryState);

    // 상품문의 데이터
    const [data,setData] = useState<InquiryType[] | undefined>(undefined);

    // 데이터 filter
    useEffect(()=>{

        const filter = inquiryData[Number(id)]
        setData(filter);

    },[id,inquiryData]);


    // 수정버튼
    const updateHanlder = (a : InquiryType)=>{
        navigate(`/detail/write?mode=u&id=${id}&token=${a.token}`);
    }

    // 삭제버튼
    const delHandler = (a : InquiryType)=>{

        if(window.confirm('삭제 하시겠습니까?')){
            
            if(id){
                
                const data = {
                    productID : id,
                    user: a.user, 
                    token : a.token
                };
    
                setInquiryData((prev)=>{
                    let updateData = { ...prev }; // 복사본 생성

                    let inqury = updateData[Number(data.productID)]; // 해당 배열을 가져오기

                    // 필터링해서 제거하고
                    updateData[Number(data.productID)] = inqury.filter(item => !(item.user === data.user && item.token === data.token));

                    // 업데이트
                    return updateData;

                })

            }

        }

    }
    
    

    return (
        <div className="gh">

            <ul className="lay">

                {
                    data ?
                    data.length > 0 ?
                        data.map((a,i)=>(
                            <li key={i}>
                                <p className="gh-n">작성자 - {a.write}</p>
                                <h2 className="gh-t">{a.title}</h2>
                                <div className="gh-c" dangerouslySetInnerHTML={{__html : a.cont}}></div>
                                <p className="gh-d">{moment(new Date(a.date)).format("YYYY/MM/DD")}</p>

                                {
                                    a.user === userData?.userID &&
                                    <div className="btn-l">
                                        <button onClick={()=>updateHanlder(a)}>수정</button>
                                        <button onClick={()=>delHandler(a)}>삭제</button>
                                    </div>
                                }
                                
                            </li>
                        ))
                        : <li>상품문의가 존재하지 않습니다</li>
                    :
                    <li>상품문의가 존재하지 않습니다</li>
                }

            </ul>

            <button className="write" onClick={()=>{
                // 로그인 체크
                if(userData && authLogin(userData,navigate)){
                    navigate(`/detail/write?mode=w&id=${id}`);
                }
            }}>
                등록
            </button>

        </div>
    )

}


export default Detail