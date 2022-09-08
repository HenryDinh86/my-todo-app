import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Box, Button, Container, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TodoList from '../components/TodoList';
import { useMediaQueries } from '../helpers/useMediaQueries';

const Checklist = () => {
  //HELPERS
  const isMatched = useMediaQueries('sm');
  const navigate = useNavigate();
  const { id } = useParams();
  const [todo, setTodo] = useState({});
  const [todos, setTodos] = useState([]);
  // STYLES
  const style = {
    title: { marginTop: '20px', marginBottom: '20px' }
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
    const { items } = todo;
    setTodos(items);
  }, [todo]);

  //FUNCTIONS
  const handleUpdate = async (todoId) => {
    const docRef = doc(db, 'todos', todoId);
    try {
      await updateDoc(docRef, { items: todos });
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
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
        What have you completed?
      </Typography>
      <Typography variant='h5'>{todo.title}</Typography>
      {/** && means logical 'and'. It evaluates the left first, if false, it wont
      bother executing anything on the right' */}
      {todos && <TodoList id={id} todos={todos} setTodos={setTodos} />}
      {todos && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: '10px' }}>
          <Button
            color='info'
            onClick={() => {
              handleUpdate(id);
            }}
            disableElevation
            variant='contained'
            startIcon={<EditIcon />}
            size={isMatched ? 'small' : 'medium'}
          >
            Save
          </Button>
        </Box>
      )}
    </Container>
  );
};

export default Checklist;
