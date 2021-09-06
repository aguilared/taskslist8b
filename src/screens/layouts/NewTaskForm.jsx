import * as yup from "yup";
import { useFormik } from "formik";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import Box from "@material-ui/core/Box";

import { useAppContext } from "../../context/AppContext";

const validationSchema = yup.object({
  description: yup
    .string()
    .min(3, "Task should be of minimum 3 characters length")
    .required("Required"),
});

function NewTaskForm({ isUpdate, initialValues, onUpdate }) {
  const { handleAddTask, handleUpdateTask } = useAppContext();
  const formik = useFormik({
    initialValues: isUpdate
      ? initialValues
      : {
          description: "",
          status: "pending",
          completed: false,
        },
    validationSchema: validationSchema,

    onSubmit: ({ description, status, completed }, { resetForm }) => {
      console.log("updatinggg");
      if (isUpdate) {
        handleUpdateTask({
          id: initialValues.id,
          description,
          status: initialValues.status,
          completed: initialValues.status,
        });
        onUpdate();
        return resetForm();
      }
      handleAddTask({ description, status, completed });
      return resetForm();
    },
  });

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={12}>
        <Box my={10} width="100%">
          <form onSubmit={formik.handleSubmit}>
            <Input
              label={isUpdate ? "Update task description" : "Add new task text"}
              id="description"
              name="description"
              value={formik.values.description}
              onChange={formik.handleChange}
              error={
                formik.touched.description && Boolean(formik.errors.description)
              }
              helperText={
                formik.touched.description && formik.errors.description
              }
            />

            <Button
              color="primary"
              variant="contained"
              type="submit"
              data-testid="submitBtn"
            >
              <Typography>
                {" "}
                {isUpdate ? "Update Task" : "Create Task"}
              </Typography>
            </Button>
          </form>
        </Box>
      </Grid>{" "}
    </Grid>
  );
}
export default NewTaskForm;
