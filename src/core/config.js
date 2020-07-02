import React from "react";
import ListAltIcon from "@material-ui/icons/ListAlt";

import ProductDashBoard from "../Product";
import * as productAccess from "../Product/container/accesses";

import Importer from "../Importer";
import * as importerAccess from "../Importer/container/accesses";

import CategoriesTree from "../Categories/components/TreeView";
import * as categoriesAccess from "../Categories/containers/accesses";

import Manager from "../manager";

import Action from "../manager/Action";
import DesktopAccessDisabledIcon from "@material-ui/icons/DesktopAccessDisabled";

import Privilege from "../manager/Privilege";
import VerifiedUserIcon from "@material-ui/icons/VerifiedUser";

import Compte from "../user";

// import Order from "./Orders";
import * as routeLink from "../routerLinks";
import DashboardIcon from "@material-ui/icons/Dashboard";
import Intro from "./Intro";
import DnsIcon from "@material-ui/icons/Dns";

import FaceIcon from "@material-ui/icons/Face";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import AssignmentIndIcon from "@material-ui/icons/AssignmentInd";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";

import OrderDashboard from "../order";
import * as orderAccess from "../order/container/accesses";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";

export const generalItems = [
  {
    id: "dashboard",
    path: routeLink.ADMIN_DASHBOARD_LINK,
    itemIcon: <DashboardIcon />,
    action: <></>,
    content: (props) => <Intro {...props} />,
    title: "ADMIN DASHBOARD",
    isAllowed: () => true,
  },
  {
    id: "produits",
    title: "Produits",
    path: routeLink.ADMIN_PRODUCTS_LINK,
    itemIcon: <DnsIcon />,
    content: (props) => <ProductDashBoard {...props} />,
    action: <></>,
    access: productAccess.PRODUCTS,
    isAllowed: (user) => checkPermission(user, productAccess.PRODUCTS),
  },
  {
    id: "order",
    title: "Commande",
    path: routeLink.ADMIN_ORDER_LINK,
    itemIcon: <BookmarkBorderIcon />,
    content: (props) => <OrderDashboard {...props} />,
    action: <></>,
    access: orderAccess.ORDER_MENU,
    isAllowed: (user) => checkPermission(user, orderAccess.ORDER_MENU),
  },
  {
    id: "categories",
    title: "Catégories",
    path: routeLink.ADMIN_PRODUCTS_CATEGORIES_LINK,
    itemIcon: <ListAltIcon />,
    content: (props) => <CategoriesTree {...props} />, //<Order {...props} />,
    access: "categories",
    isAllowed: (user) => checkPermission(user, categoriesAccess.CATEGORIES),
  },
  {
    id: "importer",
    title: "Synchronisation",
    path: routeLink.ADMIN_IMPORT_LINK,
    itemIcon: <CloudDownloadIcon />,
    content: (props) => <Importer {...props} />,
    action: <></>,
    access: "importer",
    isAllowed: (user) => checkPermission(user, importerAccess.IMPORTER),
  },
  {
    id: "compte",
    title: "Mon compte",
    path: routeLink.ADMIN_COMPTE_LINK,
    itemIcon: <FaceIcon />,
    content: (props) => <Compte {...props} />,
    isAllowed: () => true,
  },
  {
    id: "manager",
    title: "Gestion des utilisateurs",
    path: routeLink.ADMIN_MANAGE_USER_LINK,
    itemIcon: <AssignmentIndIcon />,
    content: (props) => <Manager {...props} />,
    action: <></>,
    isAllowed: (user) => isSupUser(user),
    child: [
      {
        id: "manager-sub",
        title: "Utilisateurs",
        path: routeLink.ADMIN_MANAGE_USER_LINK,
        itemIcon: <PeopleAltIcon />,
        content: (props) => <Manager {...props} />,
        action: <></>,
        isAllowed: (user) => isSupUser(user),
      },
      {
        id: "manager-actions",
        title: "Actions",
        itemIcon: <DesktopAccessDisabledIcon />,
        content: (props) => <Action {...props} />,
        path: routeLink.ADMIN_MANAGE_ACTION_LINK,
        isAllowed: (user) => isSupUser(user),
      },
      {
        id: "privilege",
        title: "Privilèges",
        itemIcon: <VerifiedUserIcon />,
        content: (props) => <Privilege {...props} />,
        path: routeLink.ADMIN_MANAGE_PRIVILEGE_LINK,
        isAllowed: (user) => isSupUser(user),
      },
    ],
  },
];

const checkPermission = (user, access) => {
  let allow = false;

  if (user) {
    if (user.supUser) return true;

    const { accesses } = user;
    allow = access ? (accesses ? accesses[`${access}`] : undefined) : false;
  }
  return allow;
};

const isSupUser = (user) => {
  let allow = false;
  if (user) {
    allow = user.supUser;
  }
  return allow;
};
