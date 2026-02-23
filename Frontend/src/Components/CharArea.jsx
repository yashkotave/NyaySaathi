import React, {useContext, useEffect, useState } from "react";
import MessageInput from "./MessageInput";
import { UserDataContext } from "../Context/UserContext";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { Scale, User } from "lucide-react";

const ChatArea = ({ oldMessages, cId, setOldMessages, setChatId }) => {
  const { user } = useContext(UserDataContext);
  const [chatId, setLocalChatId] = useState(cId || null);
  const [messages, setMessages] = useState(oldMessages);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMessages(oldMessages);
  }, [oldMessages]);

  useEffect(() => {
    setLocalChatId(cId);
  }, [cId]);

  const handleSend = (text) => {
    
    if (!text.trim()) return;

    setIsLoading(true);
    setMessages((prev) => [...prev, { role: "user", parts: [{ text }] }]);

    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/chats`,
        { message: text, chatId: chatId, userId: user?._id || null },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then((res) => {
        setIsLoading(false);
        setLocalChatId(res.data.chatId);
        setChatId(res.data.chatId);
        setMessages((prev) => [
          ...prev,
          { role: "model", parts: [{ text: res.data.response }] },
        ]);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error("Error sending message:", err);
        setMessages((prev) => [
          ...prev,
          {
            role: "model",
            parts: [
              {
                text: "⚠️ Sorry, I encountered an error while processing your request.",
              },
            ],
          },
        ]);
      });
  };

  return (
    <div className="flex-1 flex flex-col justify-between bg-gradient-to-b from-white to-blue-50 rounded-4xl md:ml-4">
      {/* Chat messages */}
      <div className="p-4 md:p-6 overflow-y-auto hide-scrollbar space-y-4 max-h-[calc(100vh-160px)]">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex items-start gap-3 ${
              msg.role === "model" ? "self-start" : "self-end flex-row-reverse"
            }`}
          >
            {/* Avatar */}
            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 text-white shadow-md">
              {msg.role === "model" ? <Scale size={16} /> : <User size={16} />}
            </div>

           
            <div
              className={`max-w-xl px-4 py-3 rounded-2xl shadow-md text-sm leading-relaxed break-words whitespace-pre-wrap ${
                msg.role === "model"
                  ? "bg-blue-100 border border-blue-200 text-blue-900 self-start"
                  : "bg-green-100 border border-green-200 text-green-900 self-end"
              }`}
            >
              <ReactMarkdown
                components={{
                  strong: ({ node, ...props }) => (
                    <strong className="font-bold text-black" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="ml-4 list-disc" {...props} />
                  ),
                }}
              >
                {msg.parts[0].text}
              </ReactMarkdown>
            </div>
          </div>
        ))}

        <div className="flex items-center text-center gap-2">{isLoading && (

          <>
           <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-blue-700 text-white shadow-md">
              { <Scale size={16} />}
            </div>

             <div className="flex items-center justify-center  px-4 border-blue-200 text-blue-900 rounded-2xl">
                    
                    <span className="flex space-x-1">
                    <span className="animate-bounce [animation-delay:0ms] text-4xl items-center justify-center">.</span>
                    <span className="animate-bounce [animation-delay:200ms] text-4xl items-center justify-center">.</span>
                    <span className="animate-bounce [animation-delay:400ms] text-4xl items-center justify-center">.</span>
                    </span>
                  </div>
          </>
                 
                  )}</div>

      </div>

      {/* Input box */}
      <div className="flex justify-center items-center mb-2 bg-transparent px-4 md:px-8">
        <MessageInput onSend={handleSend} />
      </div>
    </div>
  );
};

export default ChatArea;
