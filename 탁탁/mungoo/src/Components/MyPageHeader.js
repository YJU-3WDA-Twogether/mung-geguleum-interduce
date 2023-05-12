import React, {useState} from 'react';
import MyLogModal from "../modal/MyLogModal";

function MyPageHeader() {
    const [showPopup, setShowPopup] = useState(false);


    return (
       <>
           <MyLogModal showPopup={showPopup} setShowPopup={setShowPopup} />
           <div className="MyPage-profile">
               <div className="MyPage-profile">
                   <div className="MyPage-profile">
                       <h1>취미로 노래 만들고 있는 아마추어 입니다. 구경하고 가세요.
                           <button className="btn-open" onClick={() => setShowPopup(true)}>
                               내 파일 다운 알람
                           </button>
                       </h1>
                   </div>
               </div>
           </div>
       </>
    );
}
export default MyPageHeader;