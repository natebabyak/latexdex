import type { getProjects } from "#lib/projects.remote.ts";
import { createColumnHelper, renderComponent } from "@tanstack/svelte-table";
import type { Features } from "./features";
import DataTableCheckbox from "./data-table-checkbox.svelte";
import TitleCell from "./title-cell.svelte";
import CollaboratorsCell from "./collaborators-cell.svelte";
import ActionsCell from "./actions-cell.svelte";

type Project = Awaited<ReturnType<typeof getProjects>>[number];

const columnHelper = createColumnHelper<Features, Project>();

export const columns = columnHelper.columns([
  columnHelper.display({
    id: "select",
    header: ({ table }) =>
      renderComponent(DataTableCheckbox, {
        checked: table.getIsAllRowsSelected(),
        onCheckedChange: (checked) => table.toggleAllRowsSelected(checked),
        indeterminate:
          table.getIsSomeRowsSelected() && !table.getIsAllRowsSelected(),
      }),
    cell: ({ row }) =>
      renderComponent(DataTableCheckbox, {
        checked: row.getIsSelected(),
        onCheckedChange: (checked) => row.toggleSelected(checked),
      }),
  }),
  columnHelper.accessor("title", {
    header: "Title",
    cell: ({ row }) =>
      renderComponent(TitleCell, {
        id: row.original.id,
        title: row.original.title,
      }),
    sortFn: "alphanumeric",
  }),
  columnHelper.accessor("collaborators", {
    header: "Collaborators",
    cell: ({ row }) =>
      renderComponent(CollaboratorsCell, {
        id: row.original.id,
        collaborators: row.original.collaborators,
      }),
    filterFn: "arrIncludesSome",
  }),
  columnHelper.accessor("updatedAt", {
    header: "Date Modified",
    cell: ({ row }) =>
      `${row.original.updatedAt.toLocaleString("en-US", {
        dateStyle: "medium",
      })} at ${row.original.updatedAt.toLocaleString("en-US", {
        timeStyle: "short",
      })}`,
    filterFn: "inDateRange",
    sortFn: "datetime",
  }),
  columnHelper.display({
    id: "actions",
    cell: ({ row }) =>
      renderComponent(ActionsCell, {
        projectId: row.original.id,
        projectTitle: row.original.title,
      }),
  }),
]);
