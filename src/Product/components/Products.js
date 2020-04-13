import React, { useEffect, useState, Suspense, useContext } from "react";
// import { getProductsApi } from "./container/api";
import context from "../../context/AdminContext";
import { removeUndefined } from "../../utils";
import ProductsList from "./List";
import SearchField from "../../components/SearchField";
import { LinkButton } from "../../components/LinkButton";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import ColumnSelector from "./ColumnSelector";
import ColumnFilter from "./ColumnFilter";

import FieldSorter from "./FieldSorter";

const Dashboard = ({
  setCurrentViewTitle,
  setCurrentViewAction,
  addNextComponent,
  importComponentNativeState,
  setCurrentViewerTitleAndAction,
  alertState: { setError, setSuccess },
  previous,
}) => {
  const {
    getFecther,
    createProduct,
    wooUpdateProduct,
    // getProductsListSearchFilterUrl,
    getProductsListPartialSearchFilterUrl,
    getProductsCategoriesUrl,
    // importLists
  } = useContext(context).product;

  const [dataFilter, setDataFilter] = useState({
    searchInFields,
    filtered: {},
    columnsFilter: { columns: initColumns, show: false, addNew: false },
  });
  const { columnsFilter, filtered } = dataFilter;
  const { show, columns, addNew } = columnsFilter;

  let url = getProductsListPartialSearchFilterUrl({
    ...dataFilter,
    filtered,
    columnsFilter: undefined,
    limit: 3000,
  });

  let categoriesUrl = getProductsCategoriesUrl();
  const fetcher = getFecther();

  // useEffect(() => {trigger()}, [dataFilter]);

  /** Manage Product */
  const add = (values, next) => {
    createProduct(removeUndefined(values), ({ error, success, data }) => {
      error && setError(error);
      if (success) {
        setSuccess("Le produit à été bien ajouté");
        next(data);
      }
    });
  };

  const update = (updatedValue, next) => {
    const { value, _id } = updatedValue;
    wooUpdateProduct(_id, value, ({ error, success, data }) => {
      error && setError(error);
      if (success) {
        setSuccess("Le produit à été bien modifié");
        next({ _id, content: data });
      }
    });
  };

  const submitProduct = (operation, values, next) => {
    operation === "create" && add(values, next);
    operation === "update" && update(values, next);
  };

  const nativeState = {
    comp: "product",
    submitProduct,
  };

  const inputState = {
    addNextComponent,
    setCurrentViewerTitleAndAction,
  };

  useEffect(() => {
    importComponentNativeState({ ...nativeState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleFilter = (name) => (data) => {
    switch (name) {
      case "search":
        setDataFilter({ ...dataFilter, [name]: data.target.value });
        break;

      case "column":
        if (data) {
          const index = columns.findIndex((item) => item.id === data.id);
          if (index !== -1) {
            columns[index] = { ...data };
          }

          setDataFilter({
            ...dataFilter,
            columnsFilter: { ...columnsFilter, columns, addNew: false },
            filtered: { ...filtered, [`${data.id}`]: data.value },
          });
        } else {
          setDataFilter({
            ...dataFilter,
            columnsFilter: { ...columnsFilter, addNew: false },
          });
        }
        break;

      case "addNew":
        setDataFilter({
          ...dataFilter,
          columnsFilter: { ...columnsFilter, addNew: true },
        });
        break;

      case "sorter":
        setDataFilter({
          ...dataFilter,
          filtered: { ...filtered, ...data },
        });
        break;

      case "showFilter":
        const newShow = !show;
        setDataFilter({
          ...dataFilter,
          columnsFilter: {
            ...columnsFilter,
            show: newShow,
            filtered: !newShow ? {} : filtered,
          },
        });
        break;

      default:
        setDataFilter({ ...dataFilter, ...data });
        break;
    }
  };

  const filter = (
    <Grid spacing={1} container justify="flex-start" direction="row">
      <Grid item>
        <FieldSorter updateValue={handleFilter("sorter")} />
      </Grid>

      {columns
        .filter((item) => item.showed)
        .map((column, index) => (
          <Grid key={index} item>
            <ColumnFilter
              column={column}
              updateValue={handleFilter("column")}
            />
          </Grid>
        ))}

      {addNew ? (
        <Grid item>
          <ColumnSelector
            columns={columns.filter((item) => !item.showed)}
            handleValidate={handleFilter("column")}
          />
        </Grid>
      ) : (
        <Grid style={{ margin: "auto 12px" }} item>
          <LinkButton onClick={handleFilter("addNew")}>
            Ajouter un filtre de colonne
          </LinkButton>
        </Grid>
      )}
    </Grid>
  );

  return (
    <>
      <SearchField
        style={{ width: "100%", margin: "8px 0px" }}
        inputFieldProps={{ onChange: handleFilter("search") }}
        handleShowFilter={handleFilter("showFilter")}
      />

      {show && filter}

      <Suspense fallback={<LinearProgress />}>
        <ProductsList
          url={url}
          categoriesUrl={categoriesUrl}
          submitProduct={submitProduct}
          {...nativeState}
          {...inputState}
          previous={previous}
          fetcher={fetcher}
        />
      </Suspense>
    </>
  );
};
const isEqual = (prev, next) => {
  return JSON.stringify(prev.products) === JSON.stringify(next.products);
};

export default React.memo(Dashboard, isEqual);

// const patch = {
//   sku: "",
//   id: "ID",
//   ugs: "UGS",
//   name: "Nom",
//   featured: "Mis en avant ?",
//   short_description: "Description courte",
//   description: "Description",
//   manage_stock: "En stock ?",
//   stock_quantity: "Stock",
//   regular_price: "Tarif régulier",
//   price: "prix",
//   categories: "Catégories",
//   images: "Images",
//   type: "type",
//   sale_price: "Tarif promo"
// };

const initColumns = [
  {
    id: "content.status",
    label: "Status",
    values: ["publish", "draft", "pending", "private"],
  },
  {
    id: "content.type",
    label: "type de produit",
    values: ["simple", "grouped", "external", "variable"],
  },
  {
    id: "content.stock_status",
    label: "stock",
    values: ["instock", "outofstock", "onbackorder"],
  },
  { id: "category", label: "Catégorie", values: [] },
];

const searchInFields = [
  "id",
  "content.name",
  "content.sku",
  "content.id",
  "content.ugs",
];
