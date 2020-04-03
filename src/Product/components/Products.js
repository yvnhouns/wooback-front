import React, { useEffect, useState, Suspense, useContext } from "react";
// import { getProductsApi } from "./container/api";
import context from "../../context/AdminContext";
import { removeUndefined } from "../../utils";
import Paper from "@material-ui/core/Paper";
import ProductsList from "./List";
import SearchField from "../../components/SearchField";
import data from "../../data";
import LinearProgress from "@material-ui/core/LinearProgress";

const Dashboard = ({
  setCurrentViewTitle,
  setCurrentViewAction,
  addNextComponent,
  importComponentNativeState,
  setCurrentViewerTitleAndAction,
  alertState: { setError, setSuccess },
  previous
}) => {
  const {
    getFecther,
    createProduct,
    wooUpdateProduct,
    // getProductsListSearchFilterUrl,
    getProductsListPartialSearchFilterUrl,
    importLists
  } = useContext(context).product;

  const searchInFields = [
    "id",
    "content.name",
    "content.sku",
    "content.id",
    "content.ugs"
  ];

  const [dataFilter, setDataFilter] = useState({ searchInFields });
  let url = getProductsListPartialSearchFilterUrl(dataFilter);
  const fecther = getFecther();

  // useEffect(() => {trigger()}, [dataFilter]);

  const handleFilter = name => event => {
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
        setSuccess("Le produit à été bien ajouté");
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
    submitProduct
  };

  const inputState = {
    addNextComponent,
    setCurrentViewerTitleAndAction
  };

  const uploadProduct = async () => {
    const dataTreat = await treatData(data);
    let list = await removeUndefined(dataTreat);
    importLists(
      list,
      ({ error, success, data, duplicatedIds, duplicatedNames }) => {
        error && setError(error);
        if (success) {
          setSuccess("Le produit à été bien ajouté");
          setDataFilter({});
          //next(data);
        }
      }
    );
  };

  return (
    <Paper>
      <SearchField
        style={{ width: "100%", margin: "8px 0px" }}
        inputFieldProps={{ onChange: handleFilter("search") }}
        handleUpload={uploadProduct}
      />

      <Suspense fallback={<LinearProgress />}>
        <ProductsList
          url={url}
          submitProduct={submitProduct}
          {...nativeState}
          {...inputState}
          categories={categories}
          previous={previous}
          fecther={fecther}
        />
      </Suspense>
    </Paper>
  );
};
const isEqual = (prev, next) => {
  return JSON.stringify(prev.products) === JSON.stringify(next.products);
};

export default React.memo(Dashboard, isEqual);

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

const treatData = async values => {
  const products = await data.map(item => {
    const res = {};

    for (const key in patch) {
      res[key] = treatField(key, item);
    }
    return {
      content: {
        ...res,
        categories: res.categories
          ? res.categories.split(", ").map(s => ({ name: s }))
          : [],
        images: res.images ? res.images.split(", ").map(s => ({ src: s })) : []
      }
    };
  });
  return products;
};

const treatField = (key, item) => {
  const val = item[patch[key]];

  return ["regular_price", "price", "sale_price"].indexOf(key) !== -1
    ? val
      ? typeof val === "string"
        ? val.replace(",", ".").replace(/\s/g, "") * 1
        : val
      : undefined
    : val;
};

const patch = {
  sku: "",
  id: "ID",
  ugs: "UGS",
  name: "Nom",
  featured: "Mis en avant ?",
  short_description: "Description courte",
  description: "Description",
  manage_stock: "En stock ?",
  stock_quantity: "Stock",
  regular_price: "Tarif régulier",
  price: "prix",
  categories: "Catégories",
  images: "Images",
  type: "type",
  sale_price: "Tarif promo"
};
