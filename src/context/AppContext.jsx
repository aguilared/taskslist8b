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
        completed
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
      completed
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

export const UPDATE_TASK = gql`
  mutation UPDATE_TASK($data: TaskUpdateInput!, $filter: TaskKeyFilter!) {
    taskUpdate(data: $data, filter: $filter) {
      description
      id
      status
      completed
      createdAt
    }
  }
`;
export const TOGGLE_TASK = gql`
  mutation UPDATE_TASK($data: TaskUpdateInput!, $filter: TaskKeyFilter!) {
    taskUpdate(data: $data, filter: $filter) {
      description
      id
      status
      completed
      createdAt
    }
  }
`;

const AppContent = createContext({
  tasks: [],
  isLoadingTaskList: false,
  handleDeleteTask: (idTask) => null,
  handleAddTask: (taskDAta) => null,
  handleToggleTask: (taskDAta) => null,
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
  const [updateTask] = useMutation(UPDATE_TASK, {
    onCompleted({ taskUpdate }) {
      console.log({ taskUpdate });
      const newTaks = tasks.map((task) =>
        task.id === taskUpdate.id
          ? {
              ...taskUpdate,
            }
          : task
      );
      setTasks(newTaks);
    },
  });

  const [toggleTask] = useMutation(UPDATE_TASK, {
    onCompleted({ taskUpdate }) {
      console.log({ taskUpdate });
      const newTaks = tasks.map((task) =>
        task.id === taskUpdate.id
          ? {
              ...taskUpdate,
            }
          : task
      );
      setTasks(newTaks);
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
  const handleUpdateTask = useCallback(
    (taskData) => {
      console.log("Datos to update>", taskData);
      updateTask({
        variables: { data: taskData, filter: { id: taskData.id } },
      });
    },
    [updateTask]
  );

  const handleToggleTask = useCallback(
    (taskData) => {
      updateTask({
        variables: { data: taskData, filter: { id: taskData.id } },
      });
    },
    [updateTask]
  );

  return (
    <AppContent.Provider
      value={{
        tasks,
        handleDeleteTask,
        handleAddTask,
        handleUpdateTask,
        handleToggleTask,
        isLoadingTaskList,
      }}
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
