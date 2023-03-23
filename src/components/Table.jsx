import React, { useState, useEffect } from "react";
import { alpha } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DeleteIcon from "@mui/icons-material/Delete";
import FilterListIcon from "@mui/icons-material/FilterList";
import { visuallyHidden } from "@mui/utils";

import AddCompanyModal from "./AddCompanyModal";
import Search from "../components/Search";

import "./Table.css";

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === "desc"
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function getFormatedColumns(colArr) {
  return colArr.map((col) => {
    return {
      id: col.name,
      disablePadding: false,
      label: col.label,
      dataType: col.dataType || "string",
    };
  });
}

// Since 2020 all major browsers ensure sort stability with Array.prototype.sort().
// stableSort() brings sort stability to non-modern browsers (notably IE11). If you
// only support modern browsers you can replace stableSort(exampleArray, exampleComparator)
// with exampleArray.slice().sort(exampleComparator)
function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

function EnhancedTableHead(props) {
  const {
    onSelectAllClick,
    order,
    orderBy,
    numSelected,
    rowCount,
    onRequestSort,
    columns,
  } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  const formattedColumns = getFormatedColumns(columns);

  return (
    <TableHead>
      <TableRow>
        {formattedColumns.map((headCell) => (
          <TableCell
            key={headCell.id}
            align="center"
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
            sx={{
              fontSize: 18,
              backgroundColor: "#2C74B3",
              color: "#EEE",
              fontWeight: "bold",
            }}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

function EnhancedTableToolbar(props) {
  const { numSelected, handleFilter, tableTitle } = props;

  return (
    <Toolbar
      className="tableHeader"
      sx={{
        pl: { sm: 2 },
        pr: { xs: 1, sm: 1 },
        ...(numSelected > 0 && {
          bgcolor: (theme) =>
            alpha(
              theme.palette.primary.main,
              theme.palette.action.activatedOpacity
            ),
        }),
      }}
    >
      {numSelected > 0 ? (
        <Typography
          sx={{ flex: "1 1 100%" }}
          color="inherit"
          variant="subtitle1"
          component="div"
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography
          sx={{ flex: "1 1 100%" }}
          variant="h6"
          id="tableTitle"
          component="div"
        >
          {tableTitle}
        </Typography>
      )}
      {numSelected > 0 ? (
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title="Filter list">
          <IconButton onClick={(e) => handleFilter(e)}>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
}

export default function EnhancedTable({
  baseUrl,
  columns,
  filterTerms = [],
  getPageOfData,
  primaryKeyName,
  tableTitle = "",
  displayAddBtn = false,
}) {
  const INITIAL_PAGE_SIZE = 10;
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState(primaryKeyName);
  const [selected, setSelected] = useState([]);
  const [pageNum, setPageNum] = useState(0);
  const [dense, setDense] = useState(false);
  const [rowsPerPage, setRowsPerPage] = useState(INITIAL_PAGE_SIZE);
  const [tableColumns, setTableColumns] = useState(columns);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [refreshData, setRefreshData] = useState(false);

  // pageRequested object is used to fetch backend data - matches backend pagination;
  const defaultPageRequest = {
    pageChangeDirection: "next",
    pageSize: INITIAL_PAGE_SIZE,
    primaryKeyValue: "0",
    searchField: "ticker",
    searchTerm: "",
    sortDirection: "asc",
    sortField: primaryKeyName,
    url: baseUrl,
  };
  const [pageRequested, setPageRequested] = useState(defaultPageRequest);

  useEffect(() => {
    try {
      (async function () {
        const { data = [], count } = await getPageOfData(pageRequested);
        setRows(data);
        setTotalCount(count);
        setRefreshData(false);
      })();
    } catch (err) {
      console.log("Error fetching summary data", err);
    }
  }, [pageRequested, refreshData]);

  const handleTermSearch = (term) => {
    if (term.length === 0) {
      // reset summary page
      setPageRequested(defaultPageRequest);
      setPageNum(0);
    } else {
      const searchPageRequested = {
        ...pageRequested,
        primaryKeyValue: "0",
        pageChangeDirection: "next",
        searchTerm: term,
        url: `${baseUrl}/search`,
      };
      setPageRequested(searchPageRequested);
      setPageNum(0);
    }
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = rows.map((n) => n[tableColumns[0].name]);
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleFilter = (event) => {
    // handle reset of filters
    if (tableColumns.length < columns.length) {
      return setTableColumns(columns);
    }

    // TODO Update to dynamic filter list
    const filtered = tableColumns.filter((col) => {
      return filterTerms.includes(col.name);
    });

    setTableColumns(filtered);
  };

  const handleChangePage = (event, newPage) => {
    let primaryKeyValue;
    let newPageRequested;
    if (newPage > pageNum) {
      // get reference to last row primary key value
      primaryKeyValue = rows[rows.length - 1][primaryKeyName];
      newPageRequested = {
        ...pageRequested,
        primaryKeyValue,
        pageChangeDirection: "next",
      };
    } else {
      // get reference to first row primary key value
      primaryKeyValue = rows[0][primaryKeyName];
      newPageRequested = {
        ...pageRequested,
        primaryKeyValue,
        pageChangeDirection: "prev",
      };
    }
    setPageRequested(newPageRequested);
    setPageNum(newPage);
  };

  const handleChangeRowsPerPage = async (event) => {
    const size = parseInt(event.target.value, 10);
    setPageNum(0);
    setRowsPerPage(size);
    setPageRequested({
      ...pageRequested,
      primaryKeyValue: "0",
      pageSize: size,
      pageChangeDirection: "next",
    });
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;

  // Add empty rows (if required) on final page to avoid layout "jumping"
  const emptyRows = pageNum > 0 ? Math.max(0, rowsPerPage - rows.length) : 0;
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <AddCompanyModal
          displayModal={displayAddBtn}
          setRefreshData={setRefreshData}
        />
        <Search handleTermSearch={handleTermSearch} />
      </div>
      <Box className="">
        <Paper sx={{ width: "100%", mb: 2 }}>
          <EnhancedTableToolbar
            numSelected={selected.length}
            handleFilter={handleFilter}
            tableTitle={tableTitle}
          />
          <TableContainer className="tableBody">
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size={dense ? "small" : "medium"}
            >
              <EnhancedTableHead
                numSelected={selected.length}
                order={order}
                orderBy={orderBy}
                // onSelectAllClick={handleSelectAllClick}
                onRequestSort={handleRequestSort}
                rowCount={rows.length}
                columns={tableColumns}
                sx={{}}
              />
              <TableBody>
                {stableSort(rows, getComparator(order, orderBy)).map(
                  (row, index) => {
                    const isItemSelected = isSelected(row[primaryKeyName]);
                    const labelId = `enhanced-table-checkbox-${index}`;

                    return (
                      <TableRow
                        hover
                        onClick={(event) =>
                          handleClick(event, row[primaryKeyName])
                        }
                        role="checkbox"
                        aria-checked={isItemSelected}
                        tabIndex={-1}
                        key={row[primaryKeyName]}
                        selected={isItemSelected}
                      >
                        {tableColumns.map((item, index) => {
                          return (
                            <TableCell key={index} align="center">
                              {item.dataType === "number"
                                ? row[item.name].toLocaleString("en-US")
                                : row[item.name]}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    );
                  }
                )}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: (dense ? 33 : 53) * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className="tableFooter"
            rowsPerPageOptions={[5, 10]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={pageNum}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
        <FormControlLabel
          control={<Switch checked={dense} onChange={handleChangeDense} />}
          label="Compact"
        />
      </Box>
    </div>
  );
}
