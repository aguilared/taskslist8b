import * as yup from "yup";
import { useFormik } from "formik";
import { useMutation, gql } from "@apollo/client";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import { Button } from "../../components/Button";
import { Input } from "../../components/Input";
import Box from "@material-ui/core/Box";

const validationSchema = yup.object({
  newTaskText: yup
    .string()
    .min(3, "Task should be of minimum 3 characters length")
    .required("Required"),
});

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
function NewTaskForm() {
  const [createTask] = useMutation(CREATE_TASK);

  const formik = useFormik({
    initialValues: {
      newTaskText: "",
      status: "pending",
    },
    validationSchema: validationSchema,
    onSubmit: ({ newTaskText, status }, { resetForm }) => {
      createTask({ variables: { data: { description: newTaskText, status } } });
      resetForm();
    },
  });

  return (
    <Grid container direction="row" alignItems="center">
      <Grid item xs={12}>
        <Box my={10} width="100%">
          <form onSubmit={formik.handleSubmit}>
            <Input
              label="Add new task text"
              id="newTaskText"
              name="newTaskText"
              value={formik.values.newTaskText}
              onChange={formik.handleChange}
              error={
                formik.touched.newTaskText && Boolean(formik.errors.newTaskText)
              }
              helperText={formik.touched.newTaskText && formik.errors.email}
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
export default NewTaskForm;
