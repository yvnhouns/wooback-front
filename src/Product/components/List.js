import React, { useEffect, lazy, useState, Suspense } from "react";
import useSWR, { mutate } from "swr";
import { TitleTypography } from "../../components/assets";
import { List, AutoSizer } from "react-virtualized";
import { makeStyles } from "@material-ui/core/styles";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";
import { ButtonSimple } from "../../components/assets";
import Suspenser from "../../components/Suspenser";
import { LIST_URL as categoriesUrl } from "../../Categories/containers/constants";
import LinearProgress from "@material-ui/core/LinearProgress";

const Row = lazy(() => import("./Row"));
const Product = lazy(() => import("./Product"));
const ProductsList = ({
  submitProduct,
  addNextComponent,
  setCurrentViewerTitleAndAction,
  previous,
  url,
  fecther,
  ...restProps
}) => {
  const classes = useStyles();
  const [current, setCurrent] = useState("");
  const listRef = React.createRef();

  const [checkData, setCheckData] = useState({
    checked: [],
    checkable: false,
  });
  const { checked, checkable } = checkData;

  const { data } = useSWR(url, fecther, {
    refreshInterval: 4000,
  });
  const { results: posts, count } = data;

  const { data: catData } = useSWR(categoriesUrl, fecther, {
    initialData: { categories: [] },
  });

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
    parent,
  }) {
    const content = (
      <Suspenser height={80} doubleFeadBack={false}>
        <Row
          handleToggle={handleToggle}
          checked={checked}
          checkable={checkable}
          post={posts[index]}
          handleClick={() => handleClick(posts[index])}
          isCurrent={current === posts[index].id}
        />
      </Suspenser>
    );

    return (
      <div key={key} style={style}>
        {content}
      </div>
    );
  }

  const handleToggle = (value) => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    if (currentIndex === -1) {
      newChecked.push(value);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setCheckData({ ...checkData, checked: newChecked });
  };

  const handleClickNextStep = ({ data, operation }) => {
    previous();
    if (operation === "create") {
      posts.push(data);
      mutate(url, { ...data, results: posts });
    }

    if (operation === "update") {
      const index = posts.findIndex((v) => v._id === data._id);
      if (index !== -1) {
        posts[index] = data;
        // mutate(url, { ...data, results: posts });
      }
    }
  };

  const handleClick = (item) => {
    item && setCurrent(item.id);
    addNextComponent((ownState) => (
      <Suspense fallback={<LinearProgress />}>
        <Product
          {...ownState}
          id={item ? item._id : undefined}
          submitProduct={submitProduct}
          newProduct={item === undefined}
          fecther={fecther}
          initialPost={item}
          categories={catData}
          nextStep={handleClickNextStep}
        />
      </Suspense>
    ));
  };

  return (
    <>
      <div className={classes.list}>
        {/* <CssBaseline /> */}
        {count > 0 ? (
          <>
            <AutoSizer ref={listRef}>
              {({ width, height }) => {
                return (
                  <>
                    <List
                      ref={listRef}
                      width={width}
                      height={height}
                      rowCount={posts.length}
                      rowHeight={80}
                      rowRenderer={rowRenderer}
                    />
                  </>
                );
              }}
            </AutoSizer>
          </>
        ) : (
          <TitleTypography style={{ padding: "5px 15px" }}>
            Auccun produit trouvé{" "}
          </TitleTypography>
        )}
      </div>
      <div name="vous" className={classes.appBar}>
        <Fab
          size="medium"
          color="primary"
          aria-label="add"
          className={classes.fabButton}
          //  onClick={(e) => handleClick()}
        >
          <AddIcon />
        </Fab>
        <div className={classes.grow} />
      </div>
      <TitleTypography color="secondary" style={{ paddingLeft: "20px" }}>
        {count} produit{pluriel(count)} trouvé{pluriel(count)}{" "}
      </TitleTypography>
    </>
  );
};

const isEqual = (prev, next) => {
  return (
    JSON.stringify({ url: prev !== null ? prev.url : "" }) ===
    JSON.stringify({ url: next.url })
  );
};

export default React.memo(ProductsList, isEqual);

const useStyles = makeStyles((theme) => ({
  list: {
    flexGrow: 1,
    width: "100%",
    minHeight: "430px",
  },
  appBar: {
    top: "auto",
    bottom: 0,
    position: "sticky",
  },
  grow: {
    flexGrow: 1,
  },
  fabButton: {
    position: "absolute",
    zIndex: 1,
    bottom: 10,
    left: 0,
    right: 0,
    margin: "0 auto",
  },
  suspense: {},
}));

const pluriel = (count) => {
  return count > 1 ? "s" : "";
};
