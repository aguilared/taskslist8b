import { Button } from "./Button";

export default {
  component: Button,
  title: "Components/Button",
};

export const Normal = () => <Button>Button</Button>;
export const Primary = () => (
  <Button color="primary" variant="contained">
    Button
  </Button>
);
