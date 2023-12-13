import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Our_Dishes from './modules/views/Our_Dishes';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';
import Background_Home from './modules/views/Background_Home';
import About from './modules/views/About';
import BookTable from './modules/views/BookTable';

function Index() {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const targetSection = params.get("section");

    if (targetSection) {
      // Scroll to the target section
      const targetElement = document.getElementById(targetSection);

      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  const navigateToHomeSection = () => {
    // Programmatically set the URL parameter for the section
    navigate(`?section=section-home`);
  };

  return (
    <React.Fragment>
      <Background_Home navigateToHomeSection={navigateToHomeSection}/>
      <AppAppBar  />
      <About />
      <Our_Dishes />
      <BookTable />
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
