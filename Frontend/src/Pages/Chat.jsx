import React, { useState } from "react";
import Sidebar from "../Components/SideBar";
import ChatArea from "../Components/CharArea";
import Navbar from "../Components/Navbar";

const Chat = () => {
  const [oldMessages, setOldMessages] = useState([]);
  const [chatId, setChatId] = useState(null);

  return (
    <div className="bg-blue-100 min-h-screen flex flex-col">
      <Navbar isChat={true}/>
      <div className="flex  h-screen bg-blue-100  pt-18 gap-2 mx-3 pb-3">
        
        <Sidebar setOldMessages={setOldMessages} setChatId={setChatId} />

        <ChatArea
          oldMessages={oldMessages}
          setOldMessages={setOldMessages}
          cId={chatId}
          setChatId={setChatId}
        />
      </div>
    </div>
  );
};

export default Chat;
