import React, { useContext, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { LogOut, MessageSquare, PlusCircle, Scale } from "lucide-react";
import { UserDataContext } from "../Context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = ({isChat}) => {

  const navigate = useNavigate();
    const { user, setUser } = useContext(UserDataContext);
  const [isOpen, setIsOpen] = useState(false);

  const [isActive, setIsActive] = useState(false);

  const [isUser,setIsUser] = useState(false);

  useEffect(() => {
  // whenever `user` changes, update isUser
  if (user && Object.keys(user).length > 0) {
    setIsUser(true);
  } else {
    setIsUser(false);
  }
}, [user]);


  React.useEffect(() => {
    const handleScroll = () => {
      setIsActive(window.scrollY > 480);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

//   useEffect(() => {
//   if (user && Object.keys(user).length > 0) {
//     setIsUser(true);
//   } else {
//     setIsUser(false);
//   }
// }, [user]);



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
    <nav className={"fixed top-0 left-0 w-full z-50 "}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center pt-3">
        {/* Logo */}
       <div
  className={`text-xl font-bold ${isActive ? "text-black" : "text-white"} 
    flex items-center 
    ${isChat
      ? "bg-gradient-to-r from-blue-900 to-blue-800 py-3 px-4 md:px-9 rounded-4xl"
      : `${isActive ? "bg-gray-200/70" : "bg-white/5"} backdrop-blur-md border-b border-white/10 py-4 px-4 md:px-9 rounded-4xl`
    } 
    ${isChat ? "md:ml-0 ml-auto" : "md:ml-0"}`}
  onClick={() => navigate("/")}
>
  <Scale className="text-blue-300 mr-2" size={25} />
  Nyay<span className="text-blue-400">Saathi</span>
</div>


        {/* Desktop Menu */}
        <div className={`hidden md:flex space-x-8 text-sm font-medium ${isChat ? "bg-gradient-to-r backdrop-blur-lg from-blue-800/80 to-blue-800/90 py-4" : `${ isActive ? "bg-gray-200/70" : "bg-white/5"} backdrop-blur-md border-b border-white/10 py-5`} px-9 rounded-4xl`}  onClick={ isChat ? () => navigate("/") : null}>
          <a
            href="#Home"
            className={`hover:text-blue-400 transition ${isActive ? "text-black" : "text-white"}`}
          >
            Home
          </a>
          <a
            href="#Services"
            className={`hover:text-blue-400 transition ${isActive ? "text-black" : "text-white"}`}
          >
            Services
          </a>
          <a
            href="#About"
            className={`hover:text-blue-400 transition ${isActive ? "text-black" : "text-white"}`}
          >
            About
          </a>
          <a
            href="#Contact"
            className={`hover:text-blue-400 transition ${isActive ? "text-black" : "text-white"}`}
          >
            Contact
          </a>
        </div>

        {/* CTA Buttons */}
        <div className={`hidden md:flex items-center space-x-4 ${ isChat ? "bg-gradient-to-r from-blue-800/80 to-blue-800/90 py-2 " : `${ isActive ? "bg-gray-200/70" : "bg-white/5"} backdrop-blur-md border-b border-white/10 py-3`} px-9 rounded-4xl`}>
          {/* Login with animated underline — NOTE the `group` and `inline-block` */}
          {!user ? <><a
            onClick={() => navigate("/login")}
            className={`relative inline-block group  px-4 py-2 text-sm font-medium transition ${ isChat ? "text-white hover:text-blue-900 " : "text-blue-300 hover:text-blue-500"} `}

          >
            Login
            <span
              className="absolute left-3 -bottom-0 w-2/3 h-[2px] bg-blue-400 transform scale-x-0 origin-left transition-transform duration-300 ease-out group-hover:scale-x-100"
            />
          </a>

          {/* Sign Up Button */}
          <a
            className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
            onClick={() => navigate("/register")}
          >
            Sign Up
          </a></> :
          <button
            className={` ${ isChat ? "bg-white text-black hover:text-white" : "bg-blue-500 text-white"} hover:bg-blue-700  px-4 py-2 rounded-xl text-sm font-medium transition flex items-center text-center gap-1`}
            onClick={UserLogout}
          >
            <LogOut size={15} /> Logout
          </button>
          }
        </div>

        {/* Mobile Menu Toggle */}
        {!isChat &&<div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu" className={` ${isActive ? "text-black" : "text-white"}`}>
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>}
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && !isChat && (
        <div className="md:hidden px-4 pb-4 space-y-3 pt-2 bg-[#0f172a] text-sm">
          <a href="#Home" className="block hover:text-blue-400 text-white">Home</a>
          <a href="#Services" className="block hover:text-blue-400 text-white">Services</a>
          <a href="#About" className="block hover:text-blue-400 text-white">About</a>
          <a href="#Contact" className="block hover:text-blue-400 text-white">Contact</a>
          <div className="flex space-x-3 mt-3">
            { !user ? <><button
              onClick={() => navigate("/login")}
              className="flex-1 text-blue-400 border border-blue-400 rounded-xl px-4 py-2 text-center hover:bg-blue-500 hover:text-white transition"
            >
              Login
            </button>
            <button
              onClick={() => navigate("/register")}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-xl text-center transition"
            >
              Sign Up
            </button> </>: <button
              onClick={UserLogout}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl  transition flex items-center text-center gap-1 justify-center"
            >
              <LogOut size={15} />Logout
            </button>
          }
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
