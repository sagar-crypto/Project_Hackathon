import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, Paper, Grid, IconButton} from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import SendIcon from '@mui/icons-material/Send';

const useStyles = makeStyles((theme) => ({
  chatPopup: {
    position: 'fixed',
    top: 16,
    right: 16,
    width: '100%',
    maxWidth: '400px',
    zIndex: 9999,
    padding: 16
  },
}));

const ChatComponent = () => {
  const classes = useStyles();
  const [inputText, setInputText] = useState('');
  const [outputText, setOutputText] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleChange = (event) => {
    setInputText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-3.5-turbo', 
          messages: [{"role": "system", "content": "You are a helpful assistant knowledgeable about the European Union Deforestation Regulation (EUDR)."},
            { role: 'user', content: inputText }],
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer YOUR_TOKEN`, // Replace with your actual API key
          },
        }
      );

      const completion = response.data.choices[0].message.content;
      setOutputText(completion);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <Button variant="contained"  style ={{backgroundColor: "#4caf50"}} onClick={toggleChat}>
        Ask the Assistant
      </Button>
      {isOpen && (
        <Paper className={classes.chatPopup}>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={1} alignItems="center">
              <Grid item xs={9}>
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  value={inputText}
                  onChange={handleChange}
                  placeholder="Type your message..."
                />
              </Grid>
              <Grid item xs={3}>
              <IconButton type="submit" color="#4caf50">
                  <SendIcon />
                </IconButton>
              </Grid>
              <Grid item xs={12}>
                <TextField
                fullWidth
                  multiline
                  size="small"
                  variant="outlined"
                  disabled
                  value={outputText}
                  placeholder="Bot's reply..."
                />
              </Grid>
            </Grid>
          </form>
        </Paper>
      )}
    </div>
  );
};

export default ChatComponent;
