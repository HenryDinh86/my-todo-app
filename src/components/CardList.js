import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { format } from 'date-fns';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { CardActionArea, Container, Grid } from '@mui/material';
import { useMediaQueries } from '../helpers/useMediaQueries';

const CardList = ({ todos }) => {
  const isMatched = useMediaQueries('sm');
  const navigate = useNavigate();

  // console.log(format(new Date(), 'EEEE, do MMMM Y'));
  const deleteHandler = async (e, id) => {
    /**  Stop Ripple Effect */
    e.stopPropagation();
    /**  */
    const docRef = doc(db, 'todos', id);
    await deleteDoc(docRef);
  };
  const handleRedirect = (id) => {
    navigate(`/edit/${id}`);
  };

  return (
    <Grid container spacing={2}>
      {todos.length === 0 ? (
        <Container>
          <Typography
            style={
              isMatched
                ? { paddingTop: '30px', paddingLeft: '20px' }
                : { paddingTop: '10px' }
            }
            variant='h5'
          >
            No To-do's right now.
          </Typography>
        </Container>
      ) : (
        todos.map((todo) => (
          <Grid key={todo.doc_id} item xs={12} md={4}>
            <Card variant='outlined' sx={{ minWidth: 200 }}>
              <CardActionArea
                // sx={{
                //   '& .MuiCardActionArea-focusHighlight': {
                //     backgroundColor: 'transparent'
                //   }
                // }}
                component='a'
                onClick={() => handleRedirect(todo.doc_id)}
              >
                <CardContent>
                  <Typography
                    sx={{ fontFamily: 'Quicksand', fontWeight: '500' }}
                    variant='h4'
                    color='text.secondary'
                    gutterBottom
                  >
                    {todo.title}
                  </Typography>
                  <Typography
                    sx={{
                      pl: '2px',
                      fontFamily: 'Quicksand',
                      fontWeight: '500'
                    }}
                    variant='subtitle1'
                  >
                    {format(todo.createdAt.toDate(), 'EEEE, do MMMM Y')}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    sx={{ ml: '8px' }}
                    disableElevation
                    color='warning'
                    onClick={(e) => deleteHandler(e, todo.doc_id)}
                    // onTouchStart={(e) => deleteHandler(e, todo.doc_id)} //use for mobile
                    variant='contained'
                    size='small'
                  >
                    Delete
                  </Button>
                </CardActions>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  );
};

export default CardList;
