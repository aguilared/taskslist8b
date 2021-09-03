import MList from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import { Delete, Build } from "@material-ui/icons";
import Avatar from "@material-ui/core/Avatar";
import ImageIcon from "@material-ui/icons/Image";
import IconButton from "@material-ui/core/IconButton";
import { format } from "date-fns";

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
export const List = ({ items, onDelete }) => (
  <MList className={styles.root}>
    {items.map((v) => (
      <ListItem key={`${v.id}`}>
        <ListItemAvatar>
          <Avatar>
            <ImageIcon />
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={v.description}
          secondary={format(new Date(v.createdAt), "dd MMM yyyy")}
        />
        <IconButton color="primary" aria-label="Edit" style={styles.Icon}>
          <Build fontSize="small" />
        </IconButton>
        <IconButton
          color="secondary"
          aria-label="Delete"
          onClick={() => onDelete(v.id)}
        >
          <Delete fontSize="small" />
        </IconButton>
      </ListItem>
    ))}
  </MList>
);
