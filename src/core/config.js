import React from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";
// import Categories from "./Categories/Categories";
import ProductDashBoard from "../Product";
// import Order from "./Orders";
import * as routeLink from "../routerLinks";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Intro from "./Intro";
import DnsIcon from "@material-ui/icons/Dns";

export const generalItems = [
  {
    id: 1,
    path: routeLink.ADMIN_DASHBOARD_LINK,
    itemIcon: <DashboardIcon />,
    action: <></>,
    content: props => <Intro {...props} />,
    title: "ADMIN DASHBOARD"
  },
  {
    id: 2,
    title: "Produits",
    path: routeLink.ADMIN_PRODUCTS_LINK,
    itemIcon: <DnsIcon />,
    content: props => <ProductDashBoard {...props} />,
    action: <></>
    // child: [
    //   {
    //     id: 3,
    //     title: "Liste des produits",
    //     path: routeLink.ADMIN_PRODUCTS_LINK,
    //     itemIcon: <DashboardIcon />
    //   },
    //   {
    //     id: 4,
    //     title: "Nouveau produit",
    //     path: routeLink.ADMIN_PRODUCTS_LINK,
    //     itemIcon: <DashboardIcon />
    //   },
    //   {
    //     id: 5,
    //     title: "Catégories",
    //     path: routeLink.ADMIN_PRODUCTS_LINK,
    //     itemIcon: <DashboardIcon />,
    //     content: props => <div> Categories </div> //<Categories {...props} />
    //   },
    //   {
    //     id: 6,
    //     title: "Sélections",
    //     path: routeLink.ADMIN_PRODUCTS_LINK,
    //     itemIcon: <DashboardIcon />
    //   },
    //   {
    //     id: 7,
    //     title: "Alertes de stocks",
    //     path: routeLink.ADMIN_PRODUCTS_LINK,
    //     itemIcon: <DashboardIcon />
    //   }
    // ]
  },
  {
    id: 8,
    title: "Commandes",
    path: routeLink.ADMIN_ORDERS_LINK,
    itemIcon: <ListAltIcon />,
    content: props => <div>Order</div> //<Order {...props} />,

    // child: [
    //   {
    //     id: 9,
    //     title: "Commandes en cours",
    //     itemIcon: <DashboardIcon />,
    //     content: props => <div>Order</div>, //<Order {...props} />,
    //     path: routeLink.ADMIN_ORDERS_LINK
    //   },
    //   {
    //     id: 10,
    //     title: "Commande validé",
    //     path: "/",
    //     itemIcon: <DashboardIcon />
    //   }
    // ]
  }
];
