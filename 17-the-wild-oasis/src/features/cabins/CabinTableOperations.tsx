import React from "react";
import Filter from "../../ui/Filter";
import TableOperations from "./../../ui/TableOperations";
import SortBy from "../../ui/SortBy";

function CabinTableOperations() {
  return (
    <TableOperations>
      <Filter
        filterField="discount"
        options={[
          { value: "all", label: "All" },
          { value: "no-discount", label: "No discount" },
          { value: "with-discount", label: "With discount" },
        ]}
      />

      <SortBy
        options={[
          { value: "name-ascending", label: "Sort by name (A-Z)" },
          { value: "name-descending", label: "Sort by name (Z-A)" },
          {
            value: "regularPrice-ascending",
            label: "Sort by price (low first)",
          },
          {
            value: "regularPrice-descending",
            label: "Sort by price (high first)",
          },
          {
            value: "maxCapacity-ascending",
            label: "Sort by capacity (low first)",
          },
          {
            value: "maxCapacity-descending",
            label: "Sort by capacity (high first)",
          },
        ]}
      />
    </TableOperations>
  );
}

export default CabinTableOperations;
