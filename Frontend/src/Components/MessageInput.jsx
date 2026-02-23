import React, { useState } from "react";
import { Send } from "lucide-react";

const MessageInput = ({ onSend }) => {
  const [input, setInput] = useState("");

  const handleSendClick = () => {
    if (!input.trim()) return;
    onSend(input);
    setInput("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // prevent new line
      handleSendClick();
    }
  };

  return (
    <div className="p-1 flex gap-2 bg-[#ededed] rounded-4xl w-full max-w-4xl items-center border border-gray-300">
      <textarea
        rows={1}
        className="flex-1 resize-none rounded-lg p-2 outline-none text-sm max-h-24"
        placeholder="Ask for a legal help...."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyPress}
      />
      <button
        onClick={handleSendClick}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-1 rounded-4xl flex items-center"
        aria-label="Send message"
      >
        <Send className="w-4 h-4 mr-1" />
        Send
      </button>
    </div>
  );
};

export default MessageInput;
