import React, { useEffect, lazy, useState } from "react";
import Product from "./Product";
import { List, AutoSizer } from "react-virtualized";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { ButtonSimple } from "../../components/assets";
import Suspenser from "../../components/Suspenser";

const Row = lazy(() => import("./Row"));
const ProductsList = ({
  products,
  submitProduct,
  addNextComponent,
  setCurrentViewerTitleAndAction,
  previous,
  ...restProps
}) => {
  const classes = useStyles();
  const [checkData, setCheckData] = useState({
    checked: [],
    checkable: false
  });

  const [current, setCurrent] = useState("");
  const listRef = React.createRef();

  const { checked, checkable } = checkData;

  const handleCheckable = () => {
    setCheckData({ ...checkData, checkable: !checkable });
  };

  useEffect(() => {
    setCurrentViewerTitleAndAction(
      "Liste des produits",
      <ButtonSimple variant="text" onClick={handleCheckable}>
        <strong> {!checkable ? "Sélectioner" : "Annuler"} </strong>
      </ButtonSimple>
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkable]);

  function rowRenderer({
    key, // Unique key within array of rows
    index, // Index of row within collection
    isScrolling, // The List is currently being scrolled
    isVisible, // This row is visible within the List (eg it is not an overscanned row)
    style, // Style object to be applied to row (to position it)
    parent
  }) {
    const content = (
      //  isScrolling ? (
      //   <Skeleton
      //     className={classes.suspense}
      //     variant="rect"
      //     width="100%"
      //     height={60}
      //     animation="wave"
      //   />
      // ) : (
      <Suspenser height={80} doubleFeadBack={false}>
        <Row
          id={products[index]._id}
          handleToggle={handleToggle}
          checked={checked}
          checkable={checkable}
          product={products[index]}
          handleClick={() => handleClick(products[index].slug)}
          isCurrent={current === products[index].slug}
        />
      </Suspenser>
    );
    // );

    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  }

  const handleToggle = value => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckData({ ...checkData, checked: newChecked });
  };

  const handleClick = slug => {
    setCurrent(slug);
    addNextComponent(ownState => (
      <Product
        {...ownState}
        id={slug}
        submitProduct={submitProduct}
        newProduct={slug === undefined}
        nextStep={() => {
          previous();
        }}
      />
    ));
  };

  return (
    <>
      <div className={classes.list}>
        {/* <CssBaseline /> */}
        <AutoSizer ref={listRef}>
          {({ width, height }) => {
            return (
              <>
                <List
                  ref={listRef}
                  width={width}
                  height={height}
                  rowCount={products.length}
                  rowHeight={80}
                  rowRenderer={rowRenderer}
                />
              </>
            );
          }}
        </AutoSizer>
      </div>
      <div name="vous" className={classes.appBar}>
        <Fab
          size="medium"
          color="primary"
          aria-label="add"
          className={classes.fabButton}
          onClick={e => handleClick()}
        >
          <AddIcon />
        </Fab>
        <div className={classes.grow} />
      </div>
    </>
  );
};

export default ProductsList;

const useStyles = makeStyles(theme => ({
  list: {
    flexGrow: 1,
    width: "100%",
    minHeight: "400px"
  },
  appBar: {
    top: "auto",
    bottom: 0,
    position: "sticky"
  },
  grow: {
    flexGrow: 1
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    left: 0,
    right: 0,
    margin: "0 auto"
  },
  suspense: {}
}));
