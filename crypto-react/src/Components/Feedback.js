import React, { useState } from 'react';
import { Container, Typography, Paper, TextField, Button, Snackbar } from '@mui/material';
import { Alert } from '@mui/material';

function Feedback() {
  const [feedback, setFeedback] = useState('');
  const [notificationOpen, setNotificationOpen] = useState(false);

  function handleFeedbackChange(event) {
    setFeedback(event.target.value);
  };

  function handleSubmit() {
    // Here you can implement your logic to handle the feedback submission
    console.log('Feedback submitted:', feedback);
    // Reset feedback input
    setFeedback('');
    // Show notification
    setNotificationOpen(true);
  };

  function handleNotificationClose() {
    setNotificationOpen(false);
  };

  return (
    <Container id='feedback' style={{textAlign: 'center'}}>
        <Typography variant='h4' style={{
        display: 'block',
        margin: '0 auto',
        paddingBottom: '10px',
        fontSize: '3vw',
        fontWeight: 'bold',
        color: 'white',
      }}>
        Feedback
      </Typography>
        <Paper style={{ padding: '20px', backgroundColor: 'black' }}>
            <Container sx={{borderRadius: 20, padding: 0}}>
                <TextField
                    multiline
                    rows={4}
                    variant="outlined"
                    label="Enter your feedback"
                    fullWidth
                    value={feedback}
                    onChange={handleFeedbackChange}
                    sx={{
                        "& fieldset": { border: 'none' }, 
                        '& .MuiInputLabel-shrink': { opacity: 0, transition: "all 0.2s ease-in" },
                        backgroundColor: 'white'
                    }}
                />
                <Button
                    variant="contained"
                    backgroundImage= 'linear-gradient(25deg, #2600fc, #ff00ea)'
                    onClick={handleSubmit}
                    style={{ marginTop: '40px' , background: 'linear-gradient(25deg, #2600fc, #ff00ea)', height: '60px', width: '220px', borderRadius: '40px', fontWeight: 'bold' }}
                >
                    Submit Feedback
                </Button>
            </Container>
        </Paper>
        <Snackbar
            open={notificationOpen}
            autoHideDuration={6000}
            onClose={handleNotificationClose}
        >
        <Alert onClose={handleNotificationClose} severity="success" sx={{ width: '100%' }}>
          Feedback has been sent!
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default Feedback;
