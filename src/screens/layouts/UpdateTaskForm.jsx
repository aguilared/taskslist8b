import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import Box from "@material-ui/core/Box";

const validationSchema = yup.object({
  updateTaskText: yup
    .string()
    .min(3, "Task should be of minimum 3 characters length")
    .required("Required"),
});

const UPDATE_TASK = gql`
  mutation TASK_ADD($data: TaskUpdateInput!) {
    taskUpdate(data: $data) {
      description
      id
      status
      updatedAt
    }
  }
`;
function UpdateTaskForm() {
  const [updateTask] = useMutation(UPDATE_TASK);

  const formik = useFormik({
    initialValues: {
      updateTaskText: "",
      status: "pending",
    },
    validationSchema: validationSchema,
    onSubmit: ({ updateTaskText, status }, { resetForm }) => {
      updateTask({
        variables: { data: { description: updateTaskText, status } },
      });
      resetForm();
    },
  });

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={12}>
        <Box my={10} width="100%">
          <form onSubmit={formik.handleSubmit}>
            <Input
              label="Update task text"
              id="updateTaskText"
              name="updateTaskText"
              value={formik.values.updateTaskText}
              onChange={formik.handleChange}
              error={
                formik.touched.updateTaskText &&
                Boolean(formik.errors.updateTaskText)
              }
              helperText={formik.touched.updateTaskText && formik.errors.email}
            />
            <Button color="primary" variant="contained" type="submit">
              <Typography>Submit</Typography>
            </Button>
          </form>
        </Box>
      </Grid>{" "}
    </Grid>
  );
}
export default UpdateTaskForm;
