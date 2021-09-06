import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useAppContext } from "../../context/AppContext";

import { List } from "../../components/List";

function TasksLists() {
  const {
    tasks,
    isLoadingTaskList,
    handleDeleteTask,
    handleToToggle,
    handleUpdateTask,
  } = useAppContext();

  if (isLoadingTaskList) {
    return <Typography>Loading list...</Typography>;
  }

  return (
    <Grid container>
      {tasks && (
        <List
          onDelete={handleDeleteTask}
          items={tasks}
          onToggle={handleUpdateTask}
        />
      )}
    </Grid>
  );
}
export default TasksLists;
