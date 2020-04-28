import * as routeLink from "./../routerLinks";
import React from "react";
import Badge from "@material-ui/core/Badge";

import Divider from "@material-ui/core/Divider";


const CountBadge = ({ count }) => {
    return (
      <Badge
        badgeContent={count}
        style={{ marginLeft: "20px" }}
        color="secondary"
      />
    );
  };
  
export const profile_menu = [
  {
    link: routeLink.DASHBOARD_LINK,
    title: "Tableau de bord"
  },
  {
    link: routeLink.COMPTE_LINK,
    title: "Détails du compte"
  },
  {
    link: routeLink.NOTIFICATIONS_LINK,
    title: "Notifications",
    badge: <CountBadge count={5} />
  },
  {
    link: routeLink.COUPONS_LINK,
    title: "Coupons"
  },
  {
    type: "component",
    content: <Divider light />
  },
  {
    link: routeLink.PANIER_LINK,
    title: "Panier",
    badge: <CountBadge count={2} />
  },
  {
    link: routeLink.WHISLIST_LINK,
    title: "Liste de souhaits",
    badge: <CountBadge count={10} />
  },
  {
    link: routeLink.ORDERS_LINK,
    title: "Historique des commandes"
  },
  {
    type: "component",
    content: <Divider light />
  },
  {
    link: routeLink.HELP_LINK,
    title: "Besoin d'aide"
  },
  {
    type: "logOut"
  }
];

