import Grid from '@mui/material/Grid'; // Grid version 1
import ActivityList from './ActivityList';

type Props = {
  activities: Activity[];
};

export default function ActivityDashboard({ activities }: Props) {
  return (
    <Grid container>
      <Grid size={9}>
        <ActivityList activities={activities} />{' '}
      </Grid>
    </Grid>
  );
}
