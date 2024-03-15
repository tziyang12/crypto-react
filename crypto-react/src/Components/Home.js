import React from 'react';
import { Container, Typography } from '@mui/material';
import moonIslandImage from '../Images/MoonIsland.png';

function Home() {
  return (
    <Container id="home" style={{paddingTop: 70, textAlign: 'center'}}>
      <Typography variant='h1' style={{
        display: 'block',
        margin: '0 auto',
        fontSize: '6vw',
        fontWeight: 'bold',
        color: 'white',
      }}>
        TRACK YOUR
      </Typography>
      <Typography variant='h1' style={{
        display: 'block',
        margin: '0 auto',
        paddingBottom: '20px',
        fontSize: '6vw',
        fontWeight: 'bold',
        color: 'transparent',
        backgroundImage: 'linear-gradient(25deg, #2600fc, #ff00ea)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
      }}>
        CRYPTO CURRENCIES
      </Typography>
      <img src={moonIslandImage} alt="Moon Island" className="floating-image" />
    </Container>
  );
}

export default Home;
