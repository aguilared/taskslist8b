import MList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Delete, Build, ContactsOutlined } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import IconButton from "@material-ui/core/IconButton";
import ToggleButton from "@material-ui/lab/ToggleButton";
import CheckIcon from "@material-ui/icons/Check";

import NewTaskForm from "../screens/layouts/NewTaskForm";
import { format } from "date-fns";
import { memo, useState } from "react";

// const array = [{id: 1, description: 'asdsad fsadasas', status: 'completed' 'todo' 'forget', createdAt }]

const styles = {
  root: {
    width: "100%",
    maxWidth: 360,
    position: "relative",
    overflow: "auto",
    maxHeight: 300,
  },
  Icon: {
    marginLeft: "auto",
  },
  Paper: {
    margin: "auto",
    padding: 10,
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    width: 500,
  },
};
export const List = ({ items, onDelete, onUpdate, onToggle }) => {
  return (
    <MList>
      {console.log("Items", items)}
      {items &&
        items.map((v) => (
          <Item
            key={v.id}
            id={v.id}
            createdAt={v.createdAt}
            status={v.status}
            completed={v.completed}
            description={v.description}
            onDelete={onDelete}
            onUpdate={onUpdate}
            onToggle={onToggle}
          />
        ))}
    </MList>
  );
};

const Item = memo(
  ({ id, createdAt, description, onDelete, status, completed, onToggle }) => {
    const [selected, setSelected] = useState(true);
    const [beginToUpdate, setBeginToUpdate] = useState(false);
    const handleSelected = () => {
      onToggle({ id, description, status, completed: selected });
    };

    if (beginToUpdate) {
      return (
        <NewTaskForm
          isUpdate
          initialValues={{ id, description, createdAt, status }}
          onUpdate={() => setBeginToUpdate(false)}
        />
      );
    }

    return (
      <ListItem key={`${id}`}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={description}
          secondary={format(new Date(createdAt), "dd MMM yyyy")}
        />
        <ToggleButton
          value="complete"
          selected={completed}
          onChange={() => {
            setSelected(!selected);
            handleSelected();
          }}
        >
          <CheckIcon />
        </ToggleButton>

        <IconButton
          color="primary"
          aria-label="Edit"
          style={styles.Icon}
          onClick={() => setBeginToUpdate(true)}
        >
          <Build fontSize="small" />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="Delete"
          onClick={() => onDelete(id)}
        >
          <Delete fontSize="small" />
        </IconButton>
      </ListItem>
    );
  }
);
