import React, { useState } from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import { generalItems } from "../../core/config";
import { Link as RouterLink } from "react-router-dom";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  },
  nested: {
    paddingLeft: theme.spacing(4)
  }
}));

export default function NestedList({ signout }) {
  const classes = useStyles();
  const [childsOpener, setChildsOpener] = useState(
    generalItems
      .filter(item => item.child !== undefined)
      .map(item => {
        return item.child !== undefined && { id: item.id, open: false };
      })
  );

  const parentHandleClick = id => {
    const item = generalItems.find(item => item.id === id);
    item.child !== undefined && setOpenChild(id);
  };

  const setOpenChild = id => {
    const index = childsOpener.findIndex(item => item.id === id);
    if (index !== -1) {
      childsOpener[index].open = !childsOpener[index].open;
      setChildsOpener([...childsOpener]);
    }
  };

  const oponerItemById = id => {
    return childsOpener.find(item => item.id === id);
  };

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          Gestion
        </ListSubheader>
      }
      className={classes.root}
    >
      {generalItems.map((item, index) => (
        <div key={index}>
          <ListItem
            component={RouterLink}
            to={item.path}
            onClick={() => parentHandleClick(item.id)}
            button
          >
            <ListItemIcon>{item.itemIcon}</ListItemIcon>
            <ListItemText primary={item.title} />
            {item.child !== undefined &&
              (oponerItemById(item.id).open ? <ExpandLess /> : <ExpandMore />)}
          </ListItem>
          {item.child !== undefined && (
            <Collapse
              in={oponerItemById(item.id).open}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {item.child.map((childItem, index) => (
                  <ListItem
                    key={index}
                    button
                    className={classes.nested}
                    component={RouterLink}
                    to={childItem.path}
                  >
                    <ListItemIcon>{childItem.itemIcon}</ListItemIcon>
                    <ListItemText primary={childItem.title} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          )}
        </div>
      ))}

      <ListItem component={RouterLink} to="#" onClick={() => signout()} button>
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Déconnexion" />
      </ListItem>
    </List>
  );
}
