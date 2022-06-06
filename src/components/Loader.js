import CircularProgress from '@mui/material/CircularProgress';

export default function Loader() {
  return (
    <div
      style={{
        height: '90vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <CircularProgress color={'info'} />
    </div>
  );
}
