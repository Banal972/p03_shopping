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
        console.log(data);
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

        if(id === ""){
            return alert('아이디를 입력해주세요');
        }

        if(pass === ""){
            return alert('비밀번호를 입력해주세요');
        }

        if(pass2 === ""){
            return alert('비밀번호 확인을 입력해주세요');
        }

        if(name === ""){
            return alert('이름을 입력해주세요.')
        }

        if(phoe === "" || phoe2 === "" || phoe3 === ""){
            return alert("휴대폰번호를 전부 다 입력하지 않았습니다.");
        }

        if(email === ""){
            return alert("이메일을 입력해주세요");
        }


        const idCheck = memberData.filter(el=>el.userID === id);
        if(idCheck.length > 0){
            alert('존재하는 아이디 입니다.');
            return setId("");
        }

        if(pass !== pass2){
            alert('비밀번호가 서로 다릅니다.');
            return setPass2('');
        }

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
                    <div className="cont">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tempore provident id et corrupti sequi cumque saepe, doloremque neque nobis vel optio alias veritatis, voluptatum iusto aliquid deserunt quaerat, ipsam tenetur.
                        Pariatur cupiditate assumenda illum repellendus aliquid provident commodi dolores. Hic fuga libero esse! Nam aspernatur assumenda veritatis eos laborum iure veniam aut quam dolor repellendus, recusandae explicabo? Ducimus, quae sunt!
                        Culpa repellat harum assumenda perspiciatis voluptatem molestias temporibus rerum deleniti placeat impedit ducimus magni qui earum, accusantium architecto incidunt laboriosam illum quo nulla nisi! Accusantium enim maiores optio non fuga!
                        Deserunt tempore nemo ratione numquam qui iusto dolorum dicta repudiandae odio, temporibus facere ex repellat perferendis molestiae aut nesciunt tempora, a dolores doloremque maiores? Distinctio omnis reiciendis necessitatibus neque nemo!
                        Pariatur aut nobis dignissimos saepe assumenda adipisci architecto quas corporis provident voluptates maiores temporibus veritatis recusandae ullam impedit, ex voluptatem molestiae soluta corrupti iusto minima culpa. A voluptas vero iusto?
                        Perspiciatis repellendus officia delectus mollitia. Velit unde eveniet architecto voluptate numquam sapiente eligendi non deleniti quia? Error reiciendis tenetur nisi corporis labore laudantium, sequi dolorum blanditiis officiis modi perspiciatis minima.
                        Explicabo veritatis unde modi, iure recusandae porro eaque doloremque illum optio corporis aliquid consequatur nobis perspiciatis blanditiis! Temporibus hic quos possimus id doloremque harum accusantium eos. Illum laboriosam quod consequatur?
                        Commodi explicabo numquam eligendi, voluptas fugiat suscipit reiciendis corporis dignissimos ut cumque error necessitatibus ea magnam tenetur quisquam labore minima. Dolorum expedita, nulla dolore architecto optio soluta fuga dignissimos aperiam.
                        Quae nesciunt, provident non, ratione nisi, maiores saepe aliquid nihil fugiat numquam dignissimos? Non pariatur quos quam tempore, ex, atque excepturi ea maiores minima asperiores in odio vitae! Quo, eum.
                        Omnis accusamus tenetur sit repellat id delectus harum modi, magnam quidem et cumque, tempore temporibus! At, aliquam animi officiis iusto sunt error eos consequatur reiciendis rerum porro voluptatem esse consectetur?
                        Quidem facilis quae soluta debitis odit beatae ducimus dolores recusandae atque corrupti veniam assumenda odio labore id accusamus sit tenetur adipisci, harum rem delectus non! Nulla optio voluptates minus explicabo.
                        Ipsa nulla eligendi tempore delectus non. Voluptate a voluptatibus nam nemo reprehenderit aperiam repudiandae expedita facere voluptas dolores itaque veniam maxime quasi incidunt iste rem qui, asperiores, facilis sunt eum.
                        Molestias explicabo nam officia quas dolores ad ratione ducimus accusantium vel reprehenderit, libero ut expedita sint repudiandae cupiditate minima provident magni dolorum minus exercitationem id? Mollitia optio corporis laudantium natus?
                        Incidunt omnis doloremque corporis sit. Repudiandae tempore nihil odit voluptates eligendi asperiores delectus ullam. Error commodi iste quibusdam cum fugiat nemo minus optio inventore distinctio. Dolores earum expedita voluptatum minus!
                        Eveniet illo minima perferendis culpa. Illo suscipit ullam velit et? Facilis, iste! Dolor corrupti deleniti, exercitationem dolore fugit quasi nam qui odit amet architecto! Ipsum excepturi recusandae voluptate sunt nulla.
                        Libero, earum. Necessitatibus neque, dolor laborum omnis, ad cupiditate quia cumque dicta est, molestias odio placeat nam. Veritatis odit optio enim accusantium! Ad, soluta tempore! Necessitatibus magnam maxime laborum ea!
                        Dignissimos tenetur eum accusantium corrupti magnam praesentium qui sunt aperiam sequi quis rerum provident veritatis delectus et voluptatum laudantium nulla commodi vero optio aspernatur ipsam a, reprehenderit blanditiis sint? Explicabo?
                        Facilis eaque qui exercitationem id odio repudiandae nostrum dolore quam quidem. Nesciunt, totam tempore placeat nihil debitis sit veniam quam aliquam labore ex at ratione voluptatum, nisi aliquid dolorem accusantium.
                        Accusantium tempora odit aut assumenda eius laborum iure corporis odio blanditiis at sunt, voluptates nisi maxime labore dicta ad! Itaque labore alias neque, eius dolorum perspiciatis ut laboriosam iusto nihil.
                        Temporibus deserunt fugiat aut magnam modi perspiciatis corporis. Sapiente a excepturi totam in praesentium beatae veritatis iste ex laudantium, dignissimos vero provident quae incidunt consequuntur nostrum corrupti, officia repellendus deserunt.
                        Voluptates, id aliquid beatae non dolores provident, omnis porro asperiores quis ullam fugit magnam magni neque, excepturi corrupti inventore! Error beatae nam pariatur perferendis a autem. Molestias magnam ullam incidunt?
                        Laudantium architecto nostrum numquam deserunt voluptatem provident earum natus est tenetur aliquid nihil debitis, hic in molestiae doloribus tempore officiis quam quis maxime magni. Eaque modi sit repellat corporis reprehenderit.
                        Incidunt quidem exercitationem alias. Repudiandae, voluptas adipisci temporibus perferendis fugiat ea fugit! Eveniet autem doloremque dolor dolores corporis, esse accusamus animi voluptatem dolorum veritatis hic nostrum et eligendi error sit.
                        Dolores placeat molestiae quia, accusantium dicta temporibus? Possimus, quis quaerat tenetur laborum obcaecati eos dolores repudiandae culpa qui optio aliquam molestias quibusdam quos nulla recusandae, odit reprehenderit laboriosam nihil. A!
                        Aliquam aspernatur reprehenderit doloribus dignissimos sequi asperiores soluta omnis quae a possimus facilis animi vel ad, qui quibusdam ducimus id consequatur quam, quidem excepturi nemo, eos aut! Molestias, adipisci asperiores?
                        Reprehenderit, necessitatibus vero aliquam temporibus in delectus perferendis sapiente nihil culpa voluptas assumenda? Fugit quia voluptatibus asperiores tempora. Pariatur accusamus ea perspiciatis? Excepturi, in ipsa distinctio magnam nulla fugiat illum.
                        Beatae, explicabo iste ea quam eum odit perspiciatis. Consequatur similique ut qui ducimus voluptate quia magnam, quisquam ab harum. Deserunt beatae odit, saepe alias inventore odio quae dolor iusto nemo.
                        Velit neque dolore nisi minus? Id repudiandae ea iusto harum esse optio molestiae modi veniam eaque itaque neque aspernatur quisquam animi ad expedita vitae, aperiam voluptatibus asperiores dolorem sed quidem?
                        Incidunt magnam eum aliquam aut laborum labore corrupti rem at. Veniam aliquid dolorem harum pariatur cumque fuga consequuntur illum error, labore ad, incidunt quisquam explicabo laudantium ducimus. Delectus, culpa inventore?
                        Nihil, ut repellendus debitis tempore consectetur voluptatibus, delectus rem incidunt consequuntur commodi sunt molestiae. Corporis atque nostrum a? Ipsum aut iure animi laudantium delectus nam voluptate enim distinctio itaque eveniet.
                    </div>

                </div>

                <p className="p">정보</p>

                <div className="g">
                    <div className="col">
                        <div className="th">아이디<sup>*</sup></div>
                        <div className="td">
                            <input type="text" onChange={(e)=>inputHandler(e,setId)} value={id}/>
                            <p>(영문소문자)</p>
                        </div>
                    </div>
                    <div className="col">
                        <div className="th">비밀번호<sup>*</sup></div>
                        <div className="td">
                            <input type="password" onChange={(e)=>inputHandler(e,setPass)} value={pass}/>
                            <p>(영문소문자)</p>
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
                        <div className="td">
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