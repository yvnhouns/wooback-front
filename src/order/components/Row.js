import React from "react";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { makeStyles } from "@material-ui/core/styles";
import ListItem from "@material-ui/core/ListItem";
import purple from "@material-ui/core/colors/purple";
import ListItemText from "@material-ui/core/ListItemText";
import Typography from "@material-ui/core/Typography";
import Checkbox from "@material-ui/core/Checkbox";
import Fade from "@material-ui/core/Fade";
import Box from "@material-ui/core/Box";
import { dateToText } from "../../utils";
import { getWooStatusTranslate, getStatusColor } from "../container/utils";

import { TitleTypography } from "../../components/Typography";

const Row = ({
  handleToggle,
  checked,
  checkable,
  value = {},
  isCurrent,
  idField = "_id",
  handleClick,
}) => {
  const {
    customer,
    shipping,
    id,
    date_created,
    itemsCount,
    status,
    total,
    localStatus,
  } = value;

  const translate = getWooStatusTranslate(status);
  const localColor = getStatusColor(localStatus.id);

  const classes = useStyles({ statusColor: translate.color, localColor });
  const { first_name, last_name, email } = customer || shipping;

  const secondaryInformation = () => {
    return (
      <>
        <Box display="flex" p={0} style={{ width: "100%" }}>
          <Box flexGrow={1}>
            <Box>
              <Typography
                component="span"
                variant="body2"
                className={classes.inline}
                color="textPrimary"
              >
                {`# ${id} `}
              </Typography>
              <Typography
                component="span"
                className={classes.status}
                variant="body2"
              >
                {` ${translate.label}`}
              </Typography>{" "}
              , locale :
              <Typography className={classes.localStatus}>
                {localStatus.label.toLowerCase()}{" "}
              </Typography>
            </Box>
            <Typography variant="body2">{email}</Typography>
            <Typography variant="body2" color="inherit">
              {dateToText(date_created)}
            </Typography>
          </Box>
          <Box textAlign="right">
            {" "}
            <Typography variant="subtitle2" className={classes.total}>
              {total} Fcfa
            </Typography>
            <Typography variant="body2" color="inherit">
              {`Produits : ${itemsCount}`}
            </Typography>
          </Box>
        </Box>
      </>
    );
  };

  return (
    <>
      <ListItem
        ContainerComponent="div"
        role={undefined}
        dense
        button
        selected={isCurrent}
        onClick={() =>
          checkable ? handleToggle(value[`${idField}`]) : handleClick()
        }
      >
        {checkable && (
          <Fade in={checkable} timeout={2000}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(value[`${idField}`]) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": `value-list-${value[`${idField}`]}`,
                }}
              />
            </ListItemIcon>
          </Fade>
        )}

        <ListItemText
          disableTypography
          primary={
            <>
              <TitleTypography
                variant="subtitle1"
                className={classes.inline}
                color="primary"
              >
                {first_name} {last_name}
              </TitleTypography>
            </>
          }
          secondary={secondaryInformation()}
        />
      </ListItem>

      {/* <Divider variant="inset" component="div" /> */}
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({
      checked: prev.checked,
      checkable: prev.checkable,
      value: prev.value,
      isCurrent: prev.isCurrent,
    }) ===
    JSON.stringify({
      checked: next.checked,
      checkable: next.checkable,
      value: next.value,
      isCurrent: next.isCurrent,
    })
  );
};

export default React.memo(Row, isEqual);

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: "36ch",
    backgroundColor: theme.palette.background.paper,
  },
  inline: {
    display: "inline",
  },
  status: {
    color: (props) => props.statusColor || "inherit",
    display: "inline",
  },
  localStatus: {
    color: (props) => props.localColor || "inherit",
    display: "inline",
  },
  total: {
    color: purple[500],
  },
}));

// const m = {
//   "id": "38918",
//   "date_created": "2020-06-28T14:10:11.000Z",
//   "total": 1,
//   "customer": {
//     "_id": "5ef9b42b0f48140eb4d044a8",
//     "email": "sosthenetheone@gmail.com",
//     "first_name": "MEDESSE",
//     "last_name": "Yvon",
//     "username": "ADMIN2",
//     itemsCount: "5",
//   },
// };
