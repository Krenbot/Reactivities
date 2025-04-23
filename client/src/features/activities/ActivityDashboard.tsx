import { List, ListItem, ListItemText } from '@mui/material';
import Grid from '@mui/material/Grid'; // Grid version 1

type Props = {
  activities: Activity[];
};

export default function ActivityDashboard({ activities }: Props) {
  return (
    <Grid container>
      <Grid size={9}>
        {' '}
        <List>
          {activities.map((activity) => (
            <ListItem key={activity.id}>
              <ListItemText>{activity.title}</ListItemText>
            </ListItem>
          ))}
        </List>
      </Grid>
    </Grid>
  );
}
