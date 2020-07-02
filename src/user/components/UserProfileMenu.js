import React from "react";
import MenuItem from "@material-ui/core/MenuItem";
import IconButton from "@material-ui/core/IconButton";
import AccountCircle from "@material-ui/icons/AccountCircle";
import { withStyles } from "@material-ui/core/styles";
import Menu from "@material-ui/core/Menu";
import Fade from "@material-ui/core/Fade";
import Badge from "@material-ui/core/Badge";
import Divider from "@material-ui/core/Divider";
import * as routeLink from "../../routerLinks";
import { Link as RouterLink } from "react-router-dom";

const UserMenu = ({ signout, adminRole, isAuthenticatedUser }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const { user } = isAuthenticatedUser;
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = async (event) => {
    signout(isAuthenticatedUser);
    handleClose(event);
  };

  return (
    <div>
      <IconButton
        // ref={anchorRef}
        aria-owns={Boolean(anchorEl) ? "customized-menu" : undefined}
        aria-controls="menu-list-grow"
        aria-haspopup="true"
        color="primary"
        onClick={handleClick}
        onMouseEnter={handleClick}
        // onMouseLeave={handleClose}
      >
        <AccountCircle /> Bonjour {user.nomAfficher}
      </IconButton>

      <StyledMenu
        id="customized-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onBlur={() => console.log("llll")}
      >
        <StyledMenuItem
          dense={true}
          onClick={() => handleClose()}
          component={RouterLink}
          to={routeLink.DASHBOARD_LINK}
        >
          Tableau de bord
        </StyledMenuItem>
        <StyledMenuItem
          dense={true}
          onClick={() => handleClose()}
          component={RouterLink}
          to={routeLink.COMPTE_LINK}
        >
          Détails du compte
        </StyledMenuItem>
        <StyledMenuItem
          onClick={() => handleClose()}
          component={RouterLink}
          to={routeLink.NOTIFICATIONS_LINK}
        >
          Notifications <CountBadge count={5} />{" "}
        </StyledMenuItem>

        <StyledMenuItem
          dense={true}
          onClick={() => handleClose()}
          component={RouterLink}
          to={routeLink.COUPONS_LINK}
        >
          Coupons
        </StyledMenuItem>

        <Divider light />

        <StyledMenuItem
          dense={true}
          onClick={() => handleClose()}
          component={RouterLink}
          // to={routeLink.PANIER_LINK}
          to="/shop"
        >
          Panier <CountBadge count={10} />
        </StyledMenuItem>
        <StyledMenuItem
          dense={true}
          onClick={() => handleClose()}
          component={RouterLink}
          to={routeLink.WHISLIST_LINK}
        >
          Liste de souhaits <CountBadge count={2} />
        </StyledMenuItem>
        <StyledMenuItem
          dense={true}
          onClick={() => handleClose()}
          component={RouterLink}
          to={routeLink.ORDERS_LINK}
        >
          Historique des commandes
        </StyledMenuItem>
        <Divider light />
        <StyledMenuItem
          dense={true}
          onClick={() => handleClose()}
          component={RouterLink}
          to={routeLink.PARTENAIRE_DASHBOARD_LINK}
        >
          Besoin d'aide
        </StyledMenuItem>
        <StyledMenuItem dense={true} onClick={logOut}>
          Se déconnecter
        </StyledMenuItem>
        <Divider />
        <StyledMenuItem
          dense={true}
          onClick={() => handleClose()}
          component={RouterLink}
          to={routeLink.PARTENAIRE_DASHBOARD_LINK}
        >
          Partenaire à LBU
        </StyledMenuItem>
        {adminRole && (
          <AdminMenuItem
            color="secondary"
            dense={true}
            onClick={() => handleClose()}
            component={RouterLink}
            to={routeLink.ADMIN_DASHBOARD_LINK}
          >
            Admin dashboard
          </AdminMenuItem>
        )}
      </StyledMenu>
    </div>
  );
};

const StyledMenu = withStyles({
  paper: {
    // border: '1px solid #d3d4d5',
  },
})((props) => (
  <Menu
    //elevation={1}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    TransitionComponent={Fade}
    {...props}
  />
));

const StyledMenuItem = withStyles((theme) => ({
  root: {
    padding: theme.spacing(1, 2),
    "&:hover": {
      color: "#007791",
    },
    "&:focus": {
      // backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);

const AdminMenuItem = withStyles((theme) => ({
  root: {
    //backgroundColor: theme.palette.primary,
    padding: theme.spacing(1, 2),
    "&:hover": {
      //  color: "#007791"
    },
    "&:focus": {
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        // color: theme.palette.common.white
      },
    },
  },
}))(MenuItem);

const CountBadge = ({ count }) => {
  return (
    <Badge
      badgeContent={count}
      style={{ marginLeft: "20px" }}
      color="secondary"
    />
  );
};

export default UserMenu;
