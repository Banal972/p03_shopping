import {AiFillGithub} from "react-icons/ai";

function Footer() {
  return (
    
    <footer className='footer'>
        <div className="_k_wrap" data-max="1600">

            <div className="top">
                <a href="https://github.com/Banal972" target='_blank' rel="noreferrer"><AiFillGithub/></a>
            </div>

            <p className='p'>
                이 사이트는 Banal(김지유) <span> <AiFillGithub/><a href="https://github.com/Banal972" target='_blank'rel="noreferrer">https://github.com/Banal972</a> </span> 포트폴리오 사이트 입니다.
            </p>

            <p className='copy'>Copyright 2023.Banal(김지유). All rights reserved.</p>
    
        </div>
    </footer>

  )
}

export default Footer