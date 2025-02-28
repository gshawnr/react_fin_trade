import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import React, { useEffect, useState } from "react";
import SearchBar from "./SearchBar";

import { unixToDateParse } from "../utils/transformFunctions";

import "./BaseTable.css";

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

function EnhancedTableHead(props) {
  const { columns } = props;
  const formattedColumns = getFormatedColumns(columns);

  return (
    <TableHead>
      <TableRow>
        {formattedColumns.map((headCell) => {
          return (
            <TableCell
              key={headCell.id}
              align="center"
              padding={headCell.disablePadding ? "none" : "normal"}
              style={{
                fontSize: 18,
                backgroundColor: "#708090",
                color: "#fff",
                fontWeight: "bold",
                whiteSpace: "nowrap",
                overflow: "hidden",
                textOverflow: "ellipsis",
              }}
            >
              {headCell.label}
            </TableCell>
          );
        })}
      </TableRow>
    </TableHead>
  );
}

// DEFINE PAGE CONSTANTS
// const INITIAL_PAGE_SIZE = 10;
const defaultPageRequest = {
  pageChangeDirection: "next",
  pageSize: 15,
  primaryKeyValue: "0",
  pageRefValue: "0",
  sortDirection: "asc",
};

export default function BaseTable({
  baseUrl,
  tableColumns,
  getPageOfData,
  primaryKeyName,
  pageRefField,
  tableTitle = "",
  subtitle = "",
  searchColumns = "",
  onItemSelect,
  defaultPage = defaultPageRequest,
  initialSortDir = "asc",
}) {
  const [sortDirection, setSortDirection] = useState(initialSortDir);
  const [pageNum, setPageNum] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(defaultPage.pageSize);
  const [rows, setRows] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [refreshData, setRefreshData] = useState(false);
  // const navigate = useNavigate();

  // pageRequested object is used to fetch backend data - matches backend pagination;
  defaultPage.url = baseUrl; // TODO leave in place until all pages have defaultPage
  const [pageRequested, setPageRequested] = useState(defaultPage);

  useEffect(() => {
    try {
      (async function () {
        const { data = [], count = 0 } =
          (await getPageOfData(pageRequested)) || {};
        setRows(data);
        setTotalCount(count);
        setRefreshData(false);
      })();
    } catch (err) {
      throw err;
    }
  }, [pageRequested, refreshData]);

  const handleClick = (row) => {
    if (onItemSelect) {
      onItemSelect(row);
    }
  };

  const handleChangePage = (event, newPage) => {
    let pageRefValue;
    let primaryKeyValue;
    let newPageRequested;
    if (newPage > pageNum) {
      // get reference to last row for pagination data
      pageRefValue = rows[rows.length - 1][pageRefField];
      primaryKeyValue = rows[rows.length - 1][primaryKeyName];

      newPageRequested = {
        ...pageRequested,
        primaryKeyValue,
        pageRefValue,
        pageChangeDirection: "next",
      };
    } else {
      // get reference to first row for pagination data
      primaryKeyValue = rows[0][primaryKeyName];
      pageRefValue = rows[0][pageRefField];

      newPageRequested = {
        ...pageRequested,
        primaryKeyValue,
        pageRefValue,
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
      ...defaultPage,
      pageSize: size,
      pageChangeDirection: "next",
    });
  };

  const handleSearch = async (searchValue) => {
    try {
      if (searchValue.length === 0) {
        // reset filters
        setPageNum(0);
        setPageRequested({
          ...pageRequested,
          primaryKeyValue: "0",
          pageRefValue: "0",
          pageChangeDirection: "next",
          orFilters: [],
        });
      } else if (searchColumns) {
        let filter = searchColumns.split(",").map((thisCol) => {
          return JSON.stringify({
            filterTerm: thisCol,
            operator: "$regex",
            filterValue: searchValue,
            options: "i",
          });
        });

        setPageNum(0);
        setPageRequested({
          ...pageRequested,
          primaryKeyValue: "0",
          pageRefValue: "0",
          pageChangeDirection: "next",
          orFilters: filter,
        });
      }
    } catch (err) {
      throw err;
    }
  };

  // Add empty rows (if required) on final page to avoid layout "jumping"
  const emptyRows = pageNum > 0 ? Math.max(0, rowsPerPage - rows.length) : 0;
  return (
    <div>
      <div className="baseTable-searchbar">
        {searchColumns ? <SearchBar handleTermSearch={handleSearch} /> : null}
      </div>
      <Box className="">
        <Paper sx={{ width: "100%", mb: 2 }}>
          <TableContainer className="baseTable-tableBody">
            <div className="baseTable-title-grp">
              <h2>{tableTitle}</h2>
              <h3>{subtitle}</h3>
            </div>
            <Table
              sx={{ minWidth: 750 }}
              aria-labelledby="tableTitle"
              size="medium"
            >
              <EnhancedTableHead
                rowCount={rows.length}
                columns={tableColumns}
              />
              <TableBody>
                {rows.map((row, index) => {
                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(row)}
                      key={row[primaryKeyName]}
                    >
                      {tableColumns.map((item, index) => {
                        return (
                          <TableCell
                            key={index}
                            align="center"
                            style={{
                              whiteSpace: "nowrap",
                              overflow: "hidden",
                              textOverflow: "ellipsis",
                            }}
                          >
                            {(() => {
                              switch (item.dataType) {
                                case "number":
                                  return row[item.name].toLocaleString("en-US");
                                case "string":
                                  return row[item.name].toUpperCase();
                                case "boolean":
                                  return row[item.name] ? "Yes" : "No";
                                case "timestamp":
                                  return unixToDateParse(row[item.name]);
                                default:
                                  return row[item.name];
                              }
                            })()}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
                {emptyRows > 0 && (
                  <TableRow
                    style={{
                      height: 53 * emptyRows,
                    }}
                  >
                    <TableCell colSpan={6} />
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            className="baseTable-tableFooter"
            rowsPerPageOptions={[5, 15, 25]}
            component="div"
            count={totalCount}
            rowsPerPage={rowsPerPage}
            page={pageNum}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
    </div>
  );
}
