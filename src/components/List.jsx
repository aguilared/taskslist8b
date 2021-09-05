import MList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Delete, Build } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import IconButton from "@material-ui/core/IconButton";
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
export const List = ({ items, onDelete, onUpdate }) => {
  return (
    <MList>
      {items &&
        items.map((v) => (
          <Item
            key={v.id}
            id={v.id}
            createdAt={v.createdAt}
            status={v.status}
            description={v.description}
            onDelete={onDelete}
            onUpdate={onUpdate}
          />
        ))}
    </MList>
  );
};

const Item = memo(({ id, createdAt, description, onDelete, status }) => {
  const [beginToUpdate, setBeginToUpdate] = useState(false);
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
});
