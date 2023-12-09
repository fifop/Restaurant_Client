import * as React from 'react';
import Our_Dishes from './modules/views/Our_Dishes';
import AppFooter from './modules/views/AppFooter';
import AppAppBar from './modules/views/AppAppBar';
import withRoot from './modules/withRoot';
import Background_Home from './modules/views/Background_Home';
import About from './modules/views/About';
import BookTable from './modules/views/BookTable';



function Index() {
  return (
    <React.Fragment>
    <Background_Home/>
      <AppAppBar />
      <About/>
      <Our_Dishes/>
      <BookTable/>
      <AppFooter />
    </React.Fragment>
  );
}

export default withRoot(Index); 
