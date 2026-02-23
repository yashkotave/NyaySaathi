import React, { useEffect, useState, useContext, useRef } from "react";
import { PlusCircle, MessageSquare, Scale, Menu, X } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserDataContext } from "../Context/UserContext";

const Sidebar = ({ setOldMessages, setChatId }) => {
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [chatSummaries, setChatSummaries] = useState({});
  const hasFetched = useRef(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!user?.chats || hasFetched.current) return;
    hasFetched.current = true;

    axios
      .post(
        `${import.meta.env.VITE_BASE_URL}/chats/summary/bulk`,
        { chatIds: user.chats },
        { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
      )
      .then((res) => setChatSummaries(res.data))
      .catch((err) => console.error("Bulk summary fetch failed", err));
  }, [user?.chats]);

  const handleChatClick = (chat) => {
    setChatId(chat);
    axios
      .get(`${import.meta.env.VITE_BASE_URL}/chats/${chat}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      })
      .then((response) => {
        setOldMessages(response.data.messages);
        navigate("/Chat");
        setSidebarOpen(false); // close sidebar on mobile after chat select
      })
      .catch((err) => console.error("Error loading chat:", err));
  };

  const handleNewChat = () => {
    setChatId(null);
    setOldMessages([]);
    navigate("/Chat");
    setSidebarOpen(false);
  };

  const UserLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      localStorage.removeItem("token");
      setUser(null);
      localStorage.setItem("user", null);
      navigate("/");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };



  return (
    <>
      {/* Mobile menu button */}
      <button
        className="md:hidden fixed top-4 left-4 z-52 bg-blue-900 p-2 rounded-md text-white shadow-lg"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle Sidebar"
      >
        {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div
        className={`z-51 fixed top-0 left-0 z-40 h-full w-72 flex flex-col bg-gradient-to-b from-blue-950 to-blue-900 text-white shadow-lg rounded-r-4xl
          transform transition-transform duration-300
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0 md:static md:rounded-4xl
        `}
      >
        {/* User Info */}
        <div className="px-5 py-3 border-b border-blue-800 flex md:block justify-end flex-col md:justify-start text-right md:text-left">
  <div className="font-semibold text-blue-200 text-lg">
    Hello, {user?.username || "User"}
  </div>
  <div className="text-xs text-blue-300 truncate">
    {user?.email || "user@example.com"}
  </div>
</div>


        {/* New Chat Button */}
        <div className="p-4">
          <button
            onClick={handleNewChat}
            className="w-full flex items-center justify-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-3 rounded-lg shadow-md transition"
          >
            <PlusCircle size={18} />
            New Chat
          </button>
        </div>

        {/* Chats */}
        <div className="flex-1 px-4 overflow-y-auto hide-scrollbar space-y-2">
          <h2 className="text-sm font-semibold mb-3 text-blue-200 uppercase tracking-wide">
            Previous Chats
          </h2>
          {[...(user?.chats || [])].slice().reverse().map((chat, i) => (
            <div
              key={i}
              className="flex items-center gap-3 p-3 bg-blue-900 hover:bg-blue-800 rounded-lg cursor-pointer transition truncate"
              onClick={() => handleChatClick(chat)}
              title={chatSummaries[chat] || "Loading..."}
            >
              <MessageSquare className="text-blue-300" size={18} />
              <span className="truncate text-sm">{chatSummaries[chat] || "Loading..."}</span>
            </div>
          ))}
        </div>



        {/* Footer Links */}


       {/* Logout Button - only on mobile */}


<div className="px-4 py-3 border-t border-blue-800 text-xs w-full">
  <button
  onClick={UserLogout}
  className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl text-center transition md:hidden w-full"
>
  Logout
</button>
</div>

{/* Footer Links - only on desktop */}
<div className="px-4 py-3 border-t border-blue-800 text-xs text-blue-300 space-y-1 hidden md:block">
  <a href="#" className="block hover:text-yellow-400 transition">
    Legal Resources
  </a>
  <a href="#" className="block hover:text-yellow-400 transition">
    Terms & Policies
  </a>
</div>
      </div>
    </>
  );
};

export default Sidebar;
