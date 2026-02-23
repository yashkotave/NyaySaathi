import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Sidebar from './Components/SideBar';
import ChatArea from './Components/CharArea';
import Register from './Pages/Register';
import Login from './Pages/Login';
import UserProtectedWrapper from './Pages/userProtectedWrapper';
import Main from './Pages/Main';
import Chat from './Pages/Chat';

function App() {
  const [count, setCount] = useState(0)

  return (
   <Router>
      <Routes>
        <Route path="/" element={<Main/>} />
        <Route path="/Chat" element={
        <UserProtectedWrapper>
           <Chat />
        </UserProtectedWrapper>
        } />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  )
}

export default App
