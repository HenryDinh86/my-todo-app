import { useState } from 'react';
import { addDoc, serverTimestamp } from 'firebase/firestore';
import { collectionRef } from '../config/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Container, TextField, Typography } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import TodoList from '../components/TodoList';
import { v4 as uuidv4 } from 'uuid';
import { useMediaQueries } from '../helpers/useMediaQueries';

const Create = () => {
  //HELPERS
  const isMatched = useMediaQueries('sm');
  //NAVIGATION
  const navigate = useNavigate();
  //STATES
  const [title, setTitle] = useState('');
  const [todoInput, setTodoInput] = useState('');
  const [todos, setTodos] = useState([]);
  const [titleError, setTitleError] = useState(false);

  const user = JSON.parse(localStorage.getItem('user'));
  // STYLES
  const style = {
    title: { marginTop: '20px', marginBottom: '20px' }
  };
  // FUNCTIONS
  const handleTitleChange = (e) => {
    setTitleError(false);
    setTitle(e.target.value);
  };
  const handleTodoChange = (e) => {
    setTodoInput(e.target.value);
  };
  const handleAddTodos = (e) => {
    e.preventDefault();

    if (title === '') {
      setTitleError(true);
    }

    setTodos([...todos, { id: uuidv4(), item: todoInput, completed: false }]);
    setTodoInput('');
  };
  const handleSave = async () => {
    await addDoc(collectionRef, {
      title,
      items: todos,
      userId: user.uid,
      createdAt: serverTimestamp()
    });
    navigate('/dashboard');
  };

  return (
    <Container>
      <Typography
        sx={style.title}
        variant='h6'
        component='h2'
        color='textSecondary'
        gutterBottom
      >
        What's your chore today?
      </Typography>

      <Box
        sx={{ display: 'flex', mb: '20px' }}
        component='form'
        noValidate
        autoComplete='off'
      >
        <TextField
          required
          error={titleError}
          sx={{ minWidth: '40%' }}
          onChange={handleTitleChange}
          fullWidth
          label='Todo Title'
          size={isMatched && 'small'}
        />
        <Button sx={{ ml: '10px' }} disabled />
      </Box>
      <Box
        sx={{
          display: 'flex'
        }}
        component='form'
        noValidate
        autoComplete='off'
        onSubmit={handleAddTodos}
      >
        <TextField
          required
          value={todoInput}
          onChange={handleTodoChange}
          fullWidth
          label='Todo'
          size={isMatched && 'small'}
        />
        {todoInput === '' ? (
          <Button sx={{ ml: '10px' }} disabled />
        ) : (
          <Button
            disableElevation
            onClick={handleAddTodos}
            sx={{ ml: '10px' }}
            variant='contained'
          >
            <AddCircleOutline />
          </Button>
        )}
      </Box>
      <TodoList setTodos={setTodos} todos={todos} />

      {todos.length >= 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
          <Button
            size={isMatched ? 'small' : 'medium'}
            color='info'
            onClick={handleSave}
            disableElevation
            variant='contained'
            startIcon={<SaveIcon />}
          >
            save
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Create;
