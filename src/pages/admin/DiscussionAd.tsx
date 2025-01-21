import { useState } from "react";
import Left from "../../partials/users/discussion/left";
import Center from "../../partials/users/discussion/center";
import Right from "../../partials/users/discussion/Right";

export default function DiscussionAd() {
  const [productSend, setProductSend] = useState({});
  const [userChatSelected, setUserChatSelected] = useState({});

  return (
    <div className="h-screen overflow-y-auto p-6 mb-6 bg-gray-100">
      <div className="flex space-x-4 h-full">
        {/* Left Section */}
        <div className="w-1/4 bg-white rounded-lg shadow-md p-4 max-h-full overflow-y-auto">
          <Left 
            userChaSelected={userChatSelected} 
            setUserChatSelected={setUserChatSelected} 
          />
        </div>

        {/* Center Section */}
        <div className="w-2/4 bg-white rounded-lg shadow-md p-4 max-h-full overflow-y-auto">
          <Center productSend={productSend} />
        </div>

        {/* Right Section */}
        <div className="w-1/4 bg-white rounded-lg shadow-md p-4 max-h-full overflow-y-auto">
          <Right 
            productSend={productSend} 
            setProductSend={setProductSend} 
          />
        </div>
      </div>
    </div>
  );
}
