import { useState, useEffect } from 'react';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useNavigate, useParams } from 'react-router-dom';
import { Box, Button, Container, TextField } from '@mui/material';
import { AddCircleOutline } from '@mui/icons-material';
import SaveIcon from '@mui/icons-material/Save';
import TodoList from '../components/TodoList';
import { useMediaQueries } from '../helpers/useMediaQueries';
import { v4 as uuidv4 } from 'uuid';

const Edit = () => {
  //HELPERS
  const isMatched = useMediaQueries('sm');
  const { id } = useParams();
  //NAVIGATION
  const navigate = useNavigate();
  //STATES
  const [title, setTitle] = useState('');
  const [todoInput, setTodoInput] = useState('');
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  const [titleError, setTitleError] = useState(false);

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
    setTodos([{ id: uuidv4(), item: todoInput, completed: false }, ...todos]);
    setTodoInput('');
  };
  const handleUpdate = async (todoId) => {
    if (title === '') {
      setTitleError(true);
      return;
    }
    const docRef = doc(db, 'todos', todoId);
    try {
      await updateDoc(docRef, { title, items: todos });
      navigate(`/checklist/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //get single todo
    async function getTodo() {
      try {
        const docRef = doc(db, 'todos', id);
        const todoSnapshot = await getDoc(docRef);

        setTodo(todoSnapshot.data());
      } catch (error) {
        console.log(error);
      }
    }
    getTodo();
  }, [id]);

  useEffect(() => {
    todo && setTitle(todo.title);
  }, [todo]);

  useEffect(() => {
    const { items } = todo;
    setTodos(items);
  }, [todo]);

  return (
    <Container sx={{ mt: '35px' }}>
      <Box
        sx={{ display: 'flex', mb: '15px' }}
        component='form'
        noValidate
        autoComplete='off'
      >
        <TextField
          value={title}
          onChange={handleTitleChange}
          //fix title text overlapping input label
          InputLabelProps={todo && { shrink: true }}
          required
          error={titleError}
          fullWidth
          label='Todo Title'
          size={isMatched && 'small'}
        />
        <Button sx={{ ml: '10px' }} disabled />
      </Box>
      <Box
        sx={{
          display: 'flex',
          mb: '15px'
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
      {todos && <TodoList id={id} setTodos={setTodos} todos={todos} />}

      {todo !== null && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
          <Button
            sx={{ mb: '20px' }}
            size={isMatched ? 'small' : 'medium'}
            color='info'
            onClick={() => handleUpdate(id)}
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

export default Edit;
