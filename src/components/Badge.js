import React from "react";
import Badge from "@material-ui/core/Badge";
import Avatar from "@material-ui/core/Avatar";
import { makeStyles, withStyles } from "@material-ui/core/styles";

const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    // marginLeft: "60%",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: "auto",
    },
  },
  largeAvatar: {
    width: theme.spacing(6),
    height: theme.spacing(6),
  },
  badge: {
    marginLeft: (props) => props.large && "50% !important",
  },
}));

export default function ({ user, large = false }) {
  const classes = useStyles({ large });
  const { isConnected, email, photo = "/moi/m.js" } = user;
  const avStyle = large ? { className: classes.largeAvatar } : {};

  return (
    <div className={classes.root}>
      {isConnected ? (
        <StyledBadge
          overlap="circle"
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right",
          }}
          className={classes.badge}
          variant="dot"
        >
          <Avatar alt={email.toUpperCase()} src={photo} {...avStyle} />
        </StyledBadge>
      ) : (
        <Avatar alt={email.toUpperCase()} src={photo} />
      )}
    </div>
  );
}
