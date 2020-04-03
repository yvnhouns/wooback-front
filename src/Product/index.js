import React from "react";
// import { getProductsApi } from "./container/api";
import Paper from "@material-ui/core/Paper";
import Products from "./components/Products";

const Dashboard = ({
  setCurrentViewTitle,
  setCurrentViewAction,
  addNextComponent,
  importComponentNativeState,
  setCurrentViewerTitleAndAction,
  alertState,
  previous
}) => {
  return (
    <Paper>
      <Products
        setCurrentViewTitle={setCurrentViewTitle}
        setCurrentViewAction={setCurrentViewAction}
        addNextComponent={addNextComponent}
        importComponentNativeState={importComponentNativeState}
        setCurrentViewerTitleAndAction={setCurrentViewerTitleAndAction}
        alertState={alertState}
        previous={previous}
        
      />
    </Paper>
  );
};

export default Dashboard;

// id
// ugs
// name
// featured
// short_description
// description
// manage_stock
// stock_quantity
// regular_price
// categories
// images
// status :{draft, pending,}
// type :[simple, grouped, external, variable]
// sku
// price
//on_sale
//stock_status
//backorders
//sale_price

// sku,
// ugs,
// name,
// featured,
// short_description,
// description,
// manage_stock,
// stock_quantity,
// regular_price,
// categories,
// images,
// type,
// sale_price
