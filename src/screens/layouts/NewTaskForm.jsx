import { useContext, useState, useEffect } from "react";
import * as yup from "yup";
import { useFormik } from "formik";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import Box from "@material-ui/core/Box";
import { useHistory, useParams } from "react-router-dom";

import { useAppContext } from "../../context/AppContext";

const validationSchema = yup.object({
  newTaskText: yup
    .string()
    .min(3, "Task should be of minimum 3 characters length")
    .required("Required"),
});

function NewTaskForm() {
  const history = useHistory();
  const params = useParams();
  const [task, setTask] = useState({
    id: "",
    status: "",
    description: "",
  });
  console.log("ParamID", params.id);

  const { handleAddTask, tasks } = useAppContext();
  useEffect(() => {
    const taskFound = tasks.find((task) => task.id === params.id);
    if (taskFound) {
      setTask({
        id: taskFound.id,
        status: taskFound.status,
        description: taskFound.description,
      });
    }
  }, [params.id, tasks]);

  const formik = useFormik({
    initialValues: {
      newTaskText: "",
      status: "pending",
    },
    validationSchema: validationSchema,

    onSubmit: ({ newTaskText, status }, { resetForm }) => {
      if (!task.id) {
        handleAddTask({ description: newTaskText, status });
      } else {
        handleAddTask(task);
      }
      resetForm();
    },
  });

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={12}>
        <Box my={10} width="100%">
          <form onSubmit={formik.handleSubmit}>
            <h2 className="text-3xl mb-7">
              {task.id ? "Update " : "Create "}A Task
            </h2>
            {task.id ? (
              <Input
                label="Update task text"
                id="newTaskText"
                name="newTaskText"
                value={task.description}
                onChange={formik.handleChange}
                error={
                  formik.touched.newTaskText &&
                  Boolean(formik.errors.newTaskText)
                }
                helperText={formik.touched.newTaskText && formik.errors.email}
              />
            ) : (
              <Input
                label="Add new task text"
                id="newTaskText"
                name="newTaskText"
                value={formik.values.newTaskText}
                onChange={formik.handleChange}
                error={
                  formik.touched.newTaskText &&
                  Boolean(formik.errors.newTaskText)
                }
                helperText={formik.touched.newTaskText && formik.errors.email}
              />
            )}
            <Button color="primary" variant="contained" type="submit">
              <Typography>
                {" "}
                {task.id ? "Update Task" : "Create Task"}
              </Typography>
            </Button>
          </form>
        </Box>
      </Grid>{" "}
    </Grid>
  );
}
export default NewTaskForm;
