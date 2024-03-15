import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';

import { createTheme, ThemeProvider } from '@mui/material/styles';

const font = {
    fontFamily: 'Noto Sans',
}

const theme = createTheme({
    palette: {
        text: {
            secondary: '#ffffff',
        },
    },
  });
  

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary" mt={1}>
      {'© '}
      Lunar Watch&nbsp;
      {new Date().getFullYear()}
    </Typography>
  );
}

export default function Footer() {
  return (
    <ThemeProvider theme={theme}>
        <Container
        sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: { xs: 4, sm: 8 },
            py: { xs: 8, sm: 10 },
            textAlign: { sm: 'center', md: 'left' },
        }}
        >
        <Box
            sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            width: '100%',
            justifyContent: 'space-between',
            }}
        >
        </Box>
        <Box
        sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center', // Align items vertically center
            pt: { xs: 4, sm: 8 },
            width: '100%',
            borderTop: '1px solid #ffffff',
            borderColor: 'divider',
        }}
        >
            <Box>
                <Link color="text.secondary" href="#" style={{ ...font }}>
                Privacy Policy
                </Link>
                <Typography display="inline" sx={{ mx: 0.5, opacity: 0.5 }}>
                &nbsp;•&nbsp;
                </Typography>
                <Link color="text.secondary" href="#" style={{ ...font }}>
                Terms of Service
                </Link>
            </Box>
            <Box sx={{ ml: 'auto' }}> {/* Pushes the Copyright box to the right */}
                <Copyright />
            </Box>
        </Box>
        </Container>
    </ThemeProvider>
  );
}