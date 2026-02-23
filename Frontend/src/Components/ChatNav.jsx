import React, { useContext, useState } from "react";
import { Menu, X } from "lucide-react";

import { LogOut, MessageSquare, PlusCircle, Scale } from "lucide-react";
import { UserDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ChatNav = ({isChat}) => {

      const { user } = useContext(UserDataContext);
  const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();
  const [isActive, setIsActive] = useState(false);

const UserLogout = async () => {
    try {
      await axios.get(`${import.meta.env.VITE_BASE_URL}/users/logout`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      localStorage.removeItem("token");
      navigate("/");
    } catch (err) {
      console.error("Error logging out:", err);
    }
  };

  React.useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 480);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav className={` ${isChat ? " fixed top-0 left-0 w-full z-50 bg-gradient-to-r from-blue-800/80 to-blue-800/90" :"fixed top-0 left-0 w-full z-50 "}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center pt-3">
        {/* Logo */}
        <div className={`text-xl font-bold ${isActive ? "text-white" : "text-white"} flex items-center bg-gradient-to-r from-blue-900 to-blue-800 py-3 px-9 rounded-4xl`}>
           <Scale className="text-blue-300 mr-2" size={25} />
          Nyay<span className="text-blue-400">Saathi</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex space-x-8 text-sm font-medium bg-gradient-to-r backdrop-blur-lg from-blue-800/80 to-blue-800/90 py-4 px-9 rounded-4xl">
          <a
            href="#"
            className={`hover:text-blue-400 transition ${isActive ? "text-black" : "text-white"}`}
          >
            Home
          </a>
          <a
            href="#"
            className={`hover:text-blue-400 transition ${isActive ? "text-black" : "text-white"}`}
          >
            Services
          </a>
          <a
            href="#"
            className={`hover:text-blue-400 transition ${isActive ? "text-black" : "text-white"}`}
          >
            About
          </a>
          <a
            href="#"
            className={`hover:text-blue-400 transition ${isActive ? "text-black" : "text-white"}`}
          >
            Contact
          </a>
        </div>

        {/* CTA Buttons */}
        <div className="hidden md:flex items-center space-x-4 bg-gradient-to-r from-blue-800/80 to-blue-800/90 py-2 px-9 rounded-4xl">
          {/* Login with animated underline — NOTE the `group` and `inline-block` */}
         {!user ? <> <a
            href="#"
            className="relative inline-block group text-white px-4 py-2 text-sm font-medium transition hover:text-blue-900 "
          >
            Login
            <span
              className="absolute left-3 -bottom-0 w-2/3 h-[2px] bg-blue-400 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"
            />
          </a>  

          <a
            href="#"
            className="bg-white hover:bg-blue-700 text-black px-4 py-2 rounded-xl text-sm font-medium transition hover:text-white"
          >
            Sign Up
          </a>
          </> : 
          <button
            onClick={UserLogout}
            className="bg-white hover:bg-blue-700 text-black px-4 py-2 rounded-xl text-sm font-medium transition hover:text-white flex gap-1 text-center items-center"
          >
            <LogOut size={15} /> Logout
          </button>
        }
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-3 pt-2 bg-[#0f172a] text-sm">
          <a href="#" className="block hover:text-blue-400 text-white">Home</a>
          <a href="#" className="block hover:text-blue-400 text-white">Services</a>
          <a href="#" className="block hover:text-blue-400 text-white">About</a>
          <a href="#" className="block hover:text-blue-400 text-white">Contact</a>
          <div className="flex space-x-3 mt-3">
            <a
              href="#"
              className="flex-1 text-blue-400 border border-blue-400 rounded-xl px-4 py-2 text-center hover:bg-blue-500 hover:text-white transition"
            >
              Login
            </a>
            <a
              href="#"
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-center transition"
            >
              Sign Up
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default ChatNav;
