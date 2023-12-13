import React from 'react';
import './Background_Home.css'; 

const Background_Home = ({ children }) => {
  return (
    <section id="section-home" className="background-home">
      {children}
    </section>
  );
};

export default Background_Home;
