import * as React from 'react';
import Our_Dishes from './modules/views/Our_Dishes';
import ProductSmokingHero from './modules/views/ProductSmokingHero';
import AppFooter from './modules/views/AppFooter';
import ProductHero from './modules/views/ProductHero';
import ProductValues from './modules/views/ProductValues';
import ProductHowItWorks from './modules/views/ProductHowItWorks';
import ProductCTA from './modules/views/ProductCTA';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';
import Background_Home from './modules/views/Background_Home';
import Background_Home_2 from './modules/views/About';
import About from './modules/views/About';



function Index() {
  return (
    <React.Fragment>
    <Background_Home/>
      <AppAppBar />
      <About/>
      <Our_Dishes/>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index);
