import Container from "@material-ui/core/Container";
import NewTaskForm from "./layouts/NewTaskForm";

function Home() {
  return (
    <Container maxWidth="sm">
      <NewTaskForm />
    </Container>
  );
}

export default Home;
