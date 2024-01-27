import { useEffect, useState } from 'react'
import {Swiper,SwiperSlide} from "swiper/react"
import {Parallax,Pagination,Autoplay,Navigation} from "swiper"
import { AiOutlineLeft,AiOutlineRight,AiOutlineSwapRight } from "react-icons/ai";
import { useNavigate } from 'react-router'
import axios from 'axios'

// 스타일
import "swiper/css"
import "./Main.scss"

// 타입
import { ProductType } from '../../types/customType'

// 컴포넌트
import Card from '../../component/Card/Card'

import { toNumber } from '../../lib/lib'


function Main() {

  // 유틸
  const navigate = useNavigate();

  // 상품
  const [productData,setProductData] = useState<ProductType[]>([]);

  useEffect(()=>{

    axios.get('http://localhost:9000/product')
    .then(({data})=>{
      setProductData(data);
    })
    .catch(e=>{
      console.log('통신에러');
    })

  },[]);


  // 인기상품
  const [best,setBest] = useState<ProductType[]>([]);

  useEffect(()=>{
    const filter = productData.filter(e => e.hit >= 100).sort((a,b)=>{ return b.hit - a.hit })
    setBest(filter);
  },[productData]);

  
  // 세일데이터
  const [saleData,setSaleData] = useState<ProductType[]>([]);
  useEffect(()=>{
    const filter = productData.filter((el)=>{
      if(el.sale  !== undefined){
        return el.sale > 0;
      }
      return false;
    });
    setSaleData(filter);
  },[productData])

  // 단독상품데이터
  const [onlyData,setOnlyData] = useState<ProductType[]>([]);
  useEffect(()=>{

    const filter = productData.filter(el=>el.only);
    setOnlyData(filter);

  },[productData])
  


  return (
    
    <div className="_main">

      <section className="visual">
        <Visual/>
      </section>

      <section className="s1">
          <div className="_k_wrap" data-max="1600">
            
            <h2 className="c-t">
              지금 가장<br/>
              주목해야 할 인기상품
            </h2>

            <Card offset={20} data={best} />
            
          </div>
      </section>

      <div className="banner01">
        <h2>It's new and Comfortable</h2>
      </div>

      <section className="s2">
        <div className="_k_wrap" data-max="1600">

          <div className="flex">

            <div className="tbx">

              <dl>
                <dt>
                  PROMOTION
                </dt>
                <dd>
                  단독 상품
                </dd>
              </dl>

              <div className="slideBtn">
                <button className="prev"><AiOutlineLeft/></button>
                <button className="next"><AiOutlineRight/></button>
              </div>

            </div>

            <Swiper className="slide"
                modules={[Navigation,Pagination,Autoplay]}
                slidesPerView={1.5}
                spaceBetween={20}
                loop
                breakpoints={{
                  480 : {
                    slidesPerView :2.5,
                    spaceBetween :20
                  },
                  820 : {
                    slidesPerView :2.5,
                    spaceBetween : 20
                  },
                  1280 : {
                    slidesPerView :2.5,
                    spaceBetween : 40
                  }
                }}
                speed={600}
                autoplay={{
                  delay : 3000,
                  disableOnInteraction : false
                }}
                navigation={{
                  prevEl : ".slideBtn .prev",
                  nextEl : ".slideBtn .next"
                }}
                pagination={{
                  el : ".s2 .slidePage",
                  type : "progressbar",
                  renderProgressbar : function(progressbarFillClass){
                    return `<span class="${progressbarFillClass} bar"></span>`;
                  }
                }}
            >
              {
                onlyData.map((elm,i)=>(
                  <SwiperSlide key={i} onClick={()=>{
                    navigate(`/detail/${elm.id}`);
                  }}>
                    <div className="img">
                      <div className="bg" style={{backgroundImage:`url(${process.env.PUBLIC_URL}/${elm.src})`}}></div>
                    </div>
                    <div className="tbx">
                      <h2 className="tit">
                        {elm.name}
                      </h2>
                      <p className="price">
                        {
                          elm.sale ?
                          <Sale sale={elm.sale} price={elm.price} />
                          : elm.price+"원"
                        }
                      </p>
                    </div>
                  </SwiperSlide>
                ))
              }
            </Swiper>

          </div>

          <div className="slidePage">
            <span className="bar"></span>
          </div>

        </div>
      </section>

      <section className="s3">
        <div className="_k_wrap" data-max="1600">
          
          <div className="flex">

            <Card offset={15} data={saleData} />
            
            <div className="banner">
              <div className="box">
                <dl>
                  <dt>
                    SALE
                  </dt>
                  <dd>
                    최대 30% 할인
                  </dd>
                </dl>
                <div className="btn" onClick={()=>{
                  navigate('/list/456');
                }}>
                  더보기 <AiOutlineSwapRight/>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

    </div>

  )
}

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

function Visual(){

  //비주얼
  const visual = ['visual01.jpg','visual02.jpg','visual03.jpg','visual04.jpg'];

  return (

    <Swiper
        speed={600}
        loop={true}
        parallax={true}
        modules={[Parallax,Pagination,Autoplay]}
        autoplay={{
          delay : 5000,
          disableOnInteraction : false
        }}
        pagination={{
          el : ".main .visual .nav",
          clickable : true,
          renderBullet : function(i:number,className:string) :string {
            return `<li class="${className}"><div class="bar"></div></li>`;
          }
        }}
      >
        {
          visual.map((elm,i)=>(
            <SwiperSlide key={i}>
              <div className="bg" data-swiper-parallax="70%" style={{backgroundImage : `url(${process.env.PUBLIC_URL}/img/main/${elm})`}}></div>
            </SwiperSlide>
          ))
        }

        <ul className="nav"></ul>

      </Swiper>

  )

}

export default Main