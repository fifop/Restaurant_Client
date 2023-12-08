import React from 'react';
import './Background_Home.css'; // Your existing CSS file

const Background_Home = ({ children }) => {
  return (
    <div className="background-home">
      {children}
    </div>
  );
};

export default Background_Home;
