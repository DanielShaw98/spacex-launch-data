import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { LaunchDialogProps } from '../types';
import { useNavigate } from 'react-router-dom';

const LaunchDialog: React.FC<LaunchDialogProps> = ({ open, onClose, selectedLaunch }) => {
  const navigate = useNavigate();

  const handleGoToSummary = () => {
    if (selectedLaunch) {
      navigate(`/launch/${selectedLaunch.id}`);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <div>Launch Details</div>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
          sx={{
            position: 'absolute',
            right: 18,
            top: 6,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          paddingBottom: '20px'
        }}
      >
        {selectedLaunch && (
          <div>
            <Typography variant="subtitle1">Name: {selectedLaunch.name}</Typography>
            <Typography variant="subtitle1">
              Launch Date: {new Date(selectedLaunch.date_utc).toLocaleDateString()}
            </Typography>
            <Typography variant="subtitle1">Rocket ID: {selectedLaunch.id}</Typography>
            <Typography variant="subtitle1">Launchpad ID: {selectedLaunch.launchpad}</Typography>
            <Typography variant="subtitle1">Status: {selectedLaunch.success ? "Success" : "Failed"}</Typography>
            <Typography variant="subtitle1">
              Details: {selectedLaunch.details || 'No details available'}
            </Typography>
          </div>
        )}
        <Button
          onClick={handleGoToSummary}
          sx={{
            alignSelf: 'center',
            padding: '10px 20px',
            fontSize: '16px',
            minWidth: '120px',
          }}
        >
          Go to Summary
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default LaunchDialog;
