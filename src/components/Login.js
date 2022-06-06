import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import GoogleButton from 'react-google-button';
import {
  Divider,
  Grid,
  Card,
  CardContent,
  Typography,
  Box
} from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { auth } from '../config/firebaseConfig';

const Login = () => {
  const navigate = useNavigate();

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      const data = await signInWithPopup(auth, provider);
      localStorage.setItem('user', JSON.stringify(data.user));
      navigate('/dashboard');
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div>
      <Grid
        sx={{ height: '100vh' }}
        container
        justifyContent='center'
        alignItems='center'
      >
        <Grid item>
          <Card sx={{ width: '350px' }}>
            <CardContent>
              <Typography
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  fontSize: '2.5em'
                }}
                variant='h3'
                gutterBottom
              >
                <MenuBookIcon
                  sx={{
                    color: 'primary.main',
                    fontSize: '1.5em',
                    marginRight: '10px'
                  }}
                />
                My To-do's
              </Typography>
              <Divider />
              <Box
                sx={{ mt: '15px', display: 'flex', justifyContent: 'center' }}
              >
                <GoogleButton
                  style={{ boxShadow: 'none' }}
                  onClick={() => signInWithGoogle()}
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
