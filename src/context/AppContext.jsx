import { gql, useMutation, useQuery } from "@apollo/client";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";

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

const CREATE_TASK = gql`
  mutation TASK_ADD($data: TaskCreateInput!) {
    taskCreate(data: $data) {
      description
      id
      status
      createdAt
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

const GET_TASK = gql`
  query GetTasks {
    tasksList(filter: { id: { equals: "ckt3khsw9006308l1dtiefab8" } }) {
      items {
        description
        id
        status
        createdAt
      }
    }
  }
`;

const AppContent = createContext({
  tasks: [],
  isLoadingTaskList: false,
  handleDeleteTask: (idTask) => null,
  handleAddTask: (taskDAta) => null,
});

export function AppProvider({ children }) {
  const [idToDelete, setIdToDelete] = useState(null);
  const [tasks, setTasks] = useState([]);
  const { loading: isLoadingTaskList, data } = useQuery(GET_TASKS);
  const [deleteTask] = useMutation(DELETE_TASK, {
    onCompleted() {
      setTasks(tasks.filter((v) => v.id !== idToDelete));
    },
  });
  const [createTask] = useMutation(CREATE_TASK, {
    onCompleted({ taskCreate }) {
      console.log({ taskCreate });
      setTasks([taskCreate, ...tasks]);
    },
  });

  useEffect(() => {
    const setTaskList = () => {
      setTasks(data && data.tasksList ? data.tasksList.items : []);
    };
    setTaskList();
  }, [data]);

  const handleDeleteTask = useCallback(
    (idTask) => {
      setIdToDelete(idTask);
      deleteTask({ variables: { filter: { id: idTask } } });
    },
    [deleteTask]
  );

  const handleAddTask = useCallback(
    (taskData) => {
      createTask({ variables: { data: taskData } });
    },
    [createTask]
  );

  return (
    <AppContent.Provider
      value={{ tasks, handleDeleteTask, handleAddTask, isLoadingTaskList }}
    >
      {children}
    </AppContent.Provider>
  );
}

export const useAppContext = () => {
  const context = useContext(AppContent);
  if (context === undefined) {
    throw new Error("useAppContext must be used within a TimeLineProvider");
  }
  return context;
};
