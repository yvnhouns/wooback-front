import React from "react";
import IconButton from "@material-ui/core/IconButton";
import { withStyles } from "@material-ui/core/styles";
import MuiButton from "@material-ui/core/Button";
import { useTheme } from "@material-ui/core/styles";
import useMediaQuery from "@material-ui/core/useMediaQuery";

const IconButtonMedia = ({
  icon,
  size = "small",
  textButtonProps = {},
  ...props
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const { label, end } = textButtonProps;
  const iconposition = icon
    ? end
      ? {
          endIcon: icon,
        }
      : {
          startIcon: icon,
        }
    : {};

  return isMobile ? (
    <IconButton
      size={size}
      style={{ padding: size === "small" ? "4px" : "8px" }}
      {...props}
    >
      {icon}
    </IconButton>
  ) : (
    <ButtonWithIcon variant="text" {...iconposition} {...props}>
      {label}
    </ButtonWithIcon>
  );
};

export default IconButtonMedia;

const ButtonWithIcon = withStyles((theme) => ({
  root: {
    margin: theme.spacing(1),
    textTransform: "unset",
    //  color: theme.palette.grey["A400"],
    lineHeight: "1",
  },
}))(({ ...props }) => (
  <MuiButton size="small" variant="outlined" color="inherit" {...props} />
));
