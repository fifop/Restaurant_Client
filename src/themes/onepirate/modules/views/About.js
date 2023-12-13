


import React from 'react';
import './About.css'; 
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'; // Import Typography from MUI
import { useTheme } from '@mui/material/styles';

const About = () => {
    const theme = useTheme(); 
    return (
      <section id='about-section' className="background-About">
        <Box sx={{
          position: 'absolute',
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: 'white',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          padding: '20px',
          borderRadius: '10px',
          width: '100%',
          maxWidth: '300px', // Maximum width of the box
          textAlign: 'center',
          p: {
            fontSize: '1em',
            lineHeight: 1.6,
            margin: '0.5em 0',
            [theme.breakpoints.up('md')]: {
              maxWidth: '40%', // Wider paragraph on larger screens
              fontSize: '1.5em', // Larger font size on larger screens
            },
          },
          '& .MuiTypography-h4': {
            fontSize: '1.5em',
            margin: '0.5em 0',
            [theme.breakpoints.up('md')]: {
              fontSize: '2em', 
            },
          },
        }}>
          <Typography variant="h4" sx={{ color: 'white' }}>מי אנחנו?</Typography>
          <Typography sx={{ fontSize: '18px' }}>
מסעדת "פיפו"  של השף פיפו, מעניקה חוויה קולינרית מרתקת ואירוח שלא נראה כמותו. במיקום מרכזי ומושלם היא מהווה נקודת ציון עבור תושבי העיר וגם לאלה המבקרים בה לרגע. לאלה המחפשים רגע של נחת, אסקפיזם, שלווה וזמן איכות.

מטבח ים תיכוני עכשיו, מבוסס חומרי גלם מקומיים המוגשים בצלחות קטנות, המיועדות לחלוקה ולחגיגה משותפת של האורחים בשולחן. השף שואב את השראתו מכל אגן הים התיכון עם חיבה מיוחדת לחופיה של ספרד. התפריט משתנה באופן תדיר לפי חשקי השף וחומרי גלם עונתיים.          {/* continue your text */}
</Typography>
        </Box>   
      </section>
    );
  };
  
  export default About;

