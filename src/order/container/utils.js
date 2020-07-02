import React from "react";
import purple from "@material-ui/core/colors/purple";
import blueGrey from "@material-ui/core/colors/blueGrey";
import orange from "@material-ui/core/colors/orange";
import blue from "@material-ui/core/colors/blue";
import deepOrange from "@material-ui/core/colors/deepOrange";
import lime from "@material-ui/core/colors/lime";
import green from "@material-ui/core/colors/green";

const wooStatusTranslate = [
  { id: "pending", label: "En attente de paiement", color: lime[700] },
  { id: "processing", label: "En cours", color: orange[700] },
  { id: "on-hold", label: "En attente", color: blueGrey[600] },
  { id: "completed", label: "Terminée", color: blue[900] },
  { id: "cancelled", label: "Annulé", color: deepOrange[500] },
  { id: "refunded", label: "Remboursé", color: purple[600] },
  { id: "failed", label: "Echouée", color: blueGrey[300] },
];

const localStatus = [
  {
    id: "pending",
    label: "En attente de préparation",
    rank: 0,
    color: "inherit",
  },
  {
    id: "preparation",
    color: purple[500],
    label: "En cours de préparation",
    rank: 1,
  },
  {
    id: "prepare",
    label: "Préparée",
    rank: 2,
    color: orange[500],
  },
  { id: "dispatch", label: "Expédiée", rank: 3, color: green[500] },
];

export const getWooStatusTranslate = (id) => {
  const m = wooStatusTranslate.find((item) => item.id === id);
  return m || {};
};

export const getStatusColor = (id) => {
  const m = localStatus.find((item) => item.id === id);
  return m ? m.color : "inherit";
};

export { wooStatusTranslate, localStatus };
