import { cloneDeep } from "lodash";

export const removeEmptyStrings = (formObj) => {
  const transformed = cloneDeep(formObj);
  for (const key in transformed) {
    if (typeof transformed[key] === "string") {
      let trimmed = transformed[key].trim();
      transformed[key] = trimmed === "" ? null : trimmed;
    } else if (
      typeof transformed[key] === "object" &&
      !Array.isArray(transformed[key]) &&
      transformed[key] !== null
    ) {
      transformed[key] = removeEmptyStrings(transformed[key]);
    } else if (Array.isArray(transformed[key])) {
      let newArr = transformed[key].map((thisItem) =>
        removeEmptyStrings(thisItem)
      );
      transformed[key] = newArr;
    }
  }
  return transformed;
};

export const removeNulls = (formObj) => {
  const transformed = cloneDeep(formObj);

  for (const key in transformed) {
    if (transformed[key] === null) {
      transformed[key] = "";
    } else if (
      typeof transformed[key] === "object" &&
      !Array.isArray(transformed[key])
    ) {
      // call recursively on nested objects
      transformed[key] = removeNulls(transformed[key]);
    } else if (Array.isArray(transformed[key])) {
      transformed[key] = transformed[key].map((thisItem) => {
        if (typeof thisItem === "string") return thisItem;
        else return removeNulls(thisItem);
      });
    }
  }
  return transformed;
};

export const unixToDateParse = (timestamp) => {
  // Convert the timestamp to a number if it's a string
  const ts = Number(timestamp);

  // Check if the timestamp is 0 or not a valid number
  if (isNaN(ts)) {
    return "Invalid Date"; // or any placeholder you prefer
  }

  // Create a Date object from the timestamp
  const date = new Date(ts);

  // Define month names
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  // Get the formatted date components
  const month = monthNames[date.getUTCMonth()];
  const day = String(date.getUTCDate()).padStart(2, "0");
  const year = date.getUTCFullYear();

  // Format the date as "MMM-DD-YYYY"
  return `${month}-${day}-${year}`;
};
