import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { useEffect } from "react";
import { List } from "../../components/List";

const GET_TASKS = gql`
  query GetTasks {
    tasksList {
      items {
        description
        id
        status
        createdAt
      }
    }
  }
`;

const DELETE_TASK = gql`
  mutation DELETE_TASK($filter: TaskKeyFilter!) {
    taskDelete(filter: $filter) {
      success
    }
  }
`;
const TASKS_SUB = gql`
  subscription {
    Tasks(filter: { mutation_in: [create] }) {
      node {
        id
        description
        status
        createdAt
      }
    }
  }
`;

function TasksLists() {
  const { loading, data, subscribeToMore } = useQuery(GET_TASKS);
  const [deleteTask] = useMutation(DELETE_TASK);
  useEffect(() => {
    subscribeToMore({
      document: TASKS_SUB,
      updateQuery: (prev, { subscriptionData }) => {
        if (!subscriptionData.data.Tasks) return prev;
        console.log("MUTATION ", subscriptionData.data.Tasks);

        const mutationType = subscriptionData.data.Tasks.mutation;

        const newTask = subscriptionData.data.Tasks.node;

        return {
          tasksList: [...prev.tasksList.items, newTask],
        };
      },
    });
  }, [subscribeToMore]);

  const handleDelete = (idtask) => {
    deleteTask({ variables: { filter: { id: idtask } } });
  };

  if (loading) {
    return <Typography>Loading list...</Typography>;
  }
  return (
    <Grid container>
      {data && data.tasksList && (
        <List onDelete={handleDelete} items={data.tasksList.items} />
      )}
    </Grid>
  );
}
export default TasksLists;
