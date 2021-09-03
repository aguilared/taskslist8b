import { Input } from "./Input";

export default {
  component: Input,
  title: "Components/Input",
};

export const BasicTextField = () => (
  <div>
    <Input
      id="standard-full-width"
      label="Label"
      style={{ margin: 8 }}
      placeholder="Placeholder"
      helperText="Full width!"
      fullWidth
      margin="normal"
    />
  </div>
);
