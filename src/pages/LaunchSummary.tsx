import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchLaunches } from '../api/SpacexApi';
import { LaunchData } from '../types';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import './LaunchSummary.css';

const LaunchSummary: React.FC = () => {
  const { id } = useParams();
  const [launch, setLaunch] = useState<LaunchData | null>(null);

  useEffect(() => {
    const getLaunch = async () => {
      try {
        const launches = await fetchLaunches();
        const launchData = launches.find((launch) => launch.id === id);
        setLaunch(launchData || null);
      } catch (error) {
        console.error('Failed to fetch launch details', error);
      }
    };

    if (id) {
      getLaunch();
    }
  }, [id]);

  if (!launch) {
    return <div>Loading...</div>;
  }

  return (
    <Paper sx={{ padding: '40px' }}>
      <Typography variant="h6" sx={{ pb: '20px' }}>
        Name: {launch.name}
      </Typography>
      <Typography variant="subtitle1" sx={{ pb: '10px' }}>
        Launch Date: {new Date(launch.date_utc).toLocaleDateString()}
      </Typography>
      <Typography variant="subtitle1" sx={{ pb: '10px' }}>
        Rocket ID: {launch.id}
      </Typography>
      <Typography variant="subtitle1" sx={{ pb: '10px' }}>
        Launchpad ID: {launch.launchpad}
      </Typography>
      <Typography variant="subtitle1" sx={{ pb: '10px' }}>
        Status: {launch.success ? 'Success' : 'Failed'}
      </Typography>
      <Typography variant="body1" sx={{ pb: '10px' }}>
        Details: {launch.details || 'No details available'}
      </Typography>

      <Typography variant="h6" sx={{ pb: '20px', pt: '20px' }}>
        Links:
      </Typography>
      {launch.links?.image && (
        <Typography variant="body1" sx={{ pb: '10px' }}>
          <a href={launch.links.image} target="_blank" rel="noopener noreferrer">
            Launch Image
          </a>
        </Typography>
      )}

      {launch.links?.webcast && (
        <Typography variant="body1" sx={{ pb: '10px' }}>
          <a href={launch.links.webcast} target="_blank" rel="noopener noreferrer">
            Webcast (YouTube)
          </a>
        </Typography>
      )}

      {launch.links?.article && (
        <Typography variant="body1" sx={{ pb: '10px' }}>
          <a href={launch.links.article} target="_blank" rel="noopener noreferrer">
            Article
          </a>
        </Typography>
      )}

      {launch.links?.wikipedia && (
        <Typography variant="body1" sx={{ pb: '10px' }}>
          <a href={launch.links.wikipedia} target="_blank" rel="noopener noreferrer">
            Wikipedia
          </a>
        </Typography>
      )}
    </Paper>
  );
};

export default LaunchSummary;
