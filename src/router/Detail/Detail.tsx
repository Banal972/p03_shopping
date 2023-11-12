import { useEffect, useState } from "react";

// 스타일
import "./Detail.scss"

// 리덕스
import { useNavigate, useParams } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../app/store';

// 컴포넌트
import { addCart } from "../../store/cart";

// 라이브러리
import { AiOutlineLeft,AiOutlineRight } from "react-icons/ai";

// 모듈
import {EffectFade,Navigation} from "swiper";
import {Swiper,SwiperSlide} from "swiper/react";
import $ from "jquery";
import { ProductState } from "../../store/product";

function Detail() {

    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const productData = useSelector((state : RootState)=>{return state.product});

    // 관리
    const [shoes,setShoes] = useState<ProductState | undefined>(undefined);
    const [size,setSize] = useState<Number>(230);
    const [amount,setAmount] = useState(1);
    const [rShoes,setRShoes] = useState<ProductState[] | null>(null);

    const [taplist,setTaplist] = useState(true);

    // 장바구니 추가기능
    function cartAdd(){ 

        if(shoes){ // shoes가 존재하면

            dispatch(addCart(
                {
                    id : shoes.id,
                    src : shoes.src,
                    name : shoes.name,
                    size  : size,
                    sale : shoes.sale ? shoes.sale : 0,
                    price : shoes.price,
                    amount : amount,
                }
            ));

        }

        if(window.confirm("장바구니로 이동하시겠습니까?")){
            navigate('/cart');
        }else {
            return;
        }

    }

    // 구매버튼
    function buy(){

        if(shoes){
            const buy = [
                {
                    id : shoes.id,
                    src : shoes.src,
                    name : shoes.name,
                    price : shoes.price,
                    amount : 1,
                }
            ];

            navigate('/buy',{state : buy});

        }

    }

    // 사이즈 클릭
    function sizeClick(e : React.MouseEvent<HTMLButtonElement, MouseEvent>){
        $('.detailView .rbx .layr dl dd.size button').removeClass('active');
        $(e.target).addClass('active');
    }
    
    
    // 이펙트

    useEffect(()=>{ // 번호에 맞는 신발

        const finds = productData.find((a)=>a.id === Number(id));
        setShoes(finds);

    },[id]);

    useEffect(()=>{ // 랜덤 신발

        let rendom = [];

        for(let i= 0; i < 8; i++){
            let randomNum = Math.floor(Math.random()* productData.length);
            rendom.push(productData[randomNum]);
        }

        setRShoes(rendom);

    },[]);


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

    useEffect(()=>{

        window.scrollTo(0,0); // 페이지를 맨위로 올리기
        webResize();

        window.addEventListener('resize',webResize);

        return ()=>{
            window.removeEventListener('resize',webResize);
        }

    },[shoes]);


  return (
    <>
        {
            shoes &&
            <div className="detailView">

                <div className="_k_wrap" data-max="1480" >

                    <div className="lbx">

                        <div className="slide">
                            <div className="bix">
                                <Swiper
                                    modules={[EffectFade]}
                                    effect="fade"
                                >
                                    {
                                        new Array(5).fill(0).map((e,i)=>(
                                            <SwiperSlide key={i}>
                                                <div className="bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}${shoes.src})`}}></div>
                                            </SwiperSlide>
                                        ))
                                    }
                                </Swiper>
                            </div>
                            <div className="sm">
                                <button className="prev">
                                    <AiOutlineLeft/>
                                </button>
                                <Swiper
                                    modules={[Navigation]}
                                    slidesPerView={2}
                                    spaceBetween={10}
                                    loop={false}
                                    navigation={{
                                        prevEl : '.sm .prev',
                                        nextEl : '.sm .next'
                                    }}
                                    breakpoints={{
                                        281 : {
                                            slidesPerView : 3,
                                            spaceBetween : 15
                                        },
                                        481 : {
                                            slidesPerView : 4,
                                            spaceBetween : 15
                                        },
                                        821 : {
                                            slidesPerView : 3,
                                            spaceBetween : 20
                                        },
                                        1025 : {
                                            slidesPerView : 4,
                                            spaceBetween : 20
                                        }
                                    }}
                                >
                                    {
                                        new Array(6).fill(0).map((e,i)=>(
                                            <SwiperSlide key={i}>
                                                <div className="bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}${shoes.src})`}}></div>
                                            </SwiperSlide>
                                        ))
                                    }

                                </Swiper>
                                <button className="next">
                                    <AiOutlineRight/>
                                </button>
                            </div>
                        </div>

                        <div className="detail">

                            <ul className="tap">
                                <li className={taplist ? "active" : undefined} onClick={()=>setTaplist(true)} >상세정보</li>
                                <li className={!taplist ? "active" : undefined} onClick={()=>setTaplist(false)} >상품문의</li>
                                <li></li>
                                <li></li>
                            </ul>

                            {
                                taplist === true ? 
                                <div className="cont" dangerouslySetInnerHTML={{__html : shoes.detail as string}}></div>
                                : 

                                <div className="gh">

                                    <ul className="lay">
                                        <li>
                                            <p className="name">작성자 - OOO</p>
                                            <h2 className="tit">제목입니다.</h2>
                                            <p className="cont">문의 내용입니다.</p>
                                            <p className="date">2023/03/20</p>
                                        </li>
                                        <li>
                                            <p className="name">작성자 - OOO</p>
                                            <h2 className="tit">제목입니다.</h2>
                                            <p className="cont">문의 내용입니다.</p>
                                            <p className="date">2023/03/20</p>
                                        </li>
                                        <li>
                                            <p className="name">작성자 - OOO</p>
                                            <h2 className="tit">제목입니다.</h2>
                                            <p className="cont">문의 내용입니다.</p>
                                            <p className="date">2023/03/20</p>
                                        </li>
                                    </ul>

                                    <button onClick={()=>{
                                        navigate(`/detail/write/${id}`);
                                    }}>
                                        등록
                                    </button>

                                </div>

                            }
                        

                        </div>
                                    
                        <div className="popular">
                            <dl>
                                <dt>비슷한 상품</dt>
                                <dd>상품1과 관련된 비슷한 상품도 보고 가세요.</dd>
                            </dl>
                            <div className="p_slide">
                                <button className="prev"><AiOutlineLeft/></button>
                                <Swiper
                                    slidesPerView={2.5}
                                    spaceBetween={15}
                                    modules={[Navigation]}
                                    navigation={{
                                        prevEl : '.p_slide button.prev',
                                        nextEl : '.p_slide button.next'
                                    }}
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
                                                            elm.price 
                                                        }
                                                        원
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
                                { shoes.price.toLocaleString('ko-KR') } 원
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
                                                        sizeClick(e);
                                                    }} 
                                                    className={i === 0 ? 'active' : undefined} 
                                                    key={i}
                                                > {String(elm)} </button>
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
                                        <div className="num">
                                            {amount}
                                        </div>
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
                                <li onClick={buy}>구매하기</li>
                            </ul>
                    </div>

                </div>

            </div>
        }
    </>
  )
}

function Sale({price, sale} : {price : any, sale : any}){

    function saleCalc(sale : any, price: any){
        return String( price - (price * sale/100) );
    }

    return(
        <>
            <span className="sales">{String(price)}</span> <span className='color00'>{saleCalc(sale,price)}</span>
        </>
    )

}

export default Detail