import React from 'react';

const AuthLayout = ({ children }) => {
  return (
    <div className="flex items-center justify-center h-screen bg-blue-100">
     
        {children}
     
    </div>
  );
};

export default AuthLayout;
