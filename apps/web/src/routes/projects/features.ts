import {
  columnFacetingFeature,
  columnFilteringFeature,
  createFilteredRowModel,
  filterFn_arrIncludesSome,
  filterFn_inDateRange,
  globalFilteringFeature,
  rowSelectionFeature,
  rowSortingFeature,
  sortFn_alphanumeric,
  sortFn_datetime,
  tableFeatures,
} from "@tanstack/svelte-table";

export const features = tableFeatures({
  columnFacetingFeature,
  columnFilteringFeature,
  globalFilteringFeature,
  rowSelectionFeature,
  rowSortingFeature,
  filteredRowModel: createFilteredRowModel(),
  sortedRowModel: createFilteredRowModel(),
  filterFns: {
    arrIncludesSome: filterFn_arrIncludesSome,
    inDateRange: filterFn_inDateRange,
  },
  sortFns: {
    alphanumeric: sortFn_alphanumeric,
    datetime: sortFn_datetime,
  },
});

export type Features = typeof features;
