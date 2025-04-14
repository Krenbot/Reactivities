import { useEffect, useState } from 'react';
import './App.css';
import { Typography, List, ListItem, ListItemText } from '@mui/material';

function App() {
  const [activities, setActivities] = useState<Activity[]>([]);

  useEffect(() => {
    fetch('https://localhost:5001/api/activities')
      .then((response) => response.json())
      .then((data) => setActivities(data));
  }, []);

  return (
    <>
      <Typography variant="h3">Reactivities</Typography>
      <List>
        {activities.map((activity) => (
          <ListItem key={activity.id}>
            <ListItemText>{activity.title}</ListItemText>
          </ListItem>
        ))}
      </List>
    </>
  );
}

export default App;
