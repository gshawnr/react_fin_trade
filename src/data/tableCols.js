export const summaryTableColumns = [
  { name: "ticker_year", label: "Ticker / Year" },
  { name: "currentAssets", label: "Current Assets", dataType: "number" },
  { name: "assets", label: "Total Assets", dataType: "number" },
  { name: "totalDebt", label: "Total Debt", dataType: "number" },
  { name: "liabilities", label: "Total Liabilities", dataType: "number" },
  { name: "equity", label: "Equity", dataType: "number" },
  { name: "revenue", label: "Revenue", dataType: "number" },
  { name: "costOfRevenue", label: "Cost of Revenue", dataType: "number" },
  { name: "grossProfit", label: "Gross Profit", dataType: "number" },
  { name: "netIncome", label: "Net Income", dataType: "number" },
  { name: "eps", label: "EPS", dataType: "number" },
  { name: "epsDiluted", label: "EPS Diluted", dataType: "number" },
  { name: "avgStockPrice", label: "Year Avg Price", dataType: "number" },
  {
    name: "avgSharesOutstanding",
    label: "Avg Shares Outstanding",
    dataType: "number",
  },
  {
    name: "avgSharesOutstandingDiluted",
    dataType: "number",
    label: "Avg Shares Outstanding Diluted",
  },
];

export const metricTableColumns = [
  { name: "ticker_year", label: "Ticker / Year", dataType: "string" },
  { name: "returnOnEquity", label: "Return on Equity", dataType: "number" },
  { name: "grossMargin", label: "Gross Margin", dataType: "number" },
  { name: "netMargin", label: "Net Margin", dataType: "number" },
  { name: "debtToEquity", label: "Debt To Equity", dataType: "number" },
  { name: "debtToEbitda", label: "Debt To EBITDA", dataType: "number" },
  { name: "currentRatio", label: "Current Ratio", dataType: "number" },
  { name: "avgStockPrice", label: "Share Price", dataType: "number" },
  { name: "dcfValuePerShare", label: "DCF Value", dataType: "number" },
  { name: "dcfToAvgPrice", label: "DCF to Price", dataType: "number" },
  { name: "priceToEarnings", label: "PE", dataType: "number" },
  { name: "earningsYield", label: "EY", dataType: "number" },
  { name: "priceToSales", label: "Price / Sales", dataType: "number" },
  { name: "priceToBook", label: "Price / Book", dataType: "number" },
];

export const searchTableColumns = [
  { name: "ticker_year", label: "Ticker / Year", dataType: "string" },
  { name: "dcfToAvgPrice", label: "DCF to Price", dataType: "number" },
  { name: "priceToEarnings", label: "PE", dataType: "number" },
  { name: "earningsYield", label: "EY", dataType: "number" },
  { name: "industry", label: "Industry", dataType: "string" },
  { name: "sector", label: "Sector", dataType: "string" },
];

export const companyTableColumns = [
  { name: "companyName", label: "Company" },
  { name: "exchange", label: "Exchange" },
  // { name: "industry", label: "Industry" }, // TODO
  { name: "ticker", label: "Symbol" },
];

export const watchTableColumns = [
  { name: "ticker", label: "Ticker" },
  { name: "exchange", label: "Exchange" },
  { name: "currentPrice", label: "Current Price" },
  { name: "targetPrice", label: "Target Price" },
  { name: "dcfValue", label: "DCF" },
  { name: "currency", label: "Currency" },

  { name: "industry", label: "Industry" },
  { name: "lastFiscalYear", label: "Fiscal Year" },
];
