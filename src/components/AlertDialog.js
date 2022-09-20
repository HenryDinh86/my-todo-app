import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useNavigate } from 'react-router-dom';
import { doc, deleteDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { useLocation } from 'react-router-dom';

export default function AlertDialog({ id }) {
  const [open, setOpen] = useState(false);
  const path = '/create';
  const location = useLocation();

  useEffect(() => {
    setOpen(true);
  }, []);

  //NAVIGATION
  const navigate = useNavigate();

  //check to render AlertDialog or not in route '/create'
  if (location.pathname === path) {
    return null;
  }
  //FUNCTIONS
  const deleteHandler = async (id) => {
    const docRef = doc(db, 'todos', id);
    await deleteDoc(docRef);
    setOpen(false);
    navigate('/dashboard');
  };

  const handleClose = () => {
    setOpen(false);
    navigate(`/checklist/${id}`);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
      >
        <DialogTitle id='alert-dialog-title'>
          {"You've completed all your chores"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            Would you like to delete the todo?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            sx={{
              color: 'info.main',
              '&: hover': { backgroundColor: 'transparent' }
            }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            sx={{
              color: 'error.light',
              '&: hover': { backgroundColor: 'transparent' }
            }}
            onClick={() => deleteHandler(id)}
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
