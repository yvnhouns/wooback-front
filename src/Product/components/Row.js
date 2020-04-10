import React from "react";

import { makeStyles } from "@material-ui/core/styles";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItem from "@material-ui/core/ListItem";
import ListItemSecondaryAction from "@material-ui/core/ListItemSecondaryAction";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";
// import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { TitleTypography } from "../../components/Typography";
import Fade from "@material-ui/core/Fade";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import FavoriteIcon from "@material-ui/icons/Favorite";
import Chip from "@material-ui/core/Chip";

const Row = ({
  id,
  handleToggle,
  handleClick,
  checked,
  checkable,
  post,
  isCurrent,
}) => {
  const product = post.content;
  const classes = useStyles({ status: product.status });
  const images = product.images;

  const labelStatus =
    ["draft", "pending"].indexOf(product.status) !== -1
      ? `~~${product.status}`
      : "";

  const imageUrl = images.length > 0 ? images[0].src : "";

  const price = product.price || 0;
  const regular_price = product.regular_price || 0;
  const salePrice = product.sale_price || 0;

  const catCount = product.categories.length;
  const priceToText = () => {
    let val = "";
    val = salePrice || regular_price || price || 0;

    val =
      regular_price > salePrice && salePrice > 0 ? (
        <>
          {" "}
          <strike> {regular_price}</strike> {salePrice}{" "}
        </>
      ) : (
        val
      );

    return val;
  };
  const pluriel = (count) => {
    return count > 0 ? "s" : "";
  };
  const secondaryInformation = () => {
    const tva = product.tva && product.tva !== 0 ? product.tva : undefined;
    const variantsCount =
      product.variants && product.variants.length > 0
        ? product.variants.length
        : undefined;

    const brands =
      product.brands && product.brands.length > 0
        ? product.brands.map((item) => item.name).toString() + ", "
        : "";
    const selections =
      product.selections && product.selections.length > 0
        ? product.selections.map((item) => item.name).toString() + ", "
        : "";
    const categories = product.categories.map((item, index) => (
      <Chip
        key={index}
        component="li"
        size="small"
        className={classes.path}
        label={item.name}
      />
    ));

    return (
      <>
        <Typography
          component="span"
          variant="body2"
          className={classes.inline}
          color="textPrimary"
        >
          CFA {priceToText()}
        </Typography>
        {tva && ` TVA : ${tva}`}
        <Typography
          component="span"
          variant="body2"
          style={{ display: "block" }}
          color="inherit"
        >
          {product.ugs && ` ISBN : ${product.sku} , `}
          {variantsCount && `${variantsCount} variant${pluriel(variantsCount)}`}
          {brands}
          {selections}
          {catCount > 0 && <> catégories : {categories} </>}
        </Typography>
      </>
    );
  };
  return (
    <>
      <ListItem
        ContainerComponent="div"
        // component="div"
        role={undefined}
        dense
        button
        selected={isCurrent}
        onClick={checkable ? handleToggle(id) : () => handleClick()}
      >
        {checkable && (
          <Fade in={checkable} timeout={2000}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={checked.indexOf(id) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ "aria-labelledby": `product-list-${id}` }}
              />
            </ListItemIcon>
          </Fade>
        )}
        <ListItemAvatar>
          <Avatar variant="rounded" alt={product.name} src={imageUrl} />
        </ListItemAvatar>
        <ListItemText
          primary={
            <>
              <TitleTypography
                component="span"
                variant="subtitle2"
                className={classes.inline}
                color="primary"
              >
                {product.id} {product.name}{" "}
                <i className={classes.status}> {labelStatus} </i>
              </TitleTypography>
              {product.featured && (
                <FavoriteIcon fontSize="small" color="secondary" />
              )}
            </>
          }
          secondary={secondaryInformation()}
        />
        <ListItemSecondaryAction>
          <Typography>{product.stock_quantity}</Typography>
        </ListItemSecondaryAction>
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
      product: prev.post,
      isCurrent: prev.isCurrent,
    }) ===
    JSON.stringify({
      checked: next.checked,
      checkable: next.checkable,
      product: next.post,
      isCurrent: next.isCurrent,
    })
  );
};

export default React.memo(Row, isEqual);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    width: "100%",
  },
  status: {
    color: "chocolate",
  },
  path: {
    maxWidth: "fit-content",
    marginRight: "5px",
    fontSize: "12px",
    background: `${theme.palette.background.default}`,
    color: `${theme.palette.text.default}`,
    height: "20px",
  },
}));
