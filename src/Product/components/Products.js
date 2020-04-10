import React, { useEffect, useState, Suspense, useContext } from "react";
// import { getProductsApi } from "./container/api";
import context from "../../context/AdminContext";
import { removeUndefined } from "../../utils";
import ProductsList from "./List";
import SearchField from "../../components/SearchField";
// import data from "../../data";
import LinearProgress from "@material-ui/core/LinearProgress";

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

  const searchInFields = [
    "id",
    "content.name",
    "content.sku",
    "content.id",
    "content.ugs",
  ];

  const [dataFilter, setDataFilter] = useState({ searchInFields });
  let url = getProductsListPartialSearchFilterUrl({
    ...dataFilter,
    limit: 3000,
  });

  let categoriesUrl = getProductsCategoriesUrl();

  const fetcher = getFecther();

  // useEffect(() => {trigger()}, [dataFilter]);

  const handleFilter = (name) => (event) => {
    setDataFilter({ ...dataFilter, [name]: event.target.value });
  };

  const categories = [];

  useEffect(() => {
    importComponentNativeState({ ...nativeState });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

  return (
    <>
      <SearchField
        style={{ width: "100%", margin: "8px 0px" }}
        inputFieldProps={{ onChange: handleFilter("search") }}
      />

      <Suspense fallback={<LinearProgress />}>
        <ProductsList
          url={url}
          categoriesUrl={categoriesUrl}
          submitProduct={submitProduct}
          {...nativeState}
          {...inputState}
          categories={categories}
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
