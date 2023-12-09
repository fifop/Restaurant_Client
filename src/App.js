import './App.css';
import React from "react";
import {configureStore} from '@reduxjs/toolkit'
import {Provider} from 'react-redux'
import authReducer from
 './themes/onepirate/modules/components/features/auth/authSlice.js'
import AppRoutes from './appRoutes';

const myStore = configureStore({
  reducer: {
    auth: authReducer
  }
})



function App() {
  return (
    <div className="App">
         <Provider store={myStore}>

         <AppRoutes />
      </Provider>

    </div>
  );
}

export default App;
