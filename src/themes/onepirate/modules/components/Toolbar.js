import { styled } from '@mui/material/styles';
import MuiToolbar from '@mui/material/Toolbar';

const Toolbar = styled(MuiToolbar)(({ theme }) => ({
  height: 64,
  backgroundColor: 'transparent',
  backgroundAttachment: 'fixed',
  backgroundSize:"cover",
    backgroundPosition: "center",
    border : '6px soild white',
  [theme.breakpoints.up('sm')]: {
    height: 90,
  },
}));

export default Toolbar;
