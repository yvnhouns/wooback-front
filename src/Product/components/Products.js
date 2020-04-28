import React, { useEffect, useState, Suspense, useContext } from "react";
// import { getProductsApi } from "./container/api";
import context from "../../context/AdminContext";
import { removeUndefined } from "../../utils";
import ProductsList from "./List";
import SearchField from "../../components/SearchField";
import { LinkButton } from "../../components/LinkButton";
import SettingsIcon from "@material-ui/icons/Settings";
import LinearProgress from "@material-ui/core/LinearProgress";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Divider from "@material-ui/core/Divider";
import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import ColumnSelector from "./ColumnSelector";
import ColumnFilter from "./ColumnFilter";
import FieldSorter from "./FieldSorter";
import ConfigSetting from "./FilterSetting/Dialog";

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
    getFetcher,
    createProduct,
    wooUpdateProduct,
    // getProductsListSearchFilterUrl,
    getProductsListPartialSearchFilterUrl,
    getProductsCategoriesUrl,
    // importLists
  } = useContext(context).product;

  const [dataFilter, setDataFilter] = useState({
    searchInFields,
    fiterSetting: [...typeOfFilters],
    columnsFilter: { columns: initColumns, show: false, addNew: false },
    allFeatured: {},
  });
  const { columnsFilter, fiterSetting, allFeatured } = dataFilter;
  const { show, columns, addNew } = columnsFilter;

  let url = getProductsListPartialSearchFilterUrl({
    ...dataFilter,
    allFeatured,
    columnsFilter: undefined,
    fiterSetting: undefined,
  });

  let categoriesUrl = getProductsCategoriesUrl();
  const fetcher = getFetcher();

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
    const colSetId = fiterSetting.findIndex((item) => item.id === name);
    const filtered = colSetId > 0 ? fiterSetting[colSetId].filtered : undefined;
    let newValue = {};
    switch (name) {
      case "search":
        const val = data.target.value;
        newValue = { [name]: val === "" ? undefined : val };
        break;

      case "column":
        if (data) {
          const index = columns.findIndex((item) => item.id === data.id);
          if (index !== -1) {
            columns[index] = { ...data };
          }

          const newFiltered = { ...filtered, [`${data.id}`]: data.value };
          fiterSetting[colSetId] = {
            ...fiterSetting[colSetId],
            // active: !isEmpty(filtered),
            filtered: newFiltered,
          };

          newValue = {
            columnsFilter: { ...columnsFilter, columns, addNew: false },
            fiterSetting,
          };
        } else {
          newValue = { columnsFilter: { ...columnsFilter, addNew: false } };
        }
        break;

      case "addNew":
        newValue = { columnsFilter: { ...columnsFilter, addNew: true } };
        break;
      case "limit":
        newValue = { limit: data };
        break;

      case "sorter":
        const newFiltered = { ...filtered, ...data };
        fiterSetting[colSetId] = {
          ...fiterSetting[colSetId],
          filtered: newFiltered,
        };

        newValue = { fiterSetting };
        break;

      case "showFilter":
        const newShow = !show;

        newValue = {
          columnsFilter: { ...columnsFilter, show: newShow },
        };
        break;

      default:
        newValue = { ...data };
        break;
    }
    newValue = { ...dataFilter, ...newValue };
    let allFeatured = newValue.fiterSetting
      .filter((item) => item.active)
      .map((item) => item.filtered);

    let val = {};
    for (let i = 0; i < allFeatured.length; i++) {
      val = { ...val, ...allFeatured[i] };
    }

    setDataFilter({ ...newValue, allFeatured: val });
  };
  const handleSettingChange = (options) => {
    options && setDataFilter({ ...dataFilter, fiterSetting: options });
  };

  const filter = (
    <>
      <Box display="flex" width="100%" pl={2} pr={2}>
        <Box flexGrow={1} width="170px">
          <Grid spacing={1} container justify="flex-start" direction="row">
            {fiterSetting
              .filter((item) => item.active)
              .map((item, index) =>
                item.content({ index, addNew, handleFilter, columns })
              )}
          </Grid>
        </Box>
        <Box>
          <ConfigSetting
            submitSelected={handleSettingChange}
            actionButton={(handleClick) => (
              <SettingButton onClick={handleClick} />
            )}
            initOptions={fiterSetting}
          />
        </Box>
      </Box>

      <Divider style={{ margin: "6px 0px" }} />
    </>
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

const searchInFields = ["id", "name"];

const typeOfFilters = [
  {
    id: "sorter",
    label: "Ordonner la liste par une colonne",
    active: false,
    filtered: {},
    content: ({ index, handleFilter }) => (
      <Grid key={index} item>
        <FieldSorter updateValue={handleFilter("sorter")} />
      </Grid>
    ),
  },
  {
    id: "column",
    label: "Ajouter un filtre de colonne",
    active: false,
    filtered: {},
    content: ({ handleFilter, index, columns, addNew }) => (
      <div key={index} style={{ display: "inline-flex" }}>
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
      </div>
    ),
  },
  {
    id: "updated",
    label: "Visualiser les états de mise à jours",
    active: false,
    filtered: {},
    content: ({ index, props }) => <Grid key={index}> item </Grid>,
  },
  {
    id: "limit",
    label: "Définir une limite des résultats affichés",
    active: false,
    filtered: {},
    content: ({ index, handleFilter }) => (
      <Grid key={index}>
        <TextField
          onChange={(event) => {
            handleFilter("limit")(event.target.value);
          }}
          type="number"
          margin="dense"
          helperText="Limit des resultats"
          defaultValue={1000}
        />
      </Grid>
    ),
  },
];

const SettingButton = (props) => (
  <Button
    variant="outlined"
    color="primary"
    size="small"
    startIcon={<SettingsIcon />}
    {...props}
  >
    filtres
  </Button>
);
