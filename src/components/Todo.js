import { useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { useMediaQueries } from '../helpers/useMediaQueries';

const Todo = ({ setTodos, todo, todos, id }) => {
  const isMatched = useMediaQueries('sm');
  const path = `/edit/${id}`;
  const location = useLocation();

  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  const completeHandler = () => {
    setTodos(
      todos.map((item) => {
        if (item.id === todo.id) {
          return {
            ...item,
            completed: !item.completed
          };
        }
        return item;
      })
    );
  };
  return (
    <Box className='todo'>
      <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
        {todo.item}
      </li>
      {location.pathname === path ? (
        <button onClick={completeHandler} className='complete-btn'>
          <i className='fas fa-check'></i>
        </button>
      ) : (
        <Button
          style={isMatched ? { padding: '0.5rem 0' } : { padding: '0.95rem 0' }}
          color='warning'
          disableElevation
          onClick={deleteHandler}
          variant='contained'
        >
          <ClearIcon />
        </Button>
      )}
    </Box>
  );
};

export default Todo;
