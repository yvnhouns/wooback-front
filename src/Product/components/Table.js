import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";
import { Toolbar, Data, Filters } from "react-data-grid-addons";
import createRowData from "./createRowData";

const defaultColumnProperties = {
  filterable: true,
  width: 160,
  sortable: true
};

const selectors = Data.Selectors;
const {
  NumericFilter,
  AutoCompleteFilter,
  MultiSelectFilter,
  SingleSelectFilter
} = Filters;
const columns = [
  {
    key: "id",
    name: "ID",
    filterRenderer: NumericFilter
    // sortDescendingFirst: true
  },
  {
    key: "firstName",
    name: "First Name"
  },
  {
    key: "lastName",
    name: "Last Name",
    filterRenderer: AutoCompleteFilter
  },
  {
    key: "jobTitle",
    name: "Job Title",
    filterRenderer: MultiSelectFilter
  },
  {
    key: "jobArea",
    name: "Job Area",
    filterRenderer: SingleSelectFilter
  },
  {
    key: "jobType",
    name: "Job Type"
  },
  {
    key: "email",
    name: "Email"
  },
  {
    key: "street",
    name: "Street"
  },
  {
    key: "zipCode",
    name: "ZipCode"
  },
  {
    key: "date",
    name: "Date"
  },
  {
    key: "catchPhrase",
    name: "Catch Phrase"
  }
].map(c => ({ ...c, ...defaultColumnProperties }));

const handleFilterChange = filter => filters => {
  const newFilters = { ...filters };
  if (filter.filterTerm) {
    newFilters[filter.column.key] = filter;
  } else {
    delete newFilters[filter.column.key];
  }
  return newFilters;
};

function getValidFilterValues(rows, columnId) {
  return rows
    .map(r => r[columnId])
    .filter((item, i, a) => {
      return i === a.indexOf(item);
    });
}

function getRows(rows, filters) {
  return selectors.getRows({ rows, filters });
}

function Example({ rows = createRowData(50) }) {
  const [filters, setFilters] = useState({});
  // const [filteredRows, setFilteredRows] = useState(getRows(rows, filters));

  const filteredRows = getRows(rows, filters);
  // useState(() => {
  //   console.log({ filters });
  //   // setFilteredRows(getRows(rows, filters));
  // }, [filters, rows]);

  const handleAddFilter = filter => {
    const m = handleFilterChange(filter);

    setFilters(m);
    // setFilteredRows(getRows(rows, m));
  };

  return (
    <ReactDataGrid
      columns={columns}
      rowGetter={i => filteredRows[i]}
      rowsCount={filteredRows.length}
      minHeight={500}
      toolbar={<Toolbar enableFilter={true} />}
      onAddFilter={handleAddFilter}
      onClearFilters={() => setFilters({})}
      getValidFilterValues={columnKey => getValidFilterValues(rows, columnKey)}
    />
  );
}

export default Example;
