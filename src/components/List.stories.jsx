import { List } from "./List";

const data = [
  {
    id: 1,
    description: "Test tttt",
    status: "completed",
    createdAt: "Sun 12sep 2021",
  },
  {
    id: 2,
    description: "foo bar",
    status: "pending",
    createdAt: "Sat 13sep 2021",
  },
  {
    id: 3,
    description: "Bar Foo 3",
    status: "forgot",
    createdAt: "Thu 15sep 2021",
  },
];

export default {
  component: List,
  title: "Components/List",
};

export const BasicListExample = () => (
  <div>
    <List items={data} />
  </div>
);
