import { useState } from "react";
import Center from "../../partials/users/discussion/center";
import Left from "../../partials/users/discussion/left";
import Right from "../../partials/users/discussion/Right";

export default function Discussion() {
  const [productSend, setProductSend]= useState({});
  const [userChatSelected, setUserChatSelected]= useState({});
  return (
    <div className="flex space-x-4 p-4">
      <div className="w-1/4">
        <Left userChaSelected={userChatSelected} setUserChatSelected={setUserChatSelected}/>
      </div>
      <div className="w-2/4">
        <Center productSend={productSend}/>
      </div>
      <div className="w-1/4">
        <Right productSend={productSend} setProductSend={setProductSend}/>
      </div>
    </div>
  );
}
