import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    text: {
      primary: '#ffffff',
    },
  },
});

function Header() {

    const [open, setOpen] = React.useState(false);

    const toggleDrawer = (newOpen) => () => {
      setOpen(newOpen);
    };

    const scrollToSection = (sectionId) => {
        const sectionElement = document.getElementById(sectionId);
        const offset = 128;
        if (sectionElement) {
          const targetScroll = sectionElement.offsetTop - offset;
          sectionElement.scrollIntoView({ behavior: 'smooth' });
          window.scrollTo({
            top: targetScroll,
            behavior: 'smooth',
          });
          setOpen(false);
        }
      };

  return (
    <ThemeProvider theme={theme}>
        <AppBar
        position="fixed"
        sx={{
        boxShadow: 0,
        bgcolor: 'transparent',
        backgroundImage: 'none',
        mt: 2,
        }}>
            <Container maxWidth="lg">
                <Toolbar
                        variant="regular"
                        sx={(theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        flexShrink: 0,
                        borderRadius: '999px',
                        bgcolor:'rgba(0, 0, 0, 0.4)',
                        backdropFilter: 'blur(24px)',
                        maxHeight: 40,
                        border: '1px solid',
                        borderColor: 'divider',
                        boxShadow: '0 0 1px rgba(2, 31, 59, 0.7), 1px 1.5px 2px -1px rgba(2, 31, 59, 0.65), 4px 4px 12px -2.5px rgba(2, 31, 59, 0.65)',
                        })}
                    >
                        <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            alignItems: 'center',
                            ml: '-18px',
                            px: 0,
                        }}
                        >
                        <Typography variant="h6" component="div" style={{padding: '0 15px'}}>Lunar Watch</Typography>
                        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                            <MenuItem
                            onClick={() => scrollToSection('home')}
                            sx={{ py: '6px', px: '12px' }}
                            >
                            <Typography variant="body2" color="text.primary">
                                Home
                            </Typography>
                            </MenuItem>
                            <MenuItem
                            onClick={() => scrollToSection('ranking')}
                            sx={{ py: '6px', px: '12px' }}
                            >
                            <Typography variant="body2" color="text.primary">
                                Market
                            </Typography>
                            </MenuItem>
                            <MenuItem
                            onClick={() => scrollToSection('feedback')}
                            sx={{ py: '6px', px: '12px' }}
                            >
                            <Typography variant="body2" color="text.primary">
                                Feedback
                            </Typography>
                            </MenuItem>
                            <MenuItem
                            onClick={() => scrollToSection('faq')}
                            sx={{ py: '6px', px: '12px' }}
                            >
                            <Typography variant="body2" color="text.primary">
                                FAQ
                            </Typography>
                            </MenuItem>
                        </Box>
                        </Box>
                        <Box sx={{ display: { sm: '', md: 'none' } }}>
                        <Button
                            variant="text"
                            color="primary"
                            aria-label="menu"
                            onClick={toggleDrawer(true)}
                            sx={{ minWidth: '30px', p: '4px' }}
                        >
                        <MenuIcon />
                        </Button>
                        <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
                            <Box
                            sx={{
                                minWidth: '60dvw',
                                p: 2,
                                backgroundColor: 'background.paper',
                                flexGrow: 1,
                            }}
                            style={{backgroundColor: 'rgba(0, 0, 0, 1)'}}
                            >
                            <Box
                                sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'end',
                                flexGrow: 1,
                                }}
                            >
                            </Box>
                            <MenuItem onClick={() => scrollToSection('home')}>
                                Home
                            </MenuItem>
                            <MenuItem onClick={() => scrollToSection('ranking')}>
                                Market
                            </MenuItem>
                            <MenuItem onClick={() => scrollToSection('feedback')}>
                                Feedback
                            </MenuItem>
                            <MenuItem onClick={() => scrollToSection('faq')}>FAQ</MenuItem>
                            
                            </Box>
                        </Drawer>
                        </Box>
                </Toolbar>
            </Container>
        </AppBar>
    </ThemeProvider>
  );
}

export default Header;