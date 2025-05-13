import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { FormEvent } from 'react';
import { useActivities } from '../../../lib/hooks/useActivities';

export default function ActivityForm() {
  const { updateActivity, createActivity } = useActivities();
  const activity = {} as Activity;

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const data: { [key: string]: FormDataEntryValue } = {};
    formData.forEach((value, key) => {
      data[key] = value;
    });

    // Check if an existing activity is being edited
    if (activity) {
      // Assign the existing activity's ID to the data object
      data.id = activity.id;
      // Call the update mutation with the data, casting it to an Activity type
      await updateActivity.mutateAsync(data as unknown as Activity);
      // Close the form after updating
    } else {
      // If no existing activity, call the create mutation to add a new activity
      await createActivity.mutateAsync(data as unknown as Activity);
    }
  };

  return (
    <Paper sx={{ borderRadius: 3, padding: 3 }}>
      <Typography variant="h5" gutterBottom color="primary">
        Create activity
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        display="flex"
        flexDirection="column"
        gap={3}
      >
        <TextField name="title" label="Title" defaultValue={activity?.title} />
        <TextField
          name="description"
          label="Description"
          defaultValue={activity?.description}
          multiline
          rows={3}
        />
        <TextField
          name="category"
          label="Category"
          defaultValue={activity?.category}
        />
        <TextField
          name="date"
          label="Date"
          type="date"
          defaultValue={
            activity?.date
              ? new Date(activity.date).toISOString().split('T')[0]
              : new Date().toISOString().split('T')[0]
          }
        />
        <TextField name="city" label="City" defaultValue={activity?.city} />
        <TextField name="venue" label="Venue" defaultValue={activity?.venue} />
        <Box display={'flex'} justifyContent={'end'} gap={3}>
          <Button color="inherit">Cancel</Button>
          <Button
            type="submit"
            disabled={updateActivity.isPending || createActivity.isPending}
            color="success"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </Box>
    </Paper>
  );
}
