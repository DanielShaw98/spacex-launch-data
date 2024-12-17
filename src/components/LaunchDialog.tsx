import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { LaunchDialogProps } from '../types';

const LaunchDialog: React.FC<LaunchDialogProps> = ({ open, onClose, selectedLaunch }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>
        <Typography variant="h6">Launch Details</Typography>
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
      <DialogContent>
        {selectedLaunch && (
          <div>
            <Typography variant="h6">Name: {selectedLaunch.name}</Typography>
            <Typography variant="body1">
              Launch Date: {new Date(selectedLaunch.date_utc).toLocaleDateString()}
            </Typography>
            <Typography variant="body1">Rocket ID: {selectedLaunch.id}</Typography>
            <Typography variant="body1">Launchpad ID: {selectedLaunch.launchpad}</Typography>
            <Typography variant="body1">Status: {selectedLaunch.success ? "Success" : "Failed"}</Typography>
            <Typography variant="body1">
              Details: {selectedLaunch.details || 'No details available'}
            </Typography>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LaunchDialog;
