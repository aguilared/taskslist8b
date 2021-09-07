import MList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Delete, Build } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import IconButton from "@material-ui/core/IconButton";
import ToggleButton from "@material-ui/lab/ToggleButton";
import CheckIcon from "@material-ui/icons/Check";
import ReplayIcon from "@material-ui/icons/Replay";
import NewTaskForm from "../screens/layouts/NewTaskForm";
import { format } from "date-fns";
import { memo, useState } from "react";
import clsx from "clsx";
import { createStyles, makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() =>
  createStyles({
    completedStyle: {
      opacity: 0.2,
    },
  })
);
export const List = ({ items, onDelete, onComplete, onUpdate }) => {
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
            onComplete={onComplete}
            onUpdate={onUpdate}
          />
        ))}
    </MList>
  );
};

const Item = memo(
  ({ id, createdAt, description, onDelete, status, onComplete }) => {
    const [beginToUpdate, setBeginToUpdate] = useState(false);
    const isCompleted = status === "completed";
    const classes = useStyles();
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
      <ListItem
        key={`${id}`}
        className={clsx([isCompleted && classes.completedStyle])}
        disabled={isCompleted}
      >
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={description}
          secondary={format(new Date(createdAt), "dd MMM yyyy")}
        />

        {isCompleted ? (
          <IconButton onClick={() => onComplete(id, "pending")}>
            <ReplayIcon fontSize="small" color="primary" />
          </IconButton>
        ) : (
          <>
            <ToggleButton
              value={id}
              onClick={() => onComplete(id, "completed")}
              disabled={isCompleted}
            >
              <CheckIcon />
            </ToggleButton>

            <IconButton
              color="primary"
              aria-label="Edit"
              onClick={() => setBeginToUpdate(true)}
              disabled={isCompleted}
            >
              <Build fontSize="small" />
            </IconButton>
            <IconButton
              color="secondary"
              aria-label="Delete"
              onClick={() => onDelete(id)}
              disabled={isCompleted}
            >
              <Delete fontSize="small" />
            </IconButton>
          </>
        )}
      </ListItem>
    );
  }
);
