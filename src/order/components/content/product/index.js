import React from "react";
import Box from "@material-ui/core/Box";
import VisibilityIcon from "@material-ui/icons/Visibility";
import VisibilityOffIcon from "@material-ui/icons/VisibilityOff";
import EditIcon from "@material-ui/icons/Edit";
import IconButtonMedia from "../../../../components/IconButtonMedia";
import ListSkeleton from "../../../../components/ListSkeleton";
import { ValueText } from "../../../../components/LabelValueTextFields";
import { TitleTypography } from "../../../../components/Typography";
import SuspensePaper from "../../../../components/SuspensePaper";
import { getStatusColor } from "../../../container/utils";
import {
  ACTION_UPDATE_LOCAL_STATUS,
  ACTION_VIEW_LOCAL_STATUS,
  ACTION_VIEW_PORDUCT_ORDERED,
} from "../../../container/accesses";
const ProductsOdered = React.lazy(() => import("./List"));

const OrderProducts = ({
  value,
  handleUpdateStatus = () => {},
  checkPermission,
  ...props
}) => {
  const [view, setView] = React.useState(false);
  const {
    total,
    // date_created,
    shipping_lines = [],
    itemsCount,
    line_items = [],
    localStatus,
  } = value;
  const { total: shippingTotal } = shipping_lines[0] || {};

  const labelView = () => (view ? "cacher" : "Visualiser");
  const allow_updateLocalStatus = checkPermission(ACTION_UPDATE_LOCAL_STATUS);
  const allow_viewLocalStatus = checkPermission(ACTION_VIEW_LOCAL_STATUS);
  const allow_viewProduct = checkPermission(ACTION_VIEW_PORDUCT_ORDERED);

  const color = getStatusColor(localStatus.id);
  return (
    <SuspensePaper>
      <Box display="flex" alignItems="center" width="100%">
        <Box flexGrow={1}>
          <TitleTypography style={{ display: "inline" }}>
            {" "}
            Produits{" "}
          </TitleTypography>
          {allow_viewLocalStatus && (
            <ValueText style={{ color, display: "inline" }}>
              {" "}
              {localStatus.label}{" "}
            </ValueText>
          )}{" "}
        </Box>
        {allow_updateLocalStatus && (
          <Box>
            <IconButtonMedia
              icon={<EditIcon color="primary" />}
              onClick={handleUpdateStatus}
              textButtonProps={{ label: "Modifier" }}
            />
          </Box>
        )}
      </Box>

      <Box display="flex" alignItems="center" width="100%">
        <Box flexGrow={1}>
          <ValueText>
            {itemsCount} produits commandé{pluriel(itemsCount)}
          </ValueText>
        </Box>
        {allow_viewProduct && (
          <Box>
            <IconButtonMedia
              icon={view ? <VisibilityOffIcon /> : <VisibilityIcon />}
              onClick={() => setView(!view)}
              textButtonProps={{ label: labelView() }}
            />
          </Box>
        )}
      </Box>
      {allow_viewProduct && view && (
        <React.Suspense fallback={<ListSkeleton count={6} />}>
          <ProductsOdered
            products={line_items}
            total={total}
            shippingTotal={shippingTotal}
            idFiedl="id"
          />
        </React.Suspense>
      )}
    </SuspensePaper>
  );
};

const pluriel = (count) => {
  return count > 1 ? "s" : "";
};

export default React.memo(OrderProducts);
