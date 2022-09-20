import Todo from './Todo';
import AlertDialog from '../components/AlertDialog';

const TodoList = ({ setTodos, todos, id }) => {
  return (
    <>
      {todos.length === 0 ? (
        <AlertDialog id={id} />
      ) : (
        <div>
          <ul className='todo-list'>
            {todos.map((todo) => (
              //the "key" removes this error: Warning: Each child in a list
              //should have a unique "key" prop
              <Todo
                id={id}
                setTodos={setTodos}
                todos={todos}
                todo={todo}
                key={todo.id}
              />
            ))}
          </ul>
        </div>
      )}
    </>
  );
};

export default TodoList;
