import Container from "@material-ui/core/Container";
import NewTaskForm from "./layouts/NewTaskForm";
import TasksLists from "./layouts/TasksLists";

function Home() {
  return (
    <Container maxWidth="sm">
      <NewTaskForm />
      <TasksLists />
    </Container>
  );
}

export default Home;
