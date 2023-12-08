import * as React from 'react';
import MuiAppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

// const TransparentAppBar = styled(MuiAppBar)({
//   backgroundColor: 'transparent',
//   boxShadow: 'none', // Removes the shadow
// });

// AppBar component
const AppBar = styled(MuiAppBar)({
  backgroundColor: 'transparent',
  boxShadow: 'none',
  position: 'fixed',
});


export default AppBar;

