import { useLocation } from 'react-router-dom';
import { Box, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useMediaQueries } from '../helpers/useMediaQueries';

const Todo = ({ setTodos, todo, todos, id }) => {
  let prevListItem = '';
  const path = `/checklist/${id}`;
  const location = useLocation();
  const isMatched = useMediaQueries('sm');

  /** FUNCTIONS */
  const deleteHandler = () => {
    setTodos(todos.filter((el) => el.id !== todo.id));
  };

  //value from prev list item
  const onFocus = (e) => {
    prevListItem = e.target.innerHTML;
  };

  //setting new value on contentEditable
  const onBlur = (e) => {
    if (prevListItem !== e.target.innerHTML) {
      const html = e.target.innerHTML;
      setTodos(
        todos.map((item) => {
          if (item.id === todo.id) {
            return {
              ...item,
              item: html
            };
          }
          return item;
        })
      );
    }
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

  /** END OF FUNCTIONS */

  return (
    <Box className='todo'>
      <li
        onFocus={onFocus}
        onBlur={onBlur}
        contentEditable={location.pathname === path ? false : true}
        style={{ height: '100%', width: '100%' }}
        className={`todo-item ${todo.completed ? 'completed' : ''}`}
      >
        {todo.item}
      </li>

      {location.pathname === path ? (
        <button onClick={completeHandler} className='complete-btn'>
          <i className='fas fa-check'></i>
        </button>
      ) : (
        <Button
          sx={!isMatched && { p: '1rem 0' }}
          color='warning'
          disableElevation
          onClick={deleteHandler}
          variant='contained'
        >
          <DeleteIcon />
        </Button>
      )}
    </Box>
  );
};

export default Todo;
