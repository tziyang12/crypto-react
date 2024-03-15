import React from 'react';
import './Join.css';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Bitcoin from '../Images/bitcoin.png';
import Ethereum from '../Images/ethereum.png';

export default function Join() {
  return (
    <Container
      id="faq"
      sx={{
        pt: { xs: 4, sm: 12 },
        pb: { xs: 8, sm: 16 },
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center'}}>
        <img id='btcicon' src={Bitcoin} alt="Ethereal" style={{ height: '6rem', marginTop: '4rem', marginRight: '4rem', animation: 'floatAnimation 1s infinite alternate' }} />
        <Typography variant='h1' style={{
          fontSize: '6vw',
          fontWeight: 'bold',
          color: 'white',
          textAlign: 'center',
        }}>
          JOIN US VIA
        </Typography>
        <img id='ethicon' src={Ethereum} alt="Bitcoin" style={{ height: '6rem', marginTop: '4rem', marginLeft: '4rem', animation: 'floatAnimation 1s infinite alternate' }} />
      </div>
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
        DISCORD
      </Typography>
      <Typography variant='h6' style={{
        display: 'block',
        margin: '0 auto',
        fontSize: '2vw',
        color: 'white',
      }}>
        View all crypto prices at one place.
      </Typography>
      <Button
        variant="contained"
        href="https://discord.com"
        target='_blank'
        style={{ marginTop: '40px' , background: 'linear-gradient(25deg, #2600fc, #ff00ea)', height: '60px', width: '220px', borderRadius: '40px', fontWeight: 'bold' }}
      >
        Join Via Discord
      </Button>
    </Container>
  );
}